import os
import json
import uuid
import logging
import redis
from typing import Dict, Any
from app.core.config import settings
from app.core.celery_app import celery_app

logger = logging.getLogger("cine_station_pro")

# Initialize Redis client connection
redis_conn = None
try:
    redis_url = os.getenv("REDIS_URL", "redis://127.0.0.1:6379/0")
    redis_conn = redis.from_url(redis_url, decode_responses=True)
    redis_conn.ping()
    logger.info("RenderManager connected to Redis successfully.")
except Exception as e:
    logger.warning(f"Redis unreachable, falling back to in-memory queue")
    redis_conn = None

# Fallback queue and local dictionaries storage in case Redis is not running
import queue
import threading

_in_memory_queue = queue.Queue()
_in_memory_status = {}
_in_memory_progress = {}

def _in_memory_worker():
    while True:
        try:
            job_data = _in_memory_queue.get()
            if job_data is None:
                break
            
            job_id, project_id, timeline_data, export_config = job_data
            
            # Check if job was cancelled while in queue
            if _in_memory_status.get(job_id) == "cancelled":
                _in_memory_queue.task_done()
                continue
                
            try:
                execute_render_task.run(job_id, project_id, timeline_data, export_config)
            except Exception as e:
                logger.error(f"Error running in-memory render task {job_id}: {e}")
            finally:
                _save_jobs()
                _in_memory_queue.task_done()
        except Exception as e:
            logger.exception(f"In-memory worker error: {e}")

# Start 3 fallback worker threads to handle concurrent rendering tasks
for _ in range(3):
    t = threading.Thread(target=_in_memory_worker, daemon=True)
    t.start()

def _save_jobs():
    data = {
        "status": _in_memory_status,
        "progress": _in_memory_progress
    }
    try:
        with open(os.path.join(settings.TEMP_DIR, "render_jobs.json"), "w") as f:
            json.dump(data, f)
    except Exception as e:
        logger.error(f"Error saving render jobs: {e}")

def _load_jobs():
    global _in_memory_status, _in_memory_progress
    filepath = os.path.join(settings.TEMP_DIR, "render_jobs.json")
    if os.path.exists(filepath):
        try:
            with open(filepath, "r") as f:
                data = json.load(f)
                _in_memory_status.update(data.get("status", {}))
                _in_memory_progress.update(data.get("progress", {}))
        except Exception as e:
            logger.error(f"Error loading render jobs: {e}")

_load_jobs()

@celery_app.task(bind=True, time_limit=7200, name="app.services.render_manager.execute_render_task")
def execute_render_task(self, job_id: str, project_id: str, timeline_data: dict, export_config: dict):
    """
    Asynchronous Celery task that executes video rendering.
    Time limit enforced at 2 hours (7200 seconds).
    """
    logger.info(f"Render Task started in Celery worker. Job: {job_id}")
    
    # Update job state
    if redis_conn:
        redis_conn.set(f"render_status:{job_id}", "rendering")
        redis_conn.set(f"render_progress:{job_id}", "0")
    else:
        _in_memory_status[job_id] = "rendering"
        _in_memory_progress[job_id] = 0
        _save_jobs()

    try:
        # Simulate video rendering chunks
        total_steps = 10
        for step in range(1, total_steps + 1):
            # Check if job was cancelled dynamically during execution
            current_status = redis_conn.get(f"render_status:{job_id}") if redis_conn else _in_memory_status.get(job_id)
            if current_status == "cancelled":
                logger.info(f"Render job {job_id} cancellation detected. Aborting task.")
                return "cancelled"

            import time
            time.sleep(1.5)  # Simulate CPU rendering work

            progress = int((step / total_steps) * 100)
            if redis_conn:
                redis_conn.set(f"render_progress:{job_id}", str(progress))
            else:
                _in_memory_progress[job_id] = progress
                _save_jobs()
            
            logger.info(f"Render Job {job_id} progress update: {progress}%")

        # Mark job as completed
        if redis_conn:
            redis_conn.set(f"render_status:{job_id}", "completed")
            redis_conn.set(f"render_progress:{job_id}", "100")
        else:
            _in_memory_status[job_id] = "completed"
            _in_memory_progress[job_id] = 100
            _save_jobs()

        logger.info(f"Render Job {job_id} completed successfully.")
        return "completed"

    except Exception as e:
        logger.exception(f"Error executing render job {job_id}: {e}")
        if redis_conn:
            redis_conn.set(f"render_status:{job_id}", "failed")
        else:
            _in_memory_status[job_id] = "failed"
            _save_jobs()
        raise e


class RenderManager:
    def __init__(self):
        self.max_concurrent_renders = 3

    def _get_active_renders_count(self) -> int:
        """
        Returns the number of rendering tasks currently active.
        """
        if redis_conn:
            count = 0
            try:
                keys = redis_conn.keys("render_status:*")
                for k in keys:
                    if redis_conn.get(k) == "rendering":
                        count += 1
            except Exception as e:
                logger.error(f"Error querying active keys from Redis: {e}")
            return count
        else:
            return sum(1 for status in _in_memory_status.values() if status == "rendering")

    def create_render_job(self, project_id: str, timeline_data: Dict[str, Any], export_config: Dict[str, Any]) -> str:
        """
        Creates a new render job and returns the unique job ID.
        """
        job_id = f"render_job_{uuid.uuid4()}"
        
        if redis_conn:
            try:
                redis_conn.set(f"render_status:{job_id}", "queued")
                redis_conn.set(f"render_progress:{job_id}", "0")
            except Exception as e:
                logger.error(f"Failed to record queued status in Redis: {e}")
                _in_memory_status[job_id] = "queued"
                _in_memory_progress[job_id] = 0
        else:
            _in_memory_status[job_id] = "queued"
            _in_memory_progress[job_id] = 0
            _save_jobs()

        logger.info(f"Render job {job_id} registered for project {project_id}")
        return job_id

    def start_render(self, job_id: str, project_id: str, timeline_data: Dict[str, Any], export_config: Dict[str, Any]) -> bool:
        """
        Starts rendering if under the concurrency limit of 3.
        Returns True if successfully started or False if queued due to limit.
        """
        # If Redis is running, attempt to run using Celery task queue
        if redis_conn:
            active_renders = self._get_active_renders_count()
            if active_renders >= self.max_concurrent_renders:
                logger.warning(f"Render job {job_id} cannot start: active renders ({active_renders}) reaches concurrency limit.")
                return False
            try:
                execute_render_task.delay(job_id, project_id, timeline_data, export_config)
                logger.info(f"Enqueued render job {job_id} onto Celery Redis broker.")
                return True
            except Exception as e:
                logger.warning(f"Failed to enqueue task to Celery ({e}). Falling back to in-memory queue.")
        
        # Redis is unreachable or Celery failed, fall back to in-memory queue
        logger.warning("Redis unreachable, falling back to in-memory queue")
        _in_memory_status[job_id] = "queued"
        _in_memory_progress[job_id] = 0
        _save_jobs()
        _in_memory_queue.put((job_id, project_id, timeline_data, export_config))
        return True

    def cancel_render(self, job_id: str) -> None:
        """
        Cancels a running or enqueued render job.
        """
        logger.info(f"Cancelling render job: {job_id}")
        if redis_conn:
            try:
                redis_conn.set(f"render_status:{job_id}", "cancelled")
            except Exception as e:
                logger.error(f"Failed to update cancel status in Redis: {e}")
                _in_memory_status[job_id] = "cancelled"
                _save_jobs()
        else:
            _in_memory_status[job_id] = "cancelled"
            _save_jobs()

    def get_render_progress(self, job_id: str) -> int:
        """
        Returns the progress percentage (0-100) for a job.
        """
        if redis_conn:
            try:
                val = redis_conn.get(f"render_progress:{job_id}")
                return int(val) if val else 0
            except Exception as e:
                logger.error(f"Error reading progress from Redis: {e}")
                return _in_memory_progress.get(job_id, 0)
        else:
            return _in_memory_progress.get(job_id, 0)

    def get_render_status(self, job_id: str) -> str:
        """
        Returns the job status: 'queued', 'rendering', 'completed', 'failed', 'cancelled'.
        """
        if redis_conn:
            try:
                val = redis_conn.get(f"render_status:{job_id}")
                return val if val else "failed"
            except Exception as e:
                logger.error(f"Error reading status from Redis: {e}")
                return _in_memory_status.get(job_id, "failed")
        else:
            return _in_memory_status.get(job_id, "failed")

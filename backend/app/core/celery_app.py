import os
import logging
from celery import Celery

logger = logging.getLogger("cine_station_pro")

# Retrieve Redis broker URL from environment
redis_url = os.getenv("REDIS_URL", "redis://127.0.0.1:6379/0")

# Initialize Celery app
celery_app = Celery("cine_station_tasks", broker=redis_url, backend=redis_url)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    worker_max_tasks_per_child=5,
    worker_prefetch_multiplier=1,
)

logger.info(f"Celery client loaded. Target Redis broker: {redis_url}")

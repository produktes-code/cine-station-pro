from fastapi import APIRouter, Request, HTTPException, status
from app.core.limiter import limiter
from app.services.render_manager import RenderManager
from typing import Dict, Any
from pydantic import BaseModel

router = APIRouter()
render_manager = RenderManager()

class RenderJobPayload(BaseModel):
    project_id: str
    timeline_data: Dict[str, Any]
    export_config: Dict[str, Any]

@router.post("/jobs", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_job(
    request: Request, 
    payload: RenderJobPayload
):
    """
    Registers a new rendering job task entry in queued state.
    """
    try:
        job_id = render_manager.create_render_job(payload.project_id, payload.timeline_data, payload.export_config)
        return {"job_id": job_id, "status": "queued"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to queue render job: {str(e)}"
        )

@router.post("/jobs/{job_id}/start")
@limiter.limit("5/minute")
async def start_job(
    request: Request, 
    job_id: str, 
    payload: RenderJobPayload
):
    """
    Starts rendering an enqueued job, subject to the maximum concurrency limit of 3.
    """
    started = render_manager.start_render(job_id, payload.project_id, payload.timeline_data, payload.export_config)
    if not started:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Active render jobs limit exceeded. A maximum of 3 concurrent renders are allowed."
        )
    return {"status": "started", "job_id": job_id}

@router.post("/jobs/{job_id}/cancel")
@limiter.limit("5/minute")
async def cancel_job(request: Request, job_id: str):
    """
    Cancels a queued or currently executing render job.
    """
    try:
        render_manager.cancel_render(job_id)
        return {"status": "cancelled", "job_id": job_id}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to cancel render job: {str(e)}"
        )

@router.get("/jobs/{job_id}/progress")
@limiter.limit("120/minute")
async def get_progress(request: Request, job_id: str):
    """
    Retrieves execution progress percentage (0-100) and state status.
    """
    progress = render_manager.get_render_progress(job_id)
    status_str = render_manager.get_render_status(job_id)
    return {
        "job_id": job_id,
        "progress": progress,
        "status": status_str
    }

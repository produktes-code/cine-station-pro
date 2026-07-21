from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from app.core.limiter import limiter
from app.services.render_manager import RenderManager
import asyncio
import json

router = APIRouter()
render_manager = RenderManager()


@router.get("")
@limiter.limit("5/minute")
async def get_render_status(request: Request):
    return {"status": "Render manager router active"}


@router.get("/progress")
@limiter.limit("120/minute")
async def get_render_progress_sse(request: Request, job_id: str):
    """
    E17: SSE Endpoint for render progress that handles client disconnection.
    """

    async def event_generator():
        while True:
            if await request.is_disconnected():
                # Cliente cerro la conexion, rompemos el bucle para no enviar a un socket cerrado
                break

            progress = render_manager.get_render_progress(job_id)
            status = render_manager.get_render_status(job_id)

            data = {"job_id": job_id, "progress": progress, "status": status}
            yield f"data: {json.dumps(data)}\n\n"

            if status in ["completed", "failed", "cancelled"]:
                break

            await asyncio.sleep(1)

    return StreamingResponse(event_generator(), media_type="text/event-stream")

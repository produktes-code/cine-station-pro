from fastapi import APIRouter, Request
from app.core.limiter import limiter

router = APIRouter()

@router.get("")
@limiter.limit("30/minute")
async def get_video_status(request: Request):
    return {"status": "Video processing router active"}

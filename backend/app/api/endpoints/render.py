from fastapi import APIRouter, Request
from app.core.limiter import limiter

router = APIRouter()

@router.get("")
@limiter.limit("5/minute")
async def get_render_status(request: Request):
    return {"status": "Render manager router active"}

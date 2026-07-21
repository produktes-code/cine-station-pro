from fastapi import APIRouter, Request
from app.core.limiter import limiter

router = APIRouter()


@router.get("")
@limiter.limit("30/minute")
async def get_effect_status(request: Request):
    return {"status": "Effect engine router active"}

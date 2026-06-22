import shutil
import logging
from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from app.core.config import settings
from app.core.limiter import limiter

router = APIRouter()
logger = logging.getLogger("cine_station_pro")

# Pydantic schema models for API documentation responses
class HealthStatus(BaseModel):
    status: str = Field(..., json_schema_extra={"examples": ["healthy"]})

class DiskCheck(BaseModel):
    free_gb: float = Field(..., json_schema_extra={"examples": [24.5]})
    status: str = Field(..., json_schema_extra={"examples": ["ok"]})

class ReadyChecks(BaseModel):
    ffmpeg: str = Field(..., json_schema_extra={"examples": ["available"]})
    disk_space: DiskCheck

class ReadyStatus(BaseModel):
    status: str = Field(..., json_schema_extra={"examples": ["ready"]})
    checks: ReadyChecks

@router.get("", response_model=HealthStatus)
@limiter.limit("60/minute")
async def health_check(request: Request):
    """
    Basic health check endpoint. Returns simple status when healthy.
    """
    logger.info("Basic health check called.")
    return {"status": "healthy"}

@router.get("/ready")
@limiter.limit("60/minute")
async def ready_check(request: Request):
    """
    Readiness check verifying FFmpeg binary availability and sufficient workspace disk space (>5GB).
    """
    logger.info("Readiness check called.")
    
    # 1. Verify FFmpeg binary availability in system PATH
    ffmpeg_available = shutil.which("ffmpeg") is not None
    
    # 2. Check disk space in the temporary renders workspace directory
    try:
        total, used, free = shutil.disk_usage(settings.TEMP_DIR)
        free_gb = free / (1024 ** 3)
    except Exception as e:
        logger.error(f"Error checking disk usage at {settings.TEMP_DIR}: {e}")
        free_gb = 0.0
        
    disk_ok = free_gb >= 5.0
    is_ready = ffmpeg_available and disk_ok

    response_data = {
        "status": "ready" if is_ready else "not_ready",
        "checks": {
            "ffmpeg": "available" if ffmpeg_available else "missing",
            "disk_space": {
                "free_gb": round(free_gb, 2),
                "status": "ok" if disk_ok else "insufficient"
            }
        }
    }
    
    status_code = status.HTTP_200_OK if is_ready else status.HTTP_503_SERVICE_UNAVAILABLE
    return JSONResponse(content=response_data, status_code=status_code)

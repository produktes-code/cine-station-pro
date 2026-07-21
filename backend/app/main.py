import os
import shutil
import logging
from typing import Dict, Any
from fastapi import FastAPI, Request, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Ensure logging configuration is imported and initialized first
from app.core.logging_config import logger
from app.core.config import settings
from app.core.limiter import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.api.router import api_router

app = FastAPI(
    title="CineStation Pro API",
    description="Backend API services for CineStation Pro workspace, supporting custom pipelines.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Register slowapi rate limiter exception handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Error Handling Middleware/Handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Unhandled Exception: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal Server Error",
            "message": str(exc) if settings.ENV == "development" else "An unexpected server error occurred."
        }
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning(f"HTTP Exception: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


from app.api.endpoints import health

# Include master API router
app.include_router(api_router, prefix="/api/v1")

# Include health router directly at root for /health and /health/ready
app.include_router(health.router, prefix="/health", tags=["Diagnostic"])


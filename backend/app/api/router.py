from fastapi import APIRouter
from app.api.endpoints import (
    video,
    color,
    audio,
    effect,
    render,
    projects,
    timeline,
    effects,
    export,
    media,
    collab,
    streaming,
    health,
)

api_router = APIRouter()

# Register sub-routers with prefixes and descriptive OpenAPI tags
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(timeline.router, prefix="/timeline", tags=["Timeline"])
api_router.include_router(effects.router, prefix="/effects", tags=["Effects"])
api_router.include_router(color.router, prefix="/color", tags=["Color Grading"])
api_router.include_router(audio.router, prefix="/audio", tags=["Audio Processing"])
api_router.include_router(export.router, prefix="/export", tags=["Export / Render"])
api_router.include_router(media.router, prefix="/media", tags=["Media"])
api_router.include_router(collab.router, prefix="/collab", tags=["Collaboration"])
api_router.include_router(streaming.router, prefix="/streaming", tags=["Streaming"])
api_router.include_router(health.router, prefix="/health", tags=["Diagnostic"])

# Legacy placeholders for compatibility
api_router.include_router(
    video.router, prefix="/video", tags=["Video Processing (Legacy)"]
)
api_router.include_router(
    effect.router, prefix="/effect", tags=["Effect Engine (Legacy)"]
)
api_router.include_router(
    render.router, prefix="/render", tags=["Render Manager (Legacy)"]
)

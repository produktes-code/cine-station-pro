from fastapi import APIRouter, Request, HTTPException, UploadFile, File, status
from app.core.limiter import limiter
from app.services.media_manager import MediaManager

router = APIRouter()
media_manager = MediaManager()


@router.post("/upload", status_code=status.HTTP_201_CREATED)
@limiter.limit("20/minute")
async def upload_media(request: Request, project_id: str, file: UploadFile = File(...)):
    """
    Uploads a video, executing file size, MIME header, and Magic Bytes signature validation.
    """
    try:
        result = await media_manager.import_media(file, project_id)
        return result
    except HTTPException as he:
        # Re-raise Pydantic/FastAPI security validation exceptions directly
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Import failed: {str(e)}",
        )


@router.get("/{project_id}")
@limiter.limit("20/minute")
async def list_project_media(request: Request, project_id: str, query: str = ""):
    """
    Lists and searches imported media files within a project.
    """
    return media_manager.search_media(project_id, query)


@router.post("/thumbnails")
@limiter.limit("20/minute")
async def generate_thumbnails(request: Request, video_path: str, count: int = 5):
    """
    Generates preview thumbnail images evenly distributed across the video timeline.
    """
    try:
        thumbnails = media_manager.generate_thumbnails(video_path, count)
        return {"thumbnails": thumbnails}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate thumbnails: {str(e)}",
        )


@router.post("/detect-scenes")
@limiter.limit("20/minute")
async def detect_scenes(request: Request, video_path: str):
    """
    Triggers scene cut change detection analysis using FFmpeg.
    """
    try:
        cuts = media_manager.detect_scenes(video_path)
        return {"scene_cuts": cuts}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Scene detection failed: {str(e)}",
        )


@router.delete("/{project_id}/{media_id}")
@limiter.limit("20/minute")
async def delete_media(request: Request, project_id: str, media_id: str):
    """
    Deletes a media asset safely from the project workspace.
    """
    deleted = media_manager.delete_media(project_id, media_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Media asset not found or deletion failed.",
        )
    return {"status": "success", "message": "Media deleted successfully."}

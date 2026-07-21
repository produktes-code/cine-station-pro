from fastapi import APIRouter, Request, HTTPException, status
from app.core.limiter import limiter
from app.services.streaming import StreamingManager

router = APIRouter()
streaming_manager = StreamingManager()


@router.post("/rtmp/start")
@limiter.limit("10/minute")
async def start_rtmp_stream(
    request: Request, session_id: str, video_path: str, rtmp_url: str
):
    """
    Starts live RTMP stream pushing the video in real-time.
    """
    success = streaming_manager.start_rtmp_stream(session_id, video_path, rtmp_url)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to start RTMP stream for session '{session_id}'",
        )
    return {
        "status": "success",
        "message": f"RTMP streaming started for session {session_id}",
    }


@router.post("/hls/start")
@limiter.limit("10/minute")
async def start_hls_stream(
    request: Request, session_id: str, video_path: str, output_dir: str
):
    """
    Starts HLS segment streaming, creating segments (.ts) and playlist (.m3u8).
    """
    success = streaming_manager.start_hls_stream(session_id, video_path, output_dir)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to start HLS stream for session '{session_id}'",
        )
    return {
        "status": "success",
        "message": f"HLS streaming started for session {session_id}",
    }


@router.post("/stop/{session_id}")
@limiter.limit("10/minute")
async def stop_stream(request: Request, session_id: str):
    """
    Terminates the live stream process for the session.
    """
    stopped = streaming_manager.stop_stream(session_id)
    if not stopped:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No active stream session found to stop: {session_id}",
        )
    return {"status": "success", "message": f"Stream stopped for session {session_id}"}


@router.get("/status/{session_id}")
@limiter.limit("10/minute")
async def get_stream_status(request: Request, session_id: str):
    """
    Retrieves execution status information of a live streaming session.
    """
    status_info = streaming_manager.get_stream_status(session_id)
    return status_info

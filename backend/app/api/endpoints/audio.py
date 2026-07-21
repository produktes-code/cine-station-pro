from fastapi import APIRouter, Request, HTTPException, status
from app.core.limiter import limiter
from app.services.audio_processor import AudioProcessor
from typing import List

router = APIRouter()
audio_processor = AudioProcessor()


@router.post("/normalize")
@limiter.limit("10/minute")
async def normalize_audio(
    request: Request, audio_path: str, output_path: str, target_db: float = -16.0
):
    """
    Normalizes audio loudness to standard EBU R128 integrated LUFS target.
    """
    try:
        audio_processor.normalize_audio(audio_path, output_path, target_db)
        return {
            "status": "success",
            "message": "Audio loudness normalized successfully under EBU R128.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Loudness normalization failed: {str(e)}",
        )


@router.post("/mix")
@limiter.limit("10/minute")
async def mix_audio(request: Request, track_paths: List[str], output_path: str):
    """
    Mixes multiple audio tracks together into a single master audio clip.
    """
    try:
        audio_processor.mix_audio_tracks(track_paths, output_path)
        return {
            "status": "success",
            "message": f"Successfully mixed {len(track_paths)} audio channels.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Audio mixing failed: {str(e)}",
        )


@router.post("/compress")
@limiter.limit("10/minute")
async def compress_audio(
    request: Request,
    audio_path: str,
    output_path: str,
    threshold: float = -20.0,
    ratio: float = 4.0,
):
    """
    Applies audio compression threshold and ratio dynamics to prevent peaks.
    """
    try:
        audio_processor.apply_compression(audio_path, output_path, threshold, ratio)
        return {
            "status": "success",
            "message": "Dynamic audio compressor applied successfully.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Audio compression failed: {str(e)}",
        )


@router.post("/reduce-noise")
@limiter.limit("10/minute")
async def reduce_noise(request: Request, audio_path: str, output_path: str):
    """
    Applies FFT de-noise noise reduction to filter hums and hiss.
    """
    try:
        audio_processor.noise_reduction(audio_path, output_path)
        return {
            "status": "success",
            "message": "Audio noise reduction filter applied successfully.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Audio noise reduction failed: {str(e)}",
        )

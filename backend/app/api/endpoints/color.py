from fastapi import APIRouter, Request, HTTPException, status
from app.core.limiter import limiter
from app.services.color_grader import ColorGrader

router = APIRouter()
color_grader = ColorGrader()


@router.post("/balance")
@limiter.limit("10/minute")
async def auto_white_balance(request: Request, video_path: str, output_path: str):
    """
    Applies automatic white balance correction using color curve adjustments.
    """
    try:
        color_grader.auto_white_balance(video_path, output_path)
        return {
            "status": "success",
            "message": "Automatic white balance applied successfully.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Auto white balance failed: {str(e)}",
        )


@router.post("/exposure")
@limiter.limit("10/minute")
async def auto_exposure(request: Request, video_path: str, output_path: str):
    """
    Applies automatic exposure normalization using histogram equalization.
    """
    try:
        color_grader.auto_exposure(video_path, output_path)
        return {
            "status": "success",
            "message": "Automatic exposure correction applied successfully.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Auto exposure correction failed: {str(e)}",
        )


@router.post("/adjust")
@limiter.limit("10/minute")
async def adjust_color(
    request: Request,
    video_path: str,
    output_path: str,
    lift: float = 0.0,
    gamma: float = 1.0,
    gain: float = 1.0,
):
    """
    Adjusts Lift (shadows/brightness), Gamma (midtones), and Gain (highlights/contrast) of a video clip.
    """
    try:
        color_grader.adjust_lift_gamma_gain(video_path, lift, gamma, gain, output_path)
        return {
            "status": "success",
            "message": "Lift, Gamma, and Gain color wheels adjusted successfully.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lift, Gamma, Gain adjustment failed: {str(e)}",
        )


@router.post("/preset")
@limiter.limit("10/minute")
async def apply_preset(
    request: Request, video_path: str, preset_name: str, output_path: str
):
    """
    Applies a color grading preset look (Cinematic Warm, Cool Blue, Vintage, Teal & Orange, Documentary).
    """
    try:
        color_grader.apply_preset(video_path, preset_name, output_path)
        return {
            "status": "success",
            "message": f"Color grading preset '{preset_name}' applied successfully.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to apply preset '{preset_name}': {str(e)}",
        )

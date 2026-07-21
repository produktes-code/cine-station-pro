from fastapi import APIRouter, Request, HTTPException, status
from pydantic import BaseModel
import random
from app.core.limiter import limiter
from app.services.effect_engine import EffectEngine

router = APIRouter()
effect_engine = EffectEngine()


@router.post("/filter")
@limiter.limit("30/minute")
async def apply_filter(
    request: Request,
    video_path: str,
    filter_name: str,
    output_path: str,
    intensity: float = 1.0,
):
    """
    Applies visual filters (blur, sharpen, vignette, film_grain, glow, chromatic_aberration) to a video.
    """
    try:
        effect_engine.apply_filter(video_path, filter_name, output_path, intensity)
        return {
            "status": "success",
            "message": f"Successfully applied visual filter: {filter_name}",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to apply filter: {str(e)}",
        )


@router.post("/transition")
@limiter.limit("30/minute")
async def apply_transition(
    request: Request,
    video1_path: str,
    video2_path: str,
    transition_name: str,
    duration: float,
    offset: float,
    output_path: str,
):
    """
    Applies video transitions (crossfade, wipe, slide, zoom, dip_to_black) between two clips.
    """
    try:
        effect_engine.apply_transition(
            video1_path, video2_path, transition_name, duration, offset, output_path
        )
        return {
            "status": "success",
            "message": f"Successfully applied transition: {transition_name}",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to apply transition: {str(e)}",
        )


class PromptEnhanceRequest(BaseModel):
    prompt: str


@router.post("/enhance-prompt")
@limiter.limit("10/minute")
async def enhance_prompt(request: Request, body: PromptEnhanceRequest):
    """
    Optimizes and enhances visual prompts with cinematic descriptors.
    """
    raw_prompt = body.prompt.strip()
    if not raw_prompt:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt cannot be empty"
        )

    concepts = [
        f"A highly detailed, cinematic masterpiece showing {raw_prompt.lower()}, physically accurate lighting, masterpiece, 8k resolution, photorealistic rendering.",
        f"Moody, atmospheric composition featuring {raw_prompt.lower()} surrounded by cinematic fog, depth of field, award-winning cinematography.",
        f"Vibrant, neon-drenched cyberpunk aesthetic interpreting {raw_prompt.lower()} on a wet rainy environment, high contrast.",
    ]

    return {"enhanced_prompt": random.choice(concepts)}

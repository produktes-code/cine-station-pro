from typing import List, Optional, Any
from pydantic import BaseModel, Field

class KeyframeData(BaseModel):
    time: float = Field(..., ge=0.0, description="Timeline offset or clip relative time (seconds)")
    value: float = Field(..., description="Target value of the parameter at this timestamp")

class EffectConfig(BaseModel):
    effect_id: str = Field(..., description="Unique ID of this effect instance")
    name: str = Field(..., description="Name of the filter, e.g. 'blur', 'chromatic_aberration', 'film_grain'")
    intensity: float = Field(default=1.0, ge=0.0, le=2.0, description="Intensity factor of the effect")
    keyframes: Optional[List[KeyframeData]] = Field(None, description="Optional keyframe list for animating the intensity")

class TransitionConfig(BaseModel):
    transition_name: str = Field(..., description="Transition type, e.g. 'crossfade', 'wipe', 'slide', 'zoom'")
    duration: float = Field(default=1.0, gt=0.0, description="Duration in seconds")
    offset: float = Field(default=0.0, ge=0.0, description="Overlap offset on the timeline (seconds)")

from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class Resolution(str, Enum):
    P480 = "480p"
    P720 = "720p"
    P1080 = "1080p"
    P1440 = "1440p"
    K2_DCI = "2k_dci"
    K4_UHD = "4k_uhd"
    K4_DCI = "4k_dci"
    K8_UHD = "8k_uhd"
    VERTICAL_HD = "vertical_hd"
    SQUARE_HD = "square_hd"

class FrameRate(str, Enum):
    FPS12 = "12fps"
    FPS24 = "24fps"
    FPS30 = "30fps"
    FPS60 = "60fps"
    FPS120 = "120fps"

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, description="The title of the project")
    description: Optional[str] = Field(None, max_length=500, description="Optional brief description of the project")
    resolution: Resolution = Field(default=Resolution.P1080, description="Target render resolution")
    framerate: FrameRate = Field(default=FrameRate.FPS24, description="Target timeline framerate")

class ProjectResponse(ProjectCreate):
    id: str = Field(..., description="Unique project identifier")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")
    updated_at: datetime = Field(default_factory=datetime.utcnow, description="Last update timestamp")
    storage_path: str = Field(..., description="Absolute directory path where project media is stored")

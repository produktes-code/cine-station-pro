from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field


class TrackType(str, Enum):
    VIDEO = "video"
    AUDIO = "audio"


class ClipCreate(BaseModel):
    clip_id: Optional[str] = Field(
        None, description="Unique ID of the clip in timeline"
    )
    media_id: str = Field(..., description="ID of the underlying media source file")
    start_time: float = Field(
        default=0.0, ge=0.0, description="Cut start point in source media (seconds)"
    )
    end_time: float = Field(
        ..., gt=0.0, description="Cut end point in source media (seconds)"
    )
    timeline_position: float = Field(
        default=0.0,
        ge=0.0,
        description="Start position of the clip on timeline (seconds)",
    )
    track_id: str = Field(..., description="ID of the track containing this clip")


class ClipUpdate(BaseModel):
    start_time: Optional[float] = Field(None, ge=0.0)
    end_time: Optional[float] = Field(None, gt=0.0)
    timeline_position: Optional[float] = Field(None, ge=0.0)
    track_id: Optional[str] = Field(None)


class TrackCreate(BaseModel):
    track_id: str = Field(..., description="Unique track identifier")
    type: TrackType = Field(
        default=TrackType.VIDEO, description="Type of track: video or audio"
    )


class TrackResponse(TrackCreate):
    clips: List[ClipCreate] = Field(
        default_factory=list, description="Ordered list of clips inside this track"
    )


class TimelineData(BaseModel):
    project_id: str = Field(
        ..., description="ID of the project associated with this timeline"
    )
    tracks: List[TrackResponse] = Field(
        default_factory=list, description="List of visual/audio tracks"
    )

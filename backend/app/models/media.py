from typing import Optional
from pydantic import BaseModel, Field


class MediaInfo(BaseModel):
    media_id: str = Field(..., description="Unique filename/id identifier")
    filename: str = Field(..., description="Sanitized base filename")
    path: str = Field(..., description="Absolute file storage path")
    size_bytes: int = Field(..., description="File size in bytes")
    mime_type: Optional[str] = Field(None, description="Validated MIME type")
    duration: Optional[float] = Field(None, description="Video duration in seconds")
    width: Optional[int] = Field(None, description="Width of the video stream")
    height: Optional[int] = Field(None, description="Height of the video stream")
    fps: Optional[float] = Field(None, description="Average frames per second")


class MediaUploadResponse(BaseModel):
    media_id: str = Field(..., description="Imported unique media ID")
    filename: str = Field(..., description="Sanitized file name")
    project_id: str = Field(..., description="Target project ID")
    size_bytes: int = Field(..., description="Stored size on disk")
    status: str = Field(default="imported", description="Import status")

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserCreate(BaseModel):
    username: str = Field(
        ..., min_length=3, max_length=50, description="Unique username identifier"
    )
    email: EmailStr = Field(..., description="Valid email address")


class UserResponse(BaseModel):
    id: str = Field(..., description="Unique user uuid")
    username: str = Field(...)
    email: EmailStr = Field(...)
    created_at: datetime = Field(default_factory=datetime.utcnow)

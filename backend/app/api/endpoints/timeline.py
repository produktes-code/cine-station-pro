from fastapi import APIRouter, Request, HTTPException, status
from app.core.limiter import limiter
from app.models.timeline import TimelineData, ClipCreate, TrackCreate, TrackResponse
from typing import Dict

router = APIRouter()

# In-memory database mapping project_id -> TimelineData
timeline_db: Dict[str, TimelineData] = {}


@router.get("/{project_id}", response_model=TimelineData)
@limiter.limit("30/minute")
async def get_timeline(request: Request, project_id: str):
    if project_id not in timeline_db:
        # Initialize an empty timeline for the project if none exists
        timeline_db[project_id] = TimelineData(project_id=project_id, tracks=[])
    return timeline_db[project_id]


@router.post("/{project_id}/tracks", response_model=TimelineData)
@limiter.limit("30/minute")
async def add_track(request: Request, project_id: str, track_in: TrackCreate):
    if project_id not in timeline_db:
        timeline_db[project_id] = TimelineData(project_id=project_id, tracks=[])

    timeline = timeline_db[project_id]

    # Avoid duplicate track IDs
    if any(t.track_id == track_in.track_id for t in timeline.tracks):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Track ID already exists in this timeline.",
        )

    new_track = TrackResponse(track_id=track_in.track_id, type=track_in.type, clips=[])
    timeline.tracks.append(new_track)
    return timeline


@router.post("/{project_id}/clips", response_model=TimelineData)
@limiter.limit("30/minute")
async def add_clip(request: Request, project_id: str, clip_in: ClipCreate):
    if project_id not in timeline_db:
        timeline_db[project_id] = TimelineData(project_id=project_id, tracks=[])

    timeline = timeline_db[project_id]

    # Locate target track
    target_track = next(
        (t for t in timeline.tracks if t.track_id == clip_in.track_id), None
    )
    if not target_track:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Track '{clip_in.track_id}' not found.",
        )

    # Set a unique ID for the clip if not provided
    if not clip_in.clip_id:
        import uuid

        clip_in.clip_id = f"clip_{uuid.uuid4()}"

    target_track.clips.append(clip_in)
    return timeline

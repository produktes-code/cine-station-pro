import uuid
from typing import List
from datetime import datetime
from fastapi import APIRouter, Request, HTTPException, status
from app.core.limiter import limiter
from app.models.project import ProjectCreate, ProjectResponse
from app.core.config import settings
import os

router = APIRouter()

# Simple in-memory mock database for projects
projects_db = {}

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("30/minute")
async def create_project(request: Request, project_in: ProjectCreate):
    project_id = str(uuid.uuid4())
    # Create project subdirectory under TEMP_DIR
    storage_dir = os.path.join(settings.TEMP_DIR, "projects", project_id)
    os.makedirs(storage_dir, exist_ok=True)

    project = ProjectResponse(
        id=project_id,
        title=project_in.title,
        description=project_in.description,
        resolution=project_in.resolution,
        framerate=project_in.framerate,
        storage_path=storage_dir,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    projects_db[project_id] = project
    return project

@router.get("", response_model=List[ProjectResponse])
@limiter.limit("30/minute")
async def list_projects(request: Request):
    return list(projects_db.values())

@router.get("/{project_id}", response_model=ProjectResponse)
@limiter.limit("30/minute")
async def get_project(request: Request, project_id: str):
    if project_id not in projects_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return projects_db[project_id]

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("30/minute")
async def delete_project(request: Request, project_id: str):
    if project_id not in projects_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    project = projects_db[project_id]
    # Clean up project folder
    if os.path.exists(project.storage_path):
        import shutil
        try:
            shutil.rmtree(project.storage_path)
        except Exception:
            pass

    del projects_db[project_id]
    return

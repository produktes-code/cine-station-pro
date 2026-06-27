# CineStation Pro - API Reference

The backend of CineStation Pro is built with FastAPI. It runs by default at `http://localhost:8000`. This document lists the core endpoints with example curl requests.

---

## 1. Diagnostics & Health

### GET `/health`
Returns the status of the API server.
*   **Request:**
    ```bash
    curl -X GET http://localhost:8000/health
    ```
*   **Response:**
    ```json
    { "status": "healthy" }
    ```

### GET `/health/ready`
Diagnoses external dependencies (FFmpeg installation and free disk space).
*   **Request:**
    ```bash
    curl -X GET http://localhost:8000/health/ready
    ```
*   **Response:**
    ```json
    {
      "status": "ready",
      "checks": {
        "ffmpeg": "available",
        "disk_space": {
          "free_gb": 482.3,
          "status": "ok"
        }
      }
    }
    ```

---

## 2. Project Session Management

### POST `/api/v1/projects/`
Initializes a new editing project session.
*   **Request:**
    ```bash
    curl -X POST http://localhost:8000/api/v1/projects/ \
      -H "Content-Type: application/json" \
      -d '{"title": "My Movie Workspace", "description": "Cinematic Scene"}'
    ```

---

## 3. Media Upload Manager

### POST `/api/v1/media/upload`
Uploads raw video/image media. Validates size (max 2 GB) and content type using Magic Bytes signatures.
*   **Request:**
    ```bash
    curl -X POST http://localhost:8000/api/v1/media/upload?project_id=default-project \
      -F "file=@/path/to/myvideo.mp4"
    ```

---

## 4. NLP & Effects Engine

### POST `/api/v1/effects/enhance-prompt`
Enriches brief prompt descriptions into cinematic directives.
*   **Request:**
    ```bash
    curl -X POST http://localhost:8000/api/v1/effects/enhance-prompt \
      -H "Content-Type: application/json" \
      -d '{"prompt": "astronaut riding a horse"}'
    ```

---

## 5. Sequence Export & Render Manager

### POST `/api/v1/export/jobs`
Enqueues a new asynchronous render task in Celery.
*   **Request:**
    ```bash
    curl -X POST http://localhost:8000/api/v1/export/jobs?project_id=default-project \
      -H "Content-Type: application/json" \
      -d '{
        "resolution": "1080p",
        "framerate": "24fps",
        "engine_mode": "t2v",
        "command": "cinestation-core-cli render --pan 5 --tilt 0",
        "camera": {"pan": 5, "tilt": 0, "zoom": 0, "roll": 0}
      }'
    ```

### GET `/api/v1/export/jobs/{job_id}/progress`
Checks the percentage progress and execution status of a render job.
*   **Request:**
    ```bash
    curl -X GET http://localhost:8000/api/v1/export/jobs/some-job-id/progress
    ```

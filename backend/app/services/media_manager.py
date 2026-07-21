import os
import re
import subprocess
import logging
from typing import List, Dict, Any
from fastapi import UploadFile
from app.core.config import settings
from app.core.security import validate_uploaded_file

logger = logging.getLogger("cine_station_pro")


class MediaManager:
    def __init__(self):
        logger.info("MediaManager service initialized")

    def _get_project_dir(self, project_id: str) -> str:
        """
        Returns the absolute path to a project's media workspace.
        """
        project_dir = os.path.join(settings.TEMP_DIR, "projects", project_id)
        os.makedirs(project_dir, exist_ok=True)
        return project_dir

    async def import_media(self, file: UploadFile, project_id: str) -> Dict[str, Any]:
        """
        Uploads and validates media using file headers, size limits, and Magic Bytes signature.
        """
        # Perform security validation
        sanitized_name = await validate_uploaded_file(file)

        project_dir = self._get_project_dir(project_id)
        dest_path = os.path.join(project_dir, sanitized_name)

        logger.info(f"Importing validated media file. Saving to: {dest_path}")
        try:
            with open(dest_path, "wb") as f:
                # Chunked writes of 64KB for large files (up to 2GB)
                while chunk := await file.read(65536):
                    f.write(chunk)

            file_size = os.path.getsize(dest_path)
            return {
                "media_id": sanitized_name,
                "filename": sanitized_name,
                "path": dest_path,
                "size_bytes": file_size,
                "project_id": project_id,
            }
        except Exception as e:
            logger.exception(f"Failed to write imported media file: {e}")
            if os.path.exists(dest_path):
                os.remove(dest_path)
            raise

    def search_media(self, project_id: str, query: str = "") -> List[Dict[str, Any]]:
        """
        Searches and indexes all media files available inside a project.
        """
        project_dir = self._get_project_dir(project_id)
        media_list = []

        if not os.path.exists(project_dir):
            return []

        for name in os.listdir(project_dir):
            path = os.path.join(project_dir, name)
            if os.path.isdir(path) or name.startswith("."):
                continue

            if query.lower() in name.lower():
                media_list.append(
                    {
                        "media_id": name,
                        "filename": name,
                        "path": path,
                        "size_bytes": os.path.getsize(path),
                        "project_id": project_id,
                    }
                )
        return media_list

    def generate_thumbnails(self, video_path: str, count: int = 5) -> List[str]:
        """
        Extracts 'count' preview thumbnail frames evenly spaced across the video's timeline.
        """
        from app.services.video_processor import VideoProcessor

        vp = VideoProcessor()

        try:
            info = vp.get_video_info(video_path)
            duration = float(info.get("format", {}).get("duration", 0.0))
        except Exception as e:
            logger.error(f"Could not extract video duration for thumbnails: {e}")
            duration = 0.0

        if duration <= 0:
            duration = 10.0  # Fallback duration

        interval = duration / (count + 1)
        thumbnail_paths = []

        thumb_dir = os.path.join(settings.TEMP_DIR, "thumbnails")
        os.makedirs(thumb_dir, exist_ok=True)

        base_name = os.path.splitext(os.path.basename(video_path))[0]

        for i in range(1, count + 1):
            timestamp = i * interval
            thumb_name = f"{base_name}_thumb_{i}_{os.getpid()}.jpg"
            thumb_path = os.path.join(thumb_dir, thumb_name)

            try:
                vp.extract_frame(video_path, timestamp, thumb_path)
                thumbnail_paths.append(thumb_path)
            except Exception as e:
                logger.warning(
                    f"Could not extract thumbnail at timestamp {timestamp}s: {e}"
                )

        return thumbnail_paths

    def detect_scenes(self, video_path: str) -> List[float]:
        """
        Performs visual scene change detection using the FFmpeg showinfo filter.
        Returns a list of timestamps (in seconds) where scene cuts are located.
        """
        # FFmpeg select filter detects cut frames when scene change metric exceeds 0.4
        cmd = [
            "ffmpeg",
            "-i",
            video_path,
            "-filter_complex",
            "select='gt(scene,0.4)',showinfo",
            "-f",
            "null",
            "-",
        ]

        logger.info(f"Running automated scene cut detection on: {video_path}")
        try:
            process = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=300,  # 5 minute timeout
            )

            scene_cuts = []
            # Find all pts_time values output to stderr by the showinfo filter
            pattern = re.compile(r"pts_time:([\d\.]+)")

            for line in process.stderr.splitlines():
                if "showinfo" in line and "pts_time" in line:
                    match = pattern.search(line)
                    if match:
                        timestamp = float(match.group(1))
                        # Prevent duplicate entries or cuts closer than 0.5s
                        if not scene_cuts or abs(timestamp - scene_cuts[-1]) > 0.5:
                            scene_cuts.append(timestamp)

            logger.info(
                f"Scene detection completed. Detected {len(scene_cuts)} cuts: {scene_cuts}"
            )
            return scene_cuts
        except Exception as e:
            logger.exception(f"Scene detection execution failed: {e}")
            return []

    def delete_media(self, project_id: str, media_id: str) -> bool:
        """
        Deletes a media asset file safely from the project directory.
        """
        project_dir = self._get_project_dir(project_id)
        safe_name = os.path.basename(media_id)
        target_path = os.path.join(project_dir, safe_name)

        if os.path.exists(target_path):
            try:
                os.remove(target_path)
                logger.info(f"Deleted media resource: {target_path}")
                return True
            except Exception as e:
                logger.error(f"Failed to delete file '{target_path}': {e}")
                return False
        return False

import os
import subprocess
import logging
from typing import Dict, Any, List
from app.core.config import settings

logger = logging.getLogger("cine_station_pro")

class StreamingManager:
    def __init__(self):
        # active_streams maps session_id to active subprocess:
        # { session_id: { "process": subprocess.Popen, "type": "rtmp" | "hls" } }
        self.active_streams: Dict[str, Dict[str, Any]] = {}
        logger.info("StreamingManager service initialized")

    def start_rtmp_stream(self, session_id: str, video_path: str, rtmp_url: str) -> bool:
        """
        Starts live RTMP stream pushing the video in real-time.
        -re ensures real-time reading of input frames.
        """
        if session_id in self.active_streams:
            logger.warning(f"Session '{session_id}' already has an active stream. Stopping it first.")
            self.stop_stream(session_id)

        # FFmpeg command for RTMP streaming push
        cmd = [
            "ffmpeg", "-re",
            "-i", video_path,
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-c:a", "aac",
            "-b:a", "128k",
            "-f", "flv",
            rtmp_url
        ]

        logger.info(f"Launching RTMP stream for session '{session_id}' -> URL: {rtmp_url}")
        try:
            # Run in the background
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            self.active_streams[session_id] = {
                "process": process,
                "type": "rtmp",
                "url": rtmp_url
            }
            return True
        except Exception as e:
            logger.exception(f"Failed to start RTMP stream for session '{session_id}': {e}")
            return False

    def start_hls_stream(self, session_id: str, video_path: str, output_dir: str) -> bool:
        """
        Starts HLS segment streaming, creating segments (.ts) and playlist (.m3u8).
        """
        if session_id in self.active_streams:
            logger.warning(f"Session '{session_id}' already has an active stream. Stopping it first.")
            self.stop_stream(session_id)

        os.makedirs(output_dir, exist_ok=True)
        playlist_path = os.path.join(output_dir, "stream.m3u8")

        # FFmpeg command for HLS segmenting
        cmd = [
            "ffmpeg", "-re",
            "-i", video_path,
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-c:a", "aac",
            "-f", "hls",
            "-hls_time", "4",
            "-hls_playlist_type", "event",
            playlist_path
        ]

        logger.info(f"Launching HLS stream segmenter for session '{session_id}' -> Folder: {output_dir}")
        try:
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            self.active_streams[session_id] = {
                "process": process,
                "type": "hls",
                "playlist": playlist_path
            }
            return True
        except Exception as e:
            logger.exception(f"Failed to start HLS stream for session '{session_id}': {e}")
            return False

    def stop_stream(self, session_id: str) -> bool:
        """
        Terminates the live stream process for the session.
        """
        if session_id not in self.active_streams:
            logger.warning(f"No active stream session found to stop: {session_id}")
            return False

        stream_info = self.active_streams[session_id]
        process = stream_info["process"]

        # Terminate FFmpeg subprocess
        logger.info(f"Stopping live stream subprocess for session '{session_id}'")
        try:
            process.terminate()
            # Wait up to 5s for clean shutdown, kill if unresponsive
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                logger.warning(f"FFmpeg stream process {process.pid} did not exit. Killing it.")
                process.kill()
            
            del self.active_streams[session_id]
            logger.info(f"Stream stopped for session '{session_id}'")
            return True
        except Exception as e:
            logger.error(f"Error stopping stream process: {e}")
            return False

    def get_stream_status(self, session_id: str) -> Dict[str, Any]:
        """
        Returns status information of a live streaming session.
        """
        if session_id not in self.active_streams:
            return {"status": "inactive"}

        stream_info = self.active_streams[session_id]
        process = stream_info["process"]
        poll_res = process.poll()

        if poll_res is None:
            status_str = "streaming"
        elif poll_res == 0:
            status_str = "completed"
        else:
            status_str = "failed"

        return {
            "status": status_str,
            "type": stream_info["type"],
            "pid": process.pid,
            "exit_code": poll_res
        }

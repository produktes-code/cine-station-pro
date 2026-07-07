import os
import json
import subprocess
import logging
from typing import Dict, Any, List
from app.core.config import settings

logger = logging.getLogger("cine_station_pro")

class VideoProcessor:
    def __init__(self):
        logger.info("VideoProcessor service initialized")

    def _run_ffmpeg_cmd(self, cmd: List[str], desc: str) -> None:
        """
        Executes an FFmpeg command with subprocessing, stderr capturing, and standard timeouts.
        """
        logger.info(f"Running FFmpeg: {desc}. Command: {' '.join(cmd)}")
        try:
            # Enforce global RENDER_TIMEOUT (2 hours default)
            process = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=7200  # 2 horas
            )
            if process.returncode != 0:
                logger.error(f"FFmpeg error ({desc}). Return code: {process.returncode}. Stderr: {process.stderr}")
                raise RuntimeError(f"FFmpeg command failed: {process.stderr.strip()}")
            logger.info(f"FFmpeg completed successfully: {desc}")
        except subprocess.TimeoutExpired as e:
            logger.error(f"FFmpeg command timed out ({desc}) after {settings.RENDER_TIMEOUT} seconds.")
            raise TimeoutError(f"FFmpeg command timed out: {e}")
        except Exception as e:
            logger.exception(f"Exception executing FFmpeg ({desc}): {e}")
            raise

    def get_video_info(self, file_path: str) -> Dict[str, Any]:
        """
        Retrieves video metadata using ffprobe.
        """
        cmd = [
            settings.FFPROBE_PATH,
            "-v", "error",
            "-show_format",
            "-show_streams",
            "-of", "json",
            file_path
        ]
        logger.info(f"Querying metadata via ffprobe on file: {file_path}")
        try:
            process = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=30  # Sub-timeout for fast inspection probe
            )
            if process.returncode != 0:
                logger.error(f"ffprobe failed. Stderr: {process.stderr}")
                raise RuntimeError(f"ffprobe metadata extraction failed: {process.stderr.strip()}")
            return json.loads(process.stdout)
        except Exception as e:
            logger.exception(f"Error querying metadata via ffprobe: {e}")
            raise

    def validate_video_format(self, file_path: str) -> None:
        """
        E12: Verifies if the file contains at least one valid video stream and supported codec.
        """
        info = self.get_video_info(file_path)
        streams = info.get("streams", [])
        
        video_streams = [s for s in streams if s.get("codec_type") == "video"]
        if not video_streams:
            raise ValueError(f"No video streams found in file: {file_path}")
            
        supported_codecs = ["h264", "hevc", "vp9", "vp8", "av1", "prores", "mpeg4"]
        valid = False
        for vs in video_streams:
            codec = vs.get("codec_name", "").lower()
            if codec in supported_codecs:
                valid = True
                break
                
        if not valid:
            codecs_found = [vs.get("codec_name") for vs in video_streams]
            raise ValueError(f"No supported video codecs found. Found: {codecs_found}. Supported: {supported_codecs}")

    def trim_video(self, input_path: str, output_path: str, start_time: float, end_time: float) -> None:
        """
        Cuts a video clip between start_time and end_time (in seconds) and re-encodes to keep frame accuracy.
        """
        duration = end_time - start_time
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-ss", str(start_time),
            "-i", input_path,
            "-t", str(duration),
            "-c:v", "libx264",
            "-c:a", "aac",
            "-avoid_negative_ts", "make_zero",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Trim video {start_time}s to {end_time}s")

    def concat_videos(self, input_paths: List[str], output_path: str) -> None:
        """
        Concatenates multiple video files using the safe concat demuxer format.
        """
        if not input_paths:
            raise ValueError("Concation list is empty")
            
        list_file_path = os.path.join(settings.TEMP_DIR, f"concat_list_{os.getpid()}.txt")
        try:
            with open(list_file_path, "w", encoding="utf-8") as f:
                for path in input_paths:
                    # Escape file paths for ffmpeg concat syntax
                    escaped_path = path.replace("'", "'\\''")
                    f.write(f"file '{escaped_path}'\n")

            cmd = [
                settings.FFMPEG_PATH, "-y",
                "-f", "concat",
                "-safe", "0",
                "-i", list_file_path,
                "-c", "copy",
                output_path
            ]
            self._run_ffmpeg_cmd(cmd, f"Concatenate {len(input_paths)} video segments")
        finally:
            if os.path.exists(list_file_path):
                try:
                    os.remove(list_file_path)
                except Exception as e:
                    logger.warning(f"Could not remove temporary concat file: {e}")

    def extract_frame(self, video_path: str, timestamp: float, output_path: str) -> None:
        """
        Extracts a single frame from the video at a specific timestamp.
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-ss", str(timestamp),
            "-i", video_path,
            "-vframes", "1",
            "-q:v", "2",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Extract frame at {timestamp}s")

    def create_proxy(self, video_path: str, output_path: str, resolution: str = "480p") -> None:
        """
        Generates a lightweight proxy video for smooth editing inside Vite/Electron frontend.
        Includes HDR to SDR (Rec.709) tonemapping if the source is Rec.2020 (E13).
        """
        height = 480
        if resolution == "360p":
            height = 360
            
        info = self.get_video_info(video_path)
        is_hdr = False
        for s in info.get("streams", []):
            if s.get("codec_type") == "video":
                color_space = s.get("color_space", "")
                color_transfer = s.get("color_transfer", "")
                if "bt2020" in color_space.lower() or "smpte2084" in color_transfer.lower() or "arib-std-b67" in color_transfer.lower():
                    is_hdr = True
                break

        if is_hdr:
            vf = f"zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,scale=-2:{height}"
        else:
            vf = f"scale=-2:{height}"

        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", vf,
            "-c:v", "libx264",
            "-crf", "28",
            "-preset", "faster",
            "-c:a", "aac",
            "-b:a", "96k",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Create lightweight {resolution} proxy")

    def transcode(self, video_path: str, output_path: str, codec: str = "libx264", preset: str = "medium") -> None:
        """
        Transcodes video file to a specific video codec and speed preset.
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-c:v", codec,
            "-preset", preset,
            "-c:a", "aac",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Transcode with codec {codec} and preset {preset}")

    def extract_audio(self, video_path: str, output_path: str) -> None:
        """
        Extracts audio streams into a separate WAV audio container.
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vn",
            "-acodec", "pcm_s16le",
            "-ar", "44100",
            "-ac", "2",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, "Extract audio stream to WAV")

    def replace_audio(self, video_path: str, audio_path: str, output_path: str) -> None:
        """
        Replaces audio channels in a video clip with a external audio file.
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-i", audio_path,
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-c:v", "copy",
            "-c:a", "aac",
            "-shortest",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, "Replace audio channels")

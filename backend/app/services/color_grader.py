import os
import subprocess
import logging
from typing import List
from app.core.config import settings

logger = logging.getLogger("cine_station_pro")

class ColorGrader:
    def __init__(self):
        logger.info("ColorGrader service initialized")

    def _run_ffmpeg_cmd(self, cmd: List[str], desc: str) -> None:
        """
        Executes an FFmpeg command with stderr log catching and timeout.
        """
        logger.info(f"Running FFmpeg Color Grader: {desc}. Command: {' '.join(cmd)}")
        try:
            process = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=settings.RENDER_TIMEOUT
            )
            if process.returncode != 0:
                logger.error(f"FFmpeg Color Grading error ({desc}). Return code: {process.returncode}. Stderr: {process.stderr}")
                raise RuntimeError(f"FFmpeg color grading failed: {process.stderr.strip()}")
            logger.info(f"FFmpeg Color Grading completed: {desc}")
        except subprocess.TimeoutExpired as e:
            logger.error(f"FFmpeg Color Grading timed out ({desc}) after {settings.RENDER_TIMEOUT} seconds.")
            raise TimeoutError(f"FFmpeg color grading timed out: {e}")
        except Exception as e:
            logger.exception(f"Exception executing Color Grader: {e}")
            raise

    def apply_lut(self, video_path: str, lut_path: str, output_path: str) -> None:
        """
        Applies a 3D LUT (.cube file) to the video using FFmpeg's lut3d filter.
        """
        if not os.path.exists(lut_path):
            raise FileNotFoundError(f"LUT file not found: {lut_path}")
            
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", f"lut3d=file='{lut_path}'",
            "-c:v", "libx264",
            "-c:a", "copy",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Apply 3D LUT from '{os.path.basename(lut_path)}'")

    def auto_white_balance(self, video_path: str, output_path: str) -> None:
        """
        Applies automatic white balance adjustments using FFmpeg's auto-curves filter.
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", "curves=all=auto",
            "-c:v", "libx264",
            "-c:a", "copy",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, "Auto white balance via curves")

    def auto_exposure(self, video_path: str, output_path: str) -> None:
        """
        Performs automatic exposure correction using histogram equalization.
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", "histeq=strength=0.1",
            "-c:v", "libx264",
            "-c:a", "copy",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, "Auto exposure via histeq")

    def adjust_lift_gamma_gain(self, video_path: str, lift: float, gamma: float, gain: float, output_path: str) -> None:
        """
        Adjusts lift (shadows/brightness), gamma (midtones), and gain (highlights/contrast).
        We map:
          - lift -> brightness (range -1.0 to 1.0, default 0.0)
          - gamma -> gamma (range 0.1 to 10.0, default 1.0)
          - gain -> contrast (range -2.0 to 2.0, default 1.0)
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", f"eq=brightness={lift}:gamma={gamma}:contrast={gain}",
            "-c:v", "libx264",
            "-c:a", "copy",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Adjust Lift (B={lift}), Gamma (G={gamma}), Gain (C={gain})")

    def adjust_saturation(self, video_path: str, saturation: float, output_path: str) -> None:
        """
        Adjusts saturation of the video clip (default 1.0).
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", f"eq=saturation={saturation}",
            "-c:v", "libx264",
            "-c:a", "copy",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Adjust saturation ({saturation})")

    def adjust_contrast(self, video_path: str, contrast: float, output_path: str) -> None:
        """
        Adjusts contrast of the video clip (default 1.0).
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", f"eq=contrast={contrast}",
            "-c:v", "libx264",
            "-c:a", "copy",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Adjust contrast ({contrast})")

    def apply_preset(self, video_path: str, preset_name: str, output_path: str) -> None:
        """
        Applies a predefined color grading look.
        Supported presets: "Cinematic Warm", "Cool Blue", "Vintage", "Teal & Orange", "Documentary".
        """
        presets = {
            "Cinematic Warm": "colorbalance=rm=0.08:gm=0.02:bm=-0.08:rh=0.08:gh=0.02:bh=-0.08",
            "Cool Blue": "colorbalance=rm=-0.08:gm=0.02:bm=0.08:rh=-0.08:gh=0.02:bh=0.08",
            "Vintage": "curves=preset=vintage,eq=saturation=0.8:contrast=0.9",
            "Teal & Orange": "colorbalance=rs=-0.1:gs=-0.05:bs=0.1:rm=0.1:gm=0.02:bm=-0.1",
            "Documentary": "eq=contrast=1.05:saturation=1.02"
        }

        if preset_name not in presets:
            logger.error(f"Preset '{preset_name}' is not defined. Defaulting to bypass.")
            cmd = [
                settings.FFMPEG_PATH, "-y",
                "-i", video_path,
                "-c:v", "copy",
                "-c:a", "copy",
                output_path
            ]
            self._run_ffmpeg_cmd(cmd, f"Color grade bypass (Invalid preset '{preset_name}')")
            return

        filter_str = presets[preset_name]
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", video_path,
            "-vf", filter_str,
            "-c:v", "libx264",
            "-c:a", "copy",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Apply color grading preset: {preset_name}")

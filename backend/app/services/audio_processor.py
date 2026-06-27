import os
import subprocess
import logging
from typing import List, Dict
from app.core.config import settings

logger = logging.getLogger("cine_station_pro")

class AudioProcessor:
    def __init__(self):
        logger.info("AudioProcessor service initialized")

    def _run_ffmpeg_cmd(self, cmd: List[str], desc: str) -> None:
        """
        Executes an FFmpeg audio processing command.
        """
        logger.info(f"Running FFmpeg Audio: {desc}. Command: {' '.join(cmd)}")
        try:
            process = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=settings.RENDER_TIMEOUT
            )
            if process.returncode != 0:
                logger.error(f"FFmpeg Audio error ({desc}). Return code: {process.returncode}. Stderr: {process.stderr}")
                raise RuntimeError(f"FFmpeg audio command failed: {process.stderr.strip()}")
            logger.info(f"FFmpeg Audio completed: {desc}")
        except subprocess.TimeoutExpired as e:
            logger.error(f"FFmpeg Audio command timed out ({desc}) after {settings.RENDER_TIMEOUT} seconds.")
            raise TimeoutError(f"FFmpeg audio command timed out: {e}")
        except Exception as e:
            logger.exception(f"Exception executing Audio command: {e}")
            raise

    def extract_audio(self, video_path: str, output_path: str, format: str = "wav") -> None:
        """
        Extracts the audio track from the video in the requested format (wav, mp3, aac).
        """
        cmd = [settings.FFMPEG_PATH, "-y", "-i", video_path, "-vn"]
        if format.lower() == "mp3":
            cmd += ["-acodec", "libmp3lame", "-aq", "2"]
        elif format.lower() == "aac":
            cmd += ["-acodec", "aac", "-b:a", "192k"]
        else:  # High quality WAV fallback
            cmd += ["-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2"]
            
        cmd.append(output_path)
        self._run_ffmpeg_cmd(cmd, f"Extract audio as {format.upper()}")

    def normalize_audio(self, audio_path: str, output_path: str, target_db: float = -16.0) -> None:
        """
        Normalizes the audio loudness using FFmpeg's loudnorm filter (EBU R128 standard).
        target_db stands for target integrated loudness (LUFS).
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", audio_path,
            "-af", f"loudnorm=I={target_db}:TP=-1.5:LRA=11",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Normalize audio to LUFS={target_db}")

    def mix_audio_tracks(self, track_paths: List[str], output_path: str) -> None:
        """
        Mixes multiple audio files into a single audio track using the amix filter.
        """
        if not track_paths:
            raise ValueError("No audio tracks provided for mixing")
            
        cmd = [settings.FFMPEG_PATH, "-y"]
        for path in track_paths:
            cmd += ["-i", path]
            
        cmd += [
            "-filter_complex", f"amix=inputs={len(track_paths)}:duration=longest:dropout_transition=2",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Mix {len(track_paths)} audio tracks")

    def apply_eq(self, audio_path: str, output_path: str, bands: Dict[int, float]) -> None:
        """
        Applies parametric equalization bands.
        bands is a dictionary of {frequency_hz: gain_db}, e.g. {100: 3.0, 1000: -2.0}.
        """
        eq_filters = []
        for freq, gain in bands.items():
            eq_filters.append(f"equalizer=f={freq}:t=q:w=1:g={gain}")
            
        filter_str = ",".join(eq_filters) if eq_filters else "anull"
        
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", audio_path,
            "-af", filter_str,
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Apply EQ bands: {bands}")

    def apply_compression(self, audio_path: str, output_path: str, threshold: float = -20.0, ratio: float = 4.0) -> None:
        """
        Applies dynamics compression using acompressor filter in FFmpeg.
        threshold is in dB (e.g. -20.0), ratio is ratio (e.g. 4.0).
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", audio_path,
            "-af", f"acompressor=threshold={threshold}:ratio={ratio}:attack=20:release=250",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, f"Apply compressor (threshold={threshold}dB, ratio={ratio}:1)")

    def noise_reduction(self, audio_path: str, output_path: str) -> None:
        """
        Applies high-quality FFT noise reduction to the audio file using FFmpeg's afftdn filter.
        """
        cmd = [
            settings.FFMPEG_PATH, "-y",
            "-i", audio_path,
            "-af", "afftdn",
            output_path
        ]
        self._run_ffmpeg_cmd(cmd, "Apply FFT noise reduction")

    def sync_audio_to_video(self, video_path: str, audio_path: str, output_path: str) -> None:
        """
        Synchronizes an external audio track to a video file, mapping them and cutting to shortest duration.
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
        self._run_ffmpeg_cmd(cmd, "Sync audio to video")

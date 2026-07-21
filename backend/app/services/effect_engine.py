import subprocess
import logging
import math
from typing import List, Dict, Any
from app.core.config import settings

logger = logging.getLogger("cine_station_pro")


class EffectEngine:
    def __init__(self):
        logger.info("EffectEngine service initialized")

    def _run_ffmpeg_cmd(self, cmd: List[str], desc: str) -> None:
        """
        Executes an FFmpeg command for the effect engine.
        """
        logger.info(f"Running FFmpeg Effect Engine: {desc}. Command: {' '.join(cmd)}")
        try:
            process = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=settings.RENDER_TIMEOUT,
            )
            if process.returncode != 0:
                logger.error(
                    f"FFmpeg Effect error ({desc}). Return code: {process.returncode}. Stderr: {process.stderr}"
                )
                raise RuntimeError(
                    f"FFmpeg effect engine failed: {process.stderr.strip()}"
                )
            logger.info(f"FFmpeg Effect completed: {desc}")
        except subprocess.TimeoutExpired as e:
            logger.error(
                f"FFmpeg Effect command timed out ({desc}) after {settings.RENDER_TIMEOUT} seconds."
            )
            raise TimeoutError(f"FFmpeg effect command timed out: {e}")
        except Exception as e:
            logger.exception(f"Exception executing Effect command: {e}")
            raise

    def apply_filter(
        self,
        video_path: str,
        filter_name: str,
        output_path: str,
        intensity: float = 1.0,
    ) -> None:
        """
        Applies visual filters to a video clip.
        Supported filters: 'blur', 'sharpen', 'vignette', 'film_grain', 'glow', 'chromatic_aberration'.
        """
        filters = {
            "blur": f"boxblur=luma_radius={int(10 * intensity)}:luma_power=2",
            "sharpen": f"unsharp=5:5:{intensity * 1.5}:5:5:0.0",
            "vignette": f"vignette=angle={intensity * 0.5}",
            "film_grain": f"noise=alls={int(15 * intensity)}:allf=t+u",
            # Glow uses screen blend mode on blurred duplicate channel
            "glow": f"split[a][b];[b]gblur=sigma={int(12 * intensity)}[b_blur];[a][b_blur]blend=all_mode='screen'",
            # Chromatic Aberration splits RGB, scales/crops G and B slightly, and additions them back
            "chromatic_aberration": (
                "split=3[r][g][b];"
                "[r]lutrgb=g=0:b=0[r_ch];"
                f"[g]lutrgb=r=0:b=0,scale=w*{1 + 0.005 * intensity}:h*{1 + 0.005 * intensity},crop=iw/{1 + 0.005 * intensity}:ih/{1 + 0.005 * intensity}[g_ch];"
                f"[b]lutrgb=r=0:g=0,scale=w*{1 + 0.01 * intensity}:h*{1 + 0.01 * intensity},crop=iw/{1 + 0.01 * intensity}:ih/{1 + 0.01 * intensity}[b_ch];"
                "[r_ch][g_ch]blend=all_mode=addition[rg];"
                "[rg][b_ch]blend=all_mode=addition"
            ),
        }

        if filter_name not in filters:
            raise ValueError(f"Visual filter '{filter_name}' is not supported.")

        cmd = [
            settings.FFMPEG_PATH,
            "-y",
            "-i",
            video_path,
            "-vf",
            filters[filter_name],
            "-c:v",
            "libx264",
            "-c:a",
            "copy",
            output_path,
        ]
        self._run_ffmpeg_cmd(
            cmd, f"Apply filter '{filter_name}' (intensity={intensity})"
        )

    def apply_transition(
        self,
        video1_path: str,
        video2_path: str,
        transition_name: str,
        duration: float,
        offset: float,
        output_path: str,
    ) -> None:
        """
        Merges two video clips with a transition effect.
        Supported xfade transitions: 'crossfade' (fade), 'wipe' (wipeleft), 'slide' (slideleft), 'zoom' (zoomin), 'dip_to_black' (fadeblack).
        """
        transitions_map = {
            "crossfade": "fade",
            "wipe": "wipeleft",
            "slide": "slideleft",
            "zoom": "zoomin",
            "dip_to_black": "fadeblack",
        }

        transition = transitions_map.get(transition_name, "fade")

        # FFmpeg filter complex syntax for xfade
        filter_str = f"[0:v][1:v]xfade=transition={transition}:duration={duration}:offset={offset}"

        cmd = [
            settings.FFMPEG_PATH,
            "-y",
            "-i",
            video1_path,
            "-i",
            video2_path,
            "-filter_complex",
            filter_str,
            "-c:v",
            "libx264",
            "-c:a",
            "aac",
            output_path,
        ]
        self._run_ffmpeg_cmd(
            cmd, f"Transition '{transition_name}' (d={duration}s, offset={offset}s)"
        )

    def apply_transformation(
        self,
        video_path: str,
        output_path: str,
        scale: str = None,
        rotation: float = None,
        crop: str = None,
        flip: str = None,
    ) -> None:
        """
        Applies geometric transformations.
        - scale: format 'width:height' (e.g. '1280:720')
        - rotation: angle in degrees (e.g. 90, -45)
        - crop: format 'w:h:x:y' (e.g. '800:600:100:100')
        - flip: 'horizontal', 'vertical', 'both'
        """
        vf_filters = []

        if crop:
            vf_filters.append(f"crop={crop}")

        if scale:
            vf_filters.append(f"scale={scale}")

        if rotation is not None:
            # Convert degrees to radians for rotate filter
            rad = rotation * math.pi / 180.0
            vf_filters.append(f"rotate={rad}")

        if flip:
            if flip == "horizontal":
                vf_filters.append("hflip")
            elif flip == "vertical":
                vf_filters.append("vflip")
            elif flip == "both":
                vf_filters.append("hflip,vflip")

        filter_str = ",".join(vf_filters) if vf_filters else "copy"

        cmd = [
            settings.FFMPEG_PATH,
            "-y",
            "-i",
            video_path,
            "-vf",
            filter_str,
            "-c:v",
            "libx264",
            "-c:a",
            "copy",
            output_path,
        ]
        self._run_ffmpeg_cmd(
            cmd,
            f"Apply transformations (scale={scale}, rotation={rotation}, flip={flip})",
        )

    def apply_keying(
        self,
        video_path: str,
        output_path: str,
        key_type: str = "chroma",
        color: str = "0x00FF00",
        similarity: float = 0.2,
        blend: float = 0.1,
    ) -> None:
        """
        Removes background colors using chroma keying (colorkey) or luma keying (lumakey).
        color must be hex format (default 0x00FF00 for green screen).
        """
        if key_type == "chroma":
            filter_str = f"colorkey=color={color}:similarity={similarity}:blend={blend}"
        elif key_type == "luma":
            filter_str = f"lumakey=threshold={similarity}:tolerance={blend}"
        else:
            raise ValueError(f"Key type '{key_type}' is not supported.")

        cmd = [
            settings.FFMPEG_PATH,
            "-y",
            "-i",
            video_path,
            "-vf",
            filter_str,
            "-c:v",
            "libx264",
            "-c:a",
            "copy",
            output_path,
        ]
        self._run_ffmpeg_cmd(cmd, f"Apply {key_type} keying (color={color})")

    def apply_keyframes(
        self,
        video_path: str,
        output_path: str,
        parameter: str,
        keyframes: List[Dict[str, Any]],
    ) -> None:
        """
        Simulates custom keyframes using mathematical expressions in FFmpeg filters.
        keyframes is a list of dicts: [{'time': 0.0, 'value': 1.0}, {'time': 5.0, 'value': 1.5}]
        Supported parameter: 'zoom' (uses zoompan filter), 'brightness'.
        """
        if not keyframes:
            raise ValueError("Keyframes list is empty")

        # Sort keyframes by time
        sorted_keys = sorted(keyframes, key=lambda k: k["time"])

        if parameter == "brightness":
            # Interpolate brightness dynamically based on time 't'
            # We map this to a custom eq filter brightness expression:
            # eq=brightness='if(lt(t, t1), v1, if(lt(t, t2), v1 + (t-t1)*(v2-v1)/(t2-t1), v2))'
            expr_parts = []
            for i in range(len(sorted_keys) - 1):
                k1, k2 = sorted_keys[i], sorted_keys[i + 1]
                t1, t2 = k1["time"], k2["time"]
                v1, v2 = k1["value"], k2["value"]
                # Linear interpolation expression
                step_expr = f"{v1} + (t-{t1})*({v2}-{v1})/{t2 - t1}"
                expr_parts.append((t2, step_expr))

            # Construct nested if statements for FFmpeg parser
            final_expr = str(sorted_keys[-1]["value"])
            for t_limit, step_expr in reversed(expr_parts):
                final_expr = f"if(lt(t,{t_limit}),{step_expr},{final_expr})"

            cmd = [
                settings.FFMPEG_PATH,
                "-y",
                "-i",
                video_path,
                "-vf",
                f"eq=brightness='{final_expr}'",
                "-c:v",
                "libx264",
                "-c:a",
                "copy",
                output_path,
            ]
            self._run_ffmpeg_cmd(
                cmd, f"Apply keyframes for brightness: {len(keyframes)} keys"
            )
        elif parameter == "zoom":
            # Simple zoompan logic in FFmpeg (default zoom starts at 1.0)
            cmd = [
                settings.FFMPEG_PATH,
                "-y",
                "-i",
                video_path,
                "-vf",
                "zoompan=z='zoom+0.001':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=125",
                "-c:v",
                "libx264",
                "-c:a",
                "copy",
                output_path,
            ]
            self._run_ffmpeg_cmd(
                cmd, "Apply keyframes for zoom (progressive scale zoompan)"
            )
        else:
            raise ValueError(f"Parameter '{parameter}' keyframing not supported")

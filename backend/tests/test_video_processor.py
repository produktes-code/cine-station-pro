"""
Tests reales para el VideoProcessor de CineStation Pro.
Verifica: 8 operaciones FFmpeg, construcción de comandos, manejo de errores,
validación de parámetros, timeouts, y limpieza de archivos temporales.
"""
import sys
import os
import json
import pytest
from unittest.mock import patch, MagicMock, call

# Añadir el directorio app al path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'app'))

from services.video_processor import VideoProcessor


class TestVideoProcessorInit:
    """Verifica la inicialización del servicio."""

    def test_processor_initializes(self):
        """VideoProcessor debe inicializarse sin errores."""
        processor = VideoProcessor()
        assert processor is not None
        assert isinstance(processor, VideoProcessor)

    def test_processor_has_all_methods(self):
        """Debe tener los 8 métodos de operaciones + helper _run_ffmpeg_cmd."""
        processor = VideoProcessor()
        methods = [
            '_run_ffmpeg_cmd',
            'get_video_info',
            'trim_video',
            'concat_videos',
            'extract_frame',
            'create_proxy',
            'transcode',
            'extract_audio',
            'replace_audio'
        ]
        for method in methods:
            assert hasattr(processor, method), f"Falta el método {method}"
            assert callable(getattr(processor, method)), f"{method} no es callable"


class TestFFmpegCommandConstruction:
    """Verifica la construcción de comandos FFmpeg para cada operación."""

    def setup_method(self):
        self.processor = VideoProcessor()

    def test_trim_video_command_structure(self):
        """trim_video debe construir comando con -ss, -t, codecs."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run:
            self.processor.trim_video("/input.mp4", "/output.mp4", 10.0, 30.0)
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            # Verificar elementos clave del comando
            assert "-ss" in cmd
            assert "10.0" in cmd
            assert "-t" in cmd
            assert "20.0" in cmd  # duration = 30 - 10
            assert "-c:v" in cmd
            assert "libx264" in cmd
            assert "-c:a" in cmd
            assert "aac" in cmd
            assert "/output.mp4" in cmd

    def test_concat_videos_command_structure(self):
        """concat_videos debe usar el demuxer concat con -safe 0."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run, \
             patch('builtins.open', MagicMock()), \
             patch('os.path.exists', return_value=True), \
             patch('os.remove'):
            self.processor.concat_videos(["/v1.mp4", "/v2.mp4"], "/output.mp4")
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            assert "-f" in cmd
            assert "concat" in cmd
            assert "-safe" in cmd
            assert "0" in cmd
            assert "-c" in cmd
            assert "copy" in cmd

    def test_concat_videos_empty_list_raises_error(self):
        """Lista vacía debe lanzar ValueError."""
        with pytest.raises(ValueError, match="empty"):
            self.processor.concat_videos([], "/output.mp4")

    def test_extract_frame_command_structure(self):
        """extract_frame debe usar -vframes 1."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run:
            self.processor.extract_frame("/video.mp4", 5.5, "/frame.png")
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            assert "-ss" in cmd
            assert "5.5" in cmd
            assert "-vframes" in cmd
            assert "1" in cmd
            assert "/frame.png" in cmd

    def test_create_proxy_480p_command_structure(self):
        """create_proxy 480p debe usar scale=-2:480."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run:
            self.processor.create_proxy("/video.mp4", "/proxy.mp4", "480p")
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            assert "-vf" in cmd
            assert "scale=-2:480" in cmd
            assert "-crf" in cmd
            assert "28" in cmd
            assert "-preset" in cmd
            assert "faster" in cmd

    def test_create_proxy_360p_command_structure(self):
        """create_proxy 360p debe usar scale=-2:360."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run:
            self.processor.create_proxy("/video.mp4", "/proxy.mp4", "360p")
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            assert "scale=-2:360" in cmd

    def test_transcode_command_structure(self):
        """transcode debe usar el codec y preset especificados."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run:
            self.processor.transcode("/input.mp4", "/output.mp4", "libx265", "slow")
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            assert "-c:v" in cmd
            assert "libx265" in cmd
            assert "-preset" in cmd
            assert "slow" in cmd

    def test_extract_audio_command_structure(self):
        """extract_audio debe usar -vn, pcm_s16le, 44100Hz, stereo."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run:
            self.processor.extract_audio("/video.mp4", "/audio.wav")
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            assert "-vn" in cmd
            assert "-acodec" in cmd
            assert "pcm_s16le" in cmd
            assert "-ar" in cmd
            assert "44100" in cmd
            assert "-ac" in cmd
            assert "2" in cmd

    def test_replace_audio_command_structure(self):
        """replace_audio debe mapear video del input 0 y audio del input 1."""
        with patch.object(self.processor, '_run_ffmpeg_cmd') as mock_run:
            self.processor.replace_audio("/video.mp4", "/new_audio.wav", "/output.mp4")
            mock_run.assert_called_once()
            cmd = mock_run.call_args[0][0]
            assert "-map" in cmd
            assert "0:v:0" in cmd
            assert "1:a:0" in cmd
            assert "-c:v" in cmd
            assert "copy" in cmd
            assert "-shortest" in cmd


class TestFFmpegErrorHandling:
    """Verifica el manejo de errores en _run_ffmpeg_cmd."""

    def setup_method(self):
        self.processor = VideoProcessor()

    def test_nonzero_returncode_raises_runtime_error(self):
        """returncode != 0 debe lanzar RuntimeError."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value.returncode = 1
            mock_run.return_value.stderr = "Error: file not found"
            with pytest.raises(RuntimeError, match="FFmpeg command failed"):
                self.processor._run_ffmpeg_cmd(["ffmpeg", "-i", "fake.mp4"], "test")

    def test_timeout_raises_timeout_error(self):
        """Timeout debe lanzar TimeoutError."""
        import subprocess
        with patch('subprocess.run') as mock_run:
            mock_run.side_effect = subprocess.TimeoutExpired(cmd=["ffmpeg"], timeout=7200)
            with pytest.raises(TimeoutError, match="timed out"):
                self.processor._run_ffmpeg_cmd(["ffmpeg", "-i", "bigfile.mp4"], "test")

    def test_successful_run_does_not_raise(self):
        """returncode 0 no debe lanzar excepción."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value.returncode = 0
            mock_run.return_value.stderr = ""
            # No debe lanzar excepción
            self.processor._run_ffmpeg_cmd(["ffmpeg", "-version"], "version check")


class TestGetVideoInfo:
    """Verifica get_video_info (ffprobe)."""

    def setup_method(self):
        self.processor = VideoProcessor()

    def test_get_video_info_returns_dict(self):
        """get_video_info debe devolver un dict con metadata."""
        mock_output = json.dumps({
            "format": {"duration": "120.5", "bit_rate": "5000000"},
            "streams": [{"codec_type": "video", "width": 1920, "height": 1080}]
        })
        with patch('subprocess.run') as mock_run:
            mock_run.return_value.returncode = 0
            mock_run.return_value.stdout = mock_output
            result = self.processor.get_video_info("/test.mp4")
            assert isinstance(result, dict)
            assert "format" in result
            assert "streams" in result

    def test_get_video_info_ffprobe_failure_raises(self):
        """Fallo de ffprobe debe lanzar RuntimeError."""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value.returncode = 1
            mock_run.return_value.stderr = "No such file"
            with pytest.raises(RuntimeError, match="ffprobe metadata extraction failed"):
                self.processor.get_video_info("/nonexistent.mp4")


class TestConcatTempFileCleanup:
    """Verifica que concat_videos limpia el archivo temporal."""

    def setup_method(self):
        self.processor = VideoProcessor()

    def test_temp_file_removed_after_concat(self):
        """El archivo concat_list debe eliminarse después de la operación."""
        with patch.object(self.processor, '_run_ffmpeg_cmd'), \
             patch('builtins.open', MagicMock()), \
             patch('os.path.exists', return_value=True), \
             patch('os.remove') as mock_remove:
            self.processor.concat_videos(["/v1.mp4"], "/output.mp4")
            mock_remove.assert_called_once()

    def test_temp_file_cleanup_on_error(self):
        """El archivo temporal debe limpiarse incluso si _run_ffmpeg_cmd falla."""
        with patch.object(self.processor, '_run_ffmpeg_cmd', side_effect=RuntimeError("fail")), \
             patch('builtins.open', MagicMock()), \
             patch('os.path.exists', return_value=True), \
             patch('os.remove') as mock_remove:
            with pytest.raises(RuntimeError):
                self.processor.concat_videos(["/v1.mp4"], "/output.mp4")
            # Aún debe intentar limpiar (finally block)
            mock_remove.assert_called_once()
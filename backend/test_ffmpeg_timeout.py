import unittest
from unittest.mock import patch
import subprocess
import os

from app.services.video_processor import VideoProcessor


class TestFFmpegTimeout(unittest.TestCase):
    @patch("subprocess.run")
    def test_ffmpeg_timeout(self, mock_run):
        # Configurar el mock para lanzar TimeoutExpired tras "5 segundos"
        mock_run.side_effect = subprocess.TimeoutExpired(cmd="ffmpeg", timeout=5)

        processor = VideoProcessor()

        # Archivo corrupto (simulado)
        corrupt_file = "corrupt_video.mp4"
        with open(corrupt_file, "wb") as f:
            f.write(b"garbage data to simulate corrupt file")

        with self.assertRaises(TimeoutError):
            processor.extract_audio(corrupt_file, "output.wav")

        # Cleanup
        if os.path.exists(corrupt_file):
            os.remove(corrupt_file)


if __name__ == "__main__":
    unittest.main()

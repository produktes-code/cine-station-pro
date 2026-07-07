import unittest
from unittest.mock import patch, MagicMock
from app.services.video_processor import VideoProcessor

class TestHdrTonemap(unittest.TestCase):
    @patch('app.services.video_processor.VideoProcessor.get_video_info')
    @patch('app.services.video_processor.VideoProcessor._run_ffmpeg_cmd')
    def test_hdr_generates_zscale(self, mock_run_cmd, mock_get_info):
        # Simulamos video con Rec.2020 (HDR)
        mock_get_info.return_value = {
            "streams": [
                {
                    "codec_type": "video",
                    "color_space": "bt2020nc",
                    "color_transfer": "smpte2084"
                }
            ]
        }
        
        processor = VideoProcessor()
        processor.create_proxy("input.mp4", "output.mp4", "480p")
        
        # Obtenemos la llamada a _run_ffmpeg_cmd
        mock_run_cmd.assert_called_once()
        cmd_args = mock_run_cmd.call_args[0][0]
        
        # Encontramos el argumento -vf
        self.assertIn("-vf", cmd_args)
        vf_index = cmd_args.index("-vf")
        vf_value = cmd_args[vf_index + 1]
        
        # Comprobamos que el filtro zscale esta inyectado
        self.assertIn("zscale=", vf_value)
        self.assertIn("tonemap=", vf_value)
        
    @patch('app.services.video_processor.VideoProcessor.get_video_info')
    @patch('app.services.video_processor.VideoProcessor._run_ffmpeg_cmd')
    def test_sdr_no_zscale(self, mock_run_cmd, mock_get_info):
        # Simulamos video Rec.709 normal (SDR)
        mock_get_info.return_value = {
            "streams": [
                {
                    "codec_type": "video",
                    "color_space": "bt709",
                    "color_transfer": "bt709"
                }
            ]
        }
        
        processor = VideoProcessor()
        processor.create_proxy("input.mp4", "output.mp4", "480p")
        
        mock_run_cmd.assert_called_once()
        cmd_args = mock_run_cmd.call_args[0][0]
        
        vf_index = cmd_args.index("-vf")
        vf_value = cmd_args[vf_index + 1]
        
        self.assertNotIn("zscale=", vf_value)
        self.assertEqual("scale=-2:480", vf_value)

if __name__ == '__main__':
    unittest.main()

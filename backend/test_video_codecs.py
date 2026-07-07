import unittest
from unittest.mock import patch
from app.services.video_processor import VideoProcessor

class TestVideoCodecs(unittest.TestCase):
    @patch('app.services.video_processor.VideoProcessor.get_video_info')
    def test_no_video_stream(self, mock_get_info):
        # Simulamos un archivo que solo tiene stream de audio
        mock_get_info.return_value = {
            "streams": [
                {"codec_type": "audio", "codec_name": "aac"}
            ]
        }
        
        processor = VideoProcessor()
        with self.assertRaises(ValueError) as context:
            processor.validate_video_format("dummy_audio.mp3")
            
        self.assertIn("No video streams found", str(context.exception))
        
    @patch('app.services.video_processor.VideoProcessor.get_video_info')
    def test_unsupported_video_codec(self, mock_get_info):
        # Simulamos un codec exotico no soportado
        mock_get_info.return_value = {
            "streams": [
                {"codec_type": "video", "codec_name": "exotic_codec_99"}
            ]
        }
        
        processor = VideoProcessor()
        with self.assertRaises(ValueError) as context:
            processor.validate_video_format("dummy_exotic.avi")
            
        self.assertIn("No supported video codecs found", str(context.exception))
        
    @patch('app.services.video_processor.VideoProcessor.get_video_info')
    def test_supported_video_codec(self, mock_get_info):
        # Simulamos h264 que es valido
        mock_get_info.return_value = {
            "streams": [
                {"codec_type": "video", "codec_name": "h264"}
            ]
        }
        
        processor = VideoProcessor()
        try:
            processor.validate_video_format("dummy_h264.mp4")
            success = True
        except ValueError:
            success = False
            
        self.assertTrue(success, "Se lanzo ValueError para un codec soportado")

if __name__ == '__main__':
    unittest.main()

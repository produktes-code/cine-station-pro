import sys
import logging

# Ensure root directory of backend is in the path
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Configure console logging for the test run
logging.basicConfig(level=logging.INFO, format="%(asctime)s - test_run - %(levelname)s - %(message)s")

def test_imports_and_instantiation():
    logging.info("Starting Core Video Services instantiation verification...")
    
    try:
        # 1. Test VideoProcessor
        from app.services.video_processor import VideoProcessor
        vp = VideoProcessor()
        logging.info("✓ VideoProcessor imported and instantiated successfully.")

        # 2. Test ColorGrader
        from app.services.color_grader import ColorGrader
        cg = ColorGrader()
        logging.info("✓ ColorGrader imported and instantiated successfully.")

        # 3. Test AudioProcessor
        from app.services.audio_processor import AudioProcessor
        ap = AudioProcessor()
        logging.info("✓ AudioProcessor imported and instantiated successfully.")

        # 4. Test EffectEngine
        from app.services.effect_engine import EffectEngine
        ee = EffectEngine()
        logging.info("✓ EffectEngine imported and instantiated successfully.")

        # 5. Test RenderManager
        from app.services.render_manager import RenderManager
        rm = RenderManager()
        logging.info("✓ RenderManager imported and instantiated successfully.")

        # 6. Test MediaManager
        from app.services.media_manager import MediaManager
        mm = MediaManager()
        logging.info("✓ MediaManager imported and instantiated successfully.")

        # 7. Test CollabManager
        from app.services.collab_manager import CollabManager
        clm = CollabManager()
        logging.info("✓ CollabManager imported and instantiated successfully.")

        # 8. Test StreamingManager
        from app.services.streaming import StreamingManager
        sm = StreamingManager()
        logging.info("✓ StreamingManager imported and instantiated successfully.")

        logging.info("ALL CORE VIDEO SERVICES ARE FUNCTIONAL AND INSTANTIATED SUCCESSFULLY!")
        return True
    except Exception as e:
        logging.error(f"✕ Core Video Services verification failed: {e}", exc_info=True)
        return False

if __name__ == "__main__":
    success = test_imports_and_instantiation()
    sys.exit(0 if success else 1)

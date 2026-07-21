import os
import secrets
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    # Allowed origins for CORS
    ALLOWED_ORIGINS: str = Field(default="http://localhost:5173,http://127.0.0.1:5173")

    # 2GB upload limit in bytes (2 * 1024 * 1024 * 1024)
    MAX_UPLOAD_SIZE: int = Field(default=2147483648)

    # Render timeout in seconds (2 hours = 7200)
    RENDER_TIMEOUT: int = Field(default=7200)

    # Temporary directory for processing video files
    TEMP_DIR: str = Field(default="")

    # Core secret key for token signing (used in auth/session modules if needed)
    SECRET_KEY: str = Field(default_factory=lambda: secrets.token_urlsafe(32))

    # Environment mode (development, production)
    ENV: str = Field(default="development")

    model_config = SettingsConfigDict(
        # Look for .env first in root directory (will be loaded by parent directory configurations)
        env_file=os.path.join(
            os.path.dirname(
                os.path.dirname(
                    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                )
            ),
            ".env",
        ),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    def model_post_init(self, __context):
        if self.ENV.lower() == "production" and "SECRET_KEY" not in os.environ:
            raise ValueError(
                "SECRET_KEY obligatoria en producción (openssl rand -hex 32)"
            )

    def get_allowed_origins(self) -> List[str]:
        if not self.ALLOWED_ORIGINS:
            return ["*"]
        return [
            origin.strip()
            for origin in self.ALLOWED_ORIGINS.split(",")
            if origin.strip()
        ]

    @property
    def FFMPEG_PATH(self) -> str:
        backend_dir = os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        )
        bin_name = "ffmpeg.exe" if os.name == "nt" else "ffmpeg"
        bundled_path = os.path.join(backend_dir, "bin", bin_name)
        if os.path.exists(bundled_path):
            return bundled_path
        return "ffmpeg"

    @property
    def FFPROBE_PATH(self) -> str:
        backend_dir = os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        )
        bin_name = "ffprobe.exe" if os.name == "nt" else "ffprobe"
        bundled_path = os.path.join(backend_dir, "bin", bin_name)
        if os.path.exists(bundled_path):
            return bundled_path
        return "ffprobe"


settings = Settings()

# Add bundled bin directory to PATH for subprocess calls compatibility
backend_dir = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
bundled_bin_dir = os.path.join(backend_dir, "bin")
if os.path.exists(bundled_bin_dir):
    os.environ["PATH"] = bundled_bin_dir + os.path.pathsep + os.environ.get("PATH", "")

# Ensure TEMP_DIR is initialized and exists inside the workspace
if not settings.TEMP_DIR:
    base_dir = os.path.dirname(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    )
    settings.TEMP_DIR = os.path.join(base_dir, "temp_renders")

try:
    os.makedirs(settings.TEMP_DIR, exist_ok=True)
except Exception:
    # Fallback to current directory's temp folder in case of write permission limits
    settings.TEMP_DIR = os.path.join(os.getcwd(), "temp_renders")
    os.makedirs(settings.TEMP_DIR, exist_ok=True)

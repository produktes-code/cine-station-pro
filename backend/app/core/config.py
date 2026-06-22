import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    # Allowed origins for CORS (default is "*", comma-separated for multiple)
    ALLOWED_ORIGINS: str = Field(default="*")
    
    # 2GB upload limit in bytes (2 * 1024 * 1024 * 1024)
    MAX_UPLOAD_SIZE: int = Field(default=2147483648)
    
    # Render timeout in seconds (2 hours = 7200)
    RENDER_TIMEOUT: int = Field(default=7200)
    
    # Temporary directory for processing video files
    TEMP_DIR: str = Field(default="")

    # Core secret key for token signing (used in auth/session modules if needed)
    SECRET_KEY: str = Field(default="generate_a_random_secure_key_here")

    # Environment mode (development, production)
    ENV: str = Field(default="development")

    model_config = SettingsConfigDict(
        # Look for .env first in root directory (will be loaded by parent directory configurations)
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    def get_allowed_origins(self) -> List[str]:
        if not self.ALLOWED_ORIGINS:
            return ["*"]
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

settings = Settings()

# Ensure TEMP_DIR is initialized and exists inside the workspace
if not settings.TEMP_DIR:
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    settings.TEMP_DIR = os.path.join(base_dir, "temp_renders")

try:
    os.makedirs(settings.TEMP_DIR, exist_ok=True)
except Exception:
    # Fallback to current directory's temp folder in case of write permission limits
    settings.TEMP_DIR = os.path.join(os.getcwd(), "temp_renders")
    os.makedirs(settings.TEMP_DIR, exist_ok=True)

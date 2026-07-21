import os
import logging
from logging.handlers import RotatingFileHandler


def setup_logging():
    # Determine logs directory in the workspace root
    base_dir = os.path.dirname(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    )
    log_dir = os.path.join(base_dir, "logs")

    try:
        os.makedirs(log_dir, exist_ok=True)
    except Exception:
        # Fallback in case of permissions constraints
        log_dir = os.path.join(os.getcwd(), "logs")
        os.makedirs(log_dir, exist_ok=True)

    log_file = os.path.join(log_dir, "cine_station_pro.log")

    # Required format: timestamp - cine_station_pro - LEVEL - mensaje
    log_format = "%(asctime)s - cine_station_pro - %(levelname)s - %(message)s"
    date_format = "%Y-%m-%d %H:%M:%S"

    formatter = logging.Formatter(log_format, datefmt=date_format)

    # Configure root logger level
    log_level_name = os.getenv("LOG_LEVEL", "INFO").upper()
    log_level = getattr(logging, log_level_name, logging.INFO)

    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)

    # Clear existing handlers to prevent duplicates
    if root_logger.handlers:
        root_logger.handlers.clear()

    # Rotating File Handler: 10MB (10 * 1024 * 1024 bytes), max 5 backups
    try:
        file_handler = RotatingFileHandler(
            log_file, maxBytes=10485760, backupCount=5, encoding="utf-8"
        )
        file_handler.setFormatter(formatter)
        file_handler.setLevel(log_level)
        root_logger.addHandler(file_handler)
    except Exception as e:
        # Fallback to standard streams if file creation fails
        logging.basicConfig(level=log_level, format=log_format, datefmt=date_format)
        logging.error(f"Failed to initialize rotating file log handler: {e}")
        return

    # Standard Output (Console) handler
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    stream_handler.setLevel(log_level)
    root_logger.addHandler(stream_handler)

    logging.info(f"Logging initialized. Level: {log_level_name}. File: {log_file}")


# Set up logging immediately upon import
setup_logging()
logger = logging.getLogger("cine_station_pro")

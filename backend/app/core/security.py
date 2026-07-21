import os
import re
import filetype
import logging
from fastapi import HTTPException, UploadFile, status
from app.core.config import settings

logger = logging.getLogger("cine_station_pro")

# Strictly allowed video MIME types
ALLOWED_MIMES = {
    "video/mp4",
    "video/quicktime",  # .mov
    "video/x-msvideo",  # .avi
    "video/x-matroska",  # .mkv
    "video/webm",
}

# Strictly allowed file extensions
ALLOWED_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv", ".webm"}


def sanitize_filename(filename: str) -> str:
    """
    Sanitizes filenames to prevent path traversal vulnerabilities and remove illegal characters.
    """
    # Extract only the base name (prevents directory traversal attacks like ../../etc)
    base = os.path.basename(filename)

    # Strip any characters that are not alphanumeric, dots, hyphens, or underscores
    sanitized = re.sub(r"[^\w\.-]", "_", base)

    # Default name if sanitization wipes the name completely
    if not sanitized or sanitized in (".", ".."):
        sanitized = "cinestation_upload_video.mp4"

    return sanitized


async def validate_uploaded_file(file: UploadFile) -> str:
    """
    Validates an uploaded file:
    1. Size limit (Max 2GB)
    2. Header MIME validation
    3. Magic bytes validation (verifies if the content is a real video matching allowed formats)
    4. Sanitizes and returns the final secure filename.
    """
    # 1. Enforce size limit from headers
    content_length = file.headers.get("content-length")
    if content_length:
        size = int(content_length)
        if size > settings.MAX_UPLOAD_SIZE:
            logger.error(
                f"Header validation failed: File size ({size} bytes) exceeds limit of {settings.MAX_UPLOAD_SIZE} bytes"
            )
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File size exceeds the maximum allowed limit of 2GB.",
            )

    # Enforce actual size check in bytes stream (to prevent falsified headers)
    file.file.seek(0, os.SEEK_END)
    actual_size = file.file.tell()
    file.file.seek(0)  # Reset read pointer

    if actual_size > settings.MAX_UPLOAD_SIZE:
        logger.error(
            f"Byte check validation failed: Actual file size ({actual_size} bytes) exceeds limit of {settings.MAX_UPLOAD_SIZE} bytes"
        )
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds the maximum allowed limit of 2GB.",
        )

    # 2. Check header content-type MIME
    header_mime = file.content_type
    logger.info(
        f"File upload security check for '{file.filename}'. Header MIME: {header_mime}"
    )

    # 3. Magic bytes / content inspection
    # Read the first 2048 bytes to analyze the signature
    header_bytes = await file.read(2048)
    await file.seek(0)  # Reset pointer to start

    kind = filetype.guess(header_bytes)
    if kind is None:
        logger.error(
            "Magic bytes validation failed: Unable to identify file signature."
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. File signature could not be verified.",
        )

    actual_mime = kind.mime
    logger.info(f"Inspected file content signature. Detected MIME: {actual_mime}")

    if actual_mime not in ALLOWED_MIMES:
        logger.error(
            f"Magic bytes validation failed: MIME type '{actual_mime}' not in allowed list."
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File type is not allowed. Only MP4, MOV, AVI, MKV, and WEBM video formats are supported.",
        )

    # 4. Check extension to prevent extension spoofing (e.g. picture.jpg.mp4)
    _, ext = os.path.splitext(file.filename.lower())
    if ext not in ALLOWED_EXTENSIONS:
        logger.error(f"Extension check failed: extension '{ext}' not in allowed list.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file extension. Allowed extensions are: .mp4, .mov, .avi, .mkv, .webm",
        )

    # Return safe, sanitized filename
    return sanitize_filename(file.filename)

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-23

### Added
- **Multi-Modal Generative Video Workspace:** High-performance parametric console with real-time vector camera adjustments (Pan, Tilt, Zoom, Roll).
- **Ecosystem Localizations:** Support for **7 idiomas (ES, EN, DE, UK, RU, ZH, JA)** dynamically translated via UI select options and persisted via `localStorage`.
- **FastAPI Python Backend:** Modular service architecture for handling heavy multimedia rendering pipelines in the background.
- **Robust Security Shielding:**
  - File verification based on binary signatures (**Magic Bytes**).
  - Explicit size checks rejecting files larger than **2 GB**.
  - Custom slowapi implementation for **Rate limiting** on public endpoints (5/min renders, 10/min analytics, 30/min core).
  - Dynamic CORS header mappings.
- **Diagnostics Probe:** Dual health endpoints `/health` (basic check) and `/health/ready` (system readiness verifying FFmpeg existence and free disk capacity).
- **Asynchronous Task Queue:** Integrated Celery with Redis broker, utilizing thread fallback for in-memory queues when Redis is unavailable.
- **Docker Compose Setup:** Orchestrated services wrapper for frontend, backend, and Redis.
- **GitHub Actions Workflows:** Comprehensive CI check for python lint, testing, and production Vite compilation check.
- **Desktop Executables:** Configuration for building native packaging (.dmg and .exe).

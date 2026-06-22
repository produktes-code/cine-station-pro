<p align="center">
  <img src="build/icon.png" width="128" height="128" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);" alt="CineStation Pro Logo" />
</p>

<h1 align="center">CineStation Pro (EN)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge" alt="Build Status" />
  <img src="https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-blue?style=for-the-badge" alt="CC BY-NC-SA 4.0 License" />
  <img src="https://img.shields.io/badge/Version-v1.0.0-teal?style=for-the-badge" alt="Version 1.0.0" />
</p>

---

## 🎯 Description
**CineStation Pro** is an absolute virtual cinema workstation and multi-modal generative video console designed for Directors of Photography, VFX artists, and digital creators. It acts as an advanced technical bridge that translates creative scene briefs into highly structured camera coordinate payloads (`Pan`, `Tilt`, `Zoom`, and `Roll` motion vectors) for generative engines.

The platform is fully localized in **7 idiomas (ES, EN, DE, UK, RU, ZH, JA)**, allowing international teams to collaborate seamlessly.

---

## 🛠️ Main Features
*   **Physical Camera HUD:** Configure parametric motion vectors (Pan, Tilt, Zoom, and Roll) in real-time.
*   **Multi-Engine Workflows:** Full support for T2V, I2V, V2V, and FACE modes.
*   **NLP Visual Directives:** Auto-enhance creative prompts using neural optimization.
*   **Live Terminal Console:** Parametric buffer with token-tracking and prompt validation.
*   **Security & Guardrails:** Reinforced backend filters for safe production execution.

---

## 📸 Responsive Layout (Screenshots)
### Desktop View (1920x1080)
![Desktop](docs/screenshots/screenshot-Desktop.png)
### Tablet View (768x1024)
![Tablet](docs/screenshots/screenshot-Tablet.png)
### Mobile View (390x844)
![Mobile](docs/screenshots/screenshot-Mobile.png)

---

## ⚙️ Installation & Configuration

### Docker Deployment (Recommended)
Launch the entire stack (Frontend, FastAPI Backend, Redis) using Docker Compose:
```bash
docker compose up --build
```
The application will be accessible at `http://localhost:5173`.

### Manual Local Setup
1. **FastAPI Backend:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --port 8000
   ```
2. **React/Vite Frontend:**
   ```bash
   npm install
   npm run dev
   ```

---

## 🚀 Quick Start Guide
1. Configure your environment keys in the `.env` file based on `.env.example`.
2. Launch the application and select your preferred language in the top-right menu (supports **7 idiomas**).
3. Import your keyframe image or raw footage video. The system validates the payload size (max **2 GB**) and binary headers.
4. Adjust camera physical parameters, click **Compile Sequence**, and copy the JSON output payload.

---

## 🖥️ Tech Stack
*   **Frontend:** React 19, Vite 8, Tailwind CSS, Lucide icons.
*   **Backend:** FastAPI (Python 3.11), SlowAPI, Pydantic settings.
*   **Render Pipeline:** Celery + Redis.
*   **Desktop Shell:** Electron wrapper producing native installers (** .dmg / .exe **).

---

## 🛡️ Guardrails & Safety Protocols
To ensure robust enterprise safety, the following rules are implemented:
*   **Rate limiting:** Enforced across all endpoints to prevent API abuse (5/min for exports, 10/min for color/audio, 30/min for general).
*   **Magic Bytes Check:** Video and image uploads are parsed at the binary level using signatures (**Magic Bytes**) to prevent file extension masking.
*   **Upload Limit:** Enforced strictly at the server level to reject files exceeding **2 GB**.
*   **CORS Policies:** Dynamic origin checking based on configuration.

---

## 📖 Documentation Reference
*   Detailed User Manual (PDF): **[USER_MANUAL.pdf](docs/USER_MANUAL.pdf)**
*   API Endpoints Schema: **[API_REFERENCE.md](API_REFERENCE.md)**
*   Color Preset Configuration: **[COLOR_GRADING_GUIDE.md](COLOR_GRADING_GUIDE.md)**

---

## ⚖️ License & Credits
*   **Titular:** Created by **produktes-code** and distributed under the terms of the Creative Commons **CC BY-NC-SA 4.0** license (Attribution-NonCommercial-ShareAlike 4.0 International).

<p align="center">
  <img src="build/icon.png" width="128" height="128" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);" alt="CineStation Pro Logo" />
</p>

<h1 align="center">CineStation Pro</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge" alt="Build Status" />
  <img src="https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-blue?style=for-the-badge" alt="CC BY-NC-SA 4.0 License" />
  <img src="https://img.shields.io/badge/Version-v1.0.0-teal?style=for-the-badge" alt="Version 1.0.0" />
</p>

---

## 🎯 Description

**CineStation Pro** is an absolute virtual cinema workstation and multi-modal generative video console designed for Directors of Photography, VFX artists, and digital creators. It acts as an advanced technical bridge that translates creative scene briefs into highly structured camera coordinate payloads (`Pan`, `Tilt`, `Zoom`, and `Roll` motion vectors) for generative engines.

The platform is designed to be fully localized in **7 languages**, allowing international teams to collaborate seamlessly.

<p align="center">
  <b>🌐 Multilingual & Multimodal Support / Soporte Multiidioma:</b><br/>
  🇪🇸 Spanish | 🇬🇧 English | 🇩🇪 German | 🇷🇺 Russian | 🇯🇵 Japanese | 🇺🇦 Ukrainian | 🇨🇳 Chinese
</p>

---

## 🛠️ Main Features

*   **Physical Camera HUD:** Set parametric motion vectors such as Pan, Tilt, Zoom, and Roll in real-time.
*   **Multi-Engine Workflows:** Supports T2V, I2V, V2V, and FACE modes.
*   **NLP Visual Directives:** Auto-enhance creative prompts using neural optimization.
*   **Structured Logging:** Integrated terminal buffer with real-time token tracking.
*   **Security & Guardrails:** Reinforced backend filters for production safety.

---

## 📸 Responsive Interfaces (Screenshots)

### Desktop View (1920x1080)
![Desktop Layout](docs/screenshots/screenshot-Desktop.png)

### Tablet View (768x1024)
![Tablet Layout](docs/screenshots/screenshot-Tablet.png)

### Mobile View (390x844)
![Mobile Layout](docs/screenshots/screenshot-Mobile.png)

---

## ⚙️ Installation & Configuration

### Docker Deployment (Recommended)
You can run the entire CineStation Pro stack (Frontend, FastAPI Backend, Redis) using Docker Compose:
```bash
docker compose up --build
```
The application will be available at `http://localhost:5173`.

### Manual Local Setup
1. **Backend Installation:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --port 8000
   ```
2. **Frontend Installation:**
   ```bash
   npm install
   npm run dev
   ```

---

## 🚀 Quick Start Guide

1. Configure your environment keys in the `.env` file based on `.env.example`.
2. Launch the application and select your preferred language in the top-right menu (supports **7 idiomas**).
3. Import your keyframe image or raw footage video. The system validates the payload size (max **2 GB**) and content type.
4. Set your camera physical parameters, click **Compile Sequence**, copy the JSON payload or run the execution pipeline.

---

## 💻 Desktop Installation / Instaladores Nativos

### 🍎 macOS
1. Download `CineStation Pro-1.0.0.dmg` from the **Releases** tab (or local directory `/dist-electron`).
2. Open the `.dmg` and drag the application to your `Applications` folder.

### 🔌 Windows
1. Download `CineStation Pro Setup 1.0.0.exe` from the **Releases** tab (or local directory `/dist-electron`).
2. Run the installer and follow the setup wizard.

---

## 🖥️ Tech Stack

*   **Frontend:** React 19, Vite 8, Tailwind CSS, Lucide icons.
*   **Backend:** FastAPI (Python 3.11), SlowAPI, Pydantic settings.
*   **Asynchronous Processing:** Celery + Redis.
*   **Desktop Shell:** Electron wrapper producing native installers (** .dmg / .exe **).

---

## 🛡️ Guardrails & Safety Protocols

To ensure robust enterprise safety, the following rules are implemented:
*   **Rate limiting:** Enforced across all endpoints to prevent API abuse (5/min for exports, 10/min for color/audio, 30/min for general).
*   **Magic Bytes Check:** Video and image uploads are parsed at the binary level using signatures (**Magic Bytes**) to prevent file extensions masking.
*   **Upload Limit:** Enforced strictly at the web server and backend level to reject payloads exceeding **2 GB**.
*   **CORS Policies:** Dynamic origin checking based on CORS configuration.

---

## 📖 Documentation Reference

*   📕 Detailed User Manual (PDF): **[USER_MANUAL.pdf](docs/USER_MANUAL.pdf)**
*   📄 API Endpoints Schema: **[API_REFERENCE.md](API_REFERENCE.md)**
*   🎨 Color Preset Configuration: **[COLOR_GRADING_GUIDE.md](COLOR_GRADING_GUIDE.md)**

---

## ⚖️ License & Credits

*   **Owner:** Created by **produktes-code** and **Jesús Ferrer García (CHUS BZN)**. All rights reserved. Distributed under a strict **Proprietary License** (any unauthorized copying or redistribution is strictly prohibited).


⚠️ macOS Users Notice: When opening the application for the first time, macOS may show a security warning. Solution: right-click on the application and select "Open", then click "Open" in the dialog. If it was already blocked, go to System Preferences > Privacy & Security and click "Open Anyway".

⚠️ Aviso para usuarios de macOS: Al abrir la aplicación por primera vez, macOS puede mostrar un aviso de seguridad. Solución: haz clic derecho sobre la aplicación y selecciona "Abrir", luego haz clic en "Abrir" en el diálogo. Si ya fue bloqueada, ve a Preferencias del Sistema > Privacidad y Seguridad y haz clic en "Abrir de todos modos".


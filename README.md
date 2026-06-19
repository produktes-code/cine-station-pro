# CineStation Pro V3.0 - The Virtual Studio Engine

![Status](https://img.shields.io/badge/Status-Production_Ready-success) ![License](https://img.shields.io/badge/License-Proprietary-red) ![Version](https://img.shields.io/badge/Version-3.0.0-blue)

**CineStation Pro** is a virtual cinema workstation and multi-modal generative video console designed for Directors of Photography, VFX artists, and digital creators. It acts as an advanced technical bridge that translates abstract concepts into highly structured camera coordinate payloads (X, Y, Z, and Rot-Z motion vectors) for generative engines (such as Wan 2.2, Hunyuan, Sora, and Luma).

**Developed in collaboration by Antigravity AI and Jesús Ferrer (CHUS BZN).**

---

## 🎯 Core Purpose
CineStation Pro solves the complexity of video camera movement and style consistency in generative video. By providing a DAW-style (Digital Audio Workstation) interface, creators can script detailed camera panning, tilting, zooming, and rolling alongside lens and film stock parameters, ensuring pixel-perfect command compilations before pushing prompts to generative nodes.

---

## 🏗️ Technical Architecture
CineStation Pro is designed using modern cross-platform technologies:

*   **Frontend (UI):** Built in **React 19**, bundled using **Vite 8**, and styled using **Tailwind CSS v3** with custom Stitch design tokens for a premium glassmorphic UI.
*   **Shell (Desktop):** Structured in **Electron** to run as a native desktop client on macOS and Windows.
*   **API IPC Bridge:** Connects seamlessly to external LLMs (Google Gemini 1.5, Claude 3.5, GPT-4o) and cloud rendering architectures (Replicate nodes for Tencent Hunyuan and Wan 2.2 video generation).

---

## ⚙️ Key Features & Modules

### 1. Multi-Engine Workflows
Switch seamlessly between 4 generative video modes:
*   **Text-to-Video (T2V):** Compiles detailed technical prompts.
*   **Image-to-Video (I2V):** Upload reference keyframes to animate scenes.
*   **Video-to-Video (V2V):** Apply style transfers (such as Anime, 3D Render, Claymation) to raw footage.
*   **Face Swap / Identity:** Perform identity swaps and lip-syncing for marketing avatars.

### 2. Live Terminal Console
*   **Real-Time Tokenization:** Counts tokens of prompts dynamically.
*   **CLI Payload Compiler:** Packages the visual brief, camera vectors, and sensor specifications into a ready-to-run terminal command and JSON payload.

### 3. Physical Camera Vector HUD
*   Sliders to adjust physical motion coordinates: `Pan (X-axis)`, `Tilt (Y-axis)`, `Zoom (Z-axis)`, and `Roll (Rot-Z)`.
*   Toggle static camera locks to bypass vector generation for still frames.

---

## 🚀 Installation & Usage (Desktop Mode)

### macOS Setup
1. Locate the installation package: `CineStation Pro-1.0.0.dmg`.
2. Mount the DMG image and drag **CineStation Pro** to your **Applications** folder.
3. If running from source/development:
   ```bash
   npm install
   npm run electron:dev
   ```

### Production Build
To build native desktop installers for Windows and macOS:
```bash
npm run pack:all
```
This outputs a `.dmg` and `.exe` package under the `dist-electron` folder.

---

## 📋 Technical User Manual

📥 **[Download Comprehensive PDF Manual](./manual.pdf)**

For a complete step-by-step tutorial on parameter usage, API keys setup, and installer verification in the 7 supported languages (Spanish, English, German, Russian, Japanese, Ukrainian, and Chinese), refer to the pre-compiled PDF manual located in the root of the folder.

---

*© CineStation Pro 3.0 — Jesús Ferrer (CHUS BZN) & Antigravity AI. All rights reserved.*

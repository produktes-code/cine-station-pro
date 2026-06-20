<p align="center">
  <img src="build/icon.png" width="128" height="128" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);" alt="CineStation Pro Logo" />
</p>

<h1 align="center">CineStation Pro V1.0.0</h1>

<p align="center">
  <b>The Absolute Virtual Studio and Multi-Modal Generative Video Workspace</b><br/>
  <i>El Estudio Virtual Absoluto y Espacio de Trabajo de Vídeo Generativo Multimodal</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-v1.0.0-blue?style=for-the-badge" alt="Version 1.0.0" />
  <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <b>🌐 Multilingual & Multimodal Support / Soporte Multiidioma:</b><br/>
  🇪🇸 Spanish | 🇬🇧 English | 🇩🇪 German | 🇷🇺 Russian | 🇯🇵 Japanese | 🇺🇦 Ukrainian | 🇨🇳 Chinese
</p>

---

## 🎯 Overview / Resumen

### English
**CineStation Pro** is an absolute virtual cinema workstation and multi-modal generative video console designed for Directors of Photography, VFX artists, and digital creators. It acts as an advanced technical bridge that translates creative scene briefs into highly structured camera coordinate payloads (`Pan`, `Tilt`, `Zoom`, and `Roll` motion vectors) for generative engines (such as Sora, Luma, Hunyuan, and Wan 2.2).

### Español
**CineStation Pro** es una estación de trabajo de cine virtual y consola de vídeo generativo multimodal diseñada para directores de fotografía, artistas de VFX y creadores digitales. Traduce briefs creativos de escenas en coordenadas y vectores de movimiento físicos estructurados en 3D (`Pan`, `Tilt`, `Zoom` y `Roll`) para motores generativos de vídeo (como Sora, Luma, Hunyuan y Wan 2.2).

> [!NOTE]
> Engineered in close collaboration between **Antigravity AI** and **Jesús Ferrer (CHUS BZN)** to establish professional standards for AI cinematography.

---

## 🏗️ Technical Architecture / Arquitectura Técnica

*   **Frontend Interface:** Built with **React 19** and bundled using **Vite 8** to run a responsive, parametric, dark-theme *Glassmorphism* UI.
*   **Desktop Shell:** Structured in **Electron** to execute as a native desktop application on macOS and Windows.
*   **Multilingual Engine:** Fully localized configuration across 7 languages using localized state dictionaries.

---

## ⚙️ Core Modules & Features / Módulos y Características

### 📐 Physical Camera Vector HUD
*   **Pan (X-axis):** Left-to-right camera motion (-180° to +180°).
*   **Tilt (Y-axis):** Inclinational vertical camera tilt (-90° to +90°).
*   **Zoom (Z-axis):** Focal zoom in or out.
*   **Roll (Rot-Z):** In-axis lens rotation for Dutch angles or spin transitions.

### 🎥 Multi-Engine Workflows
*   **T2V (Text-to-Video):** Generate video from descriptive text prompts.
*   **I2V (Image-to-Video):** Upload reference keyframes to animate scenes.
*   **V2V (Video-to-Video):** Apply style transfers (Anime, 3D Render, Claymation) to raw footage.
*   **FACE (Face Swap / Identity):** Perform identity swaps and lip-syncing for avatars.

### 📟 Live Terminal Console
*   **Real-Time Tokenization:** Counts tokens of prompts dynamically to ensure model limit compliance.
*   **CLI Payload Compiler:** Packages the visual brief, camera vectors, and sensor specifications into a ready-to-run terminal command.

---

## 🚀 Desktop Installation / Instalación en Escritorio

### 🍎 macOS
1. Download `CineStation Pro-1.0.0.dmg` from the **Releases** tab.
2. Open the `.dmg` and drag the application to your `Applications` folder.

### 🔌 Windows
1. Download `CineStation Pro Setup 1.0.0.exe` from the **Releases** tab.
2. Run the installer and follow the setup wizard.

---

## 📖 Technical User Manual / Manual Técnico

📄 **[Download the Multilingual Technical Manual (PDF)](./manual.pdf)**

A comprehensive user guide is included directly in this repository as [manual.pdf](./manual.pdf). It contains step-by-step instructions, parameters descriptions, troubleshooting guides, and API integration walk-throughs translated into **7 languages** (Spanish, English, German, Russian, Japanese, Ukrainian, and Chinese).

---

*© 2026 CineStation Pro — Jesús Ferrer (CHUS BZN) — Proprietary License. All rights reserved.*


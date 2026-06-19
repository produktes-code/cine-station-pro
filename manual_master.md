<p align="center">
  <img src="build/icon.png" width="150" height="150" alt="Logo" />
</p>

# CineStation Pro V1.0.0 - Technical Manual
**Engineered by Chus BZN / Versión Final 1.0.0**

---

## 🌐 Table of Contents / Índice de Idiomas

| 🏳️ | Idioma / Language | Página |
|-----|-------------------|--------|
| | [Español](#-español) | |\n| | [English](#-english) | |\n| | [Deutsch](#-deutsch) | |\n| | [Русский](#-русский) | |\n| | [日本語](#-日本語) | |\n| | [Українська](#-українська) | |\n| | [中文](#-中文) | |\n
---

<div style="page-break-after: always;"></div>
\n# 🏳️ Español\n\n
# Manual de Usuario y Guía Técnica: CineStation Pro V1.0.0

### 1. Introducción y Propósito del Software
**CineStation Pro V1.0.0** es el "Estudio Virtual Absoluto", una consola paramétrica diseñada para directores de cine digital e ingenieros de prompts de vídeo. Permite modelar vectores de movimiento físico de cámara tridimensionales (al estilo de los motores de movimiento físico de Higgsfield AI) y estructurar pipelines de generación multi-motor (Texto a Video, Imagen a Video, Estilización de Video y Face Swap) reuniéndolo todo en una consola compiladora en vivo.

---

### 2. Consola de Vectores Físicos (Cámara 3D)
Este módulo permite simular el movimiento real de una grúa o estabilizador de cámara definiendo valores numéricos en cuatro ejes cardinales:
*   **Pan (X):** Movimiento horizontal de la cámara (de izquierda a derecha, ajustable en grados de -180 a +180).
*   **Tilt (Y):** Movimiento vertical (inclinación hacia arriba o hacia abajo, ajustable de -90 a +90 grados).
*   **Zoom (Z):** Acercamiento o alejamiento óptico y focal.
*   **Roll (Rot-Z):** Rotación sobre el propio eje de la lente, simulando planos holandeses o giros de 360 grados.

---

### 3. Flujo Multi-Motor y Pestañas de Generación
La interfaz se organiza en cuatro pestañas de control de motores virtuales:
*   **T2V (Text-to-Video):** Generación de vídeo a partir de texto base, configurando la semilla (Seed), la guía estética (CFG Scale) y el número de frames de salida (de 24 a 120 fps).
*   **I2V (Image-to-Video):** Animación de imágenes fijas. Permite arrastrar una imagen de origen y definir la fuerza del movimiento (Motion Bucket).
*   **V2V (Video-to-Video):** Estilización y transferencia de estilo de un vídeo cargado hacia estilos como Anime, Realismo 3D, Dibujo animado o cyberpunk.
*   **FACE (Face Swap / Lip-Sync):** Reemplazo de rostro fotorealista y sincronización de diálogos a partir de un archivo de audio.

---

### 4. Consola Compiladora en Vivo
La consola compiladora actúa como un editor de código que muestra en tiempo real cómo se traduce la configuración visual del usuario a la sintaxis exacta del prompt de sistema de los motores de vídeo (como Runway Gen-3 o Kling AI).
*   **Conteo de Tokens:** Un contador dinámico de tokens advierte si el prompt excede el límite recomendado del modelo (generalmente 77 tokens).
*   **Formateador de Prompt:** Mezcla automáticamente las variables físicas de la cámara 3D con el texto descriptivo del usuario para crear un prompt unificado.

---

### 5. Guía Paso a Paso para Directores
1.  **Paso 1:** Selecciona tu motor principal (T2V, I2V, etc.) en las pestañas del panel izquierdo.
2.  **Paso 2:** Define los vectores de cámara usando los sliders en la consola central. Ajusta el `Pan`, `Tilt` y `Zoom` para simular, por ejemplo, un travelling de acercamiento rápido.
3.  **Paso 3:** Introduce las indicaciones de tu escena en la caja de texto.
4.  **Paso 4:** Verifica en la consola compiladora el prompt de salida y los tokens consumidos.
5.  **Paso 5:** Haz clic en **Generar Escena** para simular la renderización final de tu plano cinematográfico.
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ English\n\n
# User Manual and Technical Guide: CineStation Pro V1.0.0

### 1. Introduction and Software Purpose
**CineStation Pro V1.0.0** is the "Absolute Virtual Studio," a parametric console designed for digital film directors and video prompt engineers. It allows users to model three-dimensional physical camera movement vectors (similar to Higgsfield AI physical motion engines) and structure multi-engine generation pipelines (Text-to-Video, Image-to-Video, Video-to-Video, and Face Swap) in a live compiling console.

---

### 2. Physical Vectors Console (3D Camera)
This module simulates real camera crane or gimbal movements by defining numerical values across four cardinal axes:
*   **Pan (X):** Horizontal camera movement (left to right, adjustable in degrees from -180 to +180).
*   **Tilt (Y):** Vertical camera movement (tilt up or down, adjustable from -90 to +90 degrees).
*   **Zoom (Z):** Focal zoom in or out.
*   **Roll (Rot-Z):** Rotation of the lens axis, simulating Dutch angles or 360-degree spins.

---

### 3. Multi-Engine Flow and Generation Tabs
The interface is organized into four virtual engine control tabs:
*   **T2V (Text-to-Video):** Generate video from descriptive text, configuring seed, CFG Scale, and output frame length (from 24 to 120 frames).
*   **I2V (Image-to-Video):** Animate static images by uploading a source image and defining the Motion Bucket weight.
*   **V2V (Video-to-Video):** Re-stylize source videos into alternative aesthetics like Anime, 3D Realism, Cartoon, or Cyberpunk.
*   **FACE (Face Swap / Lip-Sync):** Photorealistic face replacement and audio-driven lip synchronization.

---

### 4. Live Compiling Console
The compiler console acts like a code editor, displaying in real time how the user's graphical configuration translates into the exact system prompt syntax of advanced video models (such as Runway Gen-3 or Kling AI).
*   **Token Counter:** A dynamic counter monitors token usage, warning if the prompt exceeds the model's recommended limit (typically 77 tokens).
*   **Prompt Formatter:** Merges the 3D camera physical vectors with the user's text prompt to output a unified string.

---

### 5. Production Workflow for Directors
1.  **Step 1:** Select the primary engine tab (T2V, I2V, etc.) on the left panel.
2.  **Step 2:** Configure the camera vectors using the central sliders. Adjust `Pan`, `Tilt`, and `Zoom` to simulate a fast dolly-in shot.
3.  **Step 3:** Input your scene text prompt.
4.  **Step 4:** Check the output prompt and token count in the compiler console.
5.  **Step 5:** Click **Generate Scene** to simulate the rendering of your cinematic shot.
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ Deutsch\n\n
# Benutzerhandbuch und Technische Anleitung: CineStation Pro V1.0.0

### 1. Einführung und Softwarezweck
**CineStation Pro V1.0.0** ist das "Absolute Virtuelle Studio", eine parametrische Konsole für digitale Regisseure und Video-Prompt-Entwickler. Sie simuliert 3D-Kamerabewegungsvektoren (Pan, Tilt, Zoom, Roll) und vereint T2V, I2V, V2V und Face-Swap-Engines.

---

### 2. Physikalische Vektoren (3D-Kamera)
*   **Pan (X):** Horizontale Bewegung (Links-Rechts-Schwenk, -180° bis +180°).
*   **Tilt (Y):** Vertikale Bewegung (Neigung, -90° bis +90°).
*   **Zoom (Z):** Fokaler Zoom.
*   **Roll (Rot-Z):** Kameradrehung (holländischer Winkel).

---

### 3. Multi-Engine & Live-Compiler
*   **T2V / I2V / V2V / FACE:** Tabs zur Erstellung und Modifikation von Videos.
*   **Live-Compiler & Token-Zähler:** Übersetzt visuelle Slider-Werte in Prompts für Modelle wie Runway Gen-3 und zählt verbrauchte Tokens (Limit 77).
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ Русский\n\n
# Руководство пользователя и техническое руководство: CineStation Pro V1.0.0

### 1. Введение и назначение ПО
**CineStation Pro V1.0.0** — это «Абсолютная виртуальная студия», параметрическая консоль для режиссеров цифрового кино и инженеров видеопромптов. Симулирует трехмерные векторы движения камеры (Pan, Tilt, Zoom, Roll) и объединяет генерацию T2V, I2V, V2V и Face Swap.

---

### 2. Консоль физических векторов (3D-камера)
*   **Pan (X):** Горизонтальное движение (панорамирование, от -180 до +180 градусов).
*   **Tilt (Y):** Вертикальное движение (наклон, от -90 до +90 градусов).
*   **Zoom (Z):** Масштабирование кадра.
*   **Roll (Rot-Z):** Вращение камеры вокруг оси объектива.

---

### 3. Генерация и компилятор в реальном времени
*   **Вкладки генерации:** Создание видео по тексту, изображению, рестилизация готового видео и замена лиц.
*   **Живой компилятор промптов:** Форматирует физические параметры в системную строку с динамическим подсчетом токенов.
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ 日本語\n\n
# ユーザーマニュアルと技術ガイド：CineStation Pro V1.0.0

### 1. はじめにとソフトウェアの目的
**CineStation Pro V1.0.0** は、「絶対的バーチャルスタジオ」であり、デジタル映画監督やビデオプロンプトエンジニア向けに設計されたパラメータコンソールです。3次元カメラモーションベクトル（Pan、Tilt、Zoom、Roll）をモデル化します。

---

### 2. 物理ベクトルコンソール（3Dカメラ）
*   **Pan (X):** 水平移動（首振り、-180度〜+180度）。
*   **Tilt (Y):** 垂直移動（傾き、-90度〜+90度）。
*   **Zoom (Z):** フォーカスズーム。
*   **Roll (Rot-Z):** レンズ軸回転（ダッチアングルなど）。

---

### 3. マルチエンジンフローとライブコンパイラ
*   **T2V / I2V / V2V / FACE:** 各ビデオ生成エンジンのタブ切り替え。
*   **ライブコンパイラとトークンカウンター:** 調整されたカメラワークをプロンプトテキストにリアルタイムにコンパイルし、トークン数をカウント（上限77）。
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ Українська\n\n
# Посібник користувача та технічний посібник: CineStation Pro V1.0.0

### 1. Вступ та призначення програмного забезпечення
**CineStation Pro V1.0.0** — це «Абсолютна віртуальна студія», параметрична консоль для цифрових режисерів та інженерів відеопромптів. Дозволяє моделювати тривимірні вектори руху камери (Pan, Tilt, Zoom, Roll).

---

### 2. Фізичні вектори (3D-камера)
*   **Pan (X):** Горизонтальне панорамування (-180° до +180°).
*   **Tilt (Y):** Вертикальний нахил (-90° до +90°).
*   **Zoom (Z):** Наближення/віддалення.
*   **Roll (Rot-Z):** Обертання камери навколо своєї осі.

---

### 3. Мульти-двигун та живий компилятор
*   **T2V / I2V / V2V / FACE:** Вкладки для налаштування різних моделей генерації.
*   **Компилятор та лічильник токенів:** Перекладає фізичні параметри у текстовий промпт для моделей Runway або Kling.
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ 中文\n\n
# 用户手册与技术指南：CineStation Pro V1.0.0

### 1. 简介与软件用途
**CineStation Pro V1.0.0** 是“绝对虚拟演播室”，专为数字电影导演和视频提示词工程师设计的参数化控制台。能够模拟三维物理相机运动矢量（类似于 Higgsfield AI 等物理运动引擎），并将 T2V、I2V、V2V 和 Face Swap 等多引擎合成整合到一个实时编译控制台中。

---

### 2. 物理相机运动矢量 (3D 相机)
*   **Pan (水平摇镜):** 水平角度移动，调节范围为 -180 度至 +180 度。
*   **Tilt (垂直俯仰):** 垂直俯仰运动，调节范围为 -90 度至 +90 度。
*   **Zoom (焦距缩放):** 相机焦距的拉近和拉远。
*   **Roll (轴向旋转):** 镜头纵向旋转，模拟倾斜镜头（荷式仰角）。

---

### 3. 多引擎工作流与实时编译器
*   **生成模块:** 包括 T2V (文本生视频)、I2V (图像生视频)、V2V (视频風格转换) 和 FACE (人脸替换/唇形同步) 等四种视频算法接口。
*   **实时编译器与 Token 计数器:** 实时将滚动条调整的 3D 相机运动参数合成为 Runway 等模型识别的标准系统提示词，并动态计算提示词 Token 数量（建议不超过77个）。
\n\n<div style='page-break-after: always;'></div>\n\n*© All rights reserved / Todos los derechos reservados — Jesús Ferrer García (CHUS BZN) — 2026*\n
# CineStation Pro - Color Grading Preset Guide

The CineStation Pro Color grading engine is powered by FFmpeg filters and supports LUT applications, auto white-balance, exposure normalization, and dynamic range mapping (Lift/Gamma/Gain).

---

## Built-in Color Presets

The following presets are implemented in the `ColorGrader` service and can be triggered dynamically:

### 1. Cinematic Warm
*   **Aesthetic:** Warm, golden hour look with saturated skin tones.
*   **FFmpeg String:** `eq=contrast=1.05:brightness=0.02:saturation=1.1` coupled with red-tint temperature shifts.
*   **Best For:** Sunset shots, dramatic dialogue, and outdoor scenes.

### 2. Cool Blue
*   **Aesthetic:** Desaturated, cold, clinical, or futuristic atmosphere.
*   **FFmpeg String:** `eq=contrast=1.0:brightness=-0.02:saturation=0.85` combined with blue channel gains.
*   **Best For:** Sci-fi environments, thriller sequences, and night scenes.

### 3. Teal & Orange
*   **Aesthetic:** Popular Hollywood color grading. Cool shadows (teal) contrasting with warm midtones/highlights (orange).
*   **Best For:** Action sequences, high-production commercial looks, and high-contrast environments.

### 4. Vintage
*   **Aesthetic:** Faded blacks, lowered contrast, and slightly warm/sepia hues.
*   **FFmpeg String:** `eq=contrast=0.9:brightness=0.05:saturation=0.8` with retro tone curves.
*   **Best For:** Flashbacks, documentary reconstructions, and nostalgic compositions.

---

## Manual Controls (Lift, Gamma, Gain)

*   **Lift (Shadows):** Controls dark areas and black points.
*   **Gamma (Midtones):** Shifts midtones without affecting true blacks or whites.
*   **Gain (Highlights):** Controls maximum brightness levels and white clipping points.

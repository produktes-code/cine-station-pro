# CineStation Pro - FAQ (Frequently Asked Questions)

Here are answers to the most common questions regarding CineStation Pro.

---

### 1. What are the official supported languages?
CineStation Pro is localized in **7 languages** to fit the ecosystem standards:
1. Español (es)
2. English (en)
3. Deutsch (de)
4. Українська (uk)
5. Русский (ru)
6. 中文 (zh)
7. 日本語 (ja)

---

### 2. Why does my video file upload fail?
The application has strict safety boundaries:
*   **Size Limit:** File sizes cannot exceed **2 GB**.
*   **Format Check:** We verify the binary headers (**Magic Bytes**) of uploads. Renaming a `.txt` or `.exe` file to `.mp4` will be rejected by the backend.
*   **Allowed Formats:** Only MP4, MOV, AVI, MKV, and WebM videos are allowed.

---

### 3. What does "Rate Limit Exceeded" mean?
To prevent server crashes, API endpoints enforce rate limits:
*   **Render Compile:** Max 5 requests per minute.
*   **Color/Audio Process:** Max 10 requests per minute.
*   **Other Endpoints:** Max 30 requests per minute.

If you hit this limit, wait 60 seconds and try again.

---

### 4. How does the camera vector HUD work?
Adjusting the sliders (Pan, Tilt, Zoom, Roll) updates the coordinate payload. When clicking **Compile Sequence**, these vectors are converted to command arguments for the rendering CLI (e.g. `--pan 5 --tilt -2`).

---

### 5. What license is CineStation Pro distributed under?
It is licensed under the Creative Commons **CC BY-NC-SA 4.0** license (Attribution-NonCommercial-ShareAlike 4.0 International) with copyrights held by **produktes-code**.

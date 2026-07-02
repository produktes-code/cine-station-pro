<p align="center">
  <img src="build/icon.png" width="128" height="128" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);" alt="CineStation Pro Logo" />
</p>

<h1 align="center">CineStation Pro (DE)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge" alt="Build Status" />
  <img src="https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-blue?style=for-the-badge" alt="CC BY-NC-SA 4.0 License" />
  <img src="https://img.shields.io/badge/Version-v1.0.0-teal?style=for-the-badge" alt="Version 1.0.0" />
</p>

---

## 🎯 Beschreibung
**CineStation Pro** ist eine absolute virtuelle Kinoworkstation und eine multimodale generative Videokonsole für Kameraleute, VFX-Künstler und digitale Ersteller. Sie fungiert als technische Brücke zur Übersetzung von kreativen Briefings in strukturierte Kamerakoordinaten (`Pan`, `Tilt`, `Zoom` und `Roll`).

Die Plattform ist vollständig in **7 idiomas (ES, EN, DE, UK, RU, ZH, JA)** lokalisiert, um die Zusammenarbeit internationaler Teams zu erleichtern.

---

## 🛠️ Hauptfunktionen
*   **Physikalisches Kamera-HUD:** Konfigurieren Sie parametrische Bewegungsvektoren in Echtzeit.
*   **Multi-Engine-Workflows:** Volle Unterstützung für die Modi T2V, I2V, V2V und FACE.
*   **NLP Visuelle Richtlinien:** Automatische Optimierung von Prompts durch neuronale Verarbeitung.
*   **Live-Terminal-Konsole:** Parametrisierter Puffer mit Token-Tracking und Validierung.
*   **Sicherheit & Guardrails:** Verstärkte Backend-Filter für den sicheren Betrieb in der Produktion.

---

## 📸 Responsive Benutzeroberfläche (Screenshots)
### Desktop-Ansicht (1920x1080)
![Desktop](docs/screenshots/screenshot-Desktop.png)
### Tablet-Ansicht (768x1024)
![Tablet](docs/screenshots/screenshot-Tablet.png)
### Mobil-Ansicht (390x844)
![Mobil](docs/screenshots/screenshot-Mobile.png)

---

## ⚙️ Installation & Konfiguration

### Docker-Bereitstellung (Empfohlen)
Starten Sie den gesamten Stack (Frontend, FastAPI-Backend, Redis) mit Docker Compose:
```bash
docker compose up --build
```
Die Anwendung ist unter `http://localhost:5173` erreichbar.

### Manuelle Lokale Einrichtung
1. **FastAPI-Backend:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --port 8000
   ```
2. **React/Vite-Frontend:**
   ```bash
   npm install
   npm run dev
   ```

---

## 🚀 Schnellstartanleitung
1. Konfigurieren Sie die Variablen in der `.env`-Datei basierend auf `.env.example`.
2. Starten Sie die Anwendung und wählen Sie Ihre Sprache im Menü oben rechts aus (unterstützt **7 idiomas**).
3. Importieren Sie ein Bild oder ein Video. Das System prüft die Dateigröße (max. **2 GB**) und die Signaturen.
4. Stellen Sie die Parameter ein, klicken Sie auf **Sequenz kompilieren** und kopieren Sie das JSON-Ausgabepayload.

---

## 🖥️ Technologie-Stack
*   **Frontend:** React 19, Vite 8, Tailwind CSS, Lucide Icons.
*   **Backend:** FastAPI (Python 3.11), SlowAPI, Pydantic Settings.
*   **Rendering-Warteschlange:** Celery + Redis.
*   **Desktop-Shell:** Electron-Wrapper zur Generierung nativer Installer (** .dmg / .exe **).

---

## 🛡️ Sicherheits- und Schutzprotokolle
Zur Gewährleistung der Zuverlässigkeit in der Produktion gelten folgende Regeln:
*   **Rate limiting:** Auf allen Endpunkten erzwungen (5 Anfr./Min für Renderings, 10/Min für Farbe/Audio, 30/Min allgemein).
*   **Prüfung der Magic Bytes:** Uploads werden auf Binärebene anhand von Signaturen (**Magic Bytes**) überprüft.
*   **Upload-Limit:** Strikte Beschränkung auf maximal **2 GB** pro Datei.
*   **CORS-Richtlinien:** Dynamische Überprüfung zulässiger Herkunftsadressen.

---

## 📖 Dokumentation
*   Benutzerhandbuch (PDF): **[USER_MANUAL.pdf](docs/USER_MANUAL.pdf)**
*   API-Referenz: **[API_REFERENCE.md](API_REFERENCE.md)**
*   Farbpresets-Leitfaden: **[COLOR_GRADING_GUIDE.md](COLOR_GRADING_GUIDE.md)**

---

## ⚖️ Lizenz & Credits
*   **Inhaber:** Erstellt von **produktes-code** und lizenziert unter den Bedingungen von Creative Commons **CC BY-NC-SA 4.0** (Namensnennung-Nicht kommerziell-ShareAlike 4.0 International).


⚠️ Hinweis für macOS-Benutzer: Beim ersten Öffnen der Anwendung zeigt macOS möglicherweise eine Sicherheitswarnung an. Lösung: Klicken Sie mit der rechten Maustaste auf die Anwendung und wählen Sie "Öffnen", dann klicken Sie im Dialog auf "Öffnen". Falls sie bereits blockiert wurde, gehen Sie zu Systemeinstellungen > Datenschutz & Sicherheit und klicken Sie auf "Trotzdem öffnen".


<p align="center">
  <img src="build/icon.png" width="128" height="128" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);" alt="CineStation Pro Logo" />
</p>

<h1 align="center">CineStation Pro V1.0.0</h1>

<p align="center">
  <b>Absolute virtual cinema workstation and multi-modal generative video console</b><br/>
  <i>Consola de video generativo multimodal y terminal de operaciones paramétricas</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge" alt="Build" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Status-Enterprise_Ready-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-red?style=for-the-badge" alt="License" />
</p>

🌐 **Read this in:** **🇬🇧 English** | [🇪🇸 Español](README_es.md) | [🇩🇪 Deutsch](README_de.md) | [🇷🇺 Русский](README_ru.md) | [🇯🇵 日本語](README_ja.md) | [🇺🇦 Українська](README_uk.md) | [🇨🇳 中文](README_zh.md)

---

## 🎯 The Vision (Introduction)

The generative video revolution (Sora, Runway) brought a massive problem: chaos in control. Using simple text prompts, creators lost physical and optical control of the scene, delegating crucial lighting and cinematography decisions to the engine's 'hallucinations'. CineStation Pro was born to give control back to the Director of Photography. We designed it not as an app, but as a parametric operations console. It acts as a hyper-precise translator: you input camera physics (Pan Vectors, 70s Anamorphic Optics, HMI Light), and our architecture compiles an exact neural payload. It is the definitive bridge between traditional cinema art and massive diffusion models.

> [!NOTE]
> Developed by **produktes-code** and **Jesús Ferrer (CHUS BZN)** to establish professional standards in commercial engineering.

---

## 📸 Interface / Ergonomics

![Desktop Interface](docs/screenshots/screenshot-Desktop.png)


---

## ⚙️ Parameter Masterclass (Features)

- **Physical Vector Console (Pan/Tilt/Roll)**: AI engines don't understand framing well unless you speak their mathematical language. We programmed sliders that package purely physical camera movement metrics ('Whip Pan', 'Tilt Up'). A Whip Pan generates specific motion blur adding frenzy, impossible with a generic prompt.
- **Real Analog Optics Simulator**: Modern digital aesthetics are often sterile. Integrating profiles like the 'Panavision C-Series' lens orders the AI to simulate its inherent imperfections: horizontal blue flares and oval bokeh. This gives an organic soul to the generated image.
- **Modular Lighting Architecture**: Light tells the story. Directors can choose 'Arri Skypanel' or 'Tungsten Lamp', drastically altering skin rendering and volumetric contrast, forcing the model to behave like a real film set.
- **Hybrid NLP Processing**: The free text input goes through a proprietary AI parser that grammatically structures the phrase, joining it with the physical parameters. It's transparent prompt engineering.
- **Asynchronous Backend Infrastructure (Celery/Redis)**: Why use Celery? Because video rendering would freeze any blocking interface. The React UI simply dispatches the job; asynchronous workers bear the load in the background, returning robust, crash-proof software.

---

## 🛡️ Shielding Architecture (Security)

In Retail and Enterprise deployment, a system crash is not a bug; it is capital loss. We designed a defensive armor (Shielding) emulating DevSecOps best practices:

• **Anti-Flood Engineering (Rate limiting)**: Asynchronous algorithms strangle anomalous request spikes using limitation middlewares.
• **Binary Crystallography (Magic Bytes)**: The system opens the file header and verifies the native hexadecimal sequence to certify container integrity.
• **RAM Sanity (2 GB Limit)**: We relentlessly reject any atypical weight at the upload threshold to prevent Out Of Memory attacks.

---

## 🚀 Technical Deployment (Installation)

The deployment process of this tool responds to an industry imperative: in a studio or production environment, time spent configuring dependencies is time wasted. We packaged a 'Zero-Friction' architecture compiling DSP libraries, Python binaries, and renderers directly into the application's core.

• **macOS Systems**: The `.dmg` binary guarantees absolute portability. Note: Because it lacks a paid developer certificate for Apple's Notarization Service, macOS Gatekeeper will quarantine the binary. As engineers, we know the legitimate local bypass method is 'Right-click -> Open'. It is not a flaw; it is the standard flow of high-performance open-source software.
• **Windows Systems**: The installer payload silently auto-configures the Windows PATH environment, evading conflicts with pre-existing Python installations.

---

## 📚 Documentation & Manuals

For an exhaustive technical masterclass, troubleshooting guides, and full API details, please download our official manual:

📥 **[USER_MANUAL.pdf (PDF - 7 Languages)](docs/USER_MANUAL.pdf)**


---

## ⚖️ Engineering Manifesto, Credits & License

Software conceived and articulated from the produktes-code labs in inseparable union with Engineer Jesus Ferrer Garcia (CHUS BZN).

Licensed under proprietary restrictions and strictest open source margins (CC BY-NC-SA 4.0). CORPORATE STANDARD - RETAIL READY.



⚠️ macOS Users Notice: When opening the application for the first time, macOS may show a security warning. Solution: right-click on the application and select "Open", then click "Open" in the dialog. If it was already blocked, go to System Preferences > Privacy & Security and click "Open Anyway".
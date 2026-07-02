<p align="center">
  <img src="build/icon.png" width="128" height="128" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);" alt="CineStation Pro Logo" />
</p>

<h1 align="center">CineStation Pro (ZH)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge" alt="Build Status" />
  <img src="https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-blue?style=for-the-badge" alt="CC BY-NC-SA 4.0 License" />
  <img src="https://img.shields.io/badge/Version-v1.0.0-teal?style=for-the-badge" alt="Version 1.0.0" />
</p>

---

## 🎯 描述
**CineStation Pro** 是专为电影摄影指导、VFX 艺术家和数字创作者设计的绝对虚拟电影工作站及多模态生成式视频控制台。它作为先进的技术桥梁，将创意的场景简报转化为生成式引擎所需的结构化相机运动向量（`Pan`、`Tilt`、`Zoom`、`Roll`）。

该平台完全本地化支持 **7 idiomas (ES, EN, DE, UK, RU, ZH, JA)**，使国际团队能够无缝协作。

---

## 🛠️ 主要功能
*   **物理相机 HUD:** 实时配置参数化的运动向量（水平摇移、垂直俯仰、变焦、旋转）。
*   **多引擎工作流:** 完整支持 T2V、I2V、V2V 以及 FACE 模式。
*   **NLP 视觉指令:** 通过神经网络处理自动优化提示词。
*   **交互式终端控制台:** 带有提示词 Token 跟踪与验证的参数化缓冲区。
*   **安全与防护栏:** 增强型后端安全过滤器，确保在生产环境中的安全运行。

---

## 📸 响应式布局 (屏幕截图)
### 桌面视图 (1920x1080)
![桌面](docs/screenshots/screenshot-Desktop.png)
### 平板视图 (768x1024)
![平板](docs/screenshots/screenshot-Tablet.png)
### 手机视图 (390x844)
![手机](docs/screenshots/screenshot-Mobile.png)

---

## ⚙️ 安装与配置

### Docker 部署 (推荐)
使用 Docker Compose 启动整个服务栈（前端、FastAPI 后端、Redis）：
```bash
docker compose up --build
```
应用程序将在 `http://localhost:5173` 运行。

### 本地手动安装
1. **FastAPI 后端:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --port 8000
   ```
2. **React/Vite 前端:**
   ```bash
   npm install
   npm run dev
   ```

---

## 🚀 快速上手指南
1. 根据 `.env.example` 配置 `.env` 文件中的变量。
2. 启动应用程序，并在右上角语言菜单中选择您首选的本地语言（支持 **7 idiomas**）。
3. 导入您的关键帧图像或原始视频。系统会验证文件大小（最大 **2 GB**）和二进制签名。
4. 设置相机物理参数，点击 **Compile Sequence** 编译序列，并复制输出的 JSON 负载。

---

## 🖥️ 技术栈
*   **前端:** React 19, Vite 8, Tailwind CSS, Lucide 图标。
*   **后端:** FastAPI (Python 3.11), SlowAPI, Pydantic settings。
*   **渲染队列:** Celery + Redis。
*   **桌面外壳:** Electron 封装，用于生成原生安装包 (** .dmg / .exe **)。

---

## 🛡️ 安全协议与防护栏
为确保生产环境下的可靠性，应用了以下规则：
*   **Rate limiting:** 接口请求频率限制（渲染 5次/分钟，色彩/音频 10次/分钟，常规接口 30次/分钟）。
*   **Magic Bytes 检查:** 上传的文件将在二进制级别通过签名 (**Magic Bytes**) 进行检查，以防止文件伪装。
*   **上传限制:** 服务端严格限制最大上传文件为 **2 GB**。
*   **CORS 策略:** 基于后端配置的动态跨域源检查。

---

## 📖 文档参考
*   详细用户手册 (PDF): **[USER_MANUAL.pdf](docs/USER_MANUAL.pdf)**
*   API 接口规范: **[API_REFERENCE.md](API_REFERENCE.md)**
*   色彩预设指南: **[COLOR_GRADING_GUIDE.md](COLOR_GRADING_GUIDE.md)**

---

## ⚖️ 许可与版权
*   **所有人:** 由 **produktes-code** 开发并遵循 Creative Commons **CC BY-NC-SA 4.0** 共享许可协议（署名-非商业性使用-相同方式共享 4.0 国际）。


⚠️ macOS 用户须知：首次打开应用程序时，macOS 可能会显示安全警告。解决方法：右键单击应用程序并选择"打开"，然后在对话框中单击"打开"。如果已被阻止，请前往系统设置 > 隐私与安全性，然后点击"仍然打开"。


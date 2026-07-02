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

🌐 **其他语言阅读:** [🇬🇧 English](README.md) | [🇪🇸 Español](README_es.md) | [🇩🇪 Deutsch](README_de.md) | [🇷🇺 Русский](README_ru.md) | [🇯🇵 日本語](README_ja.md) | [🇺🇦 Українська](README_uk.md) | **🇨🇳 中文**

---

## 🎯 愿景 (介绍)

生成视频革命带来了控制上的混乱。创作者失去了对场景的物理控制。CineStation Pro 的诞生是为了将控制权交还给摄影指导。它作为一个参数化操作控制台，将相机的物理特性精确地转化为神经有效载荷。

> [!NOTE]
> Developed by **produktes-code** and **Jesús Ferrer (CHUS BZN)** to establish professional standards in commercial engineering.

---

## 📸 Interface / Ergonomics

![Desktop Interface](docs/screenshots/screenshot-Desktop.png)


---

## ⚙️ 参数大师班 (功能)

- **物理矢量控制台**：控制“快速摇摄”等动作可产生特定的运动模糊，这是通用提示无法实现的。
- **光学模拟器**：模拟“Panavision C-Series”以获得蓝色光斑和椭圆形散景等有机缺陷。
- **模块化照明**：选择“Arri Skypanel”可显著改变皮肤渲染。
- **混合 NLP 处理**：透明的提示工程，构建自由文本。
- **异步后端**：通过 Celery/Redis 工作线程防止 UI 冻结。

---

## 🛡️ 屏蔽架构 (安全)

防御装甲：

• 反洪泛：限制请求峰值。
• 魔法字节：十六进制标头验证。
• RAM 限制 (2 GB)：防止 OOM 攻击。

---

## 🚀 技术部署 (安装)

零摩擦架构：

• macOS：Gatekeeper 将隔离二进制文件。工程师解决方案：“右键单击 -> 打开”。
• Windows：自动 PATH 配置。

---

## 📚 文档和手册

请下载我们的官方手册：

📥 **[USER_MANUAL.pdf (PDF - 7 Languages)](docs/USER_MANUAL.pdf)**


---

## ⚖️ 工程宣言，鸣谢与许可

由 produktes-code 和 Jesus Ferrer (CHUS BZN) 开发。CC BY-NC-SA 4.0。企业标准。



⚠️ macOS Users Notice: When opening the application for the first time, macOS may show a security warning. Solution: right-click on the application and select "Open", then click "Open" in the dialog. If it was already blocked, go to System Preferences > Privacy & Security and click "Open Anyway".
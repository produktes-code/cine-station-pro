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

🌐 **他の言語で読む:** [🇬🇧 English](README.md) | [🇪🇸 Español](README_es.md) | [🇩🇪 Deutsch](README_de.md) | [🇷🇺 Русский](README_ru.md) | **🇯🇵 日本語** | [🇺🇦 Українська](README_uk.md) | [🇨🇳 中文](README_zh.md)

---

## 🎯 ビジョン（はじめに）

生成ビデオの革命はコントロールの混乱をもたらしました。クリエイターはシーンの物理的なコントロールを失いました。CineStation Proは、撮影監督にコントロールを戻すために生まれました。これは、カメラの物理特性をニューラルペイロードに正確に変換するパラメトリック操作コンソールとして機能します。

> [!NOTE]
> Developed by **produktes-code** and **Jesús Ferrer (CHUS BZN)** to establish professional standards in commercial engineering.

---

## 📸 Interface / Ergonomics

![Desktop Interface](docs/screenshots/screenshot-Desktop.png)


---

## ⚙️ パラメーターマスタークラス（機能）

- **物理ベクトルコンソール**：「ホイップパン」などの動きを制御することで、特定のモーションブラーを生成します。
- **光学シミュレーター**：「Panavision C-Series」をシミュレートして、青いフレアや楕円形のボケなどの有機的な欠陥を取得します。
- **モジュラー照明**：「Arri Skypanel」を選択すると、肌のレンダリングが大幅に変わります。
- **ハイブリッドNLP処理**：フリーテキストを構造化する透過的なプロンプトエンジニアリング。
- **非同期バックエンド**：Celery / Redisワーカーを介してUIのフリーズを防ぎます。

---

## 🛡️ シールドアーキテクチャ（セキュリティ）

防御装甲：

• アンチフラッド：リクエストのスパイクを制限します。
• マジックバイト：16進ヘッダーの検証。
• RAM制限（2 GB）：OOM攻撃を防ぎます。

---

## 🚀 技術展開（インストール） とCI/CDインストール

絶対的な数学的精度を保証し、クロスプラットフォームの互換性を損なうことなくハイエンドのPython DSPアーキテクチャを維持するために、**GitHub Actionsを介した自動CI/CD**を採用しています。
ローカルの `.exe` パッケージングの代わりに、ソースコードはクラウド上の純粋なWindowsおよびmacOS環境でネイティブにコンパイルされます。

#### ダウンロードとインストール方法
1. このリポジトリの **[Releases](https://github.com/produktes-code/CineStation-Pro/releases)** セクションに移動します。
2. オペレーティングシステム用の最新の自動ビルドをダウンロードします：
   - `CineStation Pro Setup.exe` (Windows)
   - `CineStation Pro.dmg` (macOS)

### 🍎 macOSユーザー（Gatekeeper）
有料のApple開発者証明書がないため、Gatekeeperはバイナリを隔離します。正当なローカルバイパス方法は、**アプリを右クリック -> 開く**（ダブルクリックしない）ことです。

### 🪟 Windowsユーザー（SmartScreen）
`.exe` インストーラーを実行すると、Windows Defenderが青い警告画面を表示する場合があります。**「詳細情報」**をクリックし、**「実行」**をクリックします。

## 📚 ドキュメントとマニュアル

公式マニュアルをダウンロードしてください：

📥 **[USER_MANUAL.pdf (PDF - 7 Languages)](docs/USER_MANUAL.pdf)**


---

## ⚖️ エンジニアリングマニフェスト、クレジット、ライセンス

produktes-codeとJesus Ferrer（CHUS BZN）によって開発されました。 CC BY-NC-SA 4.0。 企業標準。



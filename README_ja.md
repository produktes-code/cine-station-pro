<p align="center">
  <img src="build/icon.png" width="128" height="128" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);" alt="CineStation Pro Logo" />
</p>

<h1 align="center">CineStation Pro (JA)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge" alt="Build Status" />
  <img src="https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-blue?style=for-the-badge" alt="CC BY-NC-SA 4.0 License" />
  <img src="https://img.shields.io/badge/Version-v1.0.0-teal?style=for-the-badge" alt="Version 1.0.0" />
</p>

---

## 🎯 概要
**CineStation Pro** は、映画監督、VFX アーティスト、デジタルクリエイター向けに設計された、究極の仮想映画ワークステーションおよびマルチモーダル生成ビデオコンソールです。クリエイティブなシーンの指示を、生成エンジン用の構造化されたカメラ移動ベクトル（`Pan`、`Tilt`、`Zoom`、`Roll`）に変換する高度な架け橋として機能します。

本プラットフォームは **7 idiomas (ES, EN, DE, UK, RU, ZH, JA)** に完全ローカライズされており、国際チームのシームレスな共同作業を支援します。

---

## 🛠️ 主な機能
*   **物理カメラ HUD:** リアルタイムにパラメータ（パン、チルト、ズーム、ロール）を構成。
*   **マルチエンジン・ワークフロー:** T2V、I2V、V2V、FACE 各モードを完全サポート。
*   **NLP 視覚指令:** ニューラルネットワーク処理によるプロンプトの自動最適化。
*   **インタラクティブ・コンソール:** トークンの追跡とプロンプト検証を備えたパラメータ化バッファ。
*   **セキュリティガードレール:** 本番環境で安全に実行するための強固なバックエンドフィルタ。

---

## 📸 レスポンシブ・レイアウト (スクリーンショット)
### デスクトップ表示 (1920x1080)
![デスクトップ](docs/screenshots/screenshot-Desktop.png)
### タブレット表示 (768x1024)
![タブレット](docs/screenshots/screenshot-Tablet.png)
### モバイル表示 (390x844)
![モバイル](docs/screenshots/screenshot-Mobile.png)

---

## ⚙️ インストールと設定

### Docker での展開 (推奨)
Docker Compose を使用して、全サービス（フロントエンド、FastAPIバックエンド、Redis）を起動します：
```bash
docker compose up --build
```
アプリケーションは `http://localhost:5173` で利用可能になります。

### 手動でのローカルセットアップ
1. **FastAPI バックエンド:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --port 8000
   ```
2. **React/Vite フロントエンド:**
   ```bash
   npm install
   npm run dev
   ```

---

## 🚀 クイックスタートガイド
1. `.env.example` に基づいて `.env` ファイルに変数を設定します。
2. アプリケーションを起動し、右上メニューから希望する言語を選択します（**7 idiomas** に対応）。
3. キーフレーム画像または元動画ファイルをインポートします。システムはファイルサイズ（最大 **2 GB**）とシグネチャを検証します。
4. カメラパラメータを調整し、**Compile Sequence** をクリックして、出力された JSON ペイロードをコピーします。

---

## 🖥️ 技術スタック
*   **フロントエンド:** React 19, Vite 8, Tailwind CSS, Lucide アイコン。
*   **バックエンド:** FastAPI (Python 3.11), SlowAPI, Pydantic settings。
*   **レンダリングキュー:** Celery + Redis。
*   **デスクトップシェル:** ネイティブインストーラー (** .dmg / .exe **) を生成する Electron ラッパー。

---

## 🛡️ セキュリティとガードレール
本番環境での信頼性を担保するため、以下のルールが適用されます：
*   **Rate limiting:** 全てのエンドポイントで制限（レンダリングは 5回/分、カラー/オーディオは 10回/分、その他は 30回/分）。
*   **Magic Bytes 検証:** 拡張子の偽装を防ぐため、アップロードはバイナリシグネチャ（**Magic Bytes**）レベルで検証されます。
*   **アップロード制限:** ファイルサイズの上限は **2 GB** に制限されています。
*   **CORS ポリシー:** バックエンド設定に基づく動的なオリジン検証。

---

## 📖 関連ドキュメント
*   ユーザーマニュアル (PDF): **[USER_MANUAL.pdf](docs/USER_MANUAL.pdf)**
*   API エンドポイント仕様: **[API_REFERENCE.md](API_REFERENCE.md)**
*   カラープリセットガイド: **[COLOR_GRADING_GUIDE.md](COLOR_GRADING_GUIDE.md)**

---

## ⚖️ ライセンスとクレジット
*   **著作権者:** **produktes-code** により作成。クリエイティブ・コモンズ 表示 - 非営利 - 継承 4.0 国際 ライセンス (**CC BY-NC-SA 4.0**) に基づいて配布されています。


⚠️ macOSユーザーへの注意：アプリケーションを初めて開くとき、macOSがセキュリティ警告を表示する場合があります。解決方法：アプリケーションを右クリックして「開く」を選択し、ダイアログで「開く」をクリックします。既にブロックされている場合は、システム設定 > プライバシーとセキュリティに移動し、「このまま開く」をクリックします。


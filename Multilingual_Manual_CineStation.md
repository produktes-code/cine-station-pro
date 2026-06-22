# Multilingual User Manual / Manual de Usuario Multilingüe
## CineStation Pro 1.0

---

## 🌐 Table of Contents / Índice de Idiomas

| 🏳️ | Idioma / Language | Página |
|-----|-------------------|--------|
| 🇪🇸 | [Español](#-español) | 1 |
| 🇬🇧 | [English](#-english) | 2 |
| 🇩🇪 | [Deutsch](#-deutsch) | 3 |
| 🇷🇺 | [Русский](#-русский) | 4 |
| 🇯🇵 | [日本語](#-日本語) | 5 |
| 🇺🇦 | [Українська](#-українська) | 6 |
| 🇨🇳 | [中文](#-中文) | 7 |

---

<div style="page-break-after: always;"></div>

# 🇪🇸 Español

## Manual de Usuario y Tutorial Extensivo: CineStation Pro 1.0

### 1. Introducción
**CineStation Pro** es una consola de desarrollo creativo y un motor de prompts cinemáticos diseñado específicamente para directores de fotografía, guionistas, artistas de VFX y cineastas que integran Inteligencia Artificial generativa en sus flujos de trabajo de preproducción.

La aplicación opera como un **puente técnico avanzado e intuitivo** (estilo DaVinci Resolve) que traduce conceptos narrativos simples en blueprints técnicos estructurados de nivel Hollywood. La arquitectura modular permite orquestar tomas detallando cámaras, ópticas, movimientos, iluminación física y emulación de película fotográfica, optimizando la salida final para modelos generativos de última generación.

### 2. Instalación y Puesta en Marcha
Si tienes la aplicación en tu escritorio de macOS, iniciarla es extremadamente sencillo:
1. Abre la carpeta `CineStation-Pro` en tu Escritorio.
2. Localiza el archivo `Iniciar_CineStation.command`.
3. *(Solo la primera vez)* Es posible que necesites darle permisos. Si es así, abre el Terminal y escribe: `chmod +x ~/Desktop/CineStation-Pro/Iniciar_CineStation.command`
4. Haz doble clic en el archivo `Iniciar_CineStation.command`.
5. Esto arrancará el servidor local y abrirá automáticamente la aplicación en tu navegador predeterminado (generalmente en `http://localhost:5173`).

### 3. Interfaz Principal: La Consola DAW
CineStation Pro presenta una interfaz de estilo DAW (Digital Audio Workstation) dividida en dos paneles principales:
- **Panel Izquierdo — Compilador de Parámetros:** Aquí introduces tu idea y configuras los parámetros técnicos.
- **Panel Derecho — Output / Render Viewer:** Aquí ves el resultado del prompt compilado y, si tienes API configurada, el vídeo renderizado por IA.

En la cabecera del programa, encontrarás un **Selector de Idioma**, que te permite cambiar la interfaz de forma nativa a 7 idiomas (Español, Inglés, Alemán, Ruso, Japonés, Ucraniano y Chino).

### 4. Configuración del Motor (Engine Config)
Antes de usar las funciones de IA, necesitas configurar tus claves API:
1. Haz clic en el botón de configuración (**Engine Config**) en la esquina superior derecha.
2. Introduce tu **API Key** del proveedor de IA que prefieras:
   - **Google Gemini 1.5**
   - **Anthropic Claude 3.5**
   - **OpenAI GPT-4o**
3. *(Opcional)* Introduce tu clave de **Replicate** si deseas utilizar el renderizado de vídeo en la nube (Tencent Hunyuan Video / Wan 2.2).
4. Guarda la configuración. Las claves se almacenan localmente en tu navegador.

### 5. Flujo de Trabajo Principal

**Paso 1 — Describe tu Toma:**
Escribe una idea conceptual en la caja de texto del panel izquierdo. Ejemplo: *"Amanecer dorado sobre un campo de trigo con una silueta en el horizonte"*.

**Paso 2 — Configura los Parámetros:**
Navega a través de las pestañas del panel izquierdo:
- **CAMERA:** Selección de cámara (IMAX, Super 35, VistaVision, ARRI Alexa 65), tipo de objetivo (desde 8mm ojo de pez hasta 400mm teleobjetivo, incluyendo lentes vintage como Helios 44-2, Cooke Anamorphic y Zeiss Super Speeds) y control de apertura (f-stop) desde f/0.95 hasta f/22.
- **LIGHTING:** Configuración de estilos de iluminación (Claroscuro, Rembrandt, Neon Noir), calidad de luz, modificadores (Softbox, Fresnel, Gobo) y fuentes lumínicas reales (Tungsteno, Skypanels, Astera Tubes).
- **ART DIR (Dirección de Arte):** Selección de climas, emulaciones de películas clásicas (Kodak Portra, CineStill 800T, Fuji 3513) y efectos físicos en set (God Rays, Haze, cáusticas).
- **OUTPUT:** Configuración del formato de salida, resolución y modelo objetivo.

**Paso 3 — Compila el Prompt:**
Tienes dos modos de compilación:
- **MANUAL COMPILE:** Construye el blueprint técnico uniendo mecánicamente todos tus parámetros seleccionados.
- **Init AI (Compilación con IA):** Envía la información al LLM seleccionado (Gemini, Claude o GPT-4o). La IA estructura una toma cinematográfica completa, enriquecida semánticamente, en inglés profesional.

**Paso 4 — Renderiza (Opcional):**
Si has configurado una API Key de Replicate:
1. Haz clic en **Send to Replicate Node**.
2. El sistema enviará tu prompt al modelo de vídeo (Wan 2.2 / Hunyuan Video).
3. El vídeo renderizado aparecerá directamente en el **Neural Render Output Viewer** del panel derecho.
4. La **Consola de Salida** muestra en tiempo real los tokens y prompts positivos/negativos generados.

### 6. Consejos Finales
- Puedes copiar el prompt compilado con un solo clic para usarlo en cualquier plataforma externa (Midjourney, Runway, Sora, etc.).
- No necesitas conocimientos profundos de fotografía: la IA y el sistema paramétrico hacen el trabajo pesado por ti.
- Experimenta con diferentes combinaciones de cámara y película para descubrir estilos visuales únicos.

---

<div style="page-break-after: always;"></div>

# 🇬🇧 English

## Extensive User Manual and Tutorial: CineStation Pro 1.0

### 1. Introduction
**CineStation Pro** is a creative development console and cinematic prompt engine specifically designed for Directors of Photography, screenwriters, VFX artists, and filmmakers who integrate generative AI into their pre-production workflows.

The application operates as an **advanced, intuitive technical bridge** (DaVinci Resolve-style) that translates simple narrative concepts into Hollywood-level structured technical blueprints. Its modular architecture allows you to orchestrate shots by detailing cameras, optics, movements, physical lighting, and photographic film emulation, optimizing the final output for state-of-the-art generative models.

### 2. Installation and Setup
If you have the application on your macOS desktop, starting it is extremely simple:
1. Open the `CineStation-Pro` folder on your Desktop.
2. Locate the `Iniciar_CineStation.command` file.
3. *(First time only)* You may need to grant permissions. Open Terminal and type: `chmod +x ~/Desktop/CineStation-Pro/Iniciar_CineStation.command`
4. Double-click the `Iniciar_CineStation.command` file.
5. This will start the local server and automatically open the application in your default browser (usually at `http://localhost:5173`).

### 3. Main Interface: The DAW Console
CineStation Pro presents a DAW-style (Digital Audio Workstation) interface divided into two main panels:
- **Left Panel — Parameter Compiler:** Here you enter your idea and configure technical parameters.
- **Right Panel — Output / Render Viewer:** Here you see the compiled prompt result and, if you have an API configured, the AI-rendered video.

In the program header, you will find a **Language Selector**, which allows you to change the interface natively into 7 languages (Spanish, English, German, Russian, Japanese, Ukrainian, and Chinese).

### 4. Engine Configuration
Before using AI features, you need to configure your API keys:
1. Click the configuration button (**Engine Config**) in the top-right corner.
2. Enter your **API Key** from your preferred AI provider:
   - **Google Gemini 1.5**
   - **Anthropic Claude 3.5**
   - **OpenAI GPT-4o**
3. *(Optional)* Enter your **Replicate** key if you wish to use cloud video rendering (Tencent Hunyuan Video / Wan 2.2).
4. Save the configuration. Keys are stored locally in your browser.

### 5. Main Workflow

**Step 1 — Describe Your Shot:**
Write a conceptual idea in the text box on the left panel. Example: *"Golden sunrise over a wheat field with a silhouette on the horizon"*.

**Step 2 — Configure Parameters:**
Navigate through the left panel tabs:
- **CAMERA:** Camera selection (IMAX, Super 35, VistaVision, ARRI Alexa 65), lens type (from 8mm fisheye to 400mm telephoto, including vintage lenses like Helios 44-2, Cooke Anamorphic, and Zeiss Super Speeds), and aperture control (f-stop) from f/0.95 to f/22.
- **LIGHTING:** Lighting style configuration (Chiaroscuro, Rembrandt, Neon Noir), light quality, modifiers (Softbox, Fresnel, Gobo), and real light sources (Tungsten, Skypanels, Astera Tubes).
- **ART DIR (Art Direction):** Weather selection, classic film emulations (Kodak Portra, CineStill 800T, Fuji 3513), and physical set effects (God Rays, Haze, caustics).
- **OUTPUT:** Output format configuration, resolution, and target model.

**Step 3 — Compile the Prompt:**
Two compilation modes:
- **MANUAL COMPILE:** Builds the technical blueprint by mechanically joining all your selected parameters.
- **Init AI (AI Compilation):** Sends the information to the selected LLM (Gemini, Claude, or GPT-4o). The AI structures a complete, semantically enriched cinematic shot in professional English.

**Step 4 — Render (Optional):**
If you have configured a Replicate API Key:
1. Click **Send to Replicate Node**.
2. The system will send your prompt to the video model (Wan 2.2 / Hunyuan Video).
3. The rendered video will appear directly in the **Neural Render Output Viewer** on the right panel.
4. The **Output Console** shows generated positive/negative tokens and prompts in real-time.

### 6. Final Tips
- You can copy the compiled prompt with a single click for use on any external platform (Midjourney, Runway, Sora, etc.).
- You don't need deep photography knowledge: the AI and parametric system do the heavy lifting for you.
- Experiment with different camera and film combinations to discover unique visual styles.

---

<div style="page-break-after: always;"></div>

# 🇩🇪 Deutsch

## Ausführliches Benutzerhandbuch: CineStation Pro 1.0

### 1. Einführung
**CineStation Pro** ist eine kreative Entwicklungskonsole und ein kinematografischer Prompt-Engine, speziell für Kameraleute, Drehbuchautoren, VFX-Künstler und Filmemacher, die generative KI in ihre Vorproduktions-Workflows integrieren.

Die Anwendung funktioniert als **fortschrittliche, intuitive technische Brücke** (im DaVinci Resolve-Stil), die einfache narrative Konzepte in Hollywood-Niveau strukturierte technische Blueprints übersetzt.

### 2. Installation und Inbetriebnahme
1. Öffnen Sie den Ordner `CineStation-Pro` auf Ihrem Schreibtisch.
2. Suchen Sie die Datei `Iniciar_CineStation.command`.
3. *(Nur beim ersten Mal)* Berechtigungen erteilen: `chmod +x ~/Desktop/CineStation-Pro/Iniciar_CineStation.command`
4. Doppelklicken Sie auf `Iniciar_CineStation.command`.
5. Der lokale Server startet und öffnet die Anwendung automatisch im Browser (normalerweise `http://localhost:5173`).

### 3. Hauptoberfläche: Die DAW-Konsole
CineStation Pro hat eine DAW-artige Oberfläche (Digital Audio Workstation) mit zwei Hauptpanels:
- **Linkes Panel — Parameter-Compiler:** Hier geben Sie Ihre Idee ein und konfigurieren technische Parameter.
- **Rechtes Panel — Output / Render Viewer:** Hier sehen Sie das kompilierte Prompt-Ergebnis und gerenderte Videos.

In der Kopfzeile finden Sie einen **Sprachauswähler** für 7 Sprachen.

### 4. Engine-Konfiguration
1. Klicken Sie auf **Engine Config** oben rechts.
2. Geben Sie Ihre **API-Schlüssel** ein (Gemini 1.5, Claude 3.5 oder GPT-4o).
3. *(Optional)* Geben Sie Ihren **Replicate**-Schlüssel für Cloud-Video-Rendering ein.

### 5. Hauptarbeitsablauf

**Schritt 1 — Beschreiben Sie Ihre Einstellung:**
Schreiben Sie eine konzeptuelle Idee in das Textfeld. Beispiel: *"Goldener Sonnenaufgang über einem Weizenfeld mit einer Silhouette am Horizont"*.

**Schritt 2 — Parameter konfigurieren:**
- **CAMERA:** Kameraauswahl (IMAX, Super 35, ARRI Alexa 65), Objektivtyp (von 8mm Fisheye bis 400mm Tele, einschließlich Vintage-Objektive wie Helios 44-2, Cooke Anamorphic), Blendensteuerung (f/0.95 bis f/22).
- **LIGHTING:** Beleuchtungsstile (Chiaroscuro, Rembrandt, Neon Noir), Lichtqualität, Modifikatoren (Softbox, Fresnel, Gobo) und reale Lichtquellen (Tungsten, Skypanels, Astera Tubes).
- **ART DIR:** Wetter, klassische Filmemulationen (Kodak Portra, CineStill 800T, Fuji 3513) und Set-Effekte (God Rays, Haze, Kaustiken).
- **OUTPUT:** Ausgabeformat, Auflösung und Zielmodell.

**Schritt 3 — Prompt kompilieren:**
- **MANUAL COMPILE:** Mechanisches Zusammenfügen aller Parameter.
- **Init AI:** KI-gestützte, semantisch angereicherte Kompilierung.

**Schritt 4 — Rendern (Optional):**
Mit Replicate-API-Schlüssel: Klicken Sie auf **Send to Replicate Node**, um den Prompt an Wan 2.2 / Hunyuan Video zu senden und die Vorschau im **Neural Render Output Viewer** zu sehen.

### 6. Tipps
Kopieren Sie kompilierte Prompts mit einem Klick. Experimentieren Sie mit verschiedenen Kamera-Film-Kombinationen. Tiefes Fotografiewissen ist nicht erforderlich.

---

<div style="page-break-after: always;"></div>

# 🇷🇺 Русский

## Подробное руководство пользователя: CineStation Pro 1.0

### 1. Введение
**CineStation Pro** — это консоль креативной разработки и движок кинематографических промптов, созданный специально для операторов-постановщиков, сценаристов, VFX-художников и кинематографистов, интегрирующих генеративный ИИ в свои рабочие процессы препродакшна.

Приложение работает как **продвинутый, интуитивный технический мост** (в стиле DaVinci Resolve), переводящий простые нарративные концепции в структурированные технические блюпринты голливудского уровня.

### 2. Установка и запуск
1. Откройте папку `CineStation-Pro` на рабочем столе macOS.
2. Найдите файл `Iniciar_CineStation.command`.
3. *(Только в первый раз)* Предоставьте разрешения: `chmod +x ~/Desktop/CineStation-Pro/Iniciar_CineStation.command`
4. Дважды щёлкните `Iniciar_CineStation.command`.
5. Будет запущен локальный сервер, приложение откроется в браузере (`http://localhost:5173`).

### 3. Главный интерфейс: Консоль DAW
CineStation Pro представляет интерфейс в стиле DAW (Digital Audio Workstation) с двумя основными панелями:
- **Левая панель — Компилятор параметров:** Здесь вы вводите идею и настраиваете технические параметры.
- **Правая панель — Output / Render Viewer:** Здесь вы видите скомпилированный промпт и отрендеренное видео (при наличии API).

В заголовке программы — **Селектор языка** для переключения интерфейса на 7 языков.

### 4. Конфигурация движка
1. Нажмите на **Engine Config** в правом верхнем углу.
2. Введите **API-ключ** вашего поставщика ИИ (Gemini 1.5, Claude 3.5 или GPT-4o).
3. *(Опционально)* Введите ключ **Replicate** для облачного видео-рендеринга.

### 5. Основной рабочий процесс

**Шаг 1 — Опишите свой кадр:**
Введите концептуальную идею в текстовое поле. Пример: *«Золотой рассвет над пшеничным полем с силуэтом на горизонте»*.

**Шаг 2 — Настройте параметры:**
- **CAMERA:** Выбор камеры (IMAX, Super 35, ARRI Alexa 65), тип объектива (от 8mm рыбий глаз до 400mm телеобъектив, включая винтажные: Helios 44-2, Cooke Anamorphic, Zeiss Super Speeds), управление диафрагмой (f/0.95 — f/22).
- **LIGHTING:** Стили освещения (Кьяроскуро, Рембрандт, Неон Нуар), качество света, модификаторы (Софтбокс, Френель, Гобо), реальные источники света (Вольфрам, Skypanels, Astera Tubes).
- **ART DIR:** Погода, эмуляции классических плёнок (Kodak Portra, CineStill 800T, Fuji 3513), физические эффекты на площадке (God Rays, Haze, каустики).
- **OUTPUT:** Формат вывода, разрешение и целевая модель.

**Шаг 3 — Компиляция промпта:**
- **MANUAL COMPILE:** Механическое объединение всех параметров.
- **Init AI:** ИИ-компиляция с семантическим обогащением.

**Шаг 4 — Рендеринг (Опционально):**
С API-ключом Replicate нажмите **Send to Replicate Node**, чтобы отправить промпт в модель видео и просмотреть результат в **Neural Render Output Viewer**.

### 6. Советы
Копируйте скомпилированные промпты одним кликом. Экспериментируйте с комбинациями камер и плёнок. Глубокие знания фотографии не требуются — ИИ и параметрическая система сделают всё за вас.

---

<div style="page-break-after: always;"></div>

# 🇯🇵 日本語

## 詳細ユーザーマニュアル：CineStation Pro 1.0

### 1. はじめに
**CineStation Pro** は、撮影監督、脚本家、VFXアーティスト、映画制作者向けに特別に設計されたクリエイティブ開発コンソールおよび映画的プロンプトエンジンです。プリプロダクションワークフローに生成AIを統合する映像制作者のために作られています。

このアプリケーションは、シンプルなナラティブコンセプトをハリウッドレベルの構造化された技術ブループリントに変換する**高度で直感的な技術ブリッジ**（DaVinci Resolveスタイル）として動作します。

### 2. インストールと起動
1. デスクトップの `CineStation-Pro` フォルダを開きます。
2. `Iniciar_CineStation.command` ファイルを見つけます。
3. *(初回のみ)* 権限を付与：`chmod +x ~/Desktop/CineStation-Pro/Iniciar_CineStation.command`
4. `Iniciar_CineStation.command` をダブルクリックします。
5. ローカルサーバーが起動し、ブラウザ（通常 `http://localhost:5173`）でアプリケーションが開きます。

### 3. メインインターフェース：DAWコンソール
CineStation ProはDAWスタイル（デジタルオーディオワークステーション）のインターフェースを採用し、2つのメインパネルに分かれています：
- **左パネル — パラメーターコンパイラ：** アイデアを入力し、技術パラメーターを設定します。
- **右パネル — Output / Render Viewer：** コンパイルされたプロンプト結果と、AIレンダリングされたビデオを表示します。

ヘッダーの**言語セレクター**で7言語に切り替え可能です。

### 4. エンジン設定
1. 右上の **Engine Config** ボタンをクリックします。
2. お好みのAIプロバイダーの **APIキー**（Gemini 1.5、Claude 3.5、GPT-4o）を入力します。
3. *(オプション)* クラウドビデオレンダリング用の **Replicate** キーを入力します。

### 5. メインワークフロー

**ステップ1 — ショットの説明：**
左パネルのテキストボックスにコンセプトアイデアを入力します。例：*「麦畑の上の黄金の日の出、地平線のシルエット」*。

**ステップ2 — パラメーター設定：**
- **CAMERA：** カメラ選択（IMAX、Super 35、ARRI Alexa 65）、レンズタイプ（8mm魚眼〜400mm望遠、Helios 44-2、Cooke Anamorphicなどのビンテージレンズを含む）、絞り制御（f/0.95〜f/22）。
- **LIGHTING：** 照明スタイル（キアロスクーロ、レンブラント、ネオンノワール）、ライトモディファイア（ソフトボックス、フレネル、ゴボ）、実際の光源（タングステン、Skypanels、Astera Tubes）。
- **ART DIR：** 天候、クラシックフィルムエミュレーション（Kodak Portra、CineStill 800T、Fuji 3513）、セット内物理効果。
- **OUTPUT：** 出力フォーマット、解像度、ターゲットモデル。

**ステップ3 — プロンプトのコンパイル：**
- **MANUAL COMPILE：** 全パラメーターの機械的結合。
- **Init AI：** AIによるセマンティックに強化されたコンパイル。

**ステップ4 — レンダリング（オプション）：**
Replicate APIキーがある場合、**Send to Replicate Node** をクリックして **Neural Render Output Viewer** でプレビューします。

### 6. ヒント
コンパイルされたプロンプトはワンクリックでコピーして、Midjourney、Runway、Soraなどの外部プラットフォームで使用できます。写真の深い知識は不要です。さまざまなカメラとフィルムの組み合わせを試して、ユニークなビジュアルスタイルを発見してください。

---

<div style="page-break-after: always;"></div>

# 🇺🇦 Українська

## Докладний посібник користувача: CineStation Pro 1.0

### 1. Вступ
**CineStation Pro** — це консоль креативної розробки та кінематографічний промпт-двигун, спеціально розроблений для операторів-постановників, сценаристів, VFX-художників та кінематографістів, які інтегрують генеративний ШІ у свої робочі процеси препродакшну.

Додаток працює як **просунутий, інтуїтивний технічний міст** (у стилі DaVinci Resolve), що перетворює прості наративні концепції на структуровані технічні блюпринти голлівудського рівня.

### 2. Встановлення та запуск
1. Відкрийте папку `CineStation-Pro` на робочому столі macOS.
2. Знайдіть файл `Iniciar_CineStation.command`.
3. *(Лише перший раз)* Надайте дозволи: `chmod +x ~/Desktop/CineStation-Pro/Iniciar_CineStation.command`
4. Двічі клацніть `Iniciar_CineStation.command`.
5. Запуститься локальний сервер, і додаток автоматично відкриється в браузері (`http://localhost:5173`).

### 3. Головний інтерфейс: Консоль DAW
CineStation Pro має інтерфейс у стилі DAW з двома основними панелями:
- **Ліва панель — Компілятор параметрів:** Тут ви вводите ідею та налаштовуєте технічні параметри.
- **Права панель — Output / Render Viewer:** Тут ви бачите результат скомпільованого промпта та відрендерене відео.

У заголовку програми — **Селектор мови** для перемикання інтерфейсу на 7 мов.

### 4. Конфігурація двигуна
1. Натисніть **Engine Config** у правому верхньому куті.
2. Введіть **API-ключ** (Gemini 1.5, Claude 3.5 або GPT-4o).
3. *(Опціонально)* Введіть ключ **Replicate** для хмарного відеорендерингу.

### 5. Основний робочий процес

**Крок 1 — Опишіть ваш кадр:**
Введіть концептуальну ідею. Приклад: *«Золотий світанок над пшеничним полем із силуетом на горизонті»*.

**Крок 2 — Налаштуйте параметри:**
- **CAMERA:** Вибір камери (IMAX, Super 35, ARRI Alexa 65), тип об'єктива (від 8mm «рибʼяче око» до 400mm телеоб'єктив, включаючи вінтажні: Helios 44-2, Cooke Anamorphic), керування діафрагмою (f/0.95 — f/22).
- **LIGHTING:** Стилі освітлення (К'яроскуро, Рембрандт, Неон Нуар), модифікатори (Софтбокс, Френель, Гобо), реальні джерела світла.
- **ART DIR:** Погода, емуляції класичних плівок (Kodak Portra, CineStill 800T, Fuji 3513), фізичні ефекти.
- **OUTPUT:** Формат виводу, роздільна здатність та цільова модель.

**Крок 3 — Компіляція промпта:**
- **MANUAL COMPILE:** Механічне об'єднання всіх параметрів.
- **Init AI:** ШІ-компіляція з семантичним збагаченням.

**Крок 4 — Рендеринг (Опціонально):**
З ключем Replicate API натисніть **Send to Replicate Node** для відправки промпта та перегляду результату в **Neural Render Output Viewer**.

### 6. Поради
Копіюйте скомпільовані промпти одним кліком. Експериментуйте з різними комбінаціями камер та плівок. Глибокі знання фотографії не потрібні — ШІ та параметрична система зроблять усе за вас.

---

<div style="page-break-after: always;"></div>

# 🇨🇳 中文

## 详细用户手册：CineStation Pro 1.0

### 1. 简介
**CineStation Pro** 是一个创意开发控制台和电影级提示词引擎，专为摄影指导、编剧、VFX艺术家和将生成式AI集成到前期制作工作流程中的电影制作人设计。

该应用程序作为**先进、直观的技术桥梁**（DaVinci Resolve风格）运行，将简单的叙事概念转化为好莱坞级别的结构化技术蓝图。

### 2. 安装与启动
1. 打开桌面上的 `CineStation-Pro` 文件夹。
2. 找到 `Iniciar_CineStation.command` 文件。
3. *(仅限首次)* 授予权限：`chmod +x ~/Desktop/CineStation-Pro/Iniciar_CineStation.command`
4. 双击 `Iniciar_CineStation.command`。
5. 将启动本地服务器，并在浏览器（通常为 `http://localhost:5173`）中自动打开应用程序。

### 3. 主界面：DAW控制台
CineStation Pro采用DAW风格（数字音频工作站）界面，分为两个主面板：
- **左面板 — 参数编译器：** 在此输入您的想法并配置技术参数。
- **右面板 — Output / Render Viewer：** 在此查看编译的提示词结果和AI渲染的视频。

顶部有**语言选择器**，可切换为7种语言。

### 4. 引擎配置
1. 点击右上角的 **Engine Config** 按钮。
2. 输入您首选AI提供商的 **API密钥**（Gemini 1.5、Claude 3.5 或 GPT-4o）。
3. *(可选)* 输入 **Replicate** 密钥以使用云视频渲染。

### 5. 主要工作流程

**第1步 — 描述您的镜头：**
在左面板文本框中写下概念想法。例如：*"麦田上的金色日出，地平线上有一个剪影"*。

**第2步 — 配置参数：**
- **CAMERA：** 摄像机选择（IMAX、Super 35、ARRI Alexa 65），镜头类型（从8mm鱼眼到400mm长焦，包括Helios 44-2、Cooke Anamorphic等复古镜头），光圈控制（f/0.95 至 f/22）。
- **LIGHTING：** 灯光风格（明暗对比法、伦勃朗、霓虹黑色电影），灯光修饰器（柔光箱、菲涅尔、Gobo），真实光源（钨灯、Skypanels、Astera Tubes）。
- **ART DIR：** 天气、经典胶片模拟（Kodak Portra、CineStill 800T、Fuji 3513），物理布景效果（God Rays、Haze、焦散）。
- **OUTPUT：** 输出格式、分辨率和目标模型。

**第3步 — 编译提示词：**
- **MANUAL COMPILE：** 机械式组合所有参数。
- **Init AI：** AI语义增强编译。

**第4步 — 渲染（可选）：**
如果有Replicate API密钥，点击 **Send to Replicate Node** 将提示词发送到视频模型，并在 **Neural Render Output Viewer** 中预览。

### 6. 提示
一键复制编译后的提示词，可在Midjourney、Runway、Sora等任何外部平台使用。无需深厚的摄影知识 — AI和参数化系统会为您完成繁重的工作。尝试不同的摄像机和胶片组合，发现独特的视觉风格。

---

*© CineStation Pro 1.0 — Jesús Ferrer García (CHUS BZN) — All rights reserved / Todos los derechos reservados*

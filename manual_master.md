<p align="center">
  <img src="build/icon.png" width="150" height="150" alt="Logo" />
</p>

# CineStation Pro V1.0.0 - Technical Manual
**Engineered by Chus BZN / Versión Final 1.0.0**

---

## 🌐 Table of Contents / Índice de Idiomas

| 🏳️ | Idioma / Language |
|-----|-------------------|
| 🏳️ | [Español](#-español) |\n| 🏳️ | [English](#-english) |\n| 🏳️ | [Deutsch](#-deutsch) |\n| 🏳️ | [Русский](#-русский) |\n| 🏳️ | [日本語](#-日本語) |\n| 🏳️ | [Українська](#-українська) |\n| 🏳️ | [中文](#-中文) |\n
---

<div style="page-break-after: always;"></div>
\n# 🏳️ Español\n\n
### Manual de Usuario y Guía Técnica: CineStation Pro V1.0.0

#### 1. Introducción y Propósito del Software
**CineStation Pro V1.0.0** es el "Estudio Virtual Absoluto", una consola paramétrica diseñada para directores de cine digital e ingenieros de prompts de vídeo. Permite modelar vectores de movimiento físico de cámara tridimensionales (al estilo de los motores de movimiento físico de Higgsfield AI) y estructurar pipelines de generación de vídeo multi-motor reuniéndolo todo en una consola compiladora en vivo.

#### 2. Instalación y Requisitos del Sistema
*   **Requisitos de Hardware:** macOS 12 (Monterey) o superior. 8 GB RAM mínimo, 10 GB de espacio libre en SSD.
*   **Instalación:**
    1. Localice el archivo `CineStation Pro-1.0.0.dmg`.
    2. Haga doble clic para montar la imagen de disco.
    3. Arrastre el icono de **CineStation Pro** hacia la carpeta **Aplicaciones**.
    4. Abra la aplicación desde su Launchpad o carpeta de Aplicaciones.

#### 3. Módulos y Características
*   **Consola de Vectores Físicos (Cámara 3D):** Permite simular el movimiento real de una grúa o estabilizador de cámara definiendo valores numéricos en cuatro ejes cardinales: Pan (horizontal), Tilt (vertical), Zoom (acercamiento) y Roll (rotación).
*   **Flujo Multi-Motor:** Dividido en 4 motores que son T2V (Texto a Video), I2V (Imagen a Video con fuerza de movimiento), V2V (Estilización de Video a Anime/3D) y FACE (Reemplazo de rostro fotorealista con audio).
*   **Consola Compiladora en Vivo:** Traduce la configuración del usuario a la sintaxis exacta del prompt de sistema de los motores de vídeo avanzados (como Runway Gen-3 o Kling AI). Muestra un conteo dinámico de tokens para no exceder los límites de los modelos.

#### 4. Guía de Parámetros y Valores
*   **Pan (X):** Movimiento horizontal ajustable en grados de -180 a +180.
*   **Tilt (Y):** Movimiento vertical de la cámara de -90 a +90 grados.
*   **Motion Bucket (I2V):** Modula la intensidad de animación de la imagen fija. Valores altos generan movimientos drásticos y dinámicos.
*   **CFG Scale (T2V):** Nivel de guía del prompt. Valores altos (9.0 - 15.0) obligan al modelo a seguir el texto de forma estricta.

#### 5. Flujo de Trabajo Didáctico
1.  **Paso 1:** Seleccione el motor principal (T2V, I2V, etc.) en las pestañas del panel izquierdo.
2.  **Paso 2:** Configure los vectores de cámara usando los sliders en la consola central (Pan, Tilt y Zoom).
3.  **Paso 3:** Escriba el prompt de escena en la caja de texto.
4.  **Paso 4:** Verifique el prompt resultante y el conteo de tokens en el compilador.
5.  **Paso 5:** Haga clic en **Generar Escena** para previsualizar el renderizado simulado.

#### 6. Resolución de Problemas y Soporte
*   **Exceso de Tokens:** Si la consola de compilación se pone roja, simplifique su prompt o remueva palabras clave secundarias hasta quedar por debajo de los 77 tokens.
*   **Imágenes Deformadas (I2V):** Si la animación de imagen se deforma, disminuya el valor de `Motion Bucket` a la mitad (ej. de 80 a 40).
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ English\n\n
### User Manual and Technical Guide: CineStation Pro V1.0.0

#### 1. Introduction and Core Concepts
**CineStation Pro V1.0.0** is the "Absolute Virtual Studio," a parametric console designed for digital film directors and video prompt engineers. It allows users to model three-dimensional physical camera movement vectors (similar to Higgsfield AI physical motion engines) and structure multi-engine generation pipelines (Text-to-Video, Image-to-Video, Video-to-Video, and Face Swap) in a live compiling console.

#### 2. Installation and System Requirements
*   **Hardware Requirements:** macOS 12 (Monterey) or higher. Minimum 8 GB RAM, 10 GB free space on SSD.
*   **Installation:**
    1. Locate the `CineStation Pro-1.0.0.dmg` file.
    2. Double-click to mount the disk image.
    3. Drag the **CineStation Pro** icon to the **Applications** folder.
    4. Open the application from your Launchpad or Applications folder.

#### 3. Modules and Features
*   **Physical Vectors Console (3D Camera):** Simulates real camera crane or gimbal movements by defining numerical values across four cardinal axes: Pan (horizontal), Tilt (vertical), Zoom (approach), and Roll (lens rotation).
*   **Multi-Engine Flow:** Divided into 4 virtual engine control tabs: T2V (Text-to-Video), I2V (Image-to-Video), V2V (Video-to-Video style transfer), and FACE (Face Swap / Lip-Sync).
*   **Live Compiling Console:** Acts like a code editor, translating the user's settings into the exact system prompt syntax of advanced video models (such as Runway Gen-3 or Kling AI). It features a dynamic token counter.

#### 4. Parameters and Values Guide
*   **Pan (X):** Horizontal camera movement (left to right, adjustable from -180 to +180 degrees).
*   **Tilt (Y):** Vertical camera movement (tilt up or down, adjustable from -90 to +90 degrees).
*   **Motion Bucket (I2V):** Adjusts the intensity of the static image animation. Higher values generate faster, more dynamic camera movements.
*   **CFG Scale (T2V):** Prompt guidance scale. Higher values (9.0 - 15.0) force the model to follow the prompt strictly.

#### 5. Step-by-Step Production Workflow
1.  **Step 1:** Select the primary engine tab (T2V, I2V, etc.) on the left panel.
2.  **Step 2:** Configure the camera vectors using the central sliders (Pan, Tilt, and Zoom).
3.  **Step 3:** Input your scene text prompt.
4.  **Step 4:** Check the output prompt and token count in the compiler console.
5.  **Step 5:** Click **Generate Scene** to simulate the rendering of your cinematic shot.

#### 6. Troubleshooting and Support
*   **Token Overflow:** If the compiler console turns red, simplify the prompt or remove secondary adjectives to stay below the 77 token limit.
*   **Image Distortions (I2V):** If the generated animation stretches or morphs unpredictably, reduce the `Motion Bucket` value by half (e.g., from 80 down to 40).
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ Deutsch\n\n
### Benutzerhandbuch und Technische Anleitung: CineStation Pro V1.0.0

#### 1. Einführung und Kernkonzepte
**CineStation Pro V1.0.0** ist das "Absolute Virtuelle Studio", eine parametrische Konsole für digitale Regisseure und Video-Prompt-Entwickler. Sie simuliert 3D-Kamerabewegungsvektoren (Pan, Tilt, Zoom, Roll) und vereint T2V, I2V, V2V und Face-Swap-Engines.

#### 2. Installation und Systemanforderungen
*   **Hardwareanforderungen:** macOS 12 (Monterey) oder höher. Mindestens 8 GB RAM, 10 GB freier Speicherplatz auf SSD.
*   **Installation:**
    1. Suchen Sie die Datei `CineStation Pro-1.0.0.dmg`.
    2. Doppelklicken Sie, um das Image zu aktivieren.
    3. Ziehen Sie das **CineStation Pro**-Symbol in den Ordner **Programme**.
    4. Öffnen Sie die App über Ihr Launchpad oder den Programme-Ordner.

#### 3. Module und Eigenschaften
*   **Kamerabewegungs-HUD:** Ermöglicht das Einstellen von Pan, Tilt, Zoom und Roll für eine präzise Pfadsteuerung der virtuellen Gräne.
*   **Multi-Engine-Workflows:** Tabs für T2V (Text-zu-Video), I2V (Bild-zu-Video), V2V (Video-Stilisierung) und FACE (Lippensynchronisation).
*   **Live-Compiler-Konsole:** Übersetzt visuelle Parameter in systemkonforme Textprompts für Video-KIs wie Runway Gen-3 und zählt verbrauchte Token live.

#### 4. Parameter- und Wertanleitung
*   **Pan (X):** Horizontale Bewegung einstellbar von -180 bis +180 Grad.
*   **Tilt (Y):** Vertikale Neigung einstellbar von -90 bis +90 Grad.
*   **Motion Bucket (I2V):** Kontrolliert die Animationsstärke. Höhere Werte führen zu intensiverer Bewegung.
*   **CFG Scale (T2V):** Texttreue. Höhere Werte bedeuten striktere Einhaltung des Prompts.

#### 5. Didaktischer Arbeitsablauf
1.  **Schritt 1:** Wählen Sie die Haupt-Engine auf dem linken Panel aus.
2.  **Schritt 2:** Stellen Sie die Kameravektoren über die Schieberegler ein.
3.  **Schritt 3:** Geben Sie Ihre Szenenbeschreibung in das Textfeld ein.
4.  **Schritt 4:** Prüfen Sie den Ausgabeprompt und die Token-Anzahl im Compiler.
5.  **Schritt 5:** Klicken Sie auf **Generate Scene**, um die Vorschau zu rendern.

#### 6. Fehlerbehebung und Support
*   **Token-Überlauf:** Wenn die Konsole rot leuchtet, kürzen Sie den Prompt auf unter 77 Token.
*   **Bildverzerrung (I2V):** Reduzieren Sie bei Verzerrungen den `Motion Bucket`-Wert um die Hälfte.
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ Русский\n\n
### Руководство пользователя и техническое руководство: CineStation Pro V1.0.0

#### 1. Введение и основные концепции
**CineStation Pro V1.0.0** — это «Абсолютная виртуальная студия», параметрическая консоль для режиссеров цифрового кино и инженеров видеопромптов. Симулирует трехмерные векторы движения камеры (Pan, Tilt, Zoom, Roll) и объединяет генерацию T2V, I2V, V2V и Face Swap.

#### 2. Установка и системные требования
*   **Требования к оборудованию:** macOS 12 (Monterey) или выше. Минимум 8 ГБ ОЗУ, 10 ГБ свободного места на SSD.
*   **Установка:**
    1. Найдите файл `CineStation Pro-1.0.0.dmg`.
    2. Дважды щелкните, чтобы смонтировать образ диска.
    3. Перетащите иконку **CineStation Pro** в папку **Программы**.
    4. Запустите приложение из Launchpad или папки Программы.

#### 3. Модули и возможности
*   **Консоль физических векторов (3D-камера):** Симулирует движение крана или стабилизатора по осям Pan (панорамирование), Tilt (наклон), Zoom (приближение) и Roll (наклон горизонта).
*   **Вкладки генерации:** Включают T2V (генерация по тексту), I2V (анимация картинки), V2V (стилизация готового видео) и FACE (замена лица).
*   **Живой компилятор промптов:** Форматирует физические параметры в системную строку для видеогенераторов (Runway, Kling) с динамическим подсчетом токенов.

#### 4. Руководство по параметрам и значениям
*   **Pan (X):** Горизонтальный поворот в градусах от -180 до +180.
*   **Tilt (Y):** Вертикальный наклон в диапазоне от -90 до +90 градусов.
*   **Motion Bucket (I2V):** Мощность анимации статичного кадра. Высокие значения дают резкие ракурсы.
*   **CFG Scale (T2V):** Соответствие тексту. Высокие значения заставляют ИИ строго придерживаться промпта.

#### 5. Пошаговый рабочий процесс
1.  **Шаг 1:** Выберите основной движок (T2V, I2V и т.д.) на левой панели.
2.  **Шаг 2:** Настройте векторы движения камеры (Pan, Tilt, Zoom) в центре.
3.  **Шаг 3:** Введите текстовое описание сцены.
4.  **Шаг 4:** Проверьте скомпилированную строку и счетчик токенов.
5.  **Шаг 5:** Нажмите **Generate Scene** для симуляции рендеринга.

#### 6. Устранение неполадок и поддержка
*   **Превышение лимита токенов:** Если консоль горит красным, упростите промпт, чтобы он уложился в 77 токенов.
*   **Артефакты анимации (I2V):** Если картинка плывет, уменьшите значение `Motion Bucket` в два раза.
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ 日本語\n\n
### ユーザーマニュアルと技術ガイド：CineStation Pro V1.0.0

#### 1. はじめにとコアコンセプト
**CineStation Pro V1.0.0** は、「絶対的バーチャルスタジオ」であり、デジタル映画監督やビデオプロンプトエンジニア向けに設計されたパラメータコンソールです。3次元カメラモーションベクトル（Pan、Tilt、Zoom、Roll）をモデル化し、マルチエンジン生成フロー（T2V、I2V、V2V、FACE）を一元化します。

#### 2. インストール方法とシステム要件
*   **ハードウェア要件:** macOS 12 (Monterey) 以降。最低 8 GB RAM、10 GB 以上の SSD 空き容量。
*   **インストール方法:**
    1. `CineStation Pro-1.0.0.dmg` ファイルを見つけます。
    2. ダブルクリックしてディスクイメージをマウントします。
    3. **CineStation Pro** アイコンを **アプリケーション** フォルダにドラッグします。
    4. Launchpad またはアプリケーションフォルダからアプリを開きます。

#### 3. モジュールと機能
*   **物理ベクトルコンソール（3Dカメラ）:** クレーンやジンバルの動きを4つの軸（Pan、Tilt、Zoom、Roll）の数値としてHUD上でシミュレートします。
*   **マルチエンジンフロー:** T2V（テキストから動画）、I2V（画像から動画）、V2V（動画スタイル変換）、FACE（顔交換）の4つのタブ構成。
*   **ライブコンパイラコンソール:** スライダー値をRunway Gen-3やKling AI等のエンジン用システムプロンプトにリアルタイム変換します。トークンカウンター付き。

#### 4. パラメータと設定値ガイド
*   **Pan (X):** 水平移動（首振り角度、-180度〜+180度）。
*   **Tilt (Y):** 垂直移動（上下傾き角度、-90度〜+90度）。
*   **Motion Bucket (I2V):** 静止画のアニメーション強度。値を高く設定すると、カメラワークが大きくなります。
*   **CFG Scale (T2V):** プロンプトの追従性。高い値（9.0 - 15.0）はテキスト指示に忠実に従います。

#### 5. 制作ワークフロー（ステップ・バイ・ステップ）
1.  **ステップ 1:** 左側パネルのタブからプライマリエンジン（T2V、I2Vなど）を選択します。
2.  **ステップ 2:** 中央スライダーでPan、Tilt、Zoomなどのカメラベクトルを設定します。
3.  **ステップ 3:** テキストボックスにシーンプロンプトを入力します。
4.  **ステップ 4:** コンパイラ画面でプロンプトテキストとトークン数を確認します。
5.  **ステップ 5:** **Generate Scene** をクリックし、動画生成のシミュレーションを実行します。

#### 6. トラブルシューティングとサポート
*   **トークン超過:** コンソールが赤くなった場合は、形容詞を削除するなどして77トークン制限以下に調整してください。
*   **画像の歪み (I2V):** アニメーション時に画像が不自然に歪む場合は、`Motion Bucket` の値を半分程度に下げてください。
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ Українська\n\n
### Посібник користувача та технічний посібник: CineStation Pro V1.0.0

#### 1. Вступ та основні концепції
**CineStation Pro V1.0.0** — це «Абсолютна віртуальна студія», параметрична консоль для цифрових режисерів та інженерів відеопромптів. Дозволяє моделювати тривимірні вектори руху камери (Pan, Tilt, Zoom, Roll) та структурувати мульти-двигунні пайплайни генерації.

#### 2. Встановлення та системні вимоги
*   **Вимоги до заліза:** macOS 12 (Monterey) або вище. Мінімум 8 ГБ ОЗУ, 10 ГБ вільного місця на SSD.
*   **Встановлення:**
    1. Знайдіть файл `CineStation Pro-1.0.0.dmg`.
    2. Двічі клацніть для монтування диска.
    3. Перетягніть іконку **CineStation Pro** до папки **Програми**.
    4. Запустіть програму з Launchpad або папки Програми.

#### 3. Модулі та характеристики
*   **Фізичні вектори (3D-камера):** Симулює рух крана або стабілізатора камери за осями Pan (горизонталь), Tilt (вертикаль), Zoom (наближення) та Roll (обертання лінзи).
*   **Вкладки генерації:** T2V (генерація за текстом), I2V (анімація картинки), V2V (стилізація відео в Аніме/3D) та FACE (заміна обличчя).
*   **Компилятор та лічильник токенів:** Перекладає фізичні параметри у текстовий промпт для моделей Runway або Kling з динамічним підрахунком токенів.

#### 4. Гід по параметрах та значеннях
*   **Pan (X):** Горизонтальне панорамування (-180° до +180°).
*   **Tilt (Y):** Вертикальний нахил (-90° до +90°).
*   **Motion Bucket (I2V):** Контролює силу анімації статичного кадру. Чим вище значення, тим динамічніший рух.
*   **CFG Scale (T2V):** Текстова відповідність. Високі значення змушують модель суворіше слідувати тексту.

#### 5. Покроковий робочий процес
1.  **Крок 1:** Виберіть основний двигун (T2V, I2V тощо) на панелі ліворуч.
2.  **Крок 2:** Налаштуйте вектори камери за допомогою повзунків (Pan, Tilt, Zoom).
3.  **Крок 3:** Введіть текстовий промпт сцени.
4.  **Крок 4:** Перевірте вихідний промпт та кількість токенів у компіляторі.
5.  **Крок 5:** Натисніть **Generate Scene** для симуляції рендерингу.

#### 6. Усунення несправностей та підтримка
*   **Переповнення токенів:** Якщо панель червоніє, спростіть промпт до розміру менше 77 токенів.
*   **Деформація зображення (I2V):** Якщо анімація сильно спотворюється, зменшіть параметр `Motion Bucket` вдвічі.
\n\n<div style='page-break-after: always;'></div>\n\n# 🏳️ 中文\n\n
### 用户手册与技术指南：CineStation Pro V1.0.0

#### 1. 简介与核心概念
**CineStation Pro V1.0.0** 是“绝对虚拟演播室”，专为数字电影导演和视频提示词工程师设计的参数化控制台。能够模拟三维物理相机运动矢量（类似于 Higgsfield AI 等物理运动引擎），并将 T2V、I2V、V2V 和 Face Swap 等多引擎合成整合到一个实时编译控制台中。

#### 2. 安装与系统要求
*   **硬件要求:** macOS 12 (Monterey) 或更高版本。最低 8 GB RAM，固态硬盘（SSD）上至少 10 GB 可用空间。
*   **安装步骤:**
    1. 找到 `CineStation Pro-1.0.0.dmg` 文件。
    2. 双击挂载磁盘映像。
    3. 将 **CineStation Pro** 图标拖动到 **应用程序**（Applications）文件夹中。
    4. 从 Launchpad 或应用程序文件夹打开该程序。

#### 3. 功能模块与特性
*   **物理相机运动矢量 (3D相机):** 模拟镜头三维运动。支持水平摇镜 (Pan X, -180° 至 +180°)、垂直俯仰 (Tilt Y, -90° 至 +90°)、焦距缩放 (Zoom Z) 以及纵向翻滚 (Roll Rot-Z)。
*   **多算法模块:** 细分为 T2V (文本生视频)、I2V (图片生视频与运动强度调节)、V2V (视频风格转换) 和 FACE (高精度人脸替换与唇形同步)。
*   **实时编译器控制台:** 实时将调节的 3D 相机参数合成为适用于 Runway 或 Kling 等引擎的标准系统提示词。

#### 4. 参数与值设置指南
*   **Pan (水平运动):** 水平角度摇镜，设置范围为 -180° 至 +180°。
*   **Tilt (垂直运动):** 镜头纵向仰俯角度，范围为 -90° 至 +90°。
*   **Motion Bucket (I2V):** 图片动画运动强度。值越高，画面镜头感及形变幅度越大。
*   **CFG Scale (T2V):** 提示词文本指导性权重。高数值下，视频渲染将极度契合文本词。

#### 5. 电影级视频生产工作流
1.  **第一步:** 选择左侧引擎选择卡中的主引擎（如 T2V 或 I2V）。
2.  **第二步:** 在中央操纵栏配置 3D 相机矢量（Pan、Tilt 和 Zoom）。
3.  **第三步:** 在提示词文本框中撰写场景描述。
4.  **第四步:** 观察实时编译器中合成的系统提示词和 Token 计数器。
5.  **第五步:** 点击 **Generate Scene** 运行平滑视频帧的仿真渲染测试。

#### 6. 故障排除与技术支持
*   **提示词溢出 (Token Limit):** 如果编译器提示框变为红色，请精简形容词或描述，直到 Token 降回 77 以下。
*   **画面撕裂或崩溃 (I2V):** 如果生成的短片背景或物体发生物理扭曲，请将 `Motion Bucket` 减半使用（例如从 80 降至 40）。
\n\n<div style='page-break-after: always;'></div>\n\n*© All rights reserved / Todos los derechos reservados — Jesús Ferrer García (CHUS BZN) — 2026*\n
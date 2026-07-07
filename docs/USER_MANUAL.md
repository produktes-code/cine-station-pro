# CineStation Pro - Manual de Usuario / User Manual

## Keywords de Seguridad
`CERTIFIED`, `RETAIL-READY`, `Rate limiting`, `Magic Bytes`, `2 GB`, `7 idiomas`, `CC BY-NC-SA 4.0`

## 🇪🇸 Español (ES)

### 1. La Visión (Introducción)
La revolución del video generativo (Sora, Runway) trajo consigo un problema masivo: el caos en el control. Al usar prompts de texto simple, los creadores perdían el control físico y óptico de la escena, delegando decisiones cruciales de iluminación y cinematografía a las 'alucinaciones' del motor. CineStation Pro nace para devolverle el control al Director de Fotografía. Lo hemos diseñado no como una app, sino como una consola de operaciones paramétrica. Actúa como un traductor hiper-preciso: tú introduces la física de la cámara (Vectores de Pan, Ópticas anamórficas de los 70, Luz HMI), y nuestra arquitectura compila un payload neuronal exacto. Es el puente definitivo entre el arte del cine tradicional y los modelos de difusión masivos.

### 2. Despliegue Técnico e Instalación CI/CD

Para garantizar una precisión matemática absoluta y preservar nuestra arquitectura DSP de Python de alto nivel sin comprometer la compatibilidad multiplataforma, ahora empleamos **CI/CD Automatizado vía GitHub Actions**. En lugar de empaquetar `.exe` de forma local, nuestro código fuente se compila nativamente en entornos puros de Windows y macOS en la nube.

### 3. Flujo de Señal y Setup
Una plataforma verdaderamente profesional debe ofrecer transparencia total sobre sus flujos de datos. La consola de 'Ajustes' no es decorativa; es el panel de ruteo principal.

• **Ruteo de Rutas I/O Absolutas**: En producción, un renderizado pesado en la unidad C: o el disco SSD del OS puede asfixiar el paginado de memoria del sistema. La interfaz permite mapear directorios absolutos hacia matrices RAID o unidades NVMe dedicadas de caché de manera determinista.
• **Inyección de Tokens LLM (API Keys)**: Sabemos que manipular tokens de autorización en texto plano es una brecha de seguridad inadmisible. El panel encripta tu Key y lo inyecta dinámicamente en las variables de entorno `.env` en memoria, garantizando un sandbox seguro para tu facturación en la nube.

### 4. Filosofía Operativa (Guía de Uso)
Diseñar interfaces para creadores exige respetar su ergonomía visual. No usamos colores brillantes que fatigan los bastones oculares durante jornadas nocturnas. El principio de 'Glassmorphism' junto al Dark-Mode puro (RGB: 15, 15, 15) maximiza la legibilidad del contraste y concentra la visión donde importa.

• **Lienzo Principal (El Workspace)**: El punto neural del operador. Arrastrar y soltar. Sin menús ocultos de 4 niveles de profundidad. Deslizadores directos y paramétricos.
• **Terminal de Ejecución HUD**: Un profesional no opera a ciegas. Un log en vivo expone los callbacks asíncronos y las trazas de error, devolviendo el control intelectual de la máquina al usuario.
• **La Naturaleza Asíncrona**: No hay bloqueos. El hilo principal (Main Thread) renderiza a 60fps inquebrantables mientras los workers de Python operan en el abismo del background consumiendo núcleos de CPU.

### 5. Masterclass de Parámetros (Funcionalidades)
- **Consola de Vectores Físicos (Pan/Tilt/Roll)**: Los motores de IA no entienden bien de encuadres si no hablas su idioma matemático. Hemos programado deslizadores que empaquetan métricas de movimientos de cámara puramente físicos ('Whip Pan', 'Tilt Up'). ¿Por qué? Porque un barrido rápido (Whip Pan) genera un motion blur específico que añade frenetismo y urgencia a la escena, algo imposible de lograr con un prompt genérico.
- **Simulador de Ópticas Analógicas Reales**: La estética digital moderna suele ser estéril y excesivamente nítida. Al integrar perfiles como la lente 'Panavision C-Series', le ordenamos a la IA que simule no solo el cristal cilíndrico, sino sus imperfecciones inherentes: los flares azules horizontales y el bokeh ovalado. Esto le da alma orgánica a la imagen generada.
- **Arquitectura Modular de Iluminación**: La luz narra la historia. En lugar de pedir "un lugar oscuro", el director puede elegir un 'Arri Skypanel' o 'Tungsten Lamp'. Esto altera drásticamente el renderizado de la piel y el contraste volumétrico, utilizando términos de Grip & Gaffer que obligan al modelo a comportarse como un set de rodaje real.
- **Procesamiento PNL Híbrido**: Sabemos que los creadores piensan en imágenes, no en código. Por eso, el input de texto libre pasa por un parser de Inteligencia Artificial propio que estructura gramaticalmente la frase, uniéndola a los parámetros físicos antes de enviarla. Es ingeniería de prompt transparente para el usuario.
- **Infraestructura Backend Asíncrona (Celery/Redis)**: ¿Para qué usar Celery en una app de video? Porque el renderizado de video IA o la transcodificación FFmpeg congelaría cualquier interfaz bloqueante. Hemos diseñado una arquitectura backend donde la UI de React simplemente despacha el trabajo; los workers asíncronos sufren la carga en segundo plano, devolviendo un software robusto y fluido que jamás se colapsa en producción.

### 6. Integración Multimodal Global
Tratar la internacionalización mediante simples JSON de traducción plana es un insulto al profesional global. Hemos codificado un paradigma Multimodal Estructural. Esto implica soporte Unicode del 100% y recarga en caliente (Hot-Reloading) de las capas léxicas completas en los 7 idiomas (ES, EN, DE, UK, RU, ZH, JA). Porque la precisión de la ingeniería y el respeto al operador no entienden de barreras idiomáticas.

### 7. Arquitectura de Blindaje (Seguridad)
En el despliegue Retail y Enterprise, una caída de sistema no es un bug, es pérdida de capital. Hemos diseñado una coraza defensiva (Shielding) que emula las mejores prácticas de DevSecOps:

• **Ingeniería Anti-Flood (Rate limiting)**: Los algoritmos asíncronos estrangulan cualquier pico anómalo de peticiones mediante middlewares de limitación, evadiendo colapsos de Thread Pool.
• **Cristalografía Binaria (Magic Bytes)**: Validar un '.mp3' en el nombre es trivial para inyectar un payload malicioso. El sistema abre el encabezado del archivo y verifica la secuencia hexadecimal nativa para certificar la integridad del contenedor.
• **Sanidad de RAM (Limitador 2 GB)**: Los ataques OOM (Out Of Memory) destruyen servidores. Rechazamos implacablemente en el umbral de subida cualquier peso atípico.

### 8. Debug Log (FAQ)
P: macOS Gatekeeper informa que la aplicación está 'dañada' o no puede abrirse.
R: Este es un flag de seguridad estricto temporal de Apple. Como ingeniero, sabes que debes aprobar el binario usando 'Clic derecho -> Abrir'. Confirmamos la absoluta integridad de la compilación local.

P: Interbloqueo infinito al importar o generar payload pesado.
R: Dos causas de ingeniería probables: A) El motor rebotó la carga por el límite de protección RAM (>2GB). B) La firma binaria (Magic Bytes) del archivo estaba corrupta.

P: Discrepancias de latencia en la conexión de red (API / LLM).
R: Los algoritmos core son ofuscados y calculados en la CPU/GPU local. Únicamente las inferencias LLM masivas transitan por el socket WAN. Revisa tu router si los pings son altos.

### 9. Manifiesto de Ingeniería, Créditos y Licencia
Este software es el resultado manifiesto de la profunda ingeniería concebida y articulada desde los laboratorios de produktes-code en unión indisociable con el Ingeniero Jesús Ferrer García (CHUS BZN).

Nos negamos a ofrecer cajas negras simplificadas. Entregamos consolas paramétricas absolutas. Licenciado bajo restricciones de propiedad intelectual y los más estrictos márgenes open source (CC BY-NC-SA 4.0). ESTÁNDAR CORPORATIVO - RETAIL READY. GRADO INGENIERÍA CERTIFICADO.

## 🇬🇧 English (EN)

### 1. The Vision (Introduction)
The generative video revolution (Sora, Runway) brought a massive problem: chaos in control. Using simple text prompts, creators lost physical and optical control of the scene, delegating crucial lighting and cinematography decisions to the engine's 'hallucinations'. CineStation Pro was born to give control back to the Director of Photography. We designed it not as an app, but as a parametric operations console. It acts as a hyper-precise translator: you input camera physics (Pan Vectors, 70s Anamorphic Optics, HMI Light), and our architecture compiles an exact neural payload. It is the definitive bridge between traditional cinema art and massive diffusion models.

### 2. Technical Deployment & CI/CD Installation

To guarantee absolute mathematical accuracy and preserve our high-end Python DSP architecture without compromising cross-platform compatibility, we now employ **Automated CI/CD via GitHub Actions**. Instead of packaging `.exe` locally, our source code is compiled natively in pure Windows and macOS cloud environments.

### 3. Signal Flow & Setup
A truly professional platform must offer total transparency over its data flows. The 'Settings' console is not decorative; it is the main routing panel.

• **Absolute I/O Routing**: In production, heavy rendering on the OS SSD can choke system memory paging. The interface allows deterministic mapping of absolute directories to RAID arrays or dedicated NVMe cache drives.
• **LLM Tokens Injection**: Handling authorization tokens in plain text is an unacceptable security breach. The panel encrypts your Key and dynamically injects it into the in-memory `.env` variables, guaranteeing a secure sandbox.

### 4. Operative Philosophy (User Guide)
Designing interfaces for creators demands respecting their visual ergonomics. We do not use bright colors that fatigue eye rods during night shifts. The principle of 'Glassmorphism' along with pure Dark-Mode (RGB: 15, 15, 15) maximizes contrast readability and focuses vision where it matters.

• **Main Canvas (Workspace)**: The neural point of the operator. Drag and drop. No 4-level deep hidden menus. Direct and parametric sliders.
• **HUD Execution Terminal**: A professional does not operate blindly. A live log exposes asynchronous callbacks and error traces, returning intellectual control to the user.
• **Asynchronous Nature**: No blockages. The Main Thread renders at an unbreakable 60fps while background Python workers operate in the abyss consuming CPU cores.

### 5. Parameter Masterclass (Features)
- **Physical Vector Console (Pan/Tilt/Roll)**: AI engines don't understand framing well unless you speak their mathematical language. We programmed sliders that package purely physical camera movement metrics ('Whip Pan', 'Tilt Up'). A Whip Pan generates specific motion blur adding frenzy, impossible with a generic prompt.
- **Real Analog Optics Simulator**: Modern digital aesthetics are often sterile. Integrating profiles like the 'Panavision C-Series' lens orders the AI to simulate its inherent imperfections: horizontal blue flares and oval bokeh. This gives an organic soul to the generated image.
- **Modular Lighting Architecture**: Light tells the story. Directors can choose 'Arri Skypanel' or 'Tungsten Lamp', drastically altering skin rendering and volumetric contrast, forcing the model to behave like a real film set.
- **Hybrid NLP Processing**: The free text input goes through a proprietary AI parser that grammatically structures the phrase, joining it with the physical parameters. It's transparent prompt engineering.
- **Asynchronous Backend Infrastructure (Celery/Redis)**: Why use Celery? Because video rendering would freeze any blocking interface. The React UI simply dispatches the job; asynchronous workers bear the load in the background, returning robust, crash-proof software.

### 6. Global Multimodal Integration
Treating internationalization through simple flat translation JSONs is an insult to the global professional. We encoded a Structural Multimodal paradigm. This implies 100% Unicode support and Hot-Reloading of complete lexical layers in 7 languages (ES, EN, DE, UK, RU, ZH, JA).

### 7. Shielding Architecture (Security)
In Retail and Enterprise deployment, a system crash is not a bug; it is capital loss. We designed a defensive armor (Shielding) emulating DevSecOps best practices:

• **Anti-Flood Engineering (Rate limiting)**: Asynchronous algorithms strangle anomalous request spikes using limitation middlewares.
• **Binary Crystallography (Magic Bytes)**: The system opens the file header and verifies the native hexadecimal sequence to certify container integrity.
• **RAM Sanity (2 GB Limit)**: We relentlessly reject any atypical weight at the upload threshold to prevent Out Of Memory attacks.

### 8. Debug Log (FAQ)
Q: macOS Gatekeeper reports the application is 'damaged' or cannot be opened.
A: This is a strict temporary Apple security flag. As an engineer, you know you must approve the binary using 'Right-click -> Open'. We confirm the absolute integrity of the local compilation.

Q: Infinite deadlock when importing or generating heavy payload.
A: Two probable engineering causes: A) Engine bounced the load due to RAM protection limit (>2GB). B) The file's binary signature (Magic Bytes) was corrupt.

### 9. Engineering Manifesto, Credits & License
Software conceived and articulated from the produktes-code labs in inseparable union with Engineer Jesus Ferrer Garcia (CHUS BZN).

Licensed under proprietary restrictions and strictest open source margins (CC BY-NC-SA 4.0). CORPORATE STANDARD - RETAIL READY.

## 🇩🇪 Deutsch (DE)

### 1. Die Vision (Einführung)
Die Revolution der generativen Videos brachte ein Problem: Kontrollverlust. Schöpfer verloren die physische und optische Kontrolle über die Szene. CineStation Pro wurde entwickelt, um dem Kameramann die Kontrolle zurückzugeben. Es fungiert als parametrische Operationskonsole und hyperpräziser Übersetzer von Kamera-Physik in neuronale Payloads.

### 2. Technische Bereitstellung
Zeit für Abhängigkeiten ist in der Produktion verschwendet. 'Zero-Friction'-Architektur:

• macOS: Gatekeeper wird die Binärdatei unter Quarantäne stellen (fehlendes Bezahlzertifikat). Ingenieurslösung: 'Rechtsklick -> Öffnen'. Standard bei Open Source.
• Windows: Automatische PATH-Konfiguration.

### 3. Signalfluss & Setup
Professionelle Transparenz:

• I/O Routing: Leiten Sie Renderings auf dedizierte NVMe-Laufwerke um, um OS-Drosselung zu vermeiden.
• LLM Tokens: Sichere, verschlüsselte Injektion in speicherresidente `.env`-Variablen.

### 4. Operative Philosophie
Ergonomie für lange Nächte: Reiner Dark-Mode (RGB: 15, 15, 15) und Glassmorphismus.

• Hauptleinwand: Keine versteckten Menüs. Parametrische Schieberegler.
• HUD-Terminal: Live-Protokoll für intellektuelle Kontrolle.
• Asynchron: 60fps UI, während Python-Worker die CPU-Kerne auslasten.

### 5. Parameter Masterclass
- **Physische Vektor-Konsole**: Schieberegler für Bewegungen wie 'Whip Pan' erzeugen spezifische Bewegungsunschärfen, die mit generischen Prompts unmöglich sind.
- **Optik-Simulator**: Emuliert Objektive wie die 'Panavision C-Series' für organische Unvollkommenheiten wie blaue Flares und ovales Bokeh.
- **Modulare Beleuchtung**: Die Auswahl von 'Arri Skypanel' verändert das Haut-Rendering drastisch und zwingt das Modell, sich wie ein echtes Filmset zu verhalten.
- **Hybride NLP-Verarbeitung**: Transparentes Prompt-Engineering, das freien Text mit physischen Parametern strukturiert.
- **Asynchrones Backend**: Verhindert das Einfrieren der UI durch Auslagerung schwerer Renderings an Celery/Redis-Worker.

### 6. Multimodale Integration
Strukturelle Multimodalität. 100% Unicode, Hot-Reloading in 7 Sprachen.

### 7. Abschirmarchitektur
Systemabstürze sind Kapitalverlust. Shielding:

• Anti-Flood: Middlewares blockieren Spitzen.
• Magic Bytes: Hexadezimale Überprüfung der Header-Integrität.
• RAM-Sanity (2 GB Limit): Schutz vor OOM-Attacken.

### 8. Debug-Protokoll (FAQ)
F: macOS blockiert.
A: Rechtsklick -> Öffnen.

F: Unendlicher Deadlock.
A: 2GB-Limit überschritten oder Magic Bytes fehlerhaft.

### 9. Engineering Manifesto & Credits
Entwickelt von produktes-code und Jesus Ferrer (CHUS BZN). CC BY-NC-SA 4.0. CORPORATE STANDARD.

## 🇺🇦 Українська (UK)

### 1. Бачення
Революція генеративного відео принесла проблему: хаос у контролі. Творці втратили фізичний контроль над сценою. CineStation Pro була створена, щоб повернути контроль оператору. Вона діє як консоль параметричних операцій та точний перекладач фізики камери в нейронні корисні навантаження.

### 2. Технічне розгортання
Архітектура 'Zero-Friction':

• macOS: Gatekeeper заблокує файл. Рішення: 'Правий клік -> Відкрити'.
• Windows: Автоматична конфігурація PATH.

### 3. Потік сигналів
Прозорість даних:

• I/O Routing: Маршрутизація на NVMe.
• LLM Tokens: Безпечне шифрування ключів API.

### 4. Оперативна філософія
Ергономіка: Темний режим (RGB: 15, 15, 15).

• Робоча область: Параметричні повзунки.
• HUD Термінал: Журнал у реальному часі.
• Асинхронність: UI не блокується.

### 5. Майстер-клас параметрів
- **Консоль фізичних векторів**: Повзунки для рухів, як 'Whip Pan', створюють специфічне розмиття руху.
- **Симулятор оптики**: Емулює об'єктиви 'Panavision C-Series' для органічних недоліків, таких як сині відблиски.
- **Модульне освітлення**: Вибір 'Arri Skypanel' кардинально змінює рендеринг шкіри.
- **Гібридна обробка NLP**: Прозора оптимізація підказок, що структурує вільний текст.
- **Асинхронний бекенд**: Запобігає зависанню інтерфейсу за допомогою воркерів Celery/Redis.

### 6. Мультимодальна інтеграція
100% підтримка Unicode, Hot-Reloading для 7 мов.

### 7. Архітектура екранування
Екранування:

• Anti-Flood: Блокування сплесків запитів.
• Magic Bytes: Гексадецимальна перевірка файлів.
• 2 GB Limit: Захист оперативної пам'яті.

### 8. Журнал налагодження (FAQ)
З: macOS блокує.
В: Правий клік -> Відкрити.

З: Зависання під час імпорту.
В: Перевищено ліміт 2ГБ або пошкоджені Magic Bytes.

### 9. Інженерний маніфест
Розроблено produktes-code та Jesus Ferrer (CHUS BZN). CC BY-NC-SA 4.0. CORPORATE STANDARD.

## 🇷🇺 Русский (RU)

### 1. Видение
Революция генеративного видео принесла проблему: хаос в контроле. Творцы потеряли физический контроль над сценой. CineStation Pro была создана, чтобы вернуть контроль оператору. Она действует как консоль параметрических операций и точный переводчик физики камеры в нейронные полезные нагрузки.

### 2. Техническое развертывание
Архитектура 'Zero-Friction':

• macOS: Gatekeeper заблокирует файл. Решение: 'Правый клик -> Открыть'.
• Windows: Автоматическая конфигурация PATH.

### 3. Поток сигналов
Прозрачность данных:

• I/O Routing: Маршрутизация на NVMe.
• LLM Tokens: Безопасное шифрование ключей API.

### 4. Оперативная философия
Эргономика: Темный режим (RGB: 15, 15, 15).

• Рабочая область: Параметрические ползунки.
• HUD Терминал: Журнал в реальном времени.
• Асинхронность: UI не блокируется.

### 5. Мастер-класс параметров
- **Консоль физических векторов**: Ползунки для движений, как 'Whip Pan', создают специфическое размытие движения.
- **Симулятор оптики**: Эмулирует объективы 'Panavision C-Series' для органических недостатков, таких как синие блики.
- **Модульное освещение**: Выбор 'Arri Skypanel' кардинально меняет рендеринг кожи.
- **Гибридная обработка NLP**: Прозрачная оптимизация подсказок, структурирующая свободный текст.
- **Асинхронный бекенд**: Предотвращает зависание интерфейса с помощью воркеров Celery/Redis.

### 6. Мультимодальная интеграция
100% поддержка Unicode, Hot-Reloading для 7 языков.

### 7. Архитектура экранирования
Экранирование:

• Anti-Flood: Блокировка всплесков запросов.
• Magic Bytes: Гексадецимальная проверка файлов.
• 2 GB Limit: Защита оперативной памяти.

### 8. Журнал отладки (FAQ)
В: macOS блокирует.
О: Правый клик -> Открыть.

В: Зависание при импорте.
О: Превышен лимит 2ГБ или повреждены Magic Bytes.

### 9. Инженерный манифест
Разработано produktes-code и Jesus Ferrer (CHUS BZN). CC BY-NC-SA 4.0. CORPORATE STANDARD.

## 🇨🇳 中文 (ZH)

### 1. 愿景 (介绍)
生成视频革命带来了控制上的混乱。创作者失去了对场景的物理控制。CineStation Pro 的诞生是为了将控制权交还给摄影指导。它作为一个参数化操作控制台，将相机的物理特性精确地转化为神经有效载荷。

### 2. 技术部署 (安装) 与 CI/CD 安装

为了保证绝对的数学精度并保留我们的高端 Python DSP 架构，同时不影响跨平台兼容性，我们现在采用 **基于 GitHub Actions 的自动化 CI/CD**。

### 3. 信号流与设置
专业透明度：

• I/O 路由：映射到专用 NVMe 以避免操作系统节流。
• LLM 令牌：安全注入到内存变量中。

### 4. 操作理念 (用户指南)
纯暗模式 (RGB: 15, 15, 15)：

• 主画布：直接的参数化滑块。
• HUD 终端：知识控制的实时日志。
• 异步：后台处理时维持 60fps 的 UI。

### 5. 参数大师班 (功能)
- **物理矢量控制台**：控制“快速摇摄”等动作可产生特定的运动模糊，这是通用提示无法实现的。
- **光学模拟器**：模拟“Panavision C-Series”以获得蓝色光斑和椭圆形散景等有机缺陷。
- **模块化照明**：选择“Arri Skypanel”可显著改变皮肤渲染。
- **混合 NLP 处理**：透明的提示工程，构建自由文本。
- **异步后端**：通过 Celery/Redis 工作线程防止 UI 冻结。

### 6. 全球多模态整合
结构化多模态。100% Unicode 支持，7 种语言的热重载。

### 7. 屏蔽架构 (安全)
防御装甲：

• 反洪泛：限制请求峰值。
• 魔法字节：十六进制标头验证。
• RAM 限制 (2 GB)：防止 OOM 攻击。

### 8. 调试日志 (FAQ)
问：macOS 阻止运行。
答：右键单击 -> 打开。

问：无限死锁。
答：超出 2GB 限制或魔法字节损坏。

### 9. 工程宣言，鸣谢与许可
由 produktes-code 和 Jesus Ferrer (CHUS BZN) 开发。CC BY-NC-SA 4.0。企业标准。

## 🇯🇵 日本語 (JA)

### 1. ビジョン（はじめに）
生成ビデオの革命はコントロールの混乱をもたらしました。クリエイターはシーンの物理的なコントロールを失いました。CineStation Proは、撮影監督にコントロールを戻すために生まれました。これは、カメラの物理特性をニューラルペイロードに正確に変換するパラメトリック操作コンソールとして機能します。

### 2. 技術展開（インストール） とCI/CDインストール

絶対的な数学的精度を保証し、クロスプラットフォームの互換性を損なうことなくハイエンドのPython DSPアーキテクチャを維持するために、**GitHub Actionsを介した自動CI/CD**を採用しています。

### 3. 信号の流れと設定
専門的な透明性：

• I/O ルーティング：OSのスロットリングを回避するために専用のNVMeにマッピングします。
• LLMトークン：メモリ内変数への安全な注入。

### 4. 操作哲学（ユーザーガイド）
純粋なダークモード（RGB：15、15、15）：

• メインキャンバス：直接的なパラメトリックスライダー。
• HUDターミナル：知的制御のためのリアルタイムログ。
• 非同期：バックグラウンドで処理しながら60fpsのUIを維持します。

### 5. パラメーターマスタークラス（機能）
- **物理ベクトルコンソール**：「ホイップパン」などの動きを制御することで、特定のモーションブラーを生成します。
- **光学シミュレーター**：「Panavision C-Series」をシミュレートして、青いフレアや楕円形のボケなどの有機的な欠陥を取得します。
- **モジュラー照明**：「Arri Skypanel」を選択すると、肌のレンダリングが大幅に変わります。
- **ハイブリッドNLP処理**：フリーテキストを構造化する透過的なプロンプトエンジニアリング。
- **非同期バックエンド**：Celery / Redisワーカーを介してUIのフリーズを防ぎます。

### 6. グローバルマルチモーダル統合
構造化されたマルチモーダル。 100％のUnicodeサポート、7言語のホットリロード。

### 7. シールドアーキテクチャ（セキュリティ）
防御装甲：

• アンチフラッド：リクエストのスパイクを制限します。
• マジックバイト：16進ヘッダーの検証。
• RAM制限（2 GB）：OOM攻撃を防ぎます。

### 8. デバッグログ（FAQ）
Q：macOSがブロックします。
A：右クリック->開く。

Q：無限のデッドロック。
A：2GBの制限を超えたか、マジックバイトが破損しています。

### 9. エンジニアリングマニフェスト、クレジット、ライセンス
produktes-codeとJesus Ferrer（CHUS BZN）によって開発されました。 CC BY-NC-SA 4.0。 企業標準。


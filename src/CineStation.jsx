import { useState, useEffect, useRef } from "react";
import * as Lib from "./data/cinemaLibrary";
import { OPTION_TRANSLATIONS } from "./data/translationsOptions";

const translateVal = (val, lang) => {
  if (!val) return val;
  const langTable = OPTION_TRANSLATIONS[lang];
  if (langTable && langTable[val]) {
    return langTable[val];
  }
  return val;
};

const getSystemPrompt = (lang) => {
  const langName = TRANSLATIONS[lang]?.name || "Español";
  return `Eres un guionista y director de fotografía de nivel Hollywood experto en ingeniería de prompts para modelos de IA generativa (Wan 2.2, LTX-2, Midjourney v6).
El usuario te dará una idea muy básica coloquial y, opcionalmente, algunas preferencias técnicas (como un director específico o un estilo de luz). 

Tu trabajo es comportarte como un "Arma de Creatividad":
1. Si el usuario elige un Director (ej. Wes Anderson o Tarkovsky), TODO el prompt (planos, colores, lentes) debe adaptarse automáticamente a la psicología y estilo visual de ese director.
2. Si el usuario no elige nada, inventa tú la mejor dirección artística posible para esa escena.
3. El prompt final DEBE incluir los parámetros técnicos de Salida (Format, Resolution, Framerate).
4. Transforma la idea básica en una obra maestra cinematográfica mediante un prompt técnico inmensamente rico.

RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO. SIN TEXTO EXTRA.

Estructura del JSON:
{
  "titulo": "Título evocador del proyecto",
  "tagline": "Esencia visual (1 línea)",
  "modeloRecomendado": "Wan 2.2 T2V o Midjourney v6",
  "escena": {
      "descripcionVisual": "Descripción detallada de la acción (en el idioma del usuario: ${langName})",
      "promptCinematografico": "MUST BE IN ENGLISH. The perfect cinematic prompt. Structure: [Shot Type]: [Subject + Action] in a [Setting], [Lighting & Mood], [Technical/Lens Specs], [Style/Color Grade], [Resolution/Aspect Ratio]. Use highly professional cinematography terms.",
      "promptNegativo": "bad quality, blurry, distorted, watermark, text overlay, ugly, deformed, artifacts, overexposed, underexposed, amateur"
  },
  "configuracion": {
      "shot": "El tipo de plano creativo",
      "lens": "Lente recomendada",
      "director": "El director que inspiró este estilo"
  }
}`;
};

const TRANSLATIONS = {
  es: {
    name: "Español",
    flag: "🇪🇸",
    engine_config: "CONFIG MOTOR",
    core_engine_config: "Configuración del Motor Core",
    llm_brain: "1. CEREBRO LLM (TEXTO)",
    render_node: "2. NODO DE RENDER (VÍDEO)",
    replicate_key_required: "Requiere Token de API de Replicate para Renderizado Cloud.",
    cancel: "CANCELAR",
    apply: "APLICAR",
    action_brief: "DESCRIPCIÓN DE LA ACCIÓN",
    placeholder_brief: "Escribe la descripción de tu escena...",
    random_seed: "SEMILLA ALEATORIA (OFFLINE)",
    manual_compile: "COMPILACIÓN MANUAL",
    compiling: "COMPILANDO...",
    thinking: "PENSANDO...",
    video_cloud_render: "RENDER DE VÍDEO EN LA NUBE",
    send_to_replicate: "ENVIAR AL NODO DE REPLICATE",
    rendering: "RENDEREANDO...",
    replicate_key_warning: "* Requiere Clave API de Replicate en Ajustes.",
    camera: "CÁMARA",
    lighting: "ILUMINACIÓN",
    art_dir: "DIR. ARTE",
    output: "SALIDA",
    shot_scale: "Escala de Plano",
    angle: "Ángulo",
    movement: "Movimiento",
    sensor: "Sensor / Formato",
    lens: "Distancia Focal",
    vintage_lens: "Lente Vintage",
    aperture: "Apertura",
    light_style: "Estilo de Iluminación",
    light_quality: "Calidad de Luz",
    light_source: "Fuente Práctica",
    modifier: "Modificador",
    weather: "Clima",
    atmosphere: "Efecto de Atmósfera",
    director: "Sesgo de Director",
    film_stock: "Emulación de Película",
    aesthetic: "Estética",
    target_model: "Modelo de Destino",
    resolution: "Resolución",
    aspect_ratio: "Relación de Aspecto",
    framerate: "Tasa de Fotogramas",
    output_console: "CONSOLA DE SALIDA",
    waiting_input: "ESPERANDO ENTRADA...",
    booting_engine: "INICIANDO MOTOR DE RENDER...",
    render_failed: "RENDER FALLIDO: ",
    engine_status: "ESTADO DEL MOTOR: ",
    engine_running: "MOTOR EN EJECUCIÓN... (Suele tardar 2-3 min)",
    rendering_node: "RENDEREANDO NODO...",
    target_model_lbl: "MODELO DE DESTINO:",
    lens_pkg: "PAQUETE DE LENTES:",
    pos_prompt: "PROMPT_POS",
    neg_prompt: "PROMPT_NEG",
    status_online: "ESTADO: ONLINE",
    powered_by: "DESARROLLADO POR CHUSBZN",
    version: "VERSIÓN 1.0",
    copy: "COPIAR",
    copied: "COPIADO",
    auto: "Auto"
  },
  en: {
    name: "English",
    flag: "🇬🇧",
    engine_config: "ENGINE CONFIG",
    core_engine_config: "Core Engine Config",
    llm_brain: "1. LLM BRAIN (TEXT)",
    render_node: "2. RENDER NODE (VIDEO)",
    replicate_key_required: "Requires Replicate API Token for Cloud Rendering.",
    cancel: "CANCEL",
    apply: "APPLY",
    action_brief: "ACTION BRIEF",
    placeholder_brief: "Type your scene description...",
    random_seed: "RANDOM SEED (OFFLINE)",
    manual_compile: "MANUAL COMPILE",
    compiling: "COMPILING...",
    thinking: "THINKING...",
    video_cloud_render: "VIDEO CLOUD RENDER",
    send_to_replicate: "SEND TO REPLICATE NODE",
    rendering: "RENDERING...",
    replicate_key_warning: "* Replicate API Key required in Settings.",
    camera: "CAMERA",
    lighting: "LIGHTING",
    art_dir: "ART DIR",
    output: "OUTPUT",
    shot_scale: "Shot Scale",
    angle: "Angle",
    movement: "Movement",
    sensor: "Sensor / Format",
    lens: "Focal Length",
    vintage_lens: "Vintage Lens",
    aperture: "Aperture",
    light_style: "Lighting Style",
    light_quality: "Light Quality",
    light_source: "Practical Source",
    modifier: "Modifier",
    weather: "Weather",
    atmosphere: "Atmosphere FX",
    director: "Director Bias",
    film_stock: "Film Stock",
    aesthetic: "Aesthetic",
    target_model: "Target Model",
    resolution: "Resolution",
    aspect_ratio: "Aspect Ratio",
    framerate: "Framerate",
    output_console: "OUTPUT CONSOLE",
    waiting_input: "WAITING FOR INPUT...",
    booting_engine: "BOOTING RENDER ENGINE...",
    render_failed: "RENDER FAILED: ",
    engine_status: "ENGINE STATUS: ",
    engine_running: "ENGINE RUNNING... (Usually takes 2-3 mins)",
    rendering_node: "RENDERING NODE...",
    target_model_lbl: "TARGET MODEL:",
    lens_pkg: "LENS PKG:",
    pos_prompt: "POS_PROMPT",
    neg_prompt: "NEG_PROMPT",
    status_online: "STATUS: ONLINE",
    powered_by: "POWERED BY CHUSBZN",
    version: "VERSION 1.0",
    copy: "COPY",
    copied: "COPIED",
    auto: "Auto"
  },
  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    engine_config: "MOTOR-KONFIG",
    core_engine_config: "Kern-Engine-Konfiguration",
    llm_brain: "1. LLM-GEHIRN (TEXT)",
    render_node: "2. RENDER-KNOTEN (VIDEO)",
    replicate_key_required: "Erfordert ein Replicate-API-Token für Cloud-Rendering.",
    cancel: "ABBRECHEN",
    apply: "ANWENDEN",
    action_brief: "AKTIONSBESCHREIBUNG",
    placeholder_brief: "Geben Sie Ihre Szenenbeschreibung ein...",
    random_seed: "ZUFÄLLIGER SEED (OFFLINE)",
    manual_compile: "MANUELLE COMPILIERUNG",
    compiling: "COMPILIEREN...",
    thinking: "DENKEN...",
    video_cloud_render: "VIDEO-CLOUD-RENDERING",
    send_to_replicate: "AN REPLICATE-KNOTEN SENDEN",
    rendering: "RENDERING...",
    replicate_key_warning: "* Replicate-API-Schlüssel in Einstellungen erforderlich.",
    camera: "KAMERA",
    lighting: "BELEUCHTUNG",
    art_dir: "KUNSTLEITUNG",
    output: "AUSGABE",
    shot_scale: "Einstellungsgröße",
    angle: "Winkel",
    movement: "Bewegung",
    sensor: "Sensor / Format",
    lens: "Brennweite",
    vintage_lens: "Vintage-Objektiv",
    aperture: "Blende",
    light_style: "Lichtstil",
    light_quality: "Lichtqualität",
    light_source: "Praktische Quelle",
    modifier: "Modifikator",
    weather: "Wetter",
    atmosphere: "Atmosphären-FX",
    director: "Regisseur-Stil",
    film_stock: "Filmtyp",
    aesthetic: "Ästhetik",
    target_model: "Zielmodell",
    resolution: "Auflösung",
    aspect_ratio: "Seitenverhältnis",
    framerate: "Bildrate",
    output_console: "AUSGABEKONSOLE",
    waiting_input: "WARTE AUF EINGABE...",
    booting_engine: "RENDER-ENGINE WIRD GESTARTET...",
    render_failed: "RENDERING FEHLGESCHLAGEN: ",
    engine_status: "ENGINE-STATUS: ",
    engine_running: "ENGINE LÄUFT... (Dauert normalerweise 2-3 Min.)",
    rendering_node: "RENDER-KNOTEN...",
    target_model_lbl: "ZIELMODELL:",
    lens_pkg: "OBJEKTIV-PAKET:",
    pos_prompt: "POS_PROMPT",
    neg_prompt: "NEG_PROMPT",
    status_online: "STATUS: ONLINE",
    powered_by: "UNTERSTÜTZT VON CHUSBZN",
    version: "VERSION 1.0",
    copy: "KOPIEREN",
    copied: "KOPIERT",
    auto: "Auto"
  },
  ru: {
    name: "Русский",
    flag: "🇷🇺",
    engine_config: "НАСТРОЙКА ДВИЖКА",
    core_engine_config: "Конфигурация ядра движка",
    llm_brain: "1. LLM МОЗГ (ТЕКСТ)",
    render_node: "2. УЗЕЛ РЕНДЕРА (ВИДЕО)",
    replicate_key_required: "Требуется токен API Replicate для облачного рендеринга.",
    cancel: "ОТМЕНА",
    apply: "ПРИМЕНИТЬ",
    action_brief: "ОПИСАНИЕ ДЕЙСТВИЯ",
    placeholder_brief: "Введите описание сцены...",
    random_seed: "СЛУЧАЙНЫЙ СИД (ОФФЛАЙН)",
    manual_compile: "РУЧНАЯ КОМПИЛЯЦИЯ",
    compiling: "КОМПИЛЯЦИЯ...",
    thinking: "ДУМАЮ...",
    video_cloud_render: "ОБЛАЧНЫЙ РЕНДЕР ВИДЕО",
    send_to_replicate: "ОТПРАВИТЬ НА УЗЕЛ REPLICATE",
    rendering: "РЕНДЕРИНГ...",
    replicate_key_warning: "* Требуется API-ключ Replicate в настройках.",
    camera: "КАМЕРА",
    lighting: "ОСВЕЩЕНИЕ",
    art_dir: "ХУД. РУК.",
    output: "ВЫВОД",
    shot_scale: "Масштаб кадра",
    angle: "Угол",
    movement: "Движение",
    sensor: "Сенсор / Формат",
    lens: "Фокусное расстояние",
    vintage_lens: "Винтажный объектив",
    aperture: "Диафрагма",
    light_style: "Стиль освещения",
    light_quality: "Качество света",
    light_source: "Практический источник",
    modifier: "Модификатор",
    weather: "Погода",
    atmosphere: "Атмосферный FX",
    director: "Стиль режиссера",
    film_stock: "Тип пленки",
    aesthetic: "Эстетика",
    target_model: "Целевая модель",
    resolution: "Разрешение",
    aspect_ratio: "Соотношение сторон",
    framerate: "Частота кадров",
    output_console: "КОНСОЛЬ ВЫВОДА",
    waiting_input: "ОЖИДАНИЕ ВВОДА...",
    booting_engine: "ЗАПУСК ДВИЖКА РЕНДЕРА...",
    render_failed: "ОШИБКА РЕНДЕРА: ",
    engine_status: "СТАТУС ДВИЖКА: ",
    engine_running: "ДВИЖОК РАБОТАЕТ... (Обычно занимает 2-3 мин.)",
    rendering_node: "РЕНДЕРИНГ НА УЗЛЕ...",
    target_model_lbl: "ЦЕЛЕВАЯ МОДЕЛЬ:",
    lens_pkg: "ОБЪЕКТИВНЫЙ ПАКЕТ:",
    pos_prompt: "ПОЛОЖИТЕЛЬНЫЙ_ПРОМПТ",
    neg_prompt: "ОТРИЦАТЕЛЬНЫЙ_ПРОМПТ",
    status_online: "СТАТУС: ОНЛАЙН",
    powered_by: "РАБОТАЕТ НА CHUSBZN",
    version: "ВЕРСИЯ 1.0",
    copy: "КОПИРОВАТЬ",
    copied: "СКОПИРОВАНО",
    auto: "Авто"
  },
  ja: {
    name: "日本語",
    flag: "🇯🇵",
    engine_config: "エンジン設定",
    core_engine_config: "コアエンジン設定",
    llm_brain: "1. LLMブレイン (テキスト)",
    render_node: "2. レンダーノード (ビデオ)",
    replicate_key_required: "クラウドレンダリングにはReplicate APIトークンが必要です。",
    cancel: "キャンセル",
    apply: "適用",
    action_brief: "アクションの概要",
    placeholder_brief: "シーンの説明を入力してください...",
    random_seed: "ランダムシード (オフライン)",
    manual_compile: "手動コンパイル",
    compiling: "コンパイル中...",
    thinking: "思考中...",
    video_cloud_render: "ビデオクラウドレンダー",
    send_to_replicate: "REPLICATEノードに送信",
    rendering: "レンダリング中...",
    replicate_key_warning: "* 設定にReplicate APIキーが必要です。",
    camera: "カメラ",
    lighting: "照明",
    art_dir: "美術監督",
    output: "出力",
    shot_scale: "ショットスケール",
    angle: "アングル",
    movement: "カメラワーク",
    sensor: "センサー / フォーマット",
    lens: "焦点距離",
    vintage_lens: "ヴィンテージレンズ",
    aperture: "絞り (f-stop)",
    light_style: "照明スタイル",
    light_quality: "光の质",
    light_source: "実用光源",
    modifier: "モディファイア",
    weather: "天気・時間帯",
    atmosphere: "雰囲気・特殊効果",
    director: "監督バイアス",
    film_stock: "フィルムストック",
    aesthetic: "アジアン/エステティック",
    target_model: "対象モデル",
    resolution: "解像度",
    aspect_ratio: "アスペクト比",
    framerate: "フレームレート",
    output_console: "出力コンソール",
    waiting_input: "入力を待っています...",
    booting_engine: "レンダリングエンジン起動中...",
    render_failed: "レンダリング失敗: ",
    engine_status: "エンジンステータス: ",
    engine_running: "エンジン稼働中... (通常2〜3分かかります)",
    rendering_node: "レンダリングノード...",
    target_model_lbl: "対象モデル:",
    lens_pkg: "レンズパッケージ:",
    pos_prompt: "正のプロンプト",
    neg_prompt: "負のプロンプト",
    status_online: "ステータス: オンライン",
    powered_by: "POWERED BY CHUSBZN",
    version: "バージョン 1.0",
    copy: "コピー",
    copied: "コピー完了",
    auto: "自動"
  },
  uk: {
    name: "Українська",
    flag: "🇺🇦",
    engine_config: "НАЛАШТУВАННЯ ДВИГУНА",
    core_engine_config: "Конфігурація ядра двигуна",
    llm_brain: "1. LLM МОЗОК (ТЕКСТ)",
    render_node: "2. ВУЗОЛ РЕНДЕРУ (ВІДЕО)",
    replicate_key_required: "Потрібен токен API Replicate для хмарного рендеру.",
    cancel: "СКАСУВАТИ",
    apply: "ЗАСТОСУВАТИ",
    action_brief: "ОПИС ДІЇ",
    placeholder_brief: "Введіть опис сцени...",
    random_seed: "ВИПАДКОВИЙ СІД (ОФЛАЙН)",
    manual_compile: "РУЧНА КОМПІЛЯЦІЯ",
    compiling: "КОМПІЛЯЦІЯ...",
    thinking: "ДУМАЮ...",
    video_cloud_render: "ХМАРНИЙ РЕНДЕР ВІДЕО",
    send_to_replicate: "ВІДПРАВИТИ НА ВУЗОЛ REPLICATE",
    rendering: "РЕНДЕРУВАННЯ...",
    replicate_key_warning: "* Необхідний API-ключ Replicate в налаштуваннях.",
    camera: "КАМЕРА",
    lighting: "ОСВІТЛЕННЯ",
    art_dir: "ХУД. КЕР.",
    output: "ВИХІД",
    shot_scale: "Масштаб кадру",
    angle: "Кут",
    movement: "Рух",
    sensor: "Сенсор / Format",
    lens: "Фокусна відстань",
    vintage_lens: "Вінтажний об'єктив",
    aperture: "Діафрагма",
    light_style: "Стиль освітлення",
    light_quality: "Якість світла",
    light_source: "Практичне джерело",
    modifier: "Модифікатор",
    weather: "Погода",
    atmosphere: "Ефект атмосфери",
    director: "Стиль режисера",
    film_stock: "Емуляція плівки",
    aesthetic: "Естетика",
    target_model: "Цільова модель",
    resolution: "Роздільна здатність",
    aspect_ratio: "Співвідношення сторін",
    framerate: "Частота кадрів",
    output_console: "КОНСОЛЬ ВИХОДУ",
    waiting_input: "ОЧІКУВАННЯ ВВОДУ...",
    booting_engine: "ЗАПУСК ДВИГУНА РЕНДЕРУ...",
    render_failed: "ПОМИЛКА РЕНДЕРУ: ",
    engine_status: "СТАТУС ДВИГУНА: ",
    engine_running: "ДВИГУН ПРАЦЮЄ... (Зазвичай це займає 2-3 хв.)",
    rendering_node: "РЕНДЕРУВАННЯ ВУЗЛА...",
    target_model_lbl: "ЦІЛЬОВА МОДЕЛЬ:",
    lens_pkg: "ПАКЕТ ЛЕНЗ:",
    pos_prompt: "ПОЗИТИВНИЙ_ПРОМПТ",
    neg_prompt: "НЕГАТИВНИЙ_ПРОМПТ",
    status_online: "СТАТУС: ОНЛАЙН",
    powered_by: "НА БАЗІ CHUSBZN",
    version: "ВЕРСІЯ 1.0",
    copy: "КОПІЮВАТИ",
    copied: "СКОПІЙОВАНО",
    auto: "Авто"
  },
  zh: {
    name: "中文",
    flag: "🇨🇳",
    engine_config: "引擎配置",
    core_engine_config: "核心引擎配置",
    llm_brain: "1. LLM 大脑 (文本)",
    render_node: "2. 渲染节点 (视频)",
    replicate_key_required: "云端渲染需要 Replicate API 令牌。",
    cancel: "取消",
    apply: "应用",
    action_brief: "动作描述",
    placeholder_brief: "输入场景描述...",
    random_seed: "随机种子 (离线)",
    manual_compile: "手动编译",
    compiling: "编译中...",
    thinking: "思考中...",
    video_cloud_render: "视频云端渲染",
    send_to_replicate: "发送到 REPLICATE 节点",
    rendering: "渲染中...",
    replicate_key_warning: "* 需要在设置中配置 Replicate API 密钥。",
    camera: "相机",
    lighting: "照明",
    art_dir: "艺术指导",
    output: "输出",
    shot_scale: "画面比例/景别",
    angle: "角度",
    movement: "运动",
    sensor: "传感器 / 格式",
    lens: "焦距",
    vintage_lens: "复古镜头",
    aperture: "光圈",
    light_style: "布光风格",
    light_quality: "光线性质",
    light_source: "实用光源/道具光",
    modifier: "控光配件",
    weather: "天气/时间",
    atmosphere: "环境特效",
    director: "导演风格偏好",
    film_stock: "胶片模拟",
    aesthetic: "美学风格",
    target_model: "目标模型",
    resolution: "分辨率",
    aspect_ratio: "宽高比",
    framerate: "帧率",
    output_console: "输出控制台",
    waiting_input: "等待输入...",
    booting_engine: "启动渲染引擎...",
    render_failed: "渲染失败: ",
    engine_status: "引擎状态: ",
    engine_running: "引擎运行中... (通常需要 2-3 分钟)",
    rendering_node: "渲染节点中...",
    target_model_lbl: "目标模型:",
    lens_pkg: "镜头组:",
    pos_prompt: "正向提示词",
    neg_prompt: "反向提示词",
    status_online: "状态: 在线",
    powered_by: "技术支持: CHUSBZN",
    version: "版本 1.0",
    copy: "复制",
    copied: "已复制",
    auto: "自动"
  }
};

const Icon = ({ d, size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <path d={d}/>
  </svg>
);

const CopyBtn = ({ text, id, copied, onCopy, label = "COPY" }) => {
  const done = copied === id;
  return (
    <button onClick={() => onCopy(text, id)} className="btn" style={{
      borderColor: done ? "var(--success)" : "var(--border)",
      color: done ? "var(--success)" : "var(--muted)",
      padding: "6px 10px", fontSize: "10px"
    }}>
      {done ? <Icon d="M5 13l4 4L19 7" size={14}/> : <Icon d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h4a2 2 0 002-2M8 5a2 2 0 012-2h4a2 2 0 012 2" size={14}/>}
      {done ? "COPIED" : label}
    </button>
  );
};

function CustomSelect({ label, value, onChange, options, nameKey = null, valKey = null, placeholder = "Auto", language = "es" }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rawSelectedName = value 
    ? (nameKey ? options.find(o => o[valKey] === value)?.[nameKey] : value) 
    : placeholder;
  const selectedName = translateVal(rawSelectedName, language);

  return (
    <div className="input-group" ref={containerRef}>
      <label className="input-label">{label}</label>
      <div className="custom-select-container">
        <div className={`custom-select-trigger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{selectedName}</span>
          <span className="chevron"><Icon d="M6 9l6 6 6-6" size={14} /></span>
        </div>
        {open && (
          <div className="custom-select-dropdown">
            <div className={`custom-select-option ${!value ? 'selected' : ''}`} onClick={() => { onChange(""); setOpen(false); }}>
              {placeholder}
            </div>
            {options.map((opt, i) => {
              const v = valKey ? opt[valKey] : opt;
              const n = nameKey ? opt[nameKey] : opt;
              return (
                <div 
                  key={i} 
                  className={`custom-select-option ${value === v ? 'selected' : ''}`} 
                  onClick={() => { onChange(v); setOpen(false); }}
                >
                  {translateVal(n, language)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CineStation() {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("cinestation_language");
    return savedLang && TRANSLATIONS[savedLang] ? savedLang : "es";
  });

  const changeLanguage = (lang) => {
    if (TRANSLATIONS[lang]) {
      setLanguage(lang);
      localStorage.setItem("cinestation_language", lang);
    }
  };

  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [copied, setCopied] = useState("");
  const [activeTab, setActiveTab] = useState("camera");

  // Settings Modal
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("cinestation_api_key") || "");
  const [replicateKey, setReplicateKey] = useState(() => localStorage.getItem("replicate_api_key") || "");

  // Video State
  const [videoState, setVideoState] = useState("idle"); // idle, loading, success, error
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoProgress, setVideoProgress] = useState("");

  // Cleanups
  const pollIntervalRef = useRef(null);
  const loadingTimeoutRef = useRef(null);

  // States
  const [shot, setShot] = useState("");
  const [angle, setAngle] = useState("");
  const [movement, setMovement] = useState("");
  const [sensor, setSensor] = useState("");
  const [lens, setLens] = useState("");
  const [vintageLens, setVintageLens] = useState("");
  const [fstop, setFstop] = useState("");
  const [lightStyle, setLightStyle] = useState("");
  const [lightQuality, setLightQuality] = useState("");
  const [lightSource, setLightSource] = useState("");
  const [modifier, setModifier] = useState("");
  const [weather, setWeather] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [director, setDirector] = useState("");
  const [filmStock, setFilmStock] = useState("");
  const [aesthetic, setAesthetic] = useState("");
  const [model, setModel] = useState("wan2");
  const [resolution, setResolution] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [framerate, setFramerate] = useState("");

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  const saveSettings = () => {
    localStorage.setItem("cinestation_api_key", apiKey);
    localStorage.setItem("replicate_api_key", replicateKey);
    setShowSettings(false);
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(""), 2200);
  };

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const autoRandomize = () => {
    setShot(getRandom(Lib.SHOT_SCALES));
    setAngle(getRandom(Lib.ANGLES));
    setMovement(getRandom(Lib.MOVEMENTS));
    setLens(getRandom(Lib.LENSES));
    setVintageLens(getRandom(Lib.VINTAGE_LENSES));
    setLightStyle(getRandom(Lib.LIGHT_STYLES));
    setWeather(getRandom(Lib.WEATHER_TIME));
    setAtmosphere(getRandom(Lib.ATMOSPHERE));
    setDirector(getRandom(Lib.DIRECTORS));
    setAesthetic(getRandom(Lib.AESTHETICS));
    setResolution(getRandom(Lib.RESOLUTIONS));
    setAspectRatio(getRandom(Lib.ASPECT_RATIOS));
  };

  const generateManual = () => {
    if (!brief.trim() || loading) return;
    setLoading(true); setProject(null); setVideoState("idle"); setVideoUrl(null);
    
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);

    loadingTimeoutRef.current = setTimeout(() => {
      const modelInfo = Lib.AI_MODELS.find(m => m.id === model) || Lib.AI_MODELS[0];
      
      let cinematicPrompt = `[Cinematic Masterpiece] ${brief.trim()}. `;
      const tags = [];
      
      if (shot) tags.push(`Shot type: ${shot}`);
      if (angle) tags.push(`Angle: ${angle}`);
      if (movement) tags.push(`Movement: ${movement}`);
      if (sensor) tags.push(`Shot on: ${sensor}`);
      if (lens) tags.push(`Focal length: ${lens}`);
      if (vintageLens) tags.push(`Lens characteristics: ${vintageLens}`);
      if (fstop) tags.push(`Aperture: ${fstop}`);
      if (lightStyle) tags.push(`Lighting style: ${lightStyle}`);
      if (lightQuality) tags.push(`Light quality: ${lightQuality}`);
      if (lightSource) tags.push(`Practical light: ${lightSource}`);
      if (modifier) tags.push(`Light modifier: ${modifier}`);
      if (weather) tags.push(`Environment: ${weather}`);
      if (atmosphere) tags.push(`Atmosphere: ${atmosphere}`);
      if (filmStock) tags.push(`Film Stock: ${filmStock}`);
      if (director) tags.push(`Directed by ${director}`);
      if (aesthetic) tags.push(`Aesthetics: ${aesthetic}`);
      if (resolution) tags.push(`Resolution: ${resolution}`);
      if (aspectRatio) tags.push(`Aspect Ratio: ${aspectRatio}`);
      if (framerate) tags.push(`Framerate: ${framerate}`);

      if (tags.length > 0) {
        cinematicPrompt += `Technical blueprint: ${tags.join(" | ")}. Highly detailed, photorealistic, award-winning cinematography.`;
      } else {
        cinematicPrompt += `Highly detailed, photorealistic, cinematic lighting, shot on 35mm film.`;
      }

      setProject({
        titulo: `Project: ${brief.split(' ').slice(0,4).join(' ')}...`,
        tagline: TRANSLATIONS[language].manual_compile,
        modeloRecomendado: modelInfo.name,
        configuracion: { shot: shot || "Auto", lens: vintageLens || lens || "Auto", director: director || "Original" },
        escena: {
          descripcionVisual: brief,
          promptCinematografico: cinematicPrompt,
          promptNegativo: Lib.DEFAULT_NEGATIVE_PROMPT,
        }
      });
      setLoading(false);
    }, 500);
  };

  // MULTI-API DYNAMIC ROUTER
  const getProvider = (key) => {
    if (!key) return null;
    if (key.startsWith("AIza")) return "GEMINI";
    if (key.startsWith("sk-ant-")) return "CLAUDE";
    if (key.startsWith("sk-")) return "OPENAI";
    return "UNKNOWN";
  };

  const provider = getProvider(apiKey);
  const isBriefValid = brief.trim().length > 0;
  const canUseAI = isBriefValid && provider && provider !== "UNKNOWN";

  const getProviderName = () => {
    if (provider === "GEMINI") return "GEMINI 1.5";
    if (provider === "CLAUDE") return "CLAUDE 3.5";
    if (provider === "OPENAI") return "GPT-4O";
    return "AI CORE";
  };

  const generateAI = async () => {
    if (!canUseAI || loading) return;
    setLoading(true); setProject(null); setVideoState("idle"); setVideoUrl(null);

    const userContext = `
Idea del usuario (Brief): "${brief}"

Preferencias seleccionadas manualmente por el usuario (si algo está en blanco, inventa creativamente la mejor opción):
- Modelo IA: ${model}
- Director: ${director || "[Ninguno, invéntalo]"}
- Plano: ${shot || "[Ninguno, invéntalo]"}
- Lente: ${vintageLens || lens || "[Ninguna, invéntala]"}
- Iluminación: ${lightStyle || "[Ninguna, invéntala]"}
- Estética: ${aesthetic || "[Ninguna, invéntala]"}
- Clima/Atmósfera: ${weather || atmosphere || "[Ninguna, invéntala]"}
- Resolución y Formato: ${resolution || "Auto"} / ${aspectRatio || "Auto"}
    `;

    try {
      let rawText = "";
      const sysPrompt = getSystemPrompt(language);

      if (provider === "GEMINI") {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: sysPrompt }] },
            contents: [{ parts: [{ text: userContext }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      } else if (provider === "CLAUDE") {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerously-allow-browser": "true"
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 2000,
            system: sysPrompt,
            messages: [{ role: "user", content: userContext }],
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        rawText = data.content?.map(b => b.text || "").join("") || "";

      } else if (provider === "OPENAI") {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          },
          body: JSON.stringify({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", "content": sysPrompt },
              { role: "user", "content": userContext }
            ]
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        rawText = data.choices?.[0]?.message?.content || "";
      }

      const clean = rawText.replace(/```json|```/g, "").trim();
      const p = JSON.parse(clean);
      setProject(p);
      
    } catch(e) {
      alert("API Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // REPLICATE VIDEO ENGINE
  // -------------------------------------------------------------
  const renderVideo = async () => {
    if (!project || !replicateKey || videoState === "loading") return;
    
    // Clear any previous intervals
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    
    setVideoState("loading");
    setVideoProgress("BOOTING RENDER ENGINE...");
    
    try {
      // Step 1: Send request to Replicate via CORS proxy
      const CORS_PROXY = "https://corsproxy.io/?url=";
      const API_URL = "https://api.replicate.com/v1/models/tencent/hunyuan-video/predictions";
      
      const promptToUse = project.escena.promptCinematografico;
      
      const createRes = await fetch(CORS_PROXY + encodeURIComponent(API_URL), {
        method: "POST",
        headers: {
          "Authorization": "Token " + replicateKey,
          "Content-Type": "application/json",
          "Prefer": "wait"
        },
        body: JSON.stringify({
          input: {
            prompt: promptToUse,
            prompt_optimizer: true,
            resolution: "1280x720"
          }
        })
      });

      const prediction = await createRes.json();
      
      if (prediction.error) {
        throw new Error(prediction.error);
      }

      let predId = prediction.id;
      setVideoProgress("ENGINE RUNNING... (Usually takes 2-3 mins)");

      // Step 2: Polling loop
      pollIntervalRef.current = setInterval(async () => {
        try {
          const pollRes = await fetch(CORS_PROXY + encodeURIComponent(`https://api.replicate.com/v1/predictions/${predId}`), {
            headers: { "Authorization": "Token " + replicateKey }
          });
          const pollData = await pollRes.json();

          if (pollData.status === "succeeded") {
            clearInterval(pollIntervalRef.current);
            setVideoUrl(pollData.output);
            setVideoState("success");
            setVideoProgress("");
          } else if (pollData.status === "failed" || pollData.status === "canceled") {
            clearInterval(pollIntervalRef.current);
            setVideoState("error");
            setVideoProgress("RENDER FAILED: " + pollData.error);
          } else {
            // still processing or starting
            setVideoProgress(`ENGINE STATUS: ${pollData.status.toUpperCase()}...`);
          }
        } catch (err) {
          console.error("Polling error", err);
        }
      }, 5000); // Check every 5 seconds

    } catch (error) {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      setVideoState("error");
      setVideoProgress("ERROR: " + error.message);
    }
  };

  return (
    <div className="daw-layout">
      
      {/* Header */}
      <div className="daw-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Icon d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" size={18} color="var(--accent)" />
          <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent)" }}>CINESTATION<span style={{color: "var(--text)"}}>.PRO</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Language Selector Dropdown */}
          <select 
            value={language} 
            onChange={e => changeLanguage(e.target.value)} 
            className="btn" 
            style={{ 
              background: "var(--bg-input)", 
              border: "1px solid var(--border)", 
              color: "white", 
              padding: "6px 12px", 
              borderRadius: "4px", 
              fontSize: "12px", 
              cursor: "pointer",
              outline: "none"
            }}
          >
            {Object.entries(TRANSLATIONS).map(([key, value]) => (
              <option key={key} value={key} style={{ background: "#111", color: "white" }}>
                {value.flag} {value.name}
              </option>
            ))}
          </select>

          <button className="btn" onClick={() => setShowSettings(true)}>
            <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6z" size={14}/> {TRANSLATIONS[language].engine_config}
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-window animate-fade-in" style={{ width: "500px" }}>
            <h2 style={{ marginBottom: "20px", fontSize: "18px" }}>{TRANSLATIONS[language].core_engine_config}</h2>
            
            <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border-hi)", paddingBottom: "20px" }}>
              <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "10px", fontWeight: 600 }}>
                {TRANSLATIONS[language].llm_brain}
              </p>
              <div className="input-group">
                <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="AIza... or sk-..." style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid var(--border)", color: "white", borderRadius: "4px", fontFamily: "monospace", fontSize: "13px" }} />
              </div>
              <div className="mono" style={{ fontSize: "11px", color: "var(--accent)", marginTop: "8px", minHeight: "16px" }}>
                {provider === "GEMINI" && `[SYS] ${TRANSLATIONS[language].name} Gemini Engine Detected.`}
                {provider === "CLAUDE" && `[SYS] ${TRANSLATIONS[language].name} Claude Engine Detected.`}
                {provider === "OPENAI" && `[SYS] ${TRANSLATIONS[language].name} OpenAI Engine Detected.`}
                {provider === "UNKNOWN" && apiKey.length > 0 && "[ERR] Unknown API Signature."}
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "10px", fontWeight: 600 }}>
                {TRANSLATIONS[language].render_node}
              </p>
              <div className="input-group">
                <input type="password" value={replicateKey} onChange={e => setReplicateKey(e.target.value)} placeholder="r8_..." style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid var(--border)", color: "white", borderRadius: "4px", fontFamily: "monospace", fontSize: "13px" }} />
              </div>
              <div className="mono" style={{ fontSize: "11px", color: "var(--muted)", marginTop: "8px" }}>
                {TRANSLATIONS[language].replicate_key_required}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button className="btn" onClick={() => setShowSettings(false)}>{TRANSLATIONS[language].cancel}</button>
              <button className="btn btn-accent" onClick={saveSettings}>{TRANSLATIONS[language].apply}</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="daw-workspace">
        
        {/* PANEL LEFT: Input / Mixer */}
        <div className="panel panel-left animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="section-title">
            <Icon d="M4 6h16M4 12h16m-7 6h7" size={16}/>
            {TRANSLATIONS[language].action_brief}
          </div>
          
          <textarea
            className="plugin-textarea"
            value={brief}
            onChange={e => setBrief(e.target.value)}
            placeholder={TRANSLATIONS[language].placeholder_brief}
          />

          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button className="btn" onClick={autoRandomize}>
              <Icon d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" size={14}/>
              {TRANSLATIONS[language].random_seed}
            </button>
            
            <button className="btn" onClick={generateManual} disabled={loading || !isBriefValid}>
              {loading && !canUseAI ? TRANSLATIONS[language].compiling : TRANSLATIONS[language].manual_compile}
            </button>

            <button 
              className={`btn btn-ai ${canUseAI ? 'pulse' : ''}`} 
              onClick={generateAI} 
              disabled={loading || !canUseAI}
            >
              {loading && canUseAI ? TRANSLATIONS[language].thinking : `INIT ${getProviderName()}`}
            </button>
          </div>

          {/* VIDEO RENDER CONTROLS */}
          <div style={{ marginTop: "40px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
            <div className="section-title" style={{ color: "var(--danger)", borderBottomColor: "var(--border)" }}>
              <Icon d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" size={16}/>
              {TRANSLATIONS[language].video_cloud_render}
            </div>
            
            <button 
              className="btn" 
              onClick={renderVideo} 
              disabled={!project || !replicateKey || videoState === "loading"}
              style={{ width: "100%", background: (!project || !replicateKey) ? "transparent" : "var(--danger)", color: (!project || !replicateKey) ? "var(--muted)" : "#fff", borderColor: "var(--danger)" }}
            >
              {videoState === "loading" ? TRANSLATIONS[language].rendering : TRANSLATIONS[language].send_to_replicate}
            </button>

            {(!replicateKey) && (
              <div style={{ fontSize: "11px", color: "var(--muted)", textAlign: "center", marginTop: "12px", fontFamily: "monospace" }}>
                {TRANSLATIONS[language].replicate_key_warning}
              </div>
            )}
          </div>
        </div>

        {/* PANEL CENTER: Parameters */}
        <div className="panel panel-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          
          <div className="tabs-container">
            <button className={`tab-btn ${activeTab === 'camera' ? 'active' : ''}`} onClick={() => setActiveTab('camera')}>{TRANSLATIONS[language].camera}</button>
            <button className={`tab-btn ${activeTab === 'light' ? 'active' : ''}`} onClick={() => setActiveTab('light')}>{TRANSLATIONS[language].lighting}</button>
            <button className={`tab-btn ${activeTab === 'art' ? 'active' : ''}`} onClick={() => setActiveTab('art')}>{TRANSLATIONS[language].art_dir}</button>
            <button className={`tab-btn ${activeTab === 'output' ? 'active' : ''}`} onClick={() => setActiveTab('output')}>{TRANSLATIONS[language].output}</button>
          </div>

          <div className="input-grid">
            {activeTab === 'camera' && (
              <>
                <CustomSelect label={TRANSLATIONS[language].shot_scale} value={shot} onChange={setShot} options={Lib.SHOT_SCALES} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].angle} value={angle} onChange={setAngle} options={Lib.ANGLES} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].movement} value={movement} onChange={setMovement} options={Lib.MOVEMENTS} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].sensor} value={sensor} onChange={setSensor} options={Lib.SENSORS} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].lens} value={lens} onChange={setLens} options={Lib.LENSES} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].vintage_lens} value={vintageLens} onChange={setVintageLens} options={Lib.VINTAGE_LENSES} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].aperture} value={fstop} onChange={setFstop} options={Lib.F_STOPS} placeholder={TRANSLATIONS[language].auto} language={language} />
              </>
            )}

            {activeTab === 'light' && (
              <>
                <CustomSelect label={TRANSLATIONS[language].light_style} value={lightStyle} onChange={setLightStyle} options={Lib.LIGHT_STYLES} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].light_quality} value={lightQuality} onChange={setLightQuality} options={Lib.LIGHT_QUALITY} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].light_source} value={lightSource} onChange={setLightSource} options={Lib.LIGHT_SOURCES} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].modifier} value={modifier} onChange={setModifier} options={Lib.MODIFIERS} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].weather} value={weather} onChange={setWeather} options={Lib.WEATHER_TIME} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].atmosphere} value={atmosphere} onChange={setAtmosphere} options={Lib.ATMOSPHERE} placeholder={TRANSLATIONS[language].auto} language={language} />
              </>
            )}

            {activeTab === 'art' && (
              <>
                <CustomSelect label={TRANSLATIONS[language].director} value={director} onChange={setDirector} options={Lib.DIRECTORS} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].film_stock} value={filmStock} onChange={setFilmStock} options={Lib.FILM_STOCKS} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].aesthetic} value={aesthetic} onChange={setAesthetic} options={Lib.AESTHETICS} placeholder={TRANSLATIONS[language].auto} language={language} />
              </>
            )}

            {activeTab === 'output' && (
              <>
                <CustomSelect label={TRANSLATIONS[language].target_model} value={model} onChange={setModel} options={Lib.AI_MODELS} valKey="id" nameKey="name" placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].resolution} value={resolution} onChange={setResolution} options={Lib.RESOLUTIONS} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].aspect_ratio} value={aspectRatio} onChange={setAspectRatio} options={Lib.ASPECT_RATIOS} placeholder={TRANSLATIONS[language].auto} language={language} />
                <CustomSelect label={TRANSLATIONS[language].framerate} value={framerate} onChange={setFramerate} options={Lib.FRAMERATES} placeholder={TRANSLATIONS[language].auto} language={language} />
              </>
            )}
          </div>
        </div>

        {/* PANEL RIGHT: Output Console */}
        <div className="panel panel-right animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="section-title">
            <Icon d="M2 12h4l3-9 5 18 3-9h5" size={16}/>
            {TRANSLATIONS[language].output_console}
          </div>
          
          {/* VIDEO RENDER VIEW */}
          {(videoState !== "idle") && (
            <div style={{ marginBottom: "24px", background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden", minHeight: "240px", position: "relative" }}>
              
              {videoState === "loading" && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)" }}>
                  <div style={{ width: "48px", height: "48px", border: "3px solid var(--border-hi)", borderTopColor: "var(--danger)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  <style>{"@keyframes spin { 100% { transform: rotate(360deg); } }"}</style>
                  <p className="mono" style={{ color: "var(--danger)", fontSize: "11px", marginTop: "20px", letterSpacing: "1px" }}>{videoProgress}</p>
                </div>
              )}

              {videoState === "error" && (
                <div style={{ padding: "24px", color: "var(--danger)", fontFamily: "monospace", fontSize: "12px", textAlign: "center", marginTop: "80px" }}>
                  {videoProgress}
                </div>
              )}

              {videoState === "success" && videoUrl && (
                <video 
                  src={videoUrl} 
                  autoPlay 
                  controls 
                  loop 
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </div>
          )}


          {!project && !loading && videoState === "idle" && (
            <div style={{ textAlign: "center", color: "var(--border-hi)", marginTop: "120px", fontFamily: "monospace", fontSize: "12px" }}>
              <Icon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" size={40} />
              <p style={{ marginTop: "16px" }}>{TRANSLATIONS[language].waiting_input}</p>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: "center", color: "var(--accent)", marginTop: "120px" }}>
              <div style={{ animation: "pulseAI 1s infinite" }}>
                 <Icon d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" size={40} />
              </div>
              <p className="mono" style={{ marginTop: "20px", fontSize: "11px", letterSpacing: "2px" }}>{TRANSLATIONS[language].rendering_node}</p>
            </div>
          )}

          {project && !loading && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>{project.titulo}</h3>
              {project.tagline && <p style={{ fontStyle: "italic", color: "var(--muted)", marginBottom: "24px", fontSize: "13px" }}>"{project.tagline}"</p>}
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "6px" }}>
                  <span style={{ color: "var(--muted)" }}>{TRANSLATIONS[language].target_model_lbl}</span>
                  <span style={{ color: "var(--accent)" }}>{project.modeloRecomendado || "Auto"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "6px" }}>
                  <span style={{ color: "var(--muted)" }}>{TRANSLATIONS[language].lens_pkg}</span>
                  <span style={{ color: "var(--text)" }}>{translateVal(project.configuracion?.lens || vintageLens || lens || "Premium", language)}</span>
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span className="mono" style={{ color: "var(--accent)", fontSize: "11px", fontWeight: "bold" }}>{TRANSLATIONS[language].pos_prompt}</span>
                  <CopyBtn text={project.escena.promptCinematografico} id="pos" copied={copied} onCopy={copy} label={TRANSLATIONS[language].copy} />
                </div>
                <div className="terminal-box accent">
                  {project.escena.promptCinematografico}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span className="mono" style={{ color: "var(--danger)", fontSize: "11px", fontWeight: "bold" }}>{TRANSLATIONS[language].neg_prompt}</span>
                  <CopyBtn text={project.escena.promptNegativo} id="neg" copied={copied} onCopy={copy} label={TRANSLATIONS[language].copy} />
                </div>
                <div className="terminal-box" style={{ borderLeftColor: "var(--danger)" }}>
                  {project.escena.promptNegativo}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer / Status Bar */}
      <div className="daw-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }}></div>
          {TRANSLATIONS[language].status_online}
        </div>
        <div style={{ color: "var(--accent)", fontWeight: "bold", letterSpacing: "2px" }}>{TRANSLATIONS[language].powered_by}</div>
        <div style={{ color: "white", fontWeight: "bold" }}>{TRANSLATIONS[language].version}</div>
      </div>
    </div>
  );
}

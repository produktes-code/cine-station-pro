export const AI_MODELS = [
  { id: 'wan2', name: 'Wan 2.2 T2V (Cinematic)', type: 'video' },
  { id: 'ltx2', name: 'LTX-2 (Fast 4K)', type: 'video' },
  { id: 'sora', name: 'OpenAI Sora (Hi-Fidelity)', type: 'video' },
  { id: 'runway', name: 'Runway Gen-3 (VFX)', type: 'video' },
  { id: 'mj6', name: 'Midjourney v6', type: 'image' },
  { id: 'dalle3', name: 'DALL-E 3 (Exactitud)', type: 'image' }
];

export const RESOLUTIONS = [
  '1080p (FHD)', '4K (UHD)', '8K (Super Hi-Vision)', '720p (HD Web)'
];

export const ASPECT_RATIOS = [
  '16:9 (Panorámico TV)', '2.35:1 (Cinemascope Anamórfico)', '1.85:1 (Cine Estándar)',
  '9:16 (Vertical Reels/TikTok)', '1:1 (Cuadrado IG)', '4:3 (Vintage TV/CRT)',
  '3:2 (Fotografía Clásica)'
];

export const FRAMERATES = [
  '24fps (Cine)', '25fps (PAL)', '30fps (NTSC/TV)', '60fps (Smooth/Gaming)', 
  '120fps (Slow Motion/Cámara Lenta)'
];

export const SENSORS = [
  'IMAX 70mm', 'Super 35', 'Super 16', 'VistaVision (Hitchcock)', 'Full Frame', 
  'MFT', 'Cinta VHS', 'Super 8', 'Open Gate', 'ARRI Alexa 65', 'RED Monstro 8K VV',
  'Sony Venice 2', 'Panavision Millennium DXL2', 'Bolex 16mm'
];

export const LENSES = [
  '8mm (Fisheye)', '14mm (Arquitectura/Ultra Wide)', '24mm (Angular Cine)', 
  '35mm (Documental/Ojo Humano)', '50mm (Estándar/Natural)', 
  '85mm (Retrato Favorecedor)', '100mm Macro (Detalle Extremo)', 
  '135mm (Teleobjetivo Corto)', '200mm (Compresión Fondo)', '400mm (Naturaleza/Paparazzi)'
];

export const VINTAGE_LENSES = [
  'Panavision C-Series (Flares Azules)', 'Cooke Anamorphic (Cooke Look)', 
  'Atlas Orion (Streak Azul)', 'Kowa Anamorphic (Bajo Contraste/Dorado)', 'Canon K35 (Glow)', 
  'Zeiss Super Speeds (Taxi Driver)', 'Super Baltar (El Padrino - Cálido)', 'Helios 44-2 (Bokeh Remolino)', 
  'Canon Dream Lens (Etéreo)', 'Laowa Probe (Macro Insecto)', 'Split Diopter (Dos Planos Foco)',
  'Zeiss Master Primes (Ultra Nítido)', 'Leica Summilux-C (Cremoso)'
];

export const F_STOPS = [
  'f/0.95 (Sueño/Bokeh Extremo)', 'f/1.2 (Nocturno)', 'f/1.4 (Cinemático Clásico)', 
  'f/2.0 (Retrato Suave)', 'f/2.8 (Estándar Cine)', 'f/4.0', 'f/5.6 (Nítido)', 
  'f/8.0 (Sweet Spot)', 'f/11', 'f/22 (Todo Enfocado)'
];

export const SHOT_SCALES = [
  'ECU (Plano Detalle Extremo)', 'Choker (Frente a Barbilla)', 'Primer Plano (Cara)', 
  'Plano Medio Corto (Pecho)', 'Plano Medio (Cintura)', 'Plano Americano (Rodillas)', 
  'Plano Entero (Cuerpo completo)', 'Plano General', 'Gran Plano General (Paisaje)',
  'Over The Shoulder (Sobre el Hombro)', 'POV (Primera Persona)'
];

export const ANGLES = [
  'Nivel de Ojos (Neutro)', 'Contrapicado (Poder/Heroico)', 'Picado (Vulnerabilidad)', 
  'Cenital Total (Mapa/Bird Eye)', 'Holandés (Dutch Angle/Caos)', 'Vista de Gusano (Suelo)', 
  'A ras de suelo (Zapatos)', 'Desde el Maletero (Tarantino Trunk Shot)'
];

export const MOVEMENTS = [
  'Trípode Estático (Wes Anderson)', 'Paneo Lento (Horizonte)', 'Whip Pan (Barrido Rápido)', 
  'Tilt Up (Revelación)', 'Tilt Down', 'Dolly In (Acercamiento Lento)', 
  'Dolly Out (Alejamiento)', 'Tracking Lateral (Seguimiento)', 'Zolly (Efecto Vértigo/Dolly Zoom)', 
  'Cámara en Mano (Realismo/Documental)', 'SnorriCam (Pegada al cuerpo)', 'Steadicam (Flotante)', 
  'Dron Cenital', 'FPV Dive (Velocidad extrema)', 'Technocrane (Grúa Flexible)', 'Crash Zoom (Snap Zoom)'
];

export const LIGHT_STYLES = [
  '3 Puntos (Estándar TV/Cine)', 'Rembrandt (Triángulo Mejilla)', 'Claroscuro (Caravaggio/Alto Contraste)', 
  'Butterfly (Paramount Glamour)', 'Cine Negro (Venecianas/Sombras)', 'High Key (Comedia/Brillante)', 
  'Low Key (Drama/Thriller/Oscuro)', 'Bioluminiscencia (Avatar)', 'Silueta (Contraluz Total)',
  'Uplighting (Frankenstein/Terror)', 'Prácticas (Lámparas visibles integradas)', 'Neon Noir (Cyberpunk)'
];

export const LIGHT_QUALITY = [
  'Luz Dura (Sombras Definidas y Cortantes)', 'Luz Suave (Envolvente y Halagadora)', 
  'Difusa (Nubes/Seda gigante)', 'Especular (Brillos Intensos)', 'Volumétrica (God Rays/Niebla)'
];

export const MODIFIERS = [
  'Luz Desnuda (Directa)', 'Softbox / Octabox (Difusa)', 'Book Light (Ultra Suave rebotada)', 
  'Fresnel (Enfocada/Cine Clásico)', 'Ring Light (Reflejo circular en ojos)', 'Gobo (Patrones de Hojas/Ventana)', 
  'Snoot (Círculo Puntual)', 'China Ball / Lantern (Luz 360º suave)'
];

export const LIGHT_SOURCES = [
  'Sol Natural', 'Luz de Luna (Filtro Azulado)', 'Tungsteno (Cálida 3200K)', 
  'HMI (Luz Día Potente 5600K)', 'Panel LED (RGB)', 'Arri Skypanel (Cine moderno)', 'Astera Titan Tubes (Cyberpunk)', 
  'Fuego / Antorcha / Vela (Parpadeo)', 'Letrero de Neón', 'Tubo Fluorescente (Verdoso/Industrial)',
  'Linterna de Mano (Haz concentrado)', 'Estrobo (Discoteca/Relámpago)'
];

export const WEATHER_TIME = [
  'Amanecer (Tonos Pastel)', 'Hora Dorada (Cálido/Bajo)', 'Mediodía (Sombras Duras y Severas)', 
  'Hora Azul (Crepúsculo)', 'Noche Cerrada', 'Medianoche', 'Lluvia Fuerte (Diluvio)', 
  'Llovizna Fina', 'Tormenta de Nieve (Blizzard)', 'Niebla Densa (Silent Hill)', 
  'Tormenta de Arena (Mad Max)', 'Cielo Nublado Gris (Plano y Depresivo)', 'Tormenta Eléctrica'
];

export const ATMOSPHERE = [
  'Polvo Flotante (Rayo solar visible)', 'Bruma de Estudio (Haze)', 'Humo Denso', 
  'Brasas Flotando', 'Chispas (Soldadura/Impacto)', 'God Rays (Volumétrica entre árboles)', 
  'Olas de Calor (Espejismo en asfalto)', 'Cáusticas (Reflejo de agua en paredes)', 
  'Doble Exposición', 'Bokeh Balls (Fondo desenfocado)', 'Lens Flare Horizontal (Anamórfico)'
];

export const FILM_STOCKS = [
  'Kodak Tri-X (B/N Alto Contraste/Grano)', 'Ilford HP5 (B/N Grano Clásico)', 'Double-X (B/N Noir/Schindler)', 
  'CineStill 800T (Halos Rojos en luces altas)', 'Lomo Purple (Falso Color psicodélico)', 
  'Redscale (Tonos Fuego)', 'Kodak 2383 (Emulación Print de Cine Clásico)', 'Fuji 3513 (Verdes/Azules cinematográficos)',
  'Kodak Portra 400 (Pieles suaves y cálidas)', 'Fujifilm Provia 100F (Contraste y saturación alta)'
];

export const DIRECTORS = [
  'Denis Villeneuve (Brutalismo/Escala inmensa)', 'Christopher Nolan (IMAX/Realismo Práctico)', 
  'Wes Anderson (Simetría/Colores Pastel)', 'David Fincher (Verde/Oscuro/Movimientos Precisos)', 
  'Wong Kar-Wai (Step-printing/Romance Neón)', 'Andrei Tarkovsky (Poético/Naturaleza/Tiempo)', 
  'Gaspar Noé (Neón/Cámara Giratoria/Transgresor)', 'Guillermo del Toro (Fantasía Oscura Gótica)', 
  'Stanley Kubrick (Punto de Fuga/Simetría fría)', 'Alfred Hitchcock (Suspense/Voyeurismo)', 
  'Steven Spielberg (Blockbuster/Siluetas mágicas)', 'Ridley Scott (Atmósfera/Humo/Sci-Fi sucio)',
  'Quentin Tarantino (Planos desde maletero/Colores Pop)', 'Martin Scorsese (Tracking shots largos/Energía)',
  'Francis Ford Coppola (Claroscuro Épico)', 'Hayao Miyazaki (Fondos exuberantes/Anime clásico)',
  'Greta Gerwig (Vibrante/Humano)', 'Bong Joon-ho (Dinámico/Tensión Social)', 
  'Damien Chazelle (Ritmo frenético/Jazz visual)', 'Yorgos Lanthimos (Gran Angular distorsionado/Incómodo)', 
  'Safdie Brothers (Caos Urbano/Neón nervioso)', 'Ari Aster (Terror a plena luz del día/Inquietante)', 
  'Robert Eggers (Histórico/Crudo y sucio)', 'Jordan Peele (Surreal/Tensión Psicológica)', 
  'David Lynch (Onírico/Industrial pesadilla)', 'Tim Burton (Gótico Expresionista)', 
  'David Cronenberg (Body Horror clínico)'
];

export const AESTHETICS = [
  'Cyberpunk (High Tech / Low Life)', 'Vaporwave (80s / Estatuas / Neón rosa)', 
  'Dreamcore (Nostalgia Surrealista)', 'Solarpunk (Eco-Futurismo Brillante)', 
  'Film Noir (Blanco y Negro de detectives)', 'Expresionismo Alemán (Sombras pintadas)', 
  'Photorealistic (Fotorrealismo extremo)', 'Anime', '1980s Retro', 
  'Espacio Liminal (Backrooms/Soledad)', 'Synthwave (Outrun/Grid)', 
  'Poolcore (Piscinas/Azulejos blancos)', 'Weirdcore (Texto oculto/Low Res)', 
  'Cottagecore (Campo inglés romántico)', 'Cassette Futurism (UI Alien/Tecnología retro 70s)', 
  'Y2K (Cromo/Azul/2000s MTV)', 'Surrealismo (Estilo Dalí)', 
  'Impresionismo (Luz suave/Pinceladas)', 'Brutalismo (Hormigón crudo)', 
  'Barroco (Dramático e iluminado)', 'Rococó (Ornamentado/Exceso)', 
  'Modern Day', '1920s Roaring', '1950s Americana', 'Medieval Fantasy (Fantasía Oscura)', 
  'Post-Apocalyptic (Wasteland)'
];

export const DEFAULT_NEGATIVE_PROMPT = "bad quality, blurry, distorted, watermark, text overlay, ugly, deformed, artifacts, overexposed, underexposed, amateur, shaky cam, boring composition, unnatural lighting";

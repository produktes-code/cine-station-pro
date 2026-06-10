# 🎬 CineStation Pro 1.0

<div align="center">

![CineStation Pro](https://img.shields.io/badge/CineStation-Pro%201.0-e11d48?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNMjMgMTlDMjMgMjAuMSAyMi4xIDIxIDIxIDIxSDNDMS45IDIxIDEgMjAuMSAxIDE5VjhDMSA2LjkgMS45IDYgMyA2SDdMMSAzSDZMMTEgNkgxM0wxOCAzSDIzTDIxIDZIMjNDMjQuMSA2IDI1IDYuOSAyNSA4VjE5WiIvPjwvc3ZnPg==)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)

**El estudio definitivo de generación y renderizado de vídeo e imagen cinematográfica por Inteligencia Artificial**

[Despliegue Local](#-despliegue-local) · [Características](#-características-principales) · [Manual de Uso](#-manual-de-uso) · [Soporte Multi-idioma](#-soporte-multi-idioma-nativo) · [Sobre el Autor](#-sobre-el-autor)

</div>

---

## 📖 Concepto y Descripción

**CineStation Pro** es una consola de desarrollo creativo y un motor de prompts cinemáticos diseñado específicamente para directores de fotografía, guionistas, artistas de VFX y cineastas que integran Inteligencia Artificial generativa en sus flujos de trabajo de preproducción.

La aplicación opera como un **puente técnico avanzado e intuitivo** (estilo DaVinci Resolve) que traduce conceptos narrativos simples en blueprints técnicos estructurados de nivel Hollywood. La arquitectura modular de CineStation Pro permite orquestar tomas detallando cámaras, ópticas, movimientos, iluminación física y emulación de película fotográfica, optimizando la salida final para su consumo en modelos generativos de última generación.

---

## ✨ Características Principales

### ⚙️ Offline Parameter Compiler
* **Gestión de Ópticas:** Selección precisa de cámaras (IMAX, Super 35, VistaVision, ARRI Alexa 65) y objetivos (desde 8mm ojo de pez hasta 400mm teleobjetivo, incluyendo lentes vintage como Helios 44-2, Cooke Anamorphic y Zeiss Super Speeds).
* **Control de Aperturas (f-stop):** Regulación desde f/0.95 para desenfoques extremos hasta f/22 para foco infinito.
* **Mixer de Iluminación:** Configuración de estilos (Claroscuro, Rembrandt, Neon Noir), calidad de luz, modificadores (Softbox, Fresnel, Gobo) y fuentes lumínicas reales (Tungsteno, Skypanels, Astera Tubes).
* **Dirección de Arte y Atmósfera:** Selección de climas, emulaciones de películas clásicas (Kodak Portra, CineStill 800T, Fuji 3513) y efectos físicos en set (God Rays, Haze, cáusticas).

### 🧠 Multi-API Dynamic LLM Routing (Cerebro IA)
* **Soporte Multi-Motor:** Integración directa por API del lado del cliente para usar **Gemini 1.5**, **Claude 3.5** y **GPT-4o** de forma nativa.
* **Compilador Semántico:** Transforma ideas básicas e informales en estructuras de metadatos JSON procesadas por IA, generando prompts detallados estructurados en inglés.

### 🎥 Replicate Cloud Render Engine
* **Generador Cloud Integrado:** Conectado directamente a la API de Replicate con soporte nativo para **Tencent Hunyuan Video** (el modelo SOTA open source de generación de vídeo) y otros modelos líderes.
* **Sin Cuotas Intermedias:** Utiliza tu propia API key de Replicate, pagando únicamente por los segundos de render consumidos en la nube.

### 📺 Neural Render Output Viewer
* **Reproductor Nativo:** Previsualiza y reproduce las simulaciones de render en vídeo directamente dentro del panel derecho de la consola de trabajo.
* **Consola de Salida:** Muestra en tiempo real los tokens y prompts positivos/negativos generados, permitiendo copiarlos con un solo clic.

---

## 🛠️ Construido Con

| Tecnología | Versión | Propósito |
|---|---|---|
| [React](https://react.dev/) | v19 | Biblioteca principal de interfaz de usuario |
| [Vite](https://vite.dev/) | v8 | Servidor de desarrollo ultrarrápido y bundler |
| [TailwindCSS](https://tailwindcss.com/) | v4 | Framework CSS para estructuración y estilos reactivos |
| [Lucide React](https://lucide.dev/) | v1.17 | Set de iconos SVG optimizados |
| [JetBrains Mono](https://www.jetbrains.com/legalnotice/fonts/) | – | Tipografía de consola y cajas de prompt |
| [Inter](https://fonts.google.com/specimen/Inter) | – | Tipografía de UI para lecturas extensas |

---

## 📁 Estructura del Proyecto

```
CineStation-Pro/
├── public/
│   └── favicon.svg                 # Icono del sitio
├── src/
│   ├── data/
│   │   └── cinemaLibrary.js        # Librería de 700+ parámetros cinemáticos
│   ├── assets/                     # Recursos estáticos
│   ├── CineStation.jsx             # Componente UI y motor principal del DAW
│   ├── App.jsx                     # Componente raíz de React
│   ├── App.css                     # Estilos generales del DAW
│   ├── index.css                   # Diseño global y temas DaVinci Resolve Dark
│   └── main.jsx                    # Punto de entrada de React
├── index.html                      # HTML principal con SEO optimizado
├── vite.config.js                  # Configuración de build de Vite
├── package.json                    # Dependencias y scripts de desarrollo
├── Iniciar_CineStation.command     # Script de inicio rápido en macOS
└── .gitignore                      # Exclusiones de Git
```

---

## 🚀 Despliegue Local

### Requisitos Previos
* [Node.js](https://nodejs.org/) v18.0 o superior (Recomendado v20 LTS)
* npm (incluido con Node.js)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/produktes-code/cine-station-pro.git
cd cine-station-pro

# 2. Instalar dependencias
npm install

# 3. Arrancar servidor de desarrollo
npm run dev
```

La consola se abrirá en [http://localhost:5173](http://localhost:5173).

---

## 🍎 Inicio Rápido en macOS

Para usuarios en macOS, CineStation Pro incluye un launcher automatizado:

1. Asigna permisos de ejecución al archivo script (solo la primera vez):
   ```bash
   chmod +x Iniciar_CineStation.command
   ```
2. Haz doble clic sobre `Iniciar_CineStation.command` en el Finder, o ejecútalo desde terminal:
   ```bash
   ./Iniciar_CineStation.command
   ```

Este comando compilará el servidor de distribución local y abrirá automáticamente tu navegador en la aplicación.

---

## 📦 Build de Producción

Para compilar la aplicación optimizada para producción (los archivos listos se generarán en la carpeta `dist/`):

```bash
npm run build
```

---

## 🌍 Soporte Multi-idioma Nativo

CineStation Pro cuenta con traducción instantánea de la interfaz a los siguientes idiomas principales:

* 🇪🇸 **Español**
* 🇬🇧 **Inglés**
* 🇩🇪 **Alemán**
* 🇷🇺 **Ruso**
* 🇯🇵 **Japonés**
* 🇺🇦 **Ucraniano**
* 🇨🇳 **Chino**

El selector de idioma se encuentra en la cabecera del programa. Al cambiar el idioma de la interfaz, el motor de IA adaptará las instrucciones del sistema para devolver descripciones visuales en tu idioma seleccionado, mientras compila el prompt técnico en inglés para asegurar máxima compatibilidad con modelos generativos (Midjourney, Sora, Wan 2.2).

---

## 📋 Manual de Uso

📥 **[Descargar Manual Extensivo y Tutorial en PDF](./manual.pdf)**

1. **Ajuste del Motor (Engine Config):** Haz clic en el botón superior derecho para ingresar tu API Key de tu proveedor preferido (Gemini, Claude, GPT-4o) y tu clave de Replicate si deseas renders en la nube.
2. **Describe tu Toma:** Escribe una idea conceptual en la caja superior del panel izquierdo.
3. **Configura los Parámetros:** Navega a través de las pestañas **CAMERA**, **LIGHTING**, **ART DIR** y **OUTPUT** para afinar los aspectos técnicos de la fotografía y el formato del plano.
4. **Compila el Prompt:**
    * **Manual:** Utiliza `MANUAL COMPILE` para unir tus parámetros en un blueprint técnico.
    * **IA (Init AI):** Envía la información al LLM seleccionado para estructurar una toma cinematográfica enriquecida semánticamente.
5. **Renderiza (Opcional):** Si has provisto una API Key de Replicate, haz clic en **Send to Replicate Node** para renderizar tu prompt en el modelo de vídeo Wan 2.2 / Hunyuan Video y previsualizar la toma directamente en la pantalla de la consola.

---

## 📸 Capturas de Pantalla

| Consola Principal | Motor Paramétrico |
|---|---|
| Vista general de la aplicación | Interfaz de configuración técnica |

| Reproductor de Render | Cerebro IA |
|---|---|
| Visor de resultados de IA Generativa | Compilador de Prompts enriquecidos |

*(Nota: Añade las imágenes arrastrando los archivos a tu repositorio y reemplazando estas celdas)*

---

## 🗺️ Roadmap

- [x] Soporte multi-idioma nativo para 7 idiomas.
- [ ] Soporte para guardar presets de estilo personalizados.
- [ ] Integración de LTX-2 y Runway Gen-3 APIs locales.
- [ ] Exportación de guiones gráficos (Storyboards) en formato PDF.
- [ ] Base de datos persistente local en navegador para tomas generadas.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo de licencia para más detalles.

---

## 👤 Sobre el Autor

<div align="center">

**Jesús Ferrer García · CHUS BZN**

*Arquitecto de Sistemas Audiovisuales & Desarrollador especializado en IA Generativa*

33 años de experiencia liderando la implementación y optimización de infraestructuras críticas dentro del sector de televisión, broadcast, cine y entornos urbanos inteligentes en Barcelona. Combina un conocimiento técnico riguroso de la industria tradicional con el desarrollo de soluciones de software de vanguardia destinadas a potenciar la creatividad audiovisual a través de la Inteligencia Artificial.

[![Portfolio](https://img.shields.io/badge/Portfolio-chusbzn.com-00a3ff?style=for-the-badge)](https://www.chusbzn.com)
[![GitHub](https://img.shields.io/badge/GitHub-produktes--code-181717?style=for-the-badge&logo=github)](https://github.com/produktes-code)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jesús%20Ferrer-0077b5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/jesus-ferrer-garcia)

</div>

---

<div align="center">

Diseñado con ❤️ por **CHUS BZN** — *"El cine es mentira a 24 fotogramas por segundo. La IA lo hace a 1.000."*

</div>

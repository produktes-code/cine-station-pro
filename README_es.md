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

🌐 **Leer en:** [🇬🇧 English](README.md) | **🇪🇸 Español** | [🇩🇪 Deutsch](README_de.md) | [🇷🇺 Русский](README_ru.md) | [🇯🇵 日本語](README_ja.md) | [🇺🇦 Українська](README_uk.md) | [🇨🇳 中文](README_zh.md)

---

## 🎯 La Visión (Introducción)

La revolución del video generativo (Sora, Runway) trajo consigo un problema masivo: el caos en el control. Al usar prompts de texto simple, los creadores perdían el control físico y óptico de la escena, delegando decisiones cruciales de iluminación y cinematografía a las 'alucinaciones' del motor. CineStation Pro nace para devolverle el control al Director de Fotografía. Lo hemos diseñado no como una app, sino como una consola de operaciones paramétrica. Actúa como un traductor hiper-preciso: tú introduces la física de la cámara (Vectores de Pan, Ópticas anamórficas de los 70, Luz HMI), y nuestra arquitectura compila un payload neuronal exacto. Es el puente definitivo entre el arte del cine tradicional y los modelos de difusión masivos.

> [!NOTE]
> Desarrollado por **produktes-code** y **Jesús Ferrer (CHUS BZN)** para establecer estándares profesionales en la ingeniería comercial.

---

## 📸 Interface / Ergonomics

![Desktop Interface](docs/screenshots/screenshot-Desktop.png)


---

## ⚙️ Masterclass de Parámetros (Funcionalidades)

- **Consola de Vectores Físicos (Pan/Tilt/Roll)**: Los motores de IA no entienden bien de encuadres si no hablas su idioma matemático. Hemos programado deslizadores que empaquetan métricas de movimientos de cámara puramente físicos ('Whip Pan', 'Tilt Up'). ¿Por qué? Porque un barrido rápido (Whip Pan) genera un motion blur específico que añade frenetismo y urgencia a la escena, algo imposible de lograr con un prompt genérico.
- **Simulador de Ópticas Analógicas Reales**: La estética digital moderna suele ser estéril y excesivamente nítida. Al integrar perfiles como la lente 'Panavision C-Series', le ordenamos a la IA que simule no solo el cristal cilíndrico, sino sus imperfecciones inherentes: los flares azules horizontales y el bokeh ovalado. Esto le da alma orgánica a la imagen generada.
- **Arquitectura Modular de Iluminación**: La luz narra la historia. En lugar de pedir "un lugar oscuro", el director puede elegir un 'Arri Skypanel' o 'Tungsten Lamp'. Esto altera drásticamente el renderizado de la piel y el contraste volumétrico, utilizando términos de Grip & Gaffer que obligan al modelo a comportarse como un set de rodaje real.
- **Procesamiento PNL Híbrido**: Sabemos que los creadores piensan en imágenes, no en código. Por eso, el input de texto libre pasa por un parser de Inteligencia Artificial propio que estructura gramaticalmente la frase, uniéndola a los parámetros físicos antes de enviarla. Es ingeniería de prompt transparente para el usuario.
- **Infraestructura Backend Asíncrona (Celery/Redis)**: ¿Para qué usar Celery en una app de video? Porque el renderizado de video IA o la transcodificación FFmpeg congelaría cualquier interfaz bloqueante. Hemos diseñado una arquitectura backend donde la UI de React simplemente despacha el trabajo; los workers asíncronos sufren la carga en segundo plano, devolviendo un software robusto y fluido que jamás se colapsa en producción.

---

## 🛡️ Arquitectura de Blindaje (Seguridad)

En el despliegue Retail y Enterprise, una caída de sistema no es un bug, es pérdida de capital. Hemos diseñado una coraza defensiva (Shielding) que emula las mejores prácticas de DevSecOps:

• **Ingeniería Anti-Flood (Rate limiting)**: Los algoritmos asíncronos estrangulan cualquier pico anómalo de peticiones mediante middlewares de limitación, evadiendo colapsos de Thread Pool.
• **Cristalografía Binaria (Magic Bytes)**: Validar un '.mp3' en el nombre es trivial para inyectar un payload malicioso. El sistema abre el encabezado del archivo y verifica la secuencia hexadecimal nativa para certificar la integridad del contenedor.
• **Sanidad de RAM (Limitador 2 GB)**: Los ataques OOM (Out Of Memory) destruyen servidores. Rechazamos implacablemente en el umbral de subida cualquier peso atípico.

---

## 🚀 Despliegue Técnico (Instalación)

El proceso de despliegue de esta herramienta responde a un imperativo de la industria: en un entorno de estudio o producción, el tiempo invertido en configurar dependencias es tiempo perdido. Hemos empaquetado una arquitectura 'Zero-Friction' compilando bibliotecas DSP, los binarios de Python y los renders directamente en el núcleo de la aplicación.

• **Sistemas macOS (Arquitectura unificada)**: El binario `.dmg` garantiza portabilidad absoluta. Atención: Al no contar con un certificado de desarrollador de pago para el Notarization Service de Apple, macOS Gatekeeper marcará el binario con cuarentena. Como ingenieros, sabemos que el método legítimo de bypass local es el 'Clic derecho -> Abrir'. No es un fallo, es el flujo estándar de software open-source de alto rendimiento.
• **Sistemas Windows**: El payload instalador auto-configura el entorno PATH de Windows de manera silenciosa, evitando conflictos con instalaciones de Python preexistentes en tu máquina.

---

## 📚 Documentación y Manuales

Para una masterclass técnica exhaustiva, guías de resolución de problemas y detalles completos de la API, por favor descarga nuestro manual oficial:

📥 **[USER_MANUAL.pdf (PDF - 7 Languages)](docs/USER_MANUAL.pdf)**


---

## ⚖️ Manifiesto de Ingeniería, Créditos y Licencia

Este software es el resultado manifiesto de la profunda ingeniería concebida y articulada desde los laboratorios de produktes-code en unión indisociable con el Ingeniero Jesús Ferrer García (CHUS BZN).

Nos negamos a ofrecer cajas negras simplificadas. Entregamos consolas paramétricas absolutas. Licenciado bajo restricciones de propiedad intelectual y los más estrictos márgenes open source (CC BY-NC-SA 4.0). ESTÁNDAR CORPORATIVO - RETAIL READY. GRADO INGENIERÍA CERTIFICADO.



⚠️ Aviso para usuarios de macOS: Al abrir la aplicación por primera vez, macOS puede mostrar un aviso de seguridad. Solución: haz clic derecho sobre la aplicación y selecciona "Abrir", luego haz clic en "Abrir" en el diálogo. Si ya fue bloqueada, ve a Preferencias del Sistema > Privacidad y Seguridad y haz clic en "Abrir de todos modos".
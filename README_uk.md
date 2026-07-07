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

🌐 **Читати українською:** [🇬🇧 English](README.md) | [🇪🇸 Español](README_es.md) | [🇩🇪 Deutsch](README_de.md) | [🇷🇺 Русский](README_ru.md) | [🇯🇵 日本語](README_ja.md) | **🇺🇦 Українська** | [🇨🇳 中文](README_zh.md)

---

## 🎯 Бачення

Революція генеративного відео принесла проблему: хаос у контролі. Творці втратили фізичний контроль над сценою. CineStation Pro була створена, щоб повернути контроль оператору. Вона діє як консоль параметричних операцій та точний перекладач фізики камери в нейронні корисні навантаження.

> [!NOTE]
> Developed by **produktes-code** and **Jesús Ferrer (CHUS BZN)** to establish professional standards in commercial engineering.

---

## 📸 Interface / Ergonomics

![Desktop Interface](docs/screenshots/screenshot-Desktop.png)


---

## ⚙️ Майстер-клас параметрів

- **Консоль фізичних векторів**: Повзунки для рухів, як 'Whip Pan', створюють специфічне розмиття руху.
- **Симулятор оптики**: Емулює об'єктиви 'Panavision C-Series' для органічних недоліків, таких як сині відблиски.
- **Модульне освітлення**: Вибір 'Arri Skypanel' кардинально змінює рендеринг шкіри.
- **Гібридна обробка NLP**: Прозора оптимізація підказок, що структурує вільний текст.
- **Асинхронний бекенд**: Запобігає зависанню інтерфейсу за допомогою воркерів Celery/Redis.

---

## 🛡️ Архітектура екранування

Екранування:

• Anti-Flood: Блокування сплесків запитів.
• Magic Bytes: Гексадецимальна перевірка файлів.
• 2 GB Limit: Захист оперативної пам'яті.

---

## 🚀 Технічне розгортання та встановлення CI/CD

Щоб гарантувати абсолютну математичну точність і зберегти нашу архітектуру Python DSP, ми тепер використовуємо **Автоматизований CI/CD через GitHub Actions**.
Замість локальної збірки `.exe`, наш вихідний код компілюється нативно в чистих хмарних середовищах Windows та macOS.

#### Як завантажити та встановити
1. Перейдіть до розділу **[Releases](https://github.com/produktes-code/CineStation-Pro/releases)** цього репозиторію.
2. Завантажте останню автоматизовану збірку для вашої ОС:
   - `CineStation Pro Setup.exe` (Windows)
   - `CineStation Pro.dmg` (macOS)

### 🍎 Користувачі macOS (Gatekeeper)
Через відсутність платного сертифіката розробника Apple, Gatekeeper помістить бінарний файл у карантин. Законний локальний обхід: **Правий клік по додатку -> Відкрити** (не подвійний клік).

### 🪟 Користувачі Windows (SmartScreen)
Windows Defender може показати синій екран попередження. Натисніть **'Докладніше'**, а потім **'Виконати в будь-якому випадку'**.

## 📚 Документація та посібники

Завантажте наш офіційний посібник:

📥 **[USER_MANUAL.pdf (PDF - 7 Languages)](docs/USER_MANUAL.pdf)**


---

## ⚖️ Інженерний маніфест

Розроблено produktes-code та Jesus Ferrer (CHUS BZN). CC BY-NC-SA 4.0. CORPORATE STANDARD.



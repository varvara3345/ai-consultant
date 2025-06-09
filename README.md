# AI-консультант для малого бизнеса

Десктопное приложение для генерации маркетинговых планов с использованием искусственного интеллекта.

## Особенности

- Генерация маркетинговых планов на русском и английском языках
- Десктопное приложение на Electron
- Бэкенд на Flask с интеграцией Ollama
- Современный пользовательский интерфейс

## Установка

1. Клонируйте репозиторий:
```bash
git clone [url-репозитория]
cd ai-consultant
```

2. Создайте и активируйте виртуальное окружение:
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate
```

3. Установите зависимости Python:
```bash
pip install -r requirements.txt
```

4. Установите зависимости Node.js:
```bash
npm install
```

5. Установите и запустите Ollama:
- Скачайте Ollama с [ollama.ai](https://ollama.ai/download)
- Установите и запустите приложение
- Выполните команду: `ollama pull llama2`

## Запуск

1. Запустите бэкенд:
```bash
cd backend
python app.py
```

2. В отдельном терминале запустите десктопное приложение:
```bash
npm start
```

## Структура проекта

```
ai-consultant/
│
├── desktop-app/        # Electron приложение
│   ├── main.js        # Основной процесс
│   └── preload.js     # Предзагрузка
│
├── frontend/          # Фронтенд
│   ├── index.html    # HTML
│   ├── script.js     # JavaScript
│   └── styles.css    # Стили
│
├── backend/           # Бэкенд
│   └── app.py        # Flask API
│
├── package.json      # Конфигурация Electron
├── requirements.txt  # Зависимости Python
└── README.md        # Документация
```

## Использование

1. Запустите приложение
2. Введите описание вашего бизнеса на русском или английском языке
3. Нажмите кнопку "Получить маркетинг-план"
4. Получите сгенерированный план на том же языке, на котором был задан вопрос

## Требования

- Python 3.11+
- Node.js 18+
- Ollama
- Windows 10/11, macOS или Linux 
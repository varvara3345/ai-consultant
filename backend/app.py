from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama
import re

app = Flask(__name__)
CORS(app)  # Включаем поддержку CORS

def detect_language(text):
    # Улучшенный детектор языка
    russian_pattern = re.compile('[а-яА-ЯёЁ]')
    english_pattern = re.compile('[a-zA-Z]')
    
    has_russian = bool(russian_pattern.search(text))
    has_english = bool(english_pattern.search(text))
    
    # Если есть русские буквы, считаем что это русский
    if has_russian:
        return 'russian'
    # Если есть английские буквы и нет русских, считаем что это английский
    elif has_english:
        return 'english'
    # По умолчанию возвращаем русский
    return 'russian'

def contains_russian(text):
    russian_pattern = re.compile('[а-яА-ЯёЁ]')
    return bool(russian_pattern.search(text))

def get_prompt(description, language):
    if language == 'russian':
        return f"""Ты - опытный русскоязычный бизнес-консультант. Твоя задача - написать подробный маркетинг-план на русском языке.

ВНИМАНИЕ: Ты ОБЯЗАН отвечать ТОЛЬКО на русском языке. Использование английского языка в ответе ЗАПРЕЩЕНО.

Опиши маркетинг-план для следующего бизнеса:
{description}

План должен быть написан на русском языке и включать:
1. Анализ целевой аудитории
2. Маркетинговые каналы
3. Бюджетные рекомендации
4. Конкретные шаги по продвижению

ПОВТОРЯЮ: отвечай СТРОГО на русском языке, без использования английских слов или фраз."""
    else:
        return f"""You are an experienced English-speaking business consultant. Your task is to write a detailed marketing plan in English.

IMPORTANT: You MUST respond ONLY in English. Using Russian language in the response is PROHIBITED.

Describe a marketing plan for the following business:
{description}

The plan should be written in English and include:
1. Target audience analysis
2. Marketing channels
3. Budget recommendations
4. Specific promotion steps

REPEAT: respond STRICTLY in English, without using any Russian words or phrases."""

def ensure_language(response, expected_language):
    if expected_language == 'russian' and not contains_russian(response):
        return "Извините, произошла ошибка. Пожалуйста, попробуйте еще раз."
    elif expected_language == 'english' and contains_russian(response):
        return "Sorry, an error occurred. Please try again."
    return response

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    description = data.get('description', '')
    
    # Определяем язык ввода
    language = detect_language(description)
    
    # Получаем соответствующий промпт
    prompt = get_prompt(description, language)
    
    try:
        # Получаем ответ от модели
        response = ollama.generate('llama2', prompt)
        marketing_plan = response['response']
        
        # Проверяем язык ответа
        marketing_plan = ensure_language(marketing_plan, language)
        
        return jsonify({'result': marketing_plan})
    except Exception as e:
        error_message = str(e)
        if language == 'russian':
            error_message = f"Произошла ошибка при генерации плана: {error_message}"
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('generate-btn');
  const resultElem = document.getElementById('result');
  const textarea = document.getElementById('description');

  function showLoading() {
    resultElem.innerHTML = '<div class="loading">Генерация маркетинг-плана...</div>';
    button.disabled = true;
  }

  function showError(message) {
    resultElem.innerHTML = `<div class="error">${message}</div>`;
    button.disabled = false;
  }

  function showSuccess(content) {
    resultElem.innerHTML = `<div class="success">${content}</div>`;
    button.disabled = false;
  }

  button.addEventListener('click', async () => {
    const description = textarea.value.trim();

    if (!description) {
      showError('Пожалуйста, опишите ваш бизнес');
      return;
    }

    showLoading();

    try {
      const response = await fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка сервера');
      }

      const data = await response.json();
      showSuccess(data.result);
    } catch (err) {
      showError(err.message);
    }
  });

  // Очистка результата при изменении текста
  textarea.addEventListener('input', () => {
    if (resultElem.innerHTML) {
      resultElem.innerHTML = '';
    }
  });
});

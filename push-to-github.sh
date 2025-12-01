#!/bin/bash

# Скрипт для пуша кода на GitHub
# Использование: ./push-to-github.sh YOUR_TOKEN

TOKEN=$1

if [ -z "$TOKEN" ]; then
    echo "Использование: ./push-to-github.sh YOUR_TOKEN"
    echo ""
    echo "Если у вас еще нет токена:"
    echo "1. Откройте https://github.com/settings/tokens"
    echo "2. Нажмите 'Generate new token (classic)'"
    echo "3. Выберите scope 'repo'"
    echo "4. Скопируйте токен и используйте его здесь"
    exit 1
fi

# Устанавливаем remote с токеном
git remote set-url origin https://startupecosystemcase:${TOKEN}@github.com/startupecosystemcase/chefup.git

# Пушим код
echo "Отправка кода на GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Код успешно отправлен на GitHub!"
    echo "Репозиторий: https://github.com/startupecosystemcase/chefup"
    echo ""
    echo "Следующий шаг: подключите репозиторий к Netlify для деплоя"
else
    echo ""
    echo "❌ Ошибка при отправке кода"
    echo "Проверьте, что токен правильный и имеет права 'repo'"
fi


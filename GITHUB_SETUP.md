# Инструкция по публикации на GitHub

## Шаг 1: Создайте Personal Access Token на GitHub

1. Откройте GitHub и войдите в аккаунт `startupecosystemcase`
2. Перейдите в **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Нажмите **Generate new token** → **Generate new token (classic)**
4. Заполните:
   - **Note:** `ChefUp deployment`
   - **Expiration:** Выберите срок действия (например, 90 дней)
   - **Scopes:** Отметьте `repo` (полный доступ к репозиториям)
5. Нажмите **Generate token**
6. **ВАЖНО:** Скопируйте токен сразу (он показывается только один раз!)

## Шаг 2: Запушите код на GitHub

Выполните команду (замените `YOUR_TOKEN` на токен из шага 1):

```bash
cd /Users/savvabenevsky/Documents/chefup
git remote set-url origin https://startupecosystemcase:YOUR_TOKEN@github.com/startupecosystemcase/chefup.git
git push -u origin main
```

Или используйте интерактивный способ:

```bash
git push -u origin main
```

При запросе:
- **Username:** `startupecosystemcase`
- **Password:** Вставьте ваш Personal Access Token (не пароль от аккаунта!)

## Альтернативный способ: SSH ключ

Если у вас настроен SSH ключ на GitHub:

```bash
git remote set-url origin git@github.com:startupecosystemcase/chefup.git
git push -u origin main
```

## После успешного пуша

Код будет доступен по адресу: https://github.com/startupecosystemcase/chefup

Затем можно подключить репозиторий к Netlify для автоматического деплоя.


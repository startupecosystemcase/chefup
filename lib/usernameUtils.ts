/**
 * Утилиты для работы с username
 */

/**
 * Генерирует уникальный username с хешем ID
 */
export function generateUsernameWithHash(baseUsername: string, userId: string): string {
  const hash = userId.slice(0, 4).toLowerCase()
  return `${baseUsername}_${hash}`
}

/**
 * Проверяет доступность username
 * В реальном приложении здесь будет запрос к серверу
 */
export function isUsernameAvailable(username: string): boolean {
  // Mock проверка - в реальном приложении будет API запрос
  const takenUsernames = ['admin', 'chef', 'test', 'user']
  return !takenUsernames.includes(username.toLowerCase())
}

/**
 * Предлагает альтернативные варианты username
 */
export function suggestUsernameAlternatives(username: string, userId: string): string[] {
  const suggestions: string[] = []
  
  // Добавляем числа
  for (let i = 1; i <= 5; i++) {
    suggestions.push(`${username}${i}`)
  }
  
  // Добавляем вариант с хешем
  suggestions.push(generateUsernameWithHash(username, userId))
  
  return suggestions
}

/**
 * Валидация username для Telegram
 */
export function validateTelegramUsername(username: string): boolean {
  // Telegram username: 5-32 символа, только латиница, цифры и подчёркивание
  const telegramRegex = /^[a-zA-Z0-9_]{5,32}$/
  return telegramRegex.test(username)
}


/**
 * Конфигурация путей к изображениям
 * 
 * Для использования локальных изображений:
 * - Загрузите файлы в папку public/cities/
 * - Название файла должно соответствовать названию города (например: astana.jpg, almaty.jpg)
 * - Используйте относительные пути: /cities/astana.jpg
 * 
 * Для использования изображений из Google Диска:
 * 1. Откройте файл на Google Диске
 * 2. Нажмите "Поделиться" → "Скопировать ссылку"
 * 3. Извлеките ID файла из URL (между /d/ и /view)
 * 4. Используйте формат: https://drive.google.com/uc?export=view&id=FILE_ID
 */

export const imagePaths = {
  cities: {
    // Локальные изображения из public/cities/ с префиксом gorod_
    astana: '/cities/gorod_astana.jpeg',
    almaty: '/cities/gorod_almaty.jpg',
    tashkent: '/cities/gorod_taskent.jpg',
    bishkek: '/cities/gorod_biskek.jpg',
    baku: '/cities/gorod_baku.jpg',
    tbilisi: '/cities/gorod_tbilisi.jpeg',
    shymkent: '/cities/gorod_shymkent.jpg',
    aktobe: '/cities/gorod_aktobe.jpg',
    batumi: '/cities/gorod_batumi.webp',
  },
  team: {
    muhammad: 'https://drive.google.com/uc?export=view&id=1BEl4GLzVTTFA6tsBmTdZ0VYw3_2gX024',
    savva: 'https://drive.google.com/uc?export=view&id=1Rr3dw1yZTiIhCYB4fe4I7lq6Zd7ijMrL',
  },
  partners: {
    vkusvill: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_VKUSVILL',
    choco: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_CHOCO',
    ryadom: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_RYADOM',
    yandex: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_YANDEX',
    airba: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_AIRBA',
    urbo: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_URBO',
  },
  hq: '/cities/astana shtab-kvartira.jpg',
}

/**
 * Конфигурация путей к изображениям
 * 
 * Для использования изображений из Google Диска:
 * 1. Откройте файл на Google Диске
 * 2. Нажмите "Поделиться" → "Скопировать ссылку"
 * 3. Извлеките ID файла из URL (между /d/ и /view)
 * 4. Используйте формат: https://drive.google.com/uc?export=view&id=FILE_ID
 * 
 * Или загрузите изображения в папку public/ и используйте относительные пути
 */

export const imagePaths = {
  cities: {
    astana: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_ASTANA',
    almaty: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_ALMATY',
    tashkent: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_TASHKENT',
    bishkek: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_BISHKEK',
    baku: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_BAKU',
    tbilisi: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_TBILISI',
    shymkent: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_SHYMKENT',
    aktobe: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_AKTOBE',
    batumi: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_BATUMI',
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
  hq: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_HQ',
}


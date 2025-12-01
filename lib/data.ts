export const cities = [
  { value: 'astana', label: 'Астана' },
  { value: 'almaty', label: 'Алматы' },
  { value: 'shymkent', label: 'Шымкент' },
  { value: 'karaganda', label: 'Караганда' },
  { value: 'aktobe', label: 'Актобе' },
  { value: 'taraz', label: 'Тараз' },
  { value: 'pavlodar', label: 'Павлодар' },
  { value: 'ust-kamenogorsk', label: 'Усть-Каменогорск' },
  { value: 'semey', label: 'Семей' },
  { value: 'atyrau', label: 'Атырау' },
  { value: 'kostanay', label: 'Костанай' },
  { value: 'kyzylorda', label: 'Кызылорда' },
  { value: 'petropavl', label: 'Петропавловск' },
  { value: 'oral', label: 'Уральск' },
  { value: 'turkestan', label: 'Туркестан' },
  { value: 'tashkent', label: 'Ташкент' },
  { value: 'samarkand', label: 'Самарканд' },
  { value: 'bukhara', label: 'Бухара' },
  { value: 'andijan', label: 'Андижан' },
  { value: 'namangan', label: 'Наманган' },
  { value: 'fergana', label: 'Фергана' },
  { value: 'dushanbe', label: 'Душанбе' },
  { value: 'khujand', label: 'Худжанд' },
  { value: 'bishkek', label: 'Бишкек' },
  { value: 'osh', label: 'Ош' },
  { value: 'yerevan', label: 'Ереван' },
  { value: 'gyumri', label: 'Гюмри' },
  { value: 'tbilisi', label: 'Тбилиси' },
  { value: 'batumi', label: 'Батуми' },
] as const

export const ageRanges = [
  { value: '16-20', label: '16 — 20' },
  { value: '21-25', label: '21 — 25' },
  { value: '26-30', label: '26 — 30' },
  { value: '31-35', label: '31 — 35' },
  { value: '36-40', label: '36 — 40' },
  { value: '41-45', label: '41 — 45' },
  { value: '46-50', label: '46 — 50' },
  { value: '51-55', label: '51 — 55' },
  { value: '56+', label: '56+' },
] as const

export const experienceRanges = [
  { value: 'none', label: 'Без опыта' },
  { value: '1-3', label: 'От 1 до 3 лет' },
  { value: '3-5', label: 'От 3 до 5 лет' },
  { value: '5-10', label: 'От 5 до 10 лет' },
  { value: '10+', label: 'Более 10 лет' },
] as const

export const positions = [
  { value: 'chef', label: 'Шеф-повар' },
  { value: 'sous-chef', label: 'Су-шеф' },
  { value: 'cook', label: 'Повар' },
  { value: 'pastry-chef', label: 'Кондитер' },
  { value: 'bartender', label: 'Бармен' },
  { value: 'waiter', label: 'Официант' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'not-working', label: 'Не работаю' },
] as const

export const educationLevels = [
  { value: 'secondary', label: 'Среднее образование' },
  { value: 'vocational', label: 'Среднее специальное' },
  { value: 'higher', label: 'Высшее образование' },
  { value: 'courses', label: 'Курсы повышения квалификации' },
] as const

export const ranks = [
  { value: '1', label: 'Повар 1 разряда' },
  { value: '2', label: 'Повар 2 разряда' },
  { value: '3', label: 'Повар 3 разряда' },
  { value: '4', label: 'Повар 4 разряда' },
  { value: '5', label: 'Повар 5 разряда' },
  { value: '6', label: 'Повар 6 разряда' },
  { value: 'none', label: 'Нет разряда' },
] as const

export const certificates = [
  { value: 'none', label: 'Нет сертификатов' },
  { value: 'haccp', label: 'HACCP' },
  { value: 'iso', label: 'ISO 22000' },
  { value: 'culinary-school', label: 'Кулинарная школа' },
  { value: 'international', label: 'Международные сертификаты' },
] as const

export const cuisines = [
  { value: 'central-asian', label: 'Среднеазиатская кухня' },
  { value: 'european', label: 'Европейская кухня' },
  { value: 'asian', label: 'Азиатская кухня' },
  { value: 'italian', label: 'Итальянская кухня' },
  { value: 'japanese', label: 'Японская кухня' },
  { value: 'french', label: 'Французская кухня' },
  { value: 'russian', label: 'Русская кухня' },
  { value: 'caucasian', label: 'Кавказская кухня' },
  { value: 'fusion', label: 'Fusion' },
  { value: 'fast-food', label: 'Фаст-фуд' },
] as const

export const venueFormats = [
  { value: 'restaurant', label: 'Ресторан' },
  { value: 'cafe', label: 'Кафе' },
  { value: 'bistro', label: 'Бистро' },
  { value: 'bar', label: 'Бар' },
  { value: 'hotel', label: 'Отель' },
  { value: 'catering', label: 'Кейтеринг' },
  { value: 'fast-food', label: 'Фаст-фуд' },
  { value: 'bakery', label: 'Пекарня' },
] as const

export const goals = [
  { value: 'find-job', label: 'Найти работу' },
  { value: 'network', label: 'Нетворкинг' },
  { value: 'learn', label: 'Обучение' },
  { value: 'career-growth', label: 'Карьерный рост' },
  { value: 'share-experience', label: 'Поделиться опытом' },
] as const

export const additionalSkills = [
  { value: 'ttk', label: 'Приготовление по ТТК' },
  { value: 'cost-control', label: 'Контроль себестоимости' },
  { value: 'menu-development', label: 'Разработка меню' },
  { value: 'team-management', label: 'Управление командой' },
  { value: 'inventory', label: 'Управление складом' },
  { value: 'food-safety', label: 'Пищевая безопасность' },
  { value: 'presentation', label: 'Презентация блюд' },
] as const

export const salaryRanges = [
  { value: '0-100000', label: '0 - 100 000 KZT' },
  { value: '100000-200000', label: '100 000 - 200 000 KZT' },
  { value: '200000-300000', label: '200 000 - 300 000 KZT' },
  { value: '300000-400000', label: '300 000 - 400 000 KZT' },
  { value: '400000-500000', label: '400 000 - 500 000 KZT' },
  { value: '500000-600000', label: '500 000 - 600 000 KZT' },
  { value: '600000-700000', label: '600 000 - 700 000 KZT' },
  { value: '700000-800000', label: '700 000 - 800 000 KZT' },
  { value: '800000-900000', label: '800 000 - 900 000 KZT' },
  { value: '900000-1000000', label: '900 000 - 1 000 000 KZT' },
  { value: '1000000-1100000', label: '1 000 000 - 1 100 000 KZT' },
  { value: '1100000-1200000', label: '1 100 000 - 1 200 000 KZT' },
  { value: '1200000-1300000', label: '1 200 000 - 1 300 000 KZT' },
  { value: '1300000-1400000', label: '1 300 000 - 1 400 000 KZT' },
  { value: '1400000-1500000', label: '1 400 000 - 1 500 000 KZT' },
  { value: '1500000+', label: '1 500 000+ KZT' },
] as const

// Данные для работодателей
export const companyTypes = [
  { value: 'restaurant', label: 'Ресторан' },
  { value: 'cafe', label: 'Кафе' },
  { value: 'hotel', label: 'Отель' },
  { value: 'catering', label: 'Кейтеринг' },
  { value: 'other', label: 'Другое' },
] as const

export const employeeCounts = [
  { value: '1-10', label: '1-10 сотрудников' },
  { value: '11-50', label: '11-50 сотрудников' },
  { value: '51-100', label: '51-100 сотрудников' },
  { value: '100+', label: 'Более 100 сотрудников' },
] as const

export const employerNeeds = [
  { value: 'recruitment', label: 'Подбор персонала' },
  { value: 'hr-management', label: 'HR-управление' },
  { value: 'training', label: 'Обучение персонала' },
  { value: 'hr-system', label: 'HR-система' },
  { value: 'consulting', label: 'Консалтинг' },
] as const


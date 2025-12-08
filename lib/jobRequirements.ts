// Стандартные требования для вакансий
export const standardJobRequirements = [
  { value: 'experience-1', label: 'Опыт работы от 1 года' },
  { value: 'experience-2', label: 'Опыт работы от 2 лет' },
  { value: 'experience-3', label: 'Опыт работы от 3 лет' },
  { value: 'experience-5', label: 'Опыт работы от 5 лет' },
  { value: 'pan-asian-cuisine', label: 'Знание паназиатской кухни' },
  { value: 'european-cuisine', label: 'Знание европейской кухни' },
  { value: 'cost-calculation', label: 'Навыки калькуляции блюд' },
  { value: 'team-management', label: 'Управление персоналом' },
  { value: 'ttk', label: 'Работа по ТТК' },
  { value: 'inventory-management', label: 'Управление складом' },
  { value: 'menu-development', label: 'Разработка меню' },
  { value: 'food-safety', label: 'Знание пищевой безопасности' },
  { value: 'presentation', label: 'Презентация блюд' },
  { value: 'seasonal-ingredients', label: 'Работа с сезонными ингредиентами' },
  { value: 'high-volume', label: 'Опыт работы в высоконагруженных кухнях' },
  { value: 'fine-dining', label: 'Опыт в fine dining' },
  { value: 'catering', label: 'Опыт в кейтеринге' },
  { value: 'shift-work', label: 'Готовность к сменному графику' },
  { value: 'weekend-work', label: 'Готовность работать в выходные' },
  { value: 'overtime', label: 'Готовность к переработкам' },
  { value: 'relocation', label: 'Готовность к переезду' },
  { value: 'kitchen-software', label: 'Знание ПО для кухни' },
  { value: 'haccp', label: 'Знание HACCP' },
  { value: 'certification', label: 'Наличие сертификатов' },
] as const

export type StandardRequirement = typeof standardJobRequirements[number]['value']


import { z } from 'zod'

export const onboardingSchema = z.object({
  // Шаг 1: Личная информация
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  phone: z.string().min(1, 'Номер телефона обязателен'),
  city: z.string().min(1, 'Выберите город'),
  age: z.string().min(1, 'Выберите возраст'),
  whatsapp: z.string().optional().or(z.literal('')),
  telegram: z.string().optional().or(z.literal('')),
  
  // Шаг 2: Опыт и квалификация
  experience: z.string().min(1, 'Выберите опыт работы'),
  currentPosition: z.string().min(1, 'Выберите текущую позицию'),
  desiredPosition: z.string().min(1, 'Выберите желаемую позицию'),
  hasTeam: z.string().min(1, 'Укажите наличие команды'),
  education: z.string().min(1, 'Выберите образование'),
  rank: z.string().min(1, 'Выберите разряд'),
  
  // Шаг 3: Специализация и навыки
  cuisines: z.array(z.string()).min(1, 'Выберите хотя бы одну кухню'),
  certificates: z.array(z.string()).default([]),
  additionalSkills: z.array(z.string()).default([]),
  
  // Шаг 4: Условия и ожидания
  currentVenueFormat: z.string().min(1, 'Выберите текущий формат заведения'),
  preferredVenueFormat: z.string().min(1, 'Выберите желаемый формат заведения'),
  currentSalary: z.string().min(1, 'Выберите текущую зарплату'),
  salaryExpectation: z.string().min(1, 'Выберите ожидаемую зарплату'),
  
  // Шаг 5: Финал и о себе
  goals: z.array(z.string()).min(1, 'Выберите хотя бы одну цель'),
  instagram: z.string().optional().or(z.literal('')),
  portfolio: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  about: z.string().min(50, 'Расскажите о себе минимум 50 символов'),
  rating: z.number().min(1, 'Оцените анкету').max(5),
  suggestions: z.string().optional().or(z.literal('')),
  
  // Дополнительные поля
  email: z.string().email('Неверный формат email').optional().or(z.literal('')),
  avatarUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  username: z.string().min(3, 'Username должен содержать минимум 3 символа').max(30, 'Username не должен превышать 30 символов').regex(/^[a-zA-Z0-9_]+$/, 'Username может содержать только буквы, цифры и подчёркивание').optional().or(z.literal('')),
  telegramUsername: z.string().optional().or(z.literal('')),
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>


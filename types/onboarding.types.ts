import { z } from 'zod'

export const onboardingSchema = z.object({
  // Шаг 1: Личная информация
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  city: z.string().min(1, 'Выберите город'),
  age: z.string().min(1, 'Выберите возраст'),
  
  // Шаг 2: Опыт
  experience: z.string().min(1, 'Выберите опыт работы'),
  position: z.string().min(1, 'Выберите позицию'),
  education: z.string().min(1, 'Выберите образование'),
  rank: z.string().min(1, 'Выберите разряд'),
  hasTeam: z.boolean(),
  
  // Шаг 3: Навыки
  certificates: z.array(z.string()).default([]),
  cuisines: z.array(z.string()).min(1, 'Выберите хотя бы одну кухню'),
  additionalSkills: z.array(z.string()).default([]),
  
  // Шаг 4: Работа
  preferredVenueFormat: z.string().min(1, 'Выберите формат заведения'),
  salaryExpectation: z.string().min(1, 'Выберите ожидаемую зарплату'),
  
  // Шаг 5: Финал
  goals: z.array(z.string()).min(1, 'Выберите хотя бы одну цель'),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  email: z.string().email('Неверный формат email').optional().or(z.literal('')),
  about: z.string().max(500, 'Максимум 500 символов').optional().or(z.literal('')),
  avatarUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  username: z.string().min(3, 'Username должен содержать минимум 3 символа').max(30, 'Username не должен превышать 30 символов').regex(/^[a-zA-Z0-9_]+$/, 'Username может содержать только буквы, цифры и подчёркивание').optional().or(z.literal('')),
  telegramUsername: z.string().optional().or(z.literal('')),
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>


import { z } from 'zod'

export const partnerTypeEnum = z.enum([
  'equipment', // Производители инвентаря и экипировки
  'education', // Учреждения обучения
  'clothing', // Бренды одежды для кухни
  'ingredients', // Поставщики ингредиентов
  'internships', // Заведения, предлагающие стажировки
  'restaurant-equipment', // Поставщики оборудования (для работодателей)
  'raw-materials', // Поставщики сырья (HoReCa)
  'accounting', // Бухгалтерские сервисы
  'automation', // Сервисы автоматизации ресторанов
  'consulting', // Консалтинговые агентства
])

export const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Название должно содержать минимум 2 символа'),
  type: partnerTypeEnum,
  description: z.string().min(50, 'Описание должно содержать минимум 50 символов'),
  benefits: z.array(z.string()).min(1, 'Добавьте хотя бы одно преимущество'),
  website: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  contactEmail: z.string().email('Неверный формат email').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  logoUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  imageUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  offers: z.array(z.string()).optional(), // Предложения для ресторанов
  conditions: z.string().optional(), // Условия сотрудничества
  targetAudience: z.array(z.enum(['applicant', 'employer'])).min(1, 'Выберите целевую аудиторию'),
  createdAt: z.string().optional(),
})

export type Partner = z.infer<typeof partnerSchema>
export type PartnerType = z.infer<typeof partnerTypeEnum>


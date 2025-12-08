import { z } from 'zod'

export const jobPostingSchema = z.object({
  // 1. Заголовок вакансии
  title: z.string().min(5, 'Название должно содержать минимум 5 символов'),
  
  // 2. Компания / Подразделение
  company: z.string().min(1, 'Укажите компанию или подразделение'),
  
  // 3. Локация (город/удалённо)
  country: z.string().min(1, 'Выберите страну'),
  city: z.string().min(1, 'Выберите город'),
  isRemote: z.boolean().default(false),
  
  // 4. Тип занятости
  employmentType: z.string().min(1, 'Выберите тип занятости'),
  
  // 5. График / смены
  workSchedule: z.array(z.string()).min(1, 'Выберите график работы'),
  
  // 6. Зарплата (диапазон)
  salary: z.string().min(1, 'Укажите зарплату'),
  
  // 7. Описание вакансии
  description: z.string().min(50, 'Описание должно содержать минимум 50 символов'),
  
  // 8. Требования
  requirements: z.array(z.string()).min(1, 'Добавьте хотя бы одно требование'),
  
  // 9. Условия и бонусы
  conditions: z.string().min(1, 'Укажите условия и бонусы'),
  
  // 10. Контактные данные
  contactName: z.string().min(1, 'Укажите контактное лицо'),
  contactEmail: z.string().email('Неверный формат email'),
  contactPhone: z.string().min(1, 'Укажите контактный телефон'),
  
  // Дополнительные поля (из анкеты)
  position: z.string().min(1, 'Выберите должность').optional(),
  experience: z.string().min(1, 'Выберите требуемый опыт').optional(),
  cuisine: z.string().optional(),
})

export type JobPosting = z.infer<typeof jobPostingSchema> & {
  id: string
  employerId: string
  status: 'pending' | 'moderating' | 'approved' | 'rejected' | 'closed'
  createdAt: string
  updatedAt?: string
  moderatorComment?: string
  autoMatchedCandidates?: string[] // IDs кандидатов
  finalCandidates?: string[] // IDs финальных кандидатов после модерации
}

export type JobStatus = JobPosting['status']


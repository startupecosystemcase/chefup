import { z } from 'zod'

export const employerOnboardingSchema = z.object({
  // Шаг 1: Информация о компании
  companyName: z.string().min(2, 'Название компании должно содержать минимум 2 символа'),
  companyType: z.enum(['restaurant', 'cafe', 'hotel', 'catering', 'other'], {
    required_error: 'Выберите тип заведения',
  }),
  city: z.string().min(1, 'Выберите город'),
  address: z.string().min(5, 'Введите адрес'),
  website: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  
  // Шаг 2: Контактная информация
  contactPerson: z.string().min(2, 'Имя контактного лица должно содержать минимум 2 символа'),
  position: z.string().min(2, 'Должность должна содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  
  // Шаг 3: О компании
  description: z.string().min(50, 'Описание должно содержать минимум 50 символов').max(1000, 'Максимум 1000 символов'),
  employeeCount: z.enum(['1-10', '11-50', '51-100', '100+'], {
    required_error: 'Выберите количество сотрудников',
  }),
  cuisines: z.array(z.string()).min(1, 'Выберите хотя бы одну кухню'),
  
  // Шаг 4: Потребности
  needs: z.array(z.string()).min(1, 'Выберите хотя бы одну потребность'),
  hrSystem: z.boolean().default(false),
})

export type EmployerOnboardingFormData = z.infer<typeof employerOnboardingSchema>


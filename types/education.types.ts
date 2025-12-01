import { z } from 'zod'

export const educationTypeEnum = z.enum(['course', 'webinar', 'training', 'certification'])

export const educationStatusEnum = z.enum(['pending', 'approved', 'rejected', 'draft'])

export const educationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, 'Название должно содержать минимум 5 символов'),
  type: educationTypeEnum,
  author: z.string().min(2, 'Имя автора должно содержать минимум 2 символа'),
  authorId: z.string().optional(),
  description: z.string().min(50, 'Описание должно содержать минимум 50 символов'),
  duration: z.string().min(1, 'Укажите длительность'),
  maxParticipants: z.number().min(1, 'Максимальное количество участников должно быть не менее 1').optional(),
  price: z.number().min(0, 'Цена не может быть отрицательной').default(0),
  content: z.string().min(100, 'Содержание должно содержать минимум 100 символов').optional(),
  videoUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  materials: z.array(z.string()).optional(), // URLs к материалам
  status: educationStatusEnum.default('pending'),
  moderatorComment: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  startDate: z.string().optional(), // Для вебинаров и тренингов
  endDate: z.string().optional(),
  location: z.string().optional(), // Для очных мероприятий
  isOnline: z.boolean().default(true),
})

export type EducationItem = z.infer<typeof educationSchema>
export type EducationType = z.infer<typeof educationTypeEnum>
export type EducationStatus = z.infer<typeof educationStatusEnum>

export interface Enrollment {
  id: string
  userId: string
  educationId: string
  status: 'enrolled' | 'completed' | 'certified'
  enrolledAt: string
  completedAt?: string
  certificateId?: string
}

export interface Certificate {
  id: string
  userId: string
  educationId: string
  educationTitle: string
  issuedAt: string
  certificateNumber: string
  verificationUrl: string
}


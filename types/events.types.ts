import { z } from 'zod'

export const eventTypeEnum = z.enum(['business-breakfast', 'restaurant-opening', 'networking', 'conference', 'workshop', 'other'])

export const eventStatusEnum = z.enum(['draft', 'pending', 'approved', 'rejected', 'cancelled', 'completed'])

export const participationStatusEnum = z.enum(['pending', 'approved', 'rejected', 'cancelled'])

export const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, 'Название должно содержать минимум 5 символов'),
  type: eventTypeEnum,
  description: z.string().min(50, 'Описание должно содержать минимум 50 символов'),
  organizer: z.string().min(2, 'Имя организатора должно содержать минимум 2 символа'),
  organizerId: z.string().optional(),
  date: z.string().min(1, 'Укажите дату события'),
  time: z.string().min(1, 'Укажите время события'),
  location: z.string().min(3, 'Укажите место проведения'),
  address: z.string().min(5, 'Укажите адрес'),
  maxParticipants: z.number().min(1, 'Максимальное количество участников должно быть не менее 1'),
  price: z.number().min(0, 'Цена не может быть отрицательной').default(0),
  imageUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  status: eventStatusEnum.default('pending'),
  moderatorComment: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type Event = z.infer<typeof eventSchema>
export type EventType = z.infer<typeof eventTypeEnum>
export type EventStatus = z.infer<typeof eventStatusEnum>
export type ParticipationStatus = z.infer<typeof participationStatusEnum>

export interface Participation {
  id: string
  userId: string
  eventId: string
  status: ParticipationStatus
  appliedAt: string
  moderatedAt?: string
  moderatorComment?: string
}


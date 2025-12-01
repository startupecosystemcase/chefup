import { z } from 'zod'

export const responseStatusEnum = z.enum([
  'sent', // Отправлен
  'viewed', // Просмотрен
  'rejected', // Отклонён
  'interested', // Интерес
])

export const responseSchema = z.object({
  id: z.string().optional(),
  jobId: z.string().min(1, 'ID вакансии обязателен'),
  applicantId: z.string().min(1, 'ID соискателя обязателен'),
  status: responseStatusEnum,
  createdAt: z.string().optional(),
  viewedAt: z.string().optional(),
  employerComment: z.string().optional(),
})

export type Response = z.infer<typeof responseSchema>
export type ResponseStatus = z.infer<typeof responseStatusEnum>


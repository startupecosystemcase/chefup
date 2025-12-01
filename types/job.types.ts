import { z } from 'zod'

export const jobPostingSchema = z.object({
  title: z.string().min(5, 'Название должно содержать минимум 5 символов'),
  position: z.string().min(1, 'Выберите должность'),
  country: z.string().min(1, 'Выберите страну'),
  city: z.string().min(1, 'Выберите город'),
  experience: z.string().min(1, 'Выберите требуемый опыт'),
  cuisine: z.string().min(1, 'Выберите кухню'),
  description: z.string().min(50, 'Описание должно содержать минимум 50 символов'),
  salary: z.string().min(1, 'Укажите зарплату'),
  requirements: z.array(z.string()).min(1, 'Добавьте хотя бы одно требование'),
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


'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { Separator } from '@/components/ui/separator'
import { useAuthStore, useResponseStore } from '@/stores/useOnboardingStore'
import { mockJobs } from '@/lib/mockData'
import { MapPin, Briefcase, Clock, DollarSign, Building2, Phone, Mail, Send, CheckCircle, AlertTriangle, Zap } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { JobCardEnhanced } from '@/components/JobCardEnhanced'
import { getRecommendedJobs } from '@/lib/jobRecommendations'
import { useOnboardingStore } from '@/stores/useOnboardingStore'

export default function JobDetailPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const formData = useOnboardingStore((state) => state.formData)
  const { addResponse, getResponseByJobId } = useResponseStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  const job = mockJobs.find((j) => j.id === jobId)
  const existingResponse = userId ? getResponseByJobId(jobId, userId) : undefined

  // Вычисляем релевантность для соискателей
  const relevance = userRole === 'applicant' && (formData.desiredPosition || formData.currentPosition)
    ? getRecommendedJobs(mockJobs, formData).find((r) => r.job.id === jobId)
    : null

  const handleApply = () => {
    if (!userId) {
      toast.error('Необходимо войти в систему')
      return
    }
    addResponse({
      jobId,
      applicantId: userId,
      status: 'sent',
    })
    toast.success('Отклик отправлен!')
  }

  if (!mounted || !userId) {
    return null
  }

  if (!job) {
    return (
      <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-4xl">
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <p className="text-muted-foreground dark:text-gray-400">Вакансия не найдена</p>
              <ShinyButton className="mt-8" onClick={() => router.push('/dashboard/jobs')}>
                Вернуться к вакансиям
              </ShinyButton>
            </div>
          </AnimatedCard>
        </div>
      </div>
    )
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl">
        <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-8">
          ← Назад
        </ShinyButton>

        {/* Карточка вакансии с релевантностью */}
        {userRole === 'applicant' && relevance && (
          <div className="mb-8">
            <JobCardEnhanced
              job={job}
              relevance={relevance}
              applicantData={formData}
              onClick={() => {}}
            />
          </div>
        )}

        {/* Основная информация */}
        <AnimatedCard className="mb-8 card-soft-shadow bg-white dark:bg-dark/50">
          <div className="p-3 md:p-6">
            <div className="flex items-start justify-between mb-4 md:mb-4">
              <div>
                <h2 className="text-2xl mb-6 md:mb-4 md:mb-2 font-semibold dark:text-white">{job.title}</h2>
                <div className="flex flex-wrap gap-4">
                  <AnimatedBadge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.city}, {job.country}
                  </AnimatedBadge>
                  <AnimatedBadge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {job.position}
                  </AnimatedBadge>
                  <AnimatedBadge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.experience}
                  </AnimatedBadge>
                  <AnimatedBadge variant="secondary">{job.cuisine}</AnimatedBadge>
                </div>
              </div>
              {userRole === 'applicant' && (
                <div>
                  {existingResponse ? (
                    <ShinyButton variant="outline" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {existingResponse.status === 'sent' && 'Отправлен'}
                      {existingResponse.status === 'viewed' && 'Просмотрен'}
                      {existingResponse.status === 'interested' && 'Интерес'}
                      {existingResponse.status === 'rejected' && 'Отклонён'}
                    </ShinyButton>
                  ) : (
                    <ShinyButton onClick={handleApply}>
                      <Send className="w-4 h-4 mr-2" />
                      Откликнуться
                    </ShinyButton>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-6 md:mb-4 md:mb-2 flex items-center gap-4 dark:text-white">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Зарплата
                </h3>
                <p className="text-lg font-semibold text-primary">{job.salary}</p>
              </div>

              <Separator className="dark:bg-gray-700" />

              <div>
                <h3 className="font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white">Описание</h3>
                <p className="text-muted-foreground dark:text-gray-400 whitespace-pre-line">{job.description}</p>
              </div>

              <Separator className="dark:bg-gray-700" />

              <div>
                <h3 className="font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white">Требования</h3>
                <p className="text-muted-foreground dark:text-gray-400 whitespace-pre-line">{job.requirements}</p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Информация о партнёре/компании */}
        <AnimatedCard className="mb-8 card-soft-shadow bg-white dark:bg-dark/50">
          <div className="p-3 md:p-6">
            <h3 className="text-xl font-semibold mb-6 md:mb-4 dark:text-white flex items-center gap-4">
              <Building2 className="w-5 h-5 text-primary" />
              Информация о компании
            </h3>
            <div className="space-y-4">
              {(job as any).companyLogo && (
              <div className="flex items-center gap-4">
                <img
                  src={(job as any).companyLogo}
                  alt="Логотип компании"
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <div>
                  <h4 className="font-semibold dark:text-white">{job.title.split(' - ')[0] || 'Компания'}</h4>
                </div>
              </div>
            )}
            {(job as any).companyDescription && (
              <div>
                <h4 className="font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white">О компании</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">{(job as any).companyDescription}</p>
              </div>
            )}
            {(job as any).companyAddress && (
              <div>
                <h4 className="font-semibold mb-6 md:mb-4 md:mb-2 flex items-center gap-4 dark:text-white">
                  <MapPin className="w-4 h-4 text-primary" />
                  Адрес
                </h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">{(job as any).companyAddress}</p>
              </div>
            )}
            {(job as any).companyContacts && (
              <div>
                <h4 className="font-semibold mb-6 md:mb-4 md:mb-2 flex items-center gap-4 dark:text-white">
                  <Phone className="w-4 h-4 text-primary" />
                  Контакты
                </h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">{(job as any).companyContacts}</p>
              </div>
            )}
            {(job as any).companyPhotos && (job as any).companyPhotos.length > 0 && (
              <div>
                <h4 className="font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white">Фото</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(job as any).companyPhotos.map((photo: string, idx: number) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Фото ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}

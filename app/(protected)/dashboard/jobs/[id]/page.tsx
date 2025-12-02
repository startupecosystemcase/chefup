'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Вакансия не найдена</p>
              <Button className="mt-4" onClick={() => router.push('/dashboard/jobs')}>
                Вернуться к вакансиям
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          ← Назад
        </Button>

        {/* Карточка вакансии с релевантностью */}
        {userRole === 'applicant' && relevance && (
          <div className="mb-6">
            <JobCardEnhanced
              job={job}
              relevance={relevance}
              applicantData={formData}
              onClick={() => {}}
            />
          </div>
        )}

        {/* Основная информация */}
        <Card className="mb-6 card-soft-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.city}, {job.country}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {job.position}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.experience}
                  </Badge>
                  <Badge variant="secondary">{job.cuisine}</Badge>
                </div>
              </div>
              {userRole === 'applicant' && (
                <div>
                  {existingResponse ? (
                    <Button variant="outline" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {existingResponse.status === 'sent' && 'Отправлен'}
                      {existingResponse.status === 'viewed' && 'Просмотрен'}
                      {existingResponse.status === 'interested' && 'Интерес'}
                      {existingResponse.status === 'rejected' && 'Отклонён'}
                    </Button>
                  ) : (
                    <Button onClick={handleApply}>
                      <Send className="w-4 h-4 mr-2" />
                      Откликнуться
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Зарплата
              </h3>
              <p className="text-lg font-semibold text-primary">{job.salary}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Описание</h3>
              <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Требования</h3>
              <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
            </div>
          </CardContent>
        </Card>

        {/* Информация о партнёре/компании */}
        <Card className="mb-6 card-soft-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Информация о компании
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(job as any).companyLogo && (
              <div className="flex items-center gap-4">
                <img
                  src={(job as any).companyLogo}
                  alt="Логотип компании"
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">{job.title.split(' - ')[0] || 'Компания'}</h4>
                </div>
              </div>
            )}
            {(job as any).companyDescription && (
              <div>
                <h4 className="font-semibold mb-2">О компании</h4>
                <p className="text-sm text-muted-foreground">{(job as any).companyDescription}</p>
              </div>
            )}
            {(job as any).companyAddress && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Адрес
                </h4>
                <p className="text-sm text-muted-foreground">{(job as any).companyAddress}</p>
              </div>
            )}
            {(job as any).companyContacts && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Контакты
                </h4>
                <p className="text-sm text-muted-foreground">{(job as any).companyContacts}</p>
              </div>
            )}
            {(job as any).companyPhotos && (job as any).companyPhotos.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Фото</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

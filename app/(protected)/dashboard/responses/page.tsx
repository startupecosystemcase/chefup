'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuthStore, useResponseStore } from '@/stores/useOnboardingStore'
import { mockJobs } from '@/lib/mockData'
import { Send, CheckCircle, XCircle, Eye, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { ResponseStatus } from '@/types/responses.types'

const statusConfig: Record<ResponseStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof Send }> = {
  sent: { label: 'Отправлен', variant: 'secondary', icon: Send },
  viewed: { label: 'Просмотрен', variant: 'default', icon: Eye },
  rejected: { label: 'Отклонён', variant: 'destructive', icon: XCircle },
  interested: { label: 'Интерес', variant: 'default', icon: CheckCircle },
}

export default function ResponsesPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const { responses, getUserResponses } = useResponseStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  const userResponses = useMemo(() => {
    if (!userId) return []
    return getUserResponses(userId)
  }, [userId, responses, getUserResponses])

  const responsesWithJobs = useMemo(() => {
    return userResponses.map((response) => {
      const job = mockJobs.find((j) => j.id === response.jobId)
      return { response, job }
    }).filter((item) => item.job !== undefined)
  }, [userResponses])

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Мои отклики</h1>
          <p className="text-muted-foreground">
            Отслеживайте статус ваших откликов на вакансии
          </p>
        </div>

        {responsesWithJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Send className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">У вас пока нет откликов</p>
              <Button onClick={() => router.push('/dashboard/jobs')}>
                Найти вакансии
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {responsesWithJobs.map(({ response, job }) => {
              if (!job) return null
              const statusInfo = statusConfig[response.status]
              const StatusIcon = statusInfo.icon

              return (
                <Card key={response.id} className="card-soft-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{job.city}</Badge>
                          <Badge variant="outline">{job.position}</Badge>
                          <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        {response.createdAt && (
                          <p className="text-sm text-muted-foreground">
                            Отправлено: {format(new Date(response.createdAt), 'd MMMM yyyy, HH:mm', { locale: ru })}
                          </p>
                        )}
                        {response.viewedAt && (
                          <p className="text-sm text-muted-foreground">
                            Просмотрено: {format(new Date(response.viewedAt), 'd MMMM yyyy, HH:mm', { locale: ru })}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary mb-1">{job.salary}</p>
                        <p className="text-sm text-muted-foreground">{job.description.slice(0, 100)}...</p>
                      </div>
                      <Button variant="outline" onClick={() => router.push(`/dashboard/jobs/${job.id}`)}>
                        Подробнее
                      </Button>
                    </div>
                    {response.employerComment && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-1">Комментарий работодателя:</p>
                        <p className="text-sm text-muted-foreground">{response.employerComment}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


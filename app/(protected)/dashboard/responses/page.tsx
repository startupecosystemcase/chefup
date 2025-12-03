'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
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
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Мои отклики</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Отслеживайте статус ваших откликов на вакансии
          </p>
        </div>

        {responsesWithJobs.length === 0 ? (
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <Send className="w-12 h-12 mx-auto mb-8 text-muted-foreground dark:text-gray-400" />
              <p className="text-muted-foreground dark:text-gray-400 mb-8">У вас пока нет откликов</p>
              <ShinyButton onClick={() => router.push('/dashboard/jobs')}>
                Найти вакансии
              </ShinyButton>
            </div>
          </AnimatedCard>
        ) : (
          <div className="space-y-4">
            {responsesWithJobs.map(({ response, job }) => {
              if (!job) return null
              const statusInfo = statusConfig[response.status]
              const StatusIcon = statusInfo.icon

              return (
                <AnimatedCard key={response.id} className="card-soft-shadow bg-white dark:bg-dark/50">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mb-2">
                          <AnimatedBadge variant="outline">{job.city}</AnimatedBadge>
                          <AnimatedBadge variant="outline">{job.position}</AnimatedBadge>
                          <AnimatedBadge variant={statusInfo.variant} className="flex items-center gap-1">
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </AnimatedBadge>
                        </div>
                        {response.createdAt && (
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            Отправлено: {format(new Date(response.createdAt), 'd MMMM yyyy, HH:mm', { locale: ru })}
                          </p>
                        )}
                        {response.viewedAt && (
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            Просмотрено: {format(new Date(response.viewedAt), 'd MMMM yyyy, HH:mm', { locale: ru })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="font-semibold text-primary mb-1">{job.salary}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{job.description.slice(0, 100)}...</p>
                      </div>
                      <ShinyButton variant="outline" onClick={() => router.push(`/dashboard/jobs/${job.id}`)}>
                        Подробнее
                      </ShinyButton>
                    </div>
                    {response.employerComment && (
                      <div className="mt-8 p-3 bg-muted/50 dark:bg-gray-800/50 rounded-lg">
                        <p className="text-sm font-medium mb-1 dark:text-white">Комментарий работодателя:</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{response.employerComment}</p>
                      </div>
                    )}
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


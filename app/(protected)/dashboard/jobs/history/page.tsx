'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { useEmployerJobsStore, useAuthStore } from '@/stores/useOnboardingStore'
import { MapPin, Briefcase, Clock, DollarSign, Eye, CheckCircle2, XCircle, ClockIcon, AlertCircle } from 'lucide-react'
import type { JobPosting } from '@/types/job.types'

const statusConfig: Record<JobPosting['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
  pending: { label: 'На модерации', variant: 'outline', icon: <ClockIcon className="w-4 h-4" /> },
  moderating: { label: 'Проверяется', variant: 'secondary', icon: <AlertCircle className="w-4 h-4" /> },
  approved: { label: 'Одобрена', variant: 'default', icon: <CheckCircle2 className="w-4 h-4" /> },
  rejected: { label: 'Отклонена', variant: 'destructive', icon: <XCircle className="w-4 h-4" /> },
  closed: { label: 'Закрыта', variant: 'outline', icon: <XCircle className="w-4 h-4" /> },
}

export default function JobsHistoryPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const { jobs } = useEmployerJobsStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
    setMounted(true)
  }, [userId, router])

  const employerJobs = jobs.filter((job) => job.employerId === userId)

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">История вакансий</h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Управляйте созданными вакансиями и отслеживайте их статус
            </p>
          </div>
          <ShinyButton onClick={() => router.push('/dashboard/jobs/create')}>
            Создать вакансию
          </ShinyButton>
        </div>

        {employerJobs.length === 0 ? (
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <p className="text-muted-foreground dark:text-gray-400 mb-8">У вас пока нет созданных вакансий</p>
              <ShinyButton onClick={() => router.push('/dashboard/jobs/create')}>
                Создать первую вакансию
              </ShinyButton>
            </div>
          </AnimatedCard>
        ) : (
          <div className="space-y-4">
            {employerJobs.map((job) => {
              const status = statusConfig[job.status]
              return (
                <AnimatedCard key={job.id} className="hover:shadow-md transition-shadow bg-white dark:bg-dark/50">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-5 mb-2">
                          <h3 className="text-xl font-semibold dark:text-white">{job.title}</h3>
                          <AnimatedBadge variant={status.variant} className="flex items-center gap-1">
                            {status.icon}
                            {status.label}
                          </AnimatedBadge>
                        </div>
                        <div className="flex flex-wrap gap-4 mb-2">
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
                        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 mt-2">
                          {job.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 text-sm">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="font-semibold dark:text-white">{job.salary}</span>
                        </div>
                        {job.moderatorComment && (
                          <div className="text-sm text-muted-foreground dark:text-gray-400">
                            Комментарий модератора: {job.moderatorComment}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-4">
                        <ShinyButton variant="outline" asChild>
                          <Link href={`/dashboard/candidates?jobId=${job.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Кандидаты
                            {job.finalCandidates && job.finalCandidates.length > 0 && (
                              <AnimatedBadge variant="secondary" className="ml-2">
                                {job.finalCandidates.length}
                              </AnimatedBadge>
                            )}
                          </Link>
                        </ShinyButton>
                      </div>
                    </div>
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


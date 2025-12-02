'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">История вакансий</h1>
            <p className="text-muted-foreground">
              Управляйте созданными вакансиями и отслеживайте их статус
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard/jobs/create')}>
            Создать вакансию
          </Button>
        </div>

        {employerJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-8">У вас пока нет созданных вакансий</p>
              <Button onClick={() => router.push('/dashboard/jobs/create')}>
                Создать первую вакансию
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {employerJobs.map((job) => {
              const status = statusConfig[job.status]
              return (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-5 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <Badge variant={status.variant} className="flex items-center gap-1">
                            {status.icon}
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 mb-2">
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
                        <CardDescription className="line-clamp-2 mt-2">
                          {job.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 text-sm">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{job.salary}</span>
                        </div>
                        {job.moderatorComment && (
                          <div className="text-sm text-muted-foreground">
                            Комментарий модератора: {job.moderatorComment}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" asChild>
                          <Link href={`/dashboard/candidates?jobId=${job.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Кандидаты
                            {job.finalCandidates && job.finalCandidates.length > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                {job.finalCandidates.length}
                              </Badge>
                            )}
                          </Link>
                        </Button>
                      </div>
                    </div>
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


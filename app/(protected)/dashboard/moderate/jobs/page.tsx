'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useEmployerJobsStore, useAuthStore } from '@/stores/useOnboardingStore'
import { MapPin, Briefcase, Clock, DollarSign, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { JobPosting } from '@/types/job.types'

export default function ModerateJobsPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const { jobs, updateJob, getJobById } = useEmployerJobsStore()
  const [mounted, setMounted] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [moderatorComment, setModeratorComment] = useState('')

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    if (userRole !== 'moderator') {
      router.push('/dashboard')
      return
    }
    setMounted(true)
  }, [userId, userRole, router])

  const pendingJobs = jobs.filter((job) => job.status === 'pending' || job.status === 'moderating')

  const handleApprove = (jobId: string) => {
    const job = getJobById(jobId)
    if (!job) return

    // Автоматически запускаем подбор кандидатов при одобрении
    import('@/lib/candidateMatching').then(({ autoMatchCandidates }) => {
      const matches = autoMatchCandidates(job)
      const candidateIds = matches.map((m) => m.candidateId)

      updateJob(jobId, {
        status: 'approved',
        moderatorComment: moderatorComment || undefined,
        autoMatchedCandidates: candidateIds,
      })
    })

    setSelectedJob(null)
    setModeratorComment('')
    toast.success('Вакансия одобрена! Кандидаты автоматически подобраны.')
  }

  const handleReject = (jobId: string) => {
    if (!moderatorComment.trim()) {
      toast.error('Укажите причину отклонения')
      return
    }
    updateJob(jobId, {
      status: 'rejected',
      moderatorComment: moderatorComment,
    })
    setSelectedJob(null)
    setModeratorComment('')
    toast.success('Вакансия отклонена')
  }

  if (!mounted || userRole !== 'moderator') {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4 md:mb-2">Модерация вакансий</h1>
          <p className="text-muted-foreground">
            Проверьте и одобрите или отклоните вакансии работодателей
          </p>
        </div>

        {pendingJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Нет вакансий на модерации</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-5 mb-6 md:mb-4 md:mb-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant="outline">На проверке</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-6 md:mb-4 md:mb-2">
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
                      <CardDescription className="mt-2">{job.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-6 md:mb-4 md:mb-2">Требования:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-4">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{job.salary}</span>
                    </div>

                    {selectedJob?.id === job.id ? (
                      <div className="space-y-4 p-4 border rounded-md bg-muted/50">
                        <div>
                          <label className="text-sm font-medium mb-6 md:mb-4 md:mb-2 block">
                            Комментарий модератора
                          </label>
                          <Textarea
                            value={moderatorComment}
                            onChange={(e) => setModeratorComment(e.target.value)}
                            placeholder="Оставьте комментарий (обязательно при отклонении)"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedJob(null)
                              setModeratorComment('')
                            }}
                          >
                            Отмена
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleReject(job.id)}
                            disabled={!moderatorComment.trim()}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Отклонить
                          </Button>
                          <Button onClick={() => handleApprove(job.id)}>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Одобрить
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job)
                            setModeratorComment(job.moderatorComment || '')
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Проверить
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                        >
                          <Link href={`/dashboard/moderate/candidates?jobId=${job.id}`}>
                            Подобрать кандидатов
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


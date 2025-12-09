'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useEmployerJobsStore, useAuthStore } from '@/stores/useOnboardingStore'
import { mockResumes } from '@/lib/mockData'
import { autoMatchCandidates } from '@/lib/candidateMatching'
import { MapPin, Briefcase, Clock, ChefHat, CheckCircle2, Send, Sparkles } from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { JobPosting } from '@/types/job.types'

export default function ModerateCandidatesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const { getJobById, updateJob } = useEmployerJobsStore()
  const [mounted, setMounted] = useState(false)
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [moderatorNote, setModeratorNote] = useState('')

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

  const job = jobId ? getJobById(jobId) : null

  // Автоматический подбор кандидатов
  const autoMatches = useMemo(() => {
    if (!job) return []
    return autoMatchCandidates(job)
  }, [job])

  // Инициализация выбранных кандидатов из автоподбора
  useEffect(() => {
    if (job && job.autoMatchedCandidates) {
      setSelectedCandidates(job.autoMatchedCandidates)
    } else if (autoMatches.length > 0) {
      // Автоматически выбираем топ-5 кандидатов
      const topCandidates = autoMatches.slice(0, 5).map((m) => m.candidateId)
      setSelectedCandidates(topCandidates)
    }
  }, [job, autoMatches])

  const handleToggleCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const handleSendToEmployer = () => {
    if (!job || selectedCandidates.length === 0) {
      toast.error('Выберите хотя бы одного кандидата')
      return
    }

    updateJob(job.id, {
      status: 'approved',
      autoMatchedCandidates: autoMatches.map((m) => m.candidateId),
      finalCandidates: selectedCandidates,
      moderatorComment: moderatorNote || undefined,
    })

    toast.success(`Список из ${selectedCandidates.length} кандидатов отправлен работодателю!`)
    router.push('/dashboard/moderate/jobs')
  }

  if (!mounted || userRole !== 'moderator' || !job) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-8">
            Назад
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Автоподбор кандидатов</h1>
          <p className="text-muted-foreground">
            Проверьте автоматически подобранных кандидатов и отправьте финальный список работодателю
          </p>
        </div>

        {job && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Вакансия: {job.title}</CardTitle>
              <CardDescription>
                {job.city}, {job.country} • {job.position} • {job.experience}
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {autoMatches.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Кандидаты не найдены</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-semibold">
                  Автоматически найдено: {autoMatches.length} кандидатов
                </span>
              </div>
              <Badge variant="secondary">
                Выбрано: {selectedCandidates.length}
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              {autoMatches.map((match) => {
                const candidate = mockResumes.find((c) => c.id === match.candidateId)
                if (!candidate) return null

                const isSelected = selectedCandidates.includes(candidate.id)

                return (
                  <Card
                    key={candidate.id}
                    className={`transition-all ${
                      isSelected ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleToggleCandidate(candidate.id)}
                        />
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{candidate.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-5 mb-2">
                            <CardTitle className="text-lg">
                              {candidate.firstName} {candidate.lastName}
                            </CardTitle>
                            <Badge
                              variant={match.score >= 70 ? 'default' : 'secondary'}
                              className="flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              {match.score}%
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 mb-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {candidate.city}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {candidate.position}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {candidate.experience}
                            </Badge>
                            <Badge variant="secondary">{candidate.cuisine}</Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">{candidate.about}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {match.reasons.map((reason, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {reason}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/profile/${candidate.id}`}>Профиль</Link>
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Примечание для работодателя (необязательно)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={moderatorNote}
                  onChange={(e) => setModeratorNote(e.target.value)}
                  placeholder="Добавьте комментарий о подобранных кандидатах..."
                  className="min-h-[100px]"
                />
                <Button
                  onClick={handleSendToEmployer}
                  disabled={selectedCandidates.length === 0}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Отправить {selectedCandidates.length} кандидатов работодателю
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}


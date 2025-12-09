'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore, useEventsStore } from '@/stores/useOnboardingStore'
import { mockResumes } from '@/lib/mockData'
import { Calendar, MapPin, Users, CheckCircle2, XCircle, Eye, Clock } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { Participation } from '@/types/events.types'

export default function ModerateEventsPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const { events, participations, moderateParticipation, getEventParticipations } = useEventsStore()
  const [mounted, setMounted] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [selectedParticipations, setSelectedParticipations] = useState<string[]>([])
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

  // Получаем события с заявками на модерацию
  const eventsWithPendingParticipations = events.filter((event) => {
    const eventParticipations = getEventParticipations(event.id!)
    return eventParticipations.some((p) => p.status === 'pending')
  })

  const handleToggleParticipation = (participationId: string) => {
    setSelectedParticipations((prev) =>
      prev.includes(participationId)
        ? prev.filter((id) => id !== participationId)
        : [...prev, participationId]
    )
  }

  const handleApprove = (participationId: string) => {
    moderateParticipation(participationId, 'approved', moderatorComment || undefined)
    setSelectedParticipations((prev) => prev.filter((id) => id !== participationId))
    setModeratorComment('')
    toast.success('Участие одобрено!')
  }

  const handleReject = (participationId: string) => {
    if (!moderatorComment.trim()) {
      toast.error('Укажите причину отклонения')
      return
    }
    moderateParticipation(participationId, 'rejected', moderatorComment)
    setSelectedParticipations((prev) => prev.filter((id) => id !== participationId))
    setModeratorComment('')
    toast.success('Участие отклонено')
  }

  const handleBulkApprove = () => {
    if (selectedParticipations.length === 0) {
      toast.error('Выберите заявки для одобрения')
      return
    }
    selectedParticipations.forEach((id) => {
      moderateParticipation(id, 'approved')
    })
    setSelectedParticipations([])
    toast.success(`${selectedParticipations.length} заявок одобрено!`)
  }

  if (!mounted || userRole !== 'moderator') {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Модерация участия в событиях</h1>
          <p className="text-muted-foreground">
            Проверьте и одобрите заявки на участие в событиях
          </p>
        </div>

        {eventsWithPendingParticipations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Нет заявок на модерацию</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {eventsWithPendingParticipations.map((event) => {
              const eventParticipations = getEventParticipations(event.id!)
              const pendingParticipations = eventParticipations.filter((p) => p.status === 'pending')

              if (pendingParticipations.length === 0) return null

              return (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(event.date), 'dd MMMM yyyy', { locale: ru })} в {event.time} • {event.location}
                    </CardDescription>
                    <div className="mt-8 flex items-center justify-between">
                      <Badge variant="outline">
                        Заявок на модерации: {pendingParticipations.length}
                      </Badge>
                      {selectedParticipations.length > 0 && (
                        <Button size="sm" onClick={handleBulkApprove}>
                          Одобрить выбранные ({selectedParticipations.length})
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingParticipations.map((participation) => {
                        const candidate = mockResumes.find((c) => c.id === participation.userId)
                        const isSelected = selectedParticipations.includes(participation.id)

                        return (
                          <Card
                            key={participation.id}
                            className={`transition-all ${
                              isSelected ? 'border-primary bg-primary/5' : ''
                            }`}
                          >
                            <CardHeader>
                              <div className="flex items-start gap-4">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => handleToggleParticipation(participation.id)}
                                />
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback>
                                    {candidate?.avatarFallback || 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <CardTitle className="text-lg">
                                    {candidate
                                      ? `${candidate.firstName} ${candidate.lastName}`
                                      : `Пользователь ${participation.userId.slice(0, 8)}`}
                                  </CardTitle>
                                  <CardDescription>
                                    Подал заявку: {format(new Date(participation.appliedAt), 'dd MMM yyyy HH:mm', { locale: ru })}
                                  </CardDescription>
                                  {candidate && (
                                    <div className="mt-2 flex flex-wrap gap-4">
                                      <Badge variant="outline">{candidate.position}</Badge>
                                      <Badge variant="outline">{candidate.city}</Badge>
                                      <Badge variant="outline">{candidate.experience}</Badge>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedEventId(event.id!)
                                      setModeratorComment('')
                                    }}
                                    asChild
                                  >
                                    <Link href={`/profile/${participation.userId}`}>
                                      <Eye className="w-4 h-4 mr-2" />
                                      Профиль
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            {selectedEventId === event.id && (
                              <CardContent className="pt-0">
                                <div className="space-y-4 p-4 border rounded-md bg-muted/50">
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">
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
                                      size="sm"
                                      onClick={() => {
                                        setSelectedEventId(null)
                                        setModeratorComment('')
                                      }}
                                    >
                                      Отмена
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => {
                                        handleReject(participation.id)
                                        if (selectedParticipations.includes(participation.id)) {
                                          setSelectedParticipations((prev) => prev.filter((id) => id !== participation.id))
                                        }
                                      }}
                                      disabled={!moderatorComment.trim()}
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Отклонить
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        handleApprove(participation.id)
                                        if (selectedParticipations.includes(participation.id)) {
                                          setSelectedParticipations((prev) => prev.filter((id) => id !== participation.id))
                                        }
                                      }}
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Одобрить
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            )}
                            {!selectedEventId && (
                              <CardContent className="pt-0">
                                <div className="flex gap-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedEventId(event.id!)
                                      setModeratorComment('')
                                    }}
                                  >
                                    Модерировать
                                  </Button>
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        )
                      })}
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


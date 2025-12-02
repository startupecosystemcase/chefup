'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuthStore, useEventsStore } from '@/stores/useOnboardingStore'
import { mockEvents } from '@/lib/mockEvents'
import { Calendar, MapPin, Users, Coffee, ArrowLeft, CheckCircle2, Clock, DollarSign, XCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const typeIcons = {
  'business-breakfast': Coffee,
  'restaurant-opening': Calendar,
  'networking': Users,
  'conference': Calendar,
  'workshop': Coffee,
  'other': Calendar,
}

const typeLabels = {
  'business-breakfast': 'Бизнес-завтрак',
  'restaurant-opening': 'Открытие ресторана',
  'networking': 'Нетворкинг',
  'conference': 'Конференция',
  'workshop': 'Мастер-класс',
  'other': 'Другое',
}

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string
  const userId = useAuthStore((state) => state.userId)
  const { events, participations, applyForEvent, getUserParticipations, cancelParticipation, getEventById } = useEventsStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  // Ищем событие в store или mock данных
  const event = getEventById(eventId) || mockEvents.find((e) => e.id === eventId)

  const userParticipations = getUserParticipations(userId || '')
  const participation = userParticipations.find((p) => p.eventId === eventId)

  const handleApply = () => {
    if (!userId) {
      toast.error('Необходимо войти в систему')
      return
    }
    applyForEvent(userId, eventId)
    toast.success('Заявка на участие отправлена! Ожидайте модерации.')
  }

  const handleCancel = () => {
    if (!participation) return
    cancelParticipation(participation.id)
    toast.success('Заявка отменена')
  }

  if (!mounted || !userId || !event) {
    return null
  }

  const Icon = typeIcons[event.type]
  const participationStatus = participation?.status

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {typeLabels[event.type]}
                  </Badge>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                </div>
              </div>
            </div>
            <CardDescription className="text-base">Организатор: {event.organizer}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">
                    {format(new Date(event.date), 'dd MMM yyyy', { locale: ru })}
                  </div>
                  <div className="text-muted-foreground">{event.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">{event.location}</div>
                  <div className="text-muted-foreground text-xs">{event.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">До {event.maxParticipants} участников</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">
                  {event.price === 0 ? 'Бесплатно' : `${event.price.toLocaleString('ru-RU')} ₸`}
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Описание</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>

              {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {participation && participation.moderatorComment && (
                <div>
                  <h3 className="font-semibold mb-2">Комментарий модератора</h3>
                  <p className="text-sm text-muted-foreground">{participation.moderatorComment}</p>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="flex gap-4">
              {!participation ? (
                <Button onClick={handleApply} className="flex-1">
                  Подать заявку на участие
                </Button>
              ) : participationStatus === 'pending' ? (
                <>
                  <Button variant="outline" className="flex-1" disabled>
                    <Clock className="w-4 h-4 mr-2" />
                    Заявка на модерации
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Отменить заявку
                  </Button>
                </>
              ) : participationStatus === 'approved' ? (
                <Button variant="outline" className="flex-1" disabled>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Вы одобрены для участия
                </Button>
              ) : participationStatus === 'rejected' ? (
                <Button variant="outline" className="flex-1" disabled>
                  <XCircle className="w-4 h-4 mr-2" />
                  Заявка отклонена
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
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
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl">
        <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </ShinyButton>

        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-3 md:p-6">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <AnimatedBadge variant="secondary" className="mb-6 md:mb-2">
                    {typeLabels[event.type]}
                  </AnimatedBadge>
                  <h2 className="text-2xl font-semibold dark:text-white">{event.title}</h2>
                </div>
              </div>
            </div>
            <p className="text-base text-muted-foreground dark:text-gray-400 mb-6 md:mb-4">Организатор: {event.organizer}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Calendar className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                <div className="text-sm">
                  <div className="font-medium dark:text-white">
                    {format(new Date(event.date), 'dd MMM yyyy', { locale: ru })}
                  </div>
                  <div className="text-muted-foreground dark:text-gray-400">{event.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                <div className="text-sm">
                  <div className="font-medium dark:text-white">{event.location}</div>
                  <div className="text-muted-foreground dark:text-gray-400 text-xs">{event.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Users className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-sm dark:text-white">До {event.maxParticipants} участников</span>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold dark:text-white">
                  {event.price === 0 ? 'Бесплатно' : `${event.price.toLocaleString('ru-RU')} ₸`}
                </span>
              </div>
            </div>

            <Separator className="my-6 dark:bg-gray-700" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-6 md:mb-2 dark:text-white">Описание</h3>
                <p className="text-muted-foreground dark:text-gray-400">{event.description}</p>
              </div>

              {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-6 md:mb-2 dark:text-white">Теги</h3>
                  <div className="flex flex-wrap gap-4">
                    {event.tags.map((tag, index) => (
                      <AnimatedBadge key={index} variant="outline">
                        {tag}
                      </AnimatedBadge>
                    ))}
                  </div>
                </div>
              )}

              {participation && participation.moderatorComment && (
                <div>
                  <h3 className="font-semibold mb-6 md:mb-2 dark:text-white">Комментарий модератора</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{participation.moderatorComment}</p>
                </div>
              )}
            </div>

            <Separator className="my-6 dark:bg-gray-700" />

            <div className="flex gap-4">
              {!participation ? (
                <ShinyButton onClick={handleApply} className="flex-1">
                  Подать заявку на участие
                </ShinyButton>
              ) : participationStatus === 'pending' ? (
                <>
                  <ShinyButton variant="outline" className="flex-1" disabled>
                    <Clock className="w-4 h-4 mr-2" />
                    Заявка на модерации
                  </ShinyButton>
                  <ShinyButton variant="outline" onClick={handleCancel}>
                    Отменить заявку
                  </ShinyButton>
                </>
              ) : participationStatus === 'approved' ? (
                <ShinyButton variant="outline" className="flex-1" disabled>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Вы одобрены для участия
                </ShinyButton>
              ) : participationStatus === 'rejected' ? (
                <ShinyButton variant="outline" className="flex-1" disabled>
                  <XCircle className="w-4 h-4 mr-2" />
                  Заявка отклонена
                </ShinyButton>
              ) : null}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}


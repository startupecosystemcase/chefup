'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { useAuthStore, useEventsStore } from '@/stores/useOnboardingStore'
import { mockEvents } from '@/lib/mockEvents'
import { astanaEvents } from '@/lib/mockEventsAstana'
import { Calendar, MapPin, Users, Coffee, Search, CheckCircle2, Clock, DollarSign, Filter, UserPlus, Share2, Copy } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
import { EventRegistrationForm } from '@/components/EventRegistrationForm'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Label } from '@/components/ui/label'
import type { EventType } from '@/types/events.types'

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

export default function CommunityPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const { events, participations, applyForEvent, getUserParticipations } = useEventsStore()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all')
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteMessage, setInviteMessage] = useState('Присоединяйся к ChefUp - первой экосистеме для поиска работы, нетворкинга и обучения в сфере ресторанного бизнеса!')

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  // Объединяем mock данные с данными из store (включая реальные события из Астаны)
  const allEvents = useMemo(() => {
    const mockItems = mockEvents.filter((event) => event.status === 'approved')
    const astanaItems = astanaEvents.filter((event) => event.status === 'approved')
    const storeItems = events.filter((event) => event.status === 'approved')
    return [...storeItems, ...mockItems, ...astanaItems]
  }, [events])

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesSearch =
        searchTerm === '' ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === 'all' || event.type === selectedType

      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'free' && event.price === 0) ||
        (priceFilter === 'paid' && event.price > 0)

      return matchesSearch && matchesType && matchesPrice
    })
  }, [allEvents, searchTerm, selectedType, priceFilter])

  const userParticipations = useMemo(() => {
    if (!userId) return []
    return getUserParticipations(userId)
  }, [participations, userId, getUserParticipations])

  const getParticipationStatus = (eventId: string) => {
    const participation = userParticipations.find((p) => p.eventId === eventId)
    return participation?.status || null
  }

  const handleApply = (eventId: string) => {
    if (!userId) {
      toast.error('Необходимо войти в систему')
      return
    }
    setSelectedEventId(eventId)
    setIsRegistrationOpen(true)
  }

  const handleRegistrationSuccess = (eventId: string) => {
    applyForEvent(userId!, eventId)
    setIsRegistrationOpen(false)
    setSelectedEventId(null)
    toast.success('Заявка на участие отправлена! Ожидайте модерации.')
  }

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Сообщества</h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Мероприятия коммьюнити ChefUp: бизнес-завтраки, открытия ресторанов и многое другое
              </p>
            </div>
            <div className="flex gap-3">
              <ShinyButton variant="outline" onClick={() => setIsInviteDialogOpen(true)} className="whitespace-nowrap">
                <UserPlus className="w-4 h-4 mr-2" />
                Пригласить участника
              </ShinyButton>
            {userRole === 'moderator' && (
              <ShinyButton onClick={() => router.push('/dashboard/community/create')} className="whitespace-nowrap">
                Создать событие
              </ShinyButton>
            )}
            </div>
          </div>
          {/* Быстрая навигация по категориям */}
          <div className="flex flex-wrap gap-4">
            <ShinyButton
              variant={selectedType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              Все
            </ShinyButton>
            <ShinyButton
              variant={selectedType === 'business-breakfast' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('business-breakfast')}
            >
              Бизнес-завтраки
            </ShinyButton>
            <ShinyButton
              variant={selectedType === 'restaurant-opening' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('restaurant-opening')}
            >
              Открытия
            </ShinyButton>
            <ShinyButton
              variant={selectedType === 'networking' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('networking')}
            >
              Нетворкинг
            </ShinyButton>
            <ShinyButton
              variant={selectedType === 'conference' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('conference')}
            >
              Конференции
            </ShinyButton>
            <ShinyButton
              variant={selectedType === 'workshop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('workshop')}
            >
              Мастер-классы
            </ShinyButton>
          </div>
        </div>

        {/* Фильтры - статичная полоса без hover эффектов */}
        <div className="mb-8 bg-white dark:bg-dark/50 rounded-xl border border-gray-200/50 dark:border-border/50 shadow-sm">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <AnimatedInput
                    placeholder="Поиск по названию, описанию или организатору"
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as EventType | 'all')}>
                  <SelectTrigger className="w-full md:w-[200px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50">
                    <SelectValue placeholder="Тип события" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="business-breakfast">Бизнес-завтраки</SelectItem>
                    <SelectItem value="restaurant-opening">Открытия ресторанов</SelectItem>
                    <SelectItem value="networking">Нетворкинг</SelectItem>
                    <SelectItem value="conference">Конференции</SelectItem>
                    <SelectItem value="workshop">Мастер-классы</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <Filter className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                  <span className="text-sm font-medium dark:text-white">Цена:</span>
                </div>
                <div className="flex items-center gap-4">
                  <ShinyButton
                    variant={priceFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('all')}
                  >
                    Все
                  </ShinyButton>
                  <ShinyButton
                    variant={priceFilter === 'free' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('free')}
                  >
                    Бесплатные
                  </ShinyButton>
                  <ShinyButton
                    variant={priceFilter === 'paid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('paid')}
                  >
                    Платные
                  </ShinyButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <StaggerItem>
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="py-12 text-center">
                <p className="text-muted-foreground dark:text-gray-400">События не найдены</p>
              </div>
            </AnimatedCard>
          </StaggerItem>
        ) : (
          <StaggerAnimation className="grid gap-4 md:gap-6 md:grid-cols-2" staggerDelay={0.08}>
            {filteredEvents.map((event) => {
              const Icon = typeIcons[event.type]
              const participationStatus = getParticipationStatus(event.id!)

              return (
                <StaggerItem key={event.id}>
                  <AnimatedCard className="card-hover flex flex-col bg-white dark:bg-dark/50">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <AnimatedBadge variant="secondary">{typeLabels[event.type]}</AnimatedBadge>
                      </div>
                      <h3 className="text-lg mb-2 font-semibold dark:text-white">{event.title}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Организатор: {event.organizer}</p>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-8 line-clamp-3">{event.description}</p>
                      <div className="space-y-4 text-sm mb-8">
                        <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(new Date(event.date), 'dd MMMM yyyy', { locale: ru })} в {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs">{event.address}</span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>До {event.maxParticipants} участников</span>
                        </div>
                        <div className="flex items-center gap-4 font-semibold dark:text-white">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span>{event.price === 0 ? 'Бесплатно' : `${event.price.toLocaleString('ru-RU')} ₸`}</span>
                        </div>
                      </div>
                      <div className="mt-auto space-y-4">
                        {participationStatus === 'pending' && (
                          <ShinyButton variant="outline" className="w-full whitespace-nowrap" disabled>
                            <Clock className="w-4 h-4 mr-2" />
                            Заявка на модерации
                          </ShinyButton>
                        )}
                        {participationStatus === 'approved' && (
                          <ShinyButton variant="outline" className="w-full whitespace-nowrap" disabled>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Вы одобрены
                          </ShinyButton>
                        )}
                        {participationStatus === 'rejected' && (
                          <ShinyButton variant="outline" className="w-full whitespace-nowrap" disabled>
                            Заявка отклонена
                          </ShinyButton>
                        )}
                        {!participationStatus && (
                          <>
                            <ShinyButton className="w-full whitespace-nowrap" onClick={() => handleApply(event.id!)}>
                              Подать заявку
                            </ShinyButton>
                            <Dialog open={isRegistrationOpen && selectedEventId === event.id} onOpenChange={(open) => {
                              setIsRegistrationOpen(open)
                              if (!open) setSelectedEventId(null)
                            }}>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark/90">
                                <DialogHeader>
                                  <DialogTitle className="dark:text-white">Регистрация на {event.title}</DialogTitle>
                                  <DialogDescription className="dark:text-gray-400">
                                    Заполните форму для регистрации на событие
                                  </DialogDescription>
                                </DialogHeader>
                                <EventRegistrationForm
                                  eventId={event.id!}
                                  eventTitle={event.title}
                                  onSuccess={() => handleRegistrationSuccess(event.id!)}
                                  onCancel={() => {
                                    setIsRegistrationOpen(false)
                                    setSelectedEventId(null)
                                  }}
                                />
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        <ShinyButton variant="ghost" className="w-full" asChild>
                          <Link href={`/dashboard/community/${event.id}`}>Подробнее</Link>
                        </ShinyButton>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerAnimation>
        )}

        {/* Диалог приглашения участника */}
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogContent className="bg-white dark:bg-dark max-w-2xl">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl mb-2">Пригласить участника</DialogTitle>
              <DialogDescription className="text-base">
                Поделитесь ссылкой для приглашения в сообщество ChefUp
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Сообщение приглашения</Label>
                <AnimatedTextarea
                  value={inviteMessage}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInviteMessage(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Введите текст приглашения..."
                />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <ShinyButton 
                  variant="outline" 
                  onClick={() => setIsInviteDialogOpen(false)}
                  className="whitespace-nowrap"
                >
                  Отмена
                </ShinyButton>
                <ShinyButton
                  onClick={async () => {
                    const inviteUrl = typeof window !== 'undefined' ? window.location.origin : ''
                    const shareData = {
                      title: 'Приглашение в ChefUp',
                      text: inviteMessage,
                      url: inviteUrl,
                    }

                    try {
                      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                        await navigator.share(shareData)
                        toast.success('Приглашение отправлено!')
                      } else {
                        // Fallback: копирование в буфер обмена
                        const fullText = `${inviteMessage}\n\n${inviteUrl}`
                        await navigator.clipboard.writeText(fullText)
                        toast.success('Ссылка скопирована в буфер обмена!')
                      }
                      setIsInviteDialogOpen(false)
                    } catch (error) {
                      // Пользователь отменил или произошла ошибка
                      if ((error as Error).name !== 'AbortError') {
                        // Если не отмена, пробуем скопировать
                        const fullText = `${inviteMessage}\n\n${inviteUrl}`
                        await navigator.clipboard.writeText(fullText)
                        toast.success('Ссылка скопирована в буфер обмена!')
                        setIsInviteDialogOpen(false)
                      }
                    }
                  }}
                  className="whitespace-nowrap"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </ShinyButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useEventsStore, useOnboardingStore, useAuthStore } from '@/stores/useOnboardingStore'
import { mockEvents } from '@/lib/mockEvents'
import { astanaEvents } from '@/lib/mockEventsAstana'
import { Plus, Search, Edit, Trash2, Eye, Download } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { Event } from '@/types/events.types'

export default function AdminEventsPage() {
  const { events, participations } = useEventsStore()
  const { formData: allUsersData } = useOnboardingStore()
  const userId = useAuthStore((state) => state.userId) || 'admin'
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'networking' as Event['type'],
    date: '',
    time: '',
    location: '',
    city: '',
    price: '0',
    organizer: '',
    maxParticipants: '100',
  })

  useEffect(() => {
    const allEventsList: Event[] = [
      ...events,
      ...mockEvents,
      ...astanaEvents,
    ]
    setAllEvents(allEventsList)
  }, [events])

  const filteredEvents = allEvents.filter((event) => {
    const search = searchTerm.toLowerCase()
    return (
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search) ||
      event.organizer.toLowerCase().includes(search)
    )
  })

  const getEventParticipants = (eventId: string) => {
    return participations.filter((p) => p.eventId === eventId)
  }

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsViewDialogOpen(true)
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
      toast.error('Заполните все обязательные поля')
      return
    }

    const event: Event = {
      id: `event-${Date.now()}`,
      ...newEvent,
      address: newEvent.location || '',
      price: parseFloat(newEvent.price) || 0,
      maxParticipants: parseInt(newEvent.maxParticipants) || 100,
      status: 'approved',
      createdAt: new Date().toISOString(),
    }

    const { id, createdAt, status, ...eventData } = event
    useEventsStore.getState().addEvent(eventData, userId)
    toast.success('Мероприятие создано')
    setIsCreateDialogOpen(false)
    setNewEvent({
      title: '',
      description: '',
      type: 'networking',
      date: '',
      time: '',
      location: '',
      city: '',
      price: '0',
      organizer: '',
      maxParticipants: '100',
    })
  }

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Вы уверены, что хотите удалить это мероприятие?')) {
      useEventsStore.getState().deleteEvent(eventId)
      setAllEvents(allEvents.filter((e) => e.id !== eventId))
      toast.success('Мероприятие удалено')
    }
  }

  const handleExportCSV = (eventId: string) => {
    const participants = getEventParticipants(eventId)
    const csvContent = [
      ['Имя', 'Email', 'Телефон', 'Статус'].join(','),
      ...participants.map((p) => {
        // В реальном приложении здесь будет запрос к API для получения данных пользователя
        return ['Пользователь', 'email@example.com', '+7 (777) XXX-XX-XX', p.status].join(',')
      }),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `event-${eventId}-participants.csv`
    link.click()
    toast.success('Список участников экспортирован')
  }

  const eventParticipants = selectedEvent && selectedEvent.id ? getEventParticipants(selectedEvent.id) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Мероприятия</h1>
          <p className="text-muted-foreground mt-1">Управление мероприятиями</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Создать мероприятие
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, организатору..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredEvents.length === 0 && allEvents.length > 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Мероприятия не найдены по заданным фильтрам
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Название</th>
                  <th className="text-left p-2">Тип</th>
                  <th className="text-left p-2">Дата</th>
                  <th className="text-left p-2">Город</th>
                  <th className="text-left p-2">Организатор</th>
                  <th className="text-left p-2">Участники</th>
                  <th className="text-left p-2">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => {
                  const participantsCount = event.id ? getEventParticipants(event.id).length : 0
                  return (
                    <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-2">{event.title}</td>
                      <td className="p-2">
                        <Badge variant="outline">{event.type}</Badge>
                      </td>
                      <td className="p-2">
                        {event.date ? format(new Date(event.date), 'dd.MM.yyyy', { locale: ru }) : '-'}
                      </td>
                      <td className="p-2">{event.location || '-'}</td>
                      <td className="p-2">{event.organizer}</td>
                      <td className="p-2">
                        <Badge>{participantsCount}</Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewEvent(event)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => event.id && handleDeleteEvent(event.id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {filteredEvents.length === 0 && allEvents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Мероприятий пока нет</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Создать мероприятие
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Диалог просмотра мероприятия с участниками */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>Детали мероприятия и список участников</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Информация о мероприятии</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Описание:</strong> {selectedEvent.description}</p>
                  <p><strong>Дата:</strong> {selectedEvent.date ? format(new Date(selectedEvent.date), 'dd.MM.yyyy', { locale: ru }) : '-'}</p>
                  <p><strong>Место:</strong> {selectedEvent.location}</p>
                  <p><strong>Цена:</strong> {selectedEvent.price === 0 ? 'Бесплатно' : `${selectedEvent.price} KZT`}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Участники ({eventParticipants.length})</h3>
                  <Button onClick={() => selectedEvent.id && handleExportCSV(selectedEvent.id)} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт CSV
                  </Button>
                </div>
                {eventParticipants.length > 0 ? (
                  <div className="space-y-2">
                    {eventParticipants.map((participation) => (
                      <Card key={participation.id}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Участник ID: {participation.userId}</p>
                              <p className="text-sm text-muted-foreground">
                                Статус: <Badge variant="outline">{participation.status}</Badge>
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Контакты
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Участников пока нет</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог создания мероприятия */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Создать мероприятие</DialogTitle>
            <DialogDescription>Заполните данные для нового мероприятия</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название *</Label>
              <AnimatedInput
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Название мероприятия"
              />
            </div>
            <div>
              <Label>Описание *</Label>
              <AnimatedTextarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Описание мероприятия"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Тип</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event['type'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="networking">Нетворкинг</SelectItem>
                    <SelectItem value="conference">Конференция</SelectItem>
                    <SelectItem value="workshop">Мастер-класс</SelectItem>
                    <SelectItem value="business-breakfast">Бизнес-завтрак</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Дата *</Label>
                <AnimatedInput
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Место *</Label>
                <AnimatedInput
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Адрес"
                />
              </div>
              <div>
                <Label>Город</Label>
                <AnimatedInput
                  value={newEvent.city}
                  onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                  placeholder="Город"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Цена (KZT)</Label>
                <AnimatedInput
                  type="number"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <Label>Организатор</Label>
                <AnimatedInput
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                  placeholder="Организатор"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreateEvent}>Создать</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


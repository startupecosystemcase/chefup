'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore, useEducationStore } from '@/stores/useOnboardingStore'
import { mockEducationItems } from '@/lib/mockEducation'
import { astanaEducationItems } from '@/lib/mockEducationAstana'
import { BookOpen, Clock, Users, Calendar, MapPin, Video, Award, Search, DollarSign, CheckCircle2, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { EventRegistrationForm } from '@/components/EventRegistrationForm'
import type { EducationType } from '@/types/education.types'

const typeIcons = {
  course: BookOpen,
  webinar: Video,
  training: BookOpen,
  certification: Award,
}

const typeLabels = {
  course: 'Курс',
  webinar: 'Вебинар',
  training: 'Тренинг',
  certification: 'Сертификация',
}

export default function PracticePage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const { items, enrollments, enroll } = useEducationStore()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<EducationType | 'all'>('all')
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedEducationId, setSelectedEducationId] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  // Объединяем mock данные с данными из store (включая реальные события из Астаны)
  const allItems = useMemo(() => {
    const mockItems = mockEducationItems.filter((item) => item.status === 'approved')
    const astanaItems = astanaEducationItems.filter((item) => item.status === 'approved')
    const storeItems = items.filter((item) => item.status === 'approved')
    return [...storeItems, ...mockItems, ...astanaItems]
  }, [items])

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === 'all' || item.type === selectedType

      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'free' && item.price === 0) ||
        (priceFilter === 'paid' && item.price > 0)

      return matchesSearch && matchesType && matchesPrice
    })
  }, [allItems, searchTerm, selectedType, priceFilter])

  const userEnrollments = useMemo(() => {
    if (!userId) return []
    return enrollments.filter((e) => e.userId === userId)
  }, [enrollments, userId])

  const isEnrolled = (educationId: string) => {
    return userEnrollments.some((e) => e.educationId === educationId)
  }

  const handleEnroll = (educationId: string) => {
    if (!userId) {
      toast.error('Необходимо войти в систему')
      return
    }
    enroll(userId, educationId)
    toast.success('Вы успешно записались на курс!')
  }

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Практика и обучение</h1>
          <p className="text-muted-foreground">
            Доступ к тренингам, мастер-классам, курсам и образовательным программам
          </p>
        </div>

        {/* Фильтры */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по названию, описанию или автору"
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as EducationType | 'all')}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Тип обучения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="course">Курсы</SelectItem>
                    <SelectItem value="webinar">Вебинары</SelectItem>
                    <SelectItem value="training">Тренинги</SelectItem>
                    <SelectItem value="certification">Сертификации</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Цена:</span>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant={priceFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('all')}
                  >
                    Все
                  </Button>
                  <Button
                    variant={priceFilter === 'free' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('free')}
                  >
                    Бесплатные
                  </Button>
                  <Button
                    variant={priceFilter === 'paid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriceFilter('paid')}
                  >
                    Платные
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Образовательные программы не найдены</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const Icon = typeIcons[item.type]
              const enrolled = isEnrolled(item.id!)

              return (
                <Card key={item.id} className="card-hover flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant="secondary">{typeLabels[item.type]}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-sm">Автор: {item.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                      {item.maxParticipants && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>До {item.maxParticipants} участников</span>
                        </div>
                      )}
                      {item.startDate && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(item.startDate).toLocaleDateString('ru-RU')}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs">{item.location}</span>
                        </div>
                      )}
                      {item.isOnline && !item.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Video className="w-4 h-4" />
                          <span>Онлайн</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 font-semibold">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span>{item.price === 0 ? 'Бесплатно' : `${item.price.toLocaleString('ru-RU')} ₸`}</span>
                      </div>
                    </div>
                    <div className="mt-auto space-y-2">
                      {enrolled ? (
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/dashboard/practice/${item.id}`}>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Перейти к курсу
                          </Link>
                        </Button>
                      ) : (
                        <>
                          <Button
                            className="w-full"
                            onClick={() => {
                              setSelectedEducationId(item.id!)
                              setIsRegistrationOpen(true)
                            }}
                          >
                            Записаться
                          </Button>
                          <Dialog open={isRegistrationOpen && selectedEducationId === item.id} onOpenChange={(open) => {
                            setIsRegistrationOpen(open)
                            if (!open) setSelectedEducationId(null)
                          }}>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Регистрация на {item.title}</DialogTitle>
                                <DialogDescription>
                                  Заполните форму для регистрации на образовательную программу
                                </DialogDescription>
                              </DialogHeader>
                              <EventRegistrationForm
                                eventId={item.id!}
                                eventTitle={item.title}
                                onSuccess={() => {
                                  setIsRegistrationOpen(false)
                                  setSelectedEducationId(null)
                                  handleEnroll(item.id!)
                                }}
                                onCancel={() => {
                                  setIsRegistrationOpen(false)
                                  setSelectedEducationId(null)
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                      <Button variant="ghost" className="w-full" asChild>
                        <Link href={`/dashboard/practice/${item.id}`}>Подробнее</Link>
                      </Button>
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

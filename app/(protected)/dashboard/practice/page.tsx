'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { useAuthStore, useEducationStore } from '@/stores/useOnboardingStore'
import { mockEducationItems } from '@/lib/mockEducation'
import { astanaEducationItems } from '@/lib/mockEducationAstana'
import { BookOpen, Clock, Users, Calendar, MapPin, Video, Award, Search, DollarSign, CheckCircle2, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Label } from '@/components/ui/label'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
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
  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false)
  const [certificateForm, setCertificateForm] = useState({
    title: '',
    description: '',
    organization: '',
    image: null as File | null,
  })

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
    <div className="px-3 py-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 dark:text-white">
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            Практика и обучение
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Доступ к тренингам, мастер-классам, курсам и образовательным программам
          </p>
        </div>

        {/* Фильтры - статичная полоса без hover эффектов */}
        <div className="mb-8 bg-white dark:bg-dark/50 rounded-xl border border-gray-200/50 dark:border-border/50 shadow-sm">
          <div className="pt-6 p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <AnimatedInput
                    placeholder="Поиск по названию"
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as EducationType | 'all')}>
                  <SelectTrigger className="w-full md:w-[180px] dark:bg-dark/70 dark:text-white">
                    <SelectValue placeholder="Тип" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-dark/90">
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="course">Курсы</SelectItem>
                    <SelectItem value="webinar">Вебинары</SelectItem>
                    <SelectItem value="training">Тренинги</SelectItem>
                    <SelectItem value="certification">Сертификации</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <Filter className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                  <span className="text-sm font-medium dark:text-gray-300">Цена:</span>
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

        {filteredItems.length === 0 ? (
          <StaggerItem>
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="py-12 text-center">
                <p className="text-muted-foreground dark:text-gray-400">Образовательные программы не найдены</p>
              </div>
            </AnimatedCard>
          </StaggerItem>
        ) : (
          <StaggerAnimation className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
            {filteredItems.map((item) => {
              const Icon = typeIcons[item.type]
              const enrolled = isEnrolled(item.id!)

              return (
                <StaggerItem key={item.id}>
                  <AnimatedCard className="card-hover flex flex-col bg-white dark:bg-dark/50">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <AnimatedBadge variant="secondary">{typeLabels[item.type]}</AnimatedBadge>
                    </div>
                    <h3 className="text-lg mb-2 font-semibold dark:text-white">{item.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">Автор: {item.author}</p>
                    <div className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-8 line-clamp-3">{item.description}</p>
                      <div className="space-y-4 text-sm mb-8">
                        <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{item.duration}</span>
                        </div>
                        {item.maxParticipants && (
                          <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>До {item.maxParticipants} участников</span>
                          </div>
                        )}
                        {item.startDate && (
                          <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.startDate).toLocaleDateString('ru-RU')}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs">{item.location}</span>
                          </div>
                        )}
                        {item.isOnline && !item.location && (
                          <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                            <Video className="w-4 h-4" />
                            <span>Онлайн</span>
                          </div>
                        )}
                        <div className="flex items-center gap-4 font-semibold dark:text-white">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span>{item.price === 0 ? 'Бесплатно' : `${item.price.toLocaleString('ru-RU')} ₸`}</span>
                        </div>
                      </div>
                      <div className="mt-auto space-y-4">
                        {enrolled ? (
                          <Link href={`/dashboard/practice/${item.id}`} className="block">
                            <ShinyButton variant="outline" className="w-full">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Перейти к курсу
                            </ShinyButton>
                          </Link>
                        ) : (
                          <>
                            <ShinyButton
                              className="w-full"
                              onClick={() => {
                                setSelectedEducationId(item.id!)
                                setIsRegistrationOpen(true)
                              }}
                            >
                              Записаться
                            </ShinyButton>
                            <Dialog open={isRegistrationOpen && selectedEducationId === item.id} onOpenChange={(open) => {
                              setIsRegistrationOpen(open)
                              if (!open) setSelectedEducationId(null)
                            }}>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark/90">
                                <DialogHeader>
                                  <DialogTitle className="dark:text-white">Регистрация на {item.title}</DialogTitle>
                                  <DialogDescription className="dark:text-gray-400">
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
                        <Link href={`/dashboard/practice/${item.id}`} className="block">
                          <ShinyButton variant="ghost" className="w-full">
                            Подробнее
                          </ShinyButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerAnimation>
        )}
      </div>
    </div>
  )
}

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
import { BookOpen, Clock, Users, Calendar, MapPin, Video, Award, Search, CreditCard, Filter } from 'lucide-react'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
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

export default function EducationPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const { items } = useEducationStore()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<EducationType | 'all'>('all')
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  // Объединяем mock данные с данными из store
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

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2 flex items-center gap-3 dark:text-white">
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            Курсы для рестораторов и предпринимателей
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Образовательные программы и курсы для развития ресторанного бизнеса
          </p>
        </div>

        {/* Фильтры - статичная полоса без hover эффектов */}
        <div className="mb-8 bg-white dark:bg-dark/50 rounded-xl border border-gray-200/50 dark:border-border/50 shadow-sm">
          <div className="p-3 md:p-6">
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
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <p className="text-muted-foreground dark:text-gray-400">Курсы не найдены</p>
            </div>
          </AnimatedCard>
        ) : (
          <StaggerAnimation className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
            {filteredItems.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <StaggerItem key={item.id}>
                  <AnimatedCard className="card-hover flex flex-col bg-white dark:bg-dark/50">
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-6 md:mb-4">
                        <div className="flex items-start justify-between mb-6 md:mb-2">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <AnimatedBadge variant="secondary">{typeLabels[item.type]}</AnimatedBadge>
                        </div>
                        <h3 className="text-lg mb-6 md:mb-2 font-semibold dark:text-white">{item.title}</h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{item.duration}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>Автор: {item.author}</span>
                          </div>
                          <div className="flex items-center gap-4 font-semibold dark:text-white">
                            <CreditCard className="w-4 h-4 text-primary" />
                            <span>{item.price === 0 ? 'Бесплатно' : `${item.price.toLocaleString('ru-RU')} ₸`}</span>
                          </div>
                        </div>
                        <ShinyButton variant="outline" className="w-full whitespace-nowrap" asChild>
                          <Link href={`/dashboard/education/${item.id}`}>
                            Подробнее
                          </Link>
                        </ShinyButton>
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


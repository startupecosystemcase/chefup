'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { mockPartnersApplicants, mockPartnersEmployers } from '@/lib/mockPartners'
import { Search, ExternalLink, Gift, Phone, Mail, Package, GraduationCap, Shirt, ShoppingCart, Building, TrendingUp, Calculator, Settings, Users, ArrowLeft } from 'lucide-react'
import type { PartnerType } from '@/types/partners.types'

const typeIcons = {
  equipment: Package,
  education: GraduationCap,
  clothing: Shirt,
  ingredients: ShoppingCart,
  internships: Building,
  'restaurant-equipment': Package,
  'raw-materials': TrendingUp,
  accounting: Calculator,
  automation: Settings,
  consulting: Users,
}

const typeLabels = {
  equipment: 'Инвентарь и экипировка',
  education: 'Обучение',
  clothing: 'Одежда для кухни',
  ingredients: 'Ингредиенты',
  internships: 'Стажировки',
  'restaurant-equipment': 'Оборудование',
  'raw-materials': 'Сырьё',
  accounting: 'Бухгалтерия',
  automation: 'Автоматизация',
  consulting: 'Консалтинг',
}

// Категории партнеров для главного экрана
const partnerCategories = [
  {
    id: 'ingredients',
    title: 'Поставщики ингредиентов',
    icon: ShoppingCart,
    description: 'Надежные поставщики качественных ингредиентов',
  },
  {
    id: 'restaurant-equipment',
    title: 'Поставщики оборудования',
    icon: Package,
    description: 'Профессиональное оборудование для ресторанов',
  },
  {
    id: 'clothing',
    title: 'Униформа / Текстиль',
    icon: Shirt,
    description: 'Униформа и текстиль для HoReCa',
  },
  {
    id: 'accounting',
    title: 'Дистрибьюторы',
    icon: TrendingUp,
    description: 'Дистрибьюторские компании',
  },
  {
    id: 'education',
    title: 'Обучающие партнеры',
    icon: GraduationCap,
    description: 'Образовательные программы и курсы',
  },
  {
    id: 'automation',
    title: 'Финансовые сервисы / Зарплатные проекты',
    icon: Calculator,
    description: 'Финансовые услуги для ресторанного бизнеса',
  },
]

export default function PartnersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<PartnerType | 'all'>('all')

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  // Выбираем партнёров в зависимости от роли
  const allPartners = useMemo(() => {
    if (userRole === 'employer') {
      return mockPartnersEmployers
    }
    return mockPartnersApplicants
  }, [userRole])

  const filteredPartners = useMemo(() => {
    return allPartners.filter((partner) => {
      const matchesSearch =
        searchTerm === '' ||
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === 'all' || partner.type === selectedType

      return matchesSearch && matchesType
    })
  }, [allPartners, searchTerm, selectedType])

  if (!mounted || !userId) {
    return null
  }

  // Обработка ошибок
  try {
    if (!allPartners || allPartners.length === 0) {
      // Пустое состояние
    }
  } catch (error) {
    console.error('Ошибка загрузки партнёров:', error)
    return (
      <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-7xl">
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <p className="text-muted-foreground dark:text-gray-400 mb-6 md:mb-4">Партнёры пока отсутствуют</p>
              <p className="text-sm text-muted-foreground dark:text-gray-500">Мы работаем над добавлением партнёров</p>
            </div>
          </AnimatedCard>
        </div>
      </div>
    )
  }

  // Фильтруем партнеров по категории, если выбрана
  const filteredPartnersByCategory = useMemo(() => {
    if (!categoryId) return filteredPartners
    return filteredPartners.filter((partner) => partner.type === categoryId)
  }, [filteredPartners, categoryId])

  // Получаем информацию о выбранной категории
  const selectedCategory = useMemo(() => {
    if (!categoryId) return null
    return partnerCategories.find((cat) => cat.id === categoryId)
  }, [categoryId])

  // Получаем доступные типы для текущей роли
  const availableTypes = useMemo(() => {
    const types = new Set(allPartners.map((p) => p.type))
    return Array.from(types)
  }, [allPartners])

  // Если выбрана категория, показываем страницу категории
  if (categoryId && selectedCategory) {
    return (
      <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-6xl">
          {/* Кнопка назад и заголовок */}
          <div className="mb-8">
            <ShinyButton
              variant="ghost"
              onClick={() => router.push('/dashboard/partners')}
              className="mb-6 md:mb-4 flex items-center gap-2 whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span>Назад</span>
            </ShinyButton>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2 dark:text-white">{selectedCategory.title}</h1>
            <p className="text-muted-foreground dark:text-gray-400">{selectedCategory.description}</p>
          </div>

          {/* Поиск и фильтры - статичная полоса */}
          <div className="mb-8 bg-white dark:bg-dark/50 rounded-xl border border-gray-200/50 dark:border-border/50 shadow-sm">
            <div className="p-3 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <AnimatedInput
                    placeholder="Поиск партнёров..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Список партнеров категории */}
          {filteredPartnersByCategory.length === 0 ? (
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="py-12 text-center">
                <p className="text-muted-foreground dark:text-gray-400 mb-6 md:mb-4">Партнёры пока отсутствуют</p>
                <p className="text-sm text-muted-foreground dark:text-gray-500 mb-6">Мы работаем над добавлением партнёров в эту категорию</p>
                <ShinyButton variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap mx-auto">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>Предложить партнёра</span>
                </ShinyButton>
              </div>
            </AnimatedCard>
          ) : (
            <StaggerAnimation className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
              {filteredPartnersByCategory.map((partner) => {
                const Icon = typeIcons[partner.type]
                return (
                  <StaggerItem key={partner.id}>
                    <AnimatedCard className="card-hover flex flex-col bg-white dark:bg-dark/50">
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-6 md:mb-4">
                          <div className="flex items-start justify-between mb-6 md:mb-2">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <AnimatedBadge variant="secondary">{typeLabels[partner.type]}</AnimatedBadge>
                          </div>
                          <h3 className="text-lg mb-6 md:mb-2 font-semibold dark:text-white">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-3">{partner.description}</p>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="space-y-5 mb-8">
                            <div>
                              <h4 className="text-sm font-semibold mb-6 md:mb-2 flex items-center gap-4 dark:text-white">
                                <Gift className="w-4 h-4 text-primary" />
                                Преимущества:
                              </h4>
                              <ul className="text-sm text-muted-foreground dark:text-gray-400 space-y-1">
                                {partner.benefits.slice(0, 3).map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-4">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {partner.conditions && (
                              <div className="p-2 rounded-md bg-muted dark:bg-gray-800 text-xs text-muted-foreground dark:text-gray-400">
                                {partner.conditions}
                              </div>
                            )}
                          </div>
                          <div className="mt-auto space-y-4 pt-4 border-t dark:border-gray-700">
                            {partner.website && (
                              <ShinyButton variant="outline" className="w-full flex items-center gap-2 whitespace-nowrap justify-center" asChild>
                                <a href={partner.website} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                  <span>Перейти на сайт</span>
                                </a>
                              </ShinyButton>
                            )}
                            <div className="flex gap-4 text-xs text-muted-foreground dark:text-gray-400">
                              {partner.contactEmail && (
                                <a href={`mailto:${partner.contactEmail}`} className="flex items-center gap-1 hover:text-primary">
                                  <Mail className="w-3 h-3" />
                                  Email
                                </a>
                              )}
                              {partner.contactPhone && (
                                <a href={`tel:${partner.contactPhone}`} className="flex items-center gap-1 hover:text-primary">
                                  <Phone className="w-3 h-3" />
                                  {partner.contactPhone}
                                </a>
                              )}
                            </div>
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

  // Главный экран с плитками категорий
  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2 dark:text-white">Партнёры</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            {userRole === 'employer'
              ? 'Проверенные партнёры для развития вашего ресторанного бизнеса'
              : 'Специальные предложения и бонусы от наших партнёров'}
          </p>
        </div>

        {/* Плитки категорий */}
        <StaggerAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {partnerCategories.map((category) => {
            const Icon = category.icon
            const partnersCount = allPartners.filter((p) => p.type === category.id).length
            return (
              <StaggerItem key={category.id}>
                <AnimatedCard 
                  className="card-hover bg-white dark:bg-dark/50 cursor-pointer h-full"
                  onClick={() => router.push(`/dashboard/partners?category=${category.id}`)}
                >
                  <div className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
              </div>
                    <h3 className="text-xl font-semibold mb-6 md:mb-3 dark:text-white">{category.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6 md:mb-4 flex-1">
                      {category.description}
                    </p>
                    {partnersCount > 0 && (
                      <AnimatedBadge variant="secondary" className="mt-auto">
                        {partnersCount} {partnersCount === 1 ? 'партнёр' : partnersCount < 5 ? 'партнёра' : 'партнёров'}
                      </AnimatedBadge>
                    )}
          </div>
        </AnimatedCard>
              </StaggerItem>
            )
          })}
        </StaggerAnimation>

        {filteredPartners.length === 0 ? (
          <StaggerItem>
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="py-12 text-center">
                <p className="text-muted-foreground dark:text-gray-400">Партнёры не найдены</p>
              </div>
            </AnimatedCard>
          </StaggerItem>
        ) : (
          <StaggerAnimation className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
            {filteredPartners.map((partner) => {
              const Icon = typeIcons[partner.type]

              return (
                <StaggerItem key={partner.id}>
                  <AnimatedCard className="card-hover flex flex-col bg-white dark:bg-dark/50">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-6 md:mb-4">
                      <div className="flex items-start justify-between mb-6 md:mb-2">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <AnimatedBadge variant="secondary">{typeLabels[partner.type]}</AnimatedBadge>
                      </div>
                      <h3 className="text-lg mb-6 md:mb-2 font-semibold dark:text-white">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-3">{partner.description}</p>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="space-y-5 mb-8">
                        <div>
                          <h4 className="text-sm font-semibold mb-6 md:mb-2 flex items-center gap-4 dark:text-white">
                            <Gift className="w-4 h-4 text-primary" />
                            Преимущества:
                          </h4>
                          <ul className="text-sm text-muted-foreground dark:text-gray-400 space-y-1">
                            {partner.benefits.slice(0, 3).map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-4">
                                <span className="text-primary mt-1">•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {partner.offers && partner.offers.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold mb-6 md:mb-2 dark:text-white">Предложения:</h4>
                            <ul className="text-sm text-muted-foreground dark:text-gray-400 space-y-1">
                              {partner.offers.slice(0, 2).map((offer, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{offer}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {partner.conditions && (
                          <div className="p-2 rounded-md bg-muted dark:bg-gray-800 text-xs text-muted-foreground dark:text-gray-400">
                            {partner.conditions}
                          </div>
                        )}
                      </div>

                      <div className="mt-auto space-y-4 pt-4 border-t dark:border-gray-700">
                        {partner.website && (
                          <ShinyButton variant="outline" className="w-full" asChild>
                            <a href={partner.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Перейти на сайт
                            </a>
                          </ShinyButton>
                        )}
                        <div className="flex gap-4 text-xs text-muted-foreground dark:text-gray-400">
                          {partner.contactEmail && (
                            <a
                              href={`mailto:${partner.contactEmail}`}
                              className="flex items-center gap-1 hover:text-primary"
                            >
                              <Mail className="w-3 h-3" />
                              Email
                            </a>
                          )}
                          {partner.contactPhone && (
                            <a
                              href={`tel:${partner.contactPhone}`}
                              className="flex items-center gap-1 hover:text-primary"
                            >
                              <Phone className="w-3 h-3" />
                              {partner.contactPhone}
                            </a>
                          )}
                        </div>
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


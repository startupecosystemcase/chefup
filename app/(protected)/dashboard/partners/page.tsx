'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { mockPartnersApplicants, mockPartnersEmployers } from '@/lib/mockPartners'
import { Search, ExternalLink, Gift, Phone, Mail, Package, GraduationCap, Shirt, ShoppingCart, Building, TrendingUp, Calculator, Settings, Users } from 'lucide-react'
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

export default function PartnersPage() {
  const router = useRouter()
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

  // Получаем доступные типы для текущей роли
  const availableTypes = useMemo(() => {
    const types = new Set(allPartners.map((p) => p.type))
    return Array.from(types)
  }, [allPartners])

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Партнёры</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            {userRole === 'employer'
              ? 'Проверенные партнёры для развития вашего ресторанного бизнеса'
              : 'Специальные предложения и бонусы от наших партнёров'}
          </p>
        </div>

        {/* Фильтры */}
        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-6">
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
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value as PartnerType | 'all')}>
                <SelectTrigger className="w-full md:w-[250px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50">
                  <SelectValue placeholder="Тип партнёра" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="all">Все типы</SelectItem>
                  {availableTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {typeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </AnimatedCard>

        {filteredPartners.length === 0 ? (
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <p className="text-muted-foreground dark:text-gray-400">Партнёры не найдены</p>
            </div>
          </AnimatedCard>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPartners.map((partner) => {
              const Icon = typeIcons[partner.type]

              return (
                <AnimatedCard key={partner.id} className="card-hover flex flex-col bg-white dark:bg-dark/50">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <AnimatedBadge variant="secondary">{typeLabels[partner.type]}</AnimatedBadge>
                      </div>
                      <h3 className="text-lg mb-2 font-semibold dark:text-white">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-3">{partner.description}</p>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="space-y-5 mb-8">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-4 dark:text-white">
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
                            <h4 className="text-sm font-semibold mb-2 dark:text-white">Предложения:</h4>
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
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


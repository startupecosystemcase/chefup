'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'
import { Crown, CheckCircle, Sparkles, TrendingUp, Shield, ArrowRight, Loader2 } from 'lucide-react'
import { useAuthStore, useEmployerOnboardingStore } from '@/stores/useOnboardingStore'
import { cn } from '@/lib/utils'

// Упрощенный список реальных преимуществ PRO
const proBenefits = [
  {
    icon: Sparkles,
    title: 'Профиль в приоритете',
    description: 'Ваш профиль показывается работодателям в первую очередь',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Приоритет в подборе',
    description: 'Система подбирает лучшие вакансии специально для вас',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Доступ к приоритетным вакансиям',
    description: 'Эксклюзивные вакансии от премиум-работодателей',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: CheckCircle,
    title: 'Верифицированный профиль',
    description: 'Подтверждение личности через онлайн собеседование',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
]

// Mock список валидных промокодов (в реальном приложении будет на бэкенде)
const validPromoCodes = ['CHEFUP2026', 'CHEFAPP2026', 'PRO2026', 'TESTPRO']

export default function SubscriptionPage() {
  const userRole = useAuthStore((state) => state.userRole)
  const [promoCode, setPromoCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus)
  const setSubscriptionStatus = useAuthStore((state) => state.setSubscriptionStatus)

  // Если работодатель - показываем форму для компаний
  if (userRole === 'employer') {
    return <EmployerSubscriptionPage />
  }

  const handleActivatePromo = async () => {
    if (!promoCode.trim()) {
      toast.error('Введите промокод')
      return
    }

    setIsValidating(true)
    
    // Имитация валидации промокода (в реальном приложении будет API запрос)
    setTimeout(() => {
      const normalizedCode = promoCode.trim().toUpperCase()
      if (validPromoCodes.includes(normalizedCode)) {
        setSubscriptionStatus('PRO')
        toast.success('PRO подписка успешно активирована!')
        setPromoCode('')
      } else {
        toast.error('Неверный промокод. Проверьте правильность ввода.')
      }
      setIsValidating(false)
    }, 1000)
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8 text-center">
          <h1 className="text-4xl font-bold mb-6 md:mb-2 dark:text-white">Управление подпиской</h1>
          <p className="text-muted-foreground dark:text-gray-400 text-lg">
            Выберите план, который подходит именно вам
          </p>
        </div>

        {/* Текущий статус */}
        <div className="mb-8 md:mb-8">
          <AnimatedCard className={cn(
            'border-2 transition-all duration-300 bg-white dark:bg-dark/50',
            subscriptionStatus === 'PRO' 
              ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20' 
              : 'border-border dark:border-gray-700'
          )}>
            <div className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-6 md:mb-4">
                <div>
                  <h2 className="text-2xl mb-6 md:mb-2 font-semibold dark:text-white">Текущий план</h2>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Ваш активный план подписки</p>
                </div>
                <AnimatedBadge 
                  variant={subscriptionStatus === 'PRO' ? 'default' : 'outline'} 
                  className={cn(
                    'text-lg px-6 py-3 transition-all duration-300',
                    subscriptionStatus === 'PRO' && 'animate-pulse'
                  )}
                >
                  {subscriptionStatus === 'PRO' ? (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      PRO
                    </>
                  ) : (
                    'BASIC'
                  )}
                </AnimatedBadge>
              </div>
              {subscriptionStatus === 'PRO' ? (
                <div className="flex items-center gap-4 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium dark:text-primary">PRO подписка активна. Наслаждайтесь всеми преимуществами!</span>
                </div>
              ) : (
                <p className="text-muted-foreground dark:text-gray-400">
                  Обновите до PRO для доступа к расширенным функциям и преимуществам
                </p>
              )}
            </div>
          </AnimatedCard>
        </div>

        {/* Преимущества PRO */}
        <div className="mb-8 md:mb-8">
          <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Преимущества PRO подписки</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <AnimatedCard
                  key={index}
                  className={cn(
                    'card-hover transition-all duration-300 bg-white dark:bg-dark/50',
                    subscriptionStatus === 'PRO' && 'border-primary/50'
                  )}
                >
                  <div className="p-3 md:p-6">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center mb-8 transition-all duration-300',
                      benefit.bgColor
                    )}>
                      <Icon className={cn('w-6 h-6', benefit.color)} />
                    </div>
                    <h3 className="text-lg font-semibold mb-6 md:mb-2 dark:text-white">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{benefit.description}</p>
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        </div>

        {/* Активация промокода */}
        {subscriptionStatus === 'BASIC' && (
          <AnimatedCard className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20">
            <div className="p-3 md:p-6">
              <h2 className="text-2xl font-semibold mb-6 md:mb-2 dark:text-white flex items-center gap-4">
                <Crown className="w-6 h-6 text-primary" />
                Активировать PRO подписку
              </h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
                Введите промокод для активации PRO подписки и получите доступ ко всем преимуществам
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <AnimatedInput
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Введите промокод"
                    className="flex-1 text-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleActivatePromo()
                      }
                    }}
                  />
                  <ShinyButton 
                    onClick={handleActivatePromo} 
                    size="lg"
                    className="px-8"
                    disabled={isValidating || !promoCode.trim()}
                  >
                    {isValidating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Проверка...
                      </>
                    ) : (
                      <>
                    Активировать
                    <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </ShinyButton>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Промокод можно получить на мероприятиях ChefUp или у партнёров платформы
                </p>
              </div>
            </div>
          </AnimatedCard>
        )}
      </div>
    </div>
  )
}

// Форма управления подпиской для компаний
function EmployerSubscriptionPage() {
  const employerFormData = useEmployerOnboardingStore((state) => state.formData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    requestsPerMonth: '',
    branchesCount: '',
    contact: employerFormData?.email || employerFormData?.phone || '',
    comment: '',
    preferredContact: 'email' as 'email' | 'phone',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.requestsPerMonth || !formData.branchesCount || !formData.contact) {
      toast.error('Заполните все обязательные поля')
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      toast.success('Форма отправлена!')
    } catch (error) {
      toast.error('Ошибка при отправке формы')
    }
  }

  if (isSubmitted) {
    return (
      <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-3xl">
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-6 md:mb-4 dark:text-white">Форма отправлена</h2>
              <p className="text-muted-foreground dark:text-gray-400 mb-8">
                С вами свяжутся в ближайшее время для обсуждения подписки
              </p>
              <ShinyButton onClick={() => window.location.reload()}>
                Вернуться
              </ShinyButton>
            </div>
          </AnimatedCard>
        </div>
      </div>
    )
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-6 md:mb-2 dark:text-white">Управление подпиской</h1>
          <p className="text-muted-foreground dark:text-gray-400 text-lg">
            Заполните форму для связи с нами по вопросам подписки
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Информация о компании</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Количество заявок в месяц (общее) *</Label>
                  <AnimatedInput
                    type="number"
                    value={formData.requestsPerMonth}
                    onChange={(e) => setFormData(prev => ({ ...prev, requestsPerMonth: e.target.value }))}
                    placeholder="Введите число"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Количество филиалов *</Label>
                  <AnimatedInput
                    type="number"
                    value={formData.branchesCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, branchesCount: e.target.value }))}
                    placeholder="Введите число"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Удобный контакт (email/телефон) *</Label>
                  <AnimatedInput
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="email@example.com или +7 (777) 123-45-67"
                    required
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Предпочтительный способ связи *</Label>
                  <Select value={formData.preferredContact} onValueChange={(value: 'email' | 'phone') => setFormData(prev => ({ ...prev, preferredContact: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Телефон</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Комментарий / Цель *</Label>
                  <AnimatedTextarea
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Опишите ваши цели и потребности..."
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>
            </div>
          </AnimatedCard>

          <div className="flex gap-4 justify-end mt-6">
            <ShinyButton type="submit">
              Отправить заявку
            </ShinyButton>
          </div>
        </form>
      </div>
    </div>
  )
}

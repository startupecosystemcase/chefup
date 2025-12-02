'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Crown, CheckCircle, Sparkles, TrendingUp, Shield, Zap, Star, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { cn } from '@/lib/utils'

const proBenefits = [
  {
    icon: Sparkles,
    title: 'Приоритет в поиске',
    description: 'Ваше резюме показывается работодателям в первую очередь',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Расширенная аналитика',
    description: 'Детальная статистика просмотров, откликов и совпадений',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Закрытые вакансии',
    description: 'Доступ к эксклюзивным вакансиям от премиум-работодателей',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    title: 'Безлимитное портфолио',
    description: 'Публикуйте неограниченное количество работ и проектов',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Star,
    title: 'Приоритетная поддержка',
    description: 'Быстрые ответы на вопросы и персональный менеджер',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Crown,
    title: 'Эксклюзивные события',
    description: 'Приглашения на закрытые мероприятия и мастер-классы',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]

export default function SubscriptionPage() {
  const [promoCode, setPromoCode] = useState('')
  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus)
  const setSubscriptionStatus = useAuthStore((state) => state.setSubscriptionStatus)

  const handleActivatePromo = () => {
    if (promoCode.trim()) {
      setSubscriptionStatus('PRO')
      toast.success('PRO подписка активирована!')
      setPromoCode('')
    } else {
      toast.error('Введите промокод')
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Управление подпиской</h1>
          <p className="text-muted-foreground text-lg">
            Выберите план, который подходит именно вам
          </p>
        </div>

        {/* Текущий статус */}
        <div className="mb-6 md:mb-8">
          <Card className={cn(
            'border-2 transition-all duration-300',
            subscriptionStatus === 'PRO' 
              ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10' 
              : 'border-border'
          )}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">Текущий план</CardTitle>
                  <CardDescription>Ваш активный план подписки</CardDescription>
                </div>
                <Badge 
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
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {subscriptionStatus === 'PRO' ? (
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">PRO подписка активна. Наслаждайтесь всеми преимуществами!</span>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Обновите до PRO для доступа к расширенным функциям и преимуществам
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Преимущества PRO */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Преимущества PRO подписки</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={index}
                  className={cn(
                    'card-hover transition-all duration-300',
                    subscriptionStatus === 'PRO' && 'border-primary/50'
                  )}
                >
                  <CardHeader>
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300',
                      benefit.bgColor
                    )}>
                      <Icon className={cn('w-6 h-6', benefit.color)} />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Активация промокода */}
        {subscriptionStatus === 'BASIC' && (
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Crown className="w-6 h-6 text-primary" />
                Активировать PRO подписку
              </CardTitle>
              <CardDescription>
                Введите промокод для активации PRO подписки и получите доступ ко всем преимуществам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
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
                  <Button 
                    onClick={handleActivatePromo} 
                    size="lg"
                    className="px-8"
                  >
                    Активировать
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Промокод можно получить на мероприятиях ChefUp или у партнёров платформы
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

'use client'

import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { AnimatedProgress } from '@/components/magicui/animated-progress'
import { CreditCard, TrendingUp, Target, Eye, Send, Sparkles, AlertCircle, CheckCircle2, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OnboardingFormData } from '@/types/onboarding.types'

interface ProfileAnalyticsProps {
  formData: Partial<OnboardingFormData>
}

// Mock данные для демонстрации
const mockAnalytics = {
  salary: {
    average: 250000,
    min: 180000,
    max: 350000,
    userExpectation: 280000, // Из formData.salaryExpectation
    status: 'above' as 'above' | 'within' | 'below',
  },
  demand: {
    score: 78,
    trend: 'up' as 'up' | 'down' | 'stable',
  },
  match: {
    overall: 82,
    skills: 85,
    experience: 80,
    specialization: 90,
    schedule: 75,
    salary: 80,
  },
  visibility: {
    views7d: 24,
    views30d: 89,
    sentToEmployers: 12,
    autoMatched: 8,
  },
  recommendations: [
    { type: 'skill', text: 'Добавьте сертификат HACCP для повышения релевантности', priority: 'high' },
    { type: 'course', text: 'Рекомендуем пройти курс "Управление кухней"', priority: 'medium' },
    { type: 'profile', text: 'Заполните раздел "О себе" для лучшего представления', priority: 'low' },
  ],
  dynamics: {
    relevance: { current: 82, previous: 75, change: 7 },
    views: { current: 89, previous: 65, change: 24 },
    matches: { current: 8, previous: 5, change: 3 },
  },
}

export function ProfileAnalytics({ formData }: ProfileAnalyticsProps) {
  const analytics = mockAnalytics

  // Парсим зарплатные ожидания из formData
  const parseSalary = (salaryStr?: string): number => {
    if (!salaryStr) return analytics.salary.userExpectation
    const match = salaryStr.match(/(\d+)/)
    return match ? parseInt(match[1]) * 1000 : analytics.salary.userExpectation
  }

  const userSalary = parseSalary(formData.salaryExpectation)
  const salaryPosition = ((userSalary - analytics.salary.min) / (analytics.salary.max - analytics.salary.min)) * 100

  const getSalaryStatus = () => {
    if (userSalary > analytics.salary.max) return { status: 'above', text: 'Выше рынка', color: 'text-green-600' }
    if (userSalary < analytics.salary.min) return { status: 'below', text: 'Ниже рынка', color: 'text-orange-600' }
    return { status: 'within', text: 'В среднем диапазоне', color: 'text-primary' }
  }

  const salaryStatus = getSalaryStatus()

  return (
    <div className="space-y-8">
      {/* Средняя зарплата по должности */}
      <AnimatedCard className="glass shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_8px_-1px_rgba(0,0,0,0.04)] border-t border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-dark/50">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 dark:text-white flex items-center gap-4">
            <CreditCard className="w-5 h-5 text-primary" />
            Средняя зарплата по должности
          </h3>
          <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Сравнение ваших ожиданий с рынком</p>
          <div className="space-y-4">
            <div className="text-center p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{analytics.salary.average.toLocaleString()} ₸</div>
              <div className="text-xs text-muted-foreground dark:text-gray-400">Средняя зарплата</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground dark:text-gray-400">Минимум: {analytics.salary.min.toLocaleString()} ₸</span>
                <span className="text-muted-foreground dark:text-gray-400">Максимум: {analytics.salary.max.toLocaleString()} ₸</span>
              </div>
              <div className="relative h-8 bg-muted dark:bg-gray-800 rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center">
                  <div className="flex-1 h-full bg-gradient-to-r from-orange-500/20 via-primary/30 to-green-500/20" />
                </div>
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-primary"
                  style={{ left: `${Math.max(0, Math.min(100, salaryPosition))}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <AnimatedBadge variant="default" className="text-xs">
                      Ваши ожидания: {userSalary.toLocaleString()} ₸
                    </AnimatedBadge>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <AnimatedBadge variant={salaryStatus.status === 'above' ? 'default' : 'secondary'} className="mt-2">
                  {salaryStatus.text}
                </AnimatedBadge>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Индекс востребованности */}
      <AnimatedCard className="shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_8px_-1px_rgba(0,0,0,0.04)] border-t border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-dark/50">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 dark:text-white flex items-center gap-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            Индекс востребованности
          </h3>
          <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Общий показатель спроса на вашу должность</p>
          <div className="text-center p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg mb-4">
            <div className="text-3xl font-bold text-primary mb-1">{analytics.demand.score}%</div>
            <AnimatedBadge variant={analytics.demand.trend === 'up' ? 'default' : 'secondary'} className="flex items-center gap-1 mx-auto mt-2 w-fit">
              {analytics.demand.trend === 'up' && <ArrowUp className="w-3 h-3" />}
              {analytics.demand.trend === 'down' && <ArrowDown className="w-3 h-3" />}
              {analytics.demand.trend === 'stable' && <Minus className="w-3 h-3" />}
              {analytics.demand.trend === 'up' ? 'Растёт' : analytics.demand.trend === 'down' ? 'Падает' : 'Стабильно'}
            </AnimatedBadge>
          </div>
          <div className="space-y-3">
            <AnimatedProgress value={analytics.demand.score} className="h-3" />
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Высокий спрос на специалистов вашего профиля на рынке труда
            </p>
          </div>
        </div>
      </AnimatedCard>

      {/* Индикатор совпадения с вакансиями */}
      <AnimatedCard className="bg-white dark:bg-dark/50">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 dark:text-white flex items-center gap-4">
            <Target className="w-5 h-5 text-primary" />
            Совпадение с вакансиями
          </h3>
          <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Общий рейтинг вашего профиля</p>
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg border-2 border-primary/20 dark:border-primary/30">
              <div className="text-5xl font-bold text-primary mb-2">{analytics.match.overall}%</div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Общее совпадение</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                  <span>Навыки</span>
                  <span className="font-semibold">{analytics.match.skills}%</span>
                </div>
                <AnimatedProgress value={analytics.match.skills} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                  <span>Опыт</span>
                  <span className="font-semibold">{analytics.match.experience}%</span>
                </div>
                <AnimatedProgress value={analytics.match.experience} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                  <span>Специализация</span>
                  <span className="font-semibold">{analytics.match.specialization}%</span>
                </div>
                <AnimatedProgress value={analytics.match.specialization} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                  <span>График</span>
                  <span className="font-semibold">{analytics.match.schedule}%</span>
                </div>
                <AnimatedProgress value={analytics.match.schedule} className="h-2" />
              </div>
              <div className="col-span-2">
                <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                  <span>Зарплата</span>
                  <span className="font-semibold">{analytics.match.salary}%</span>
                </div>
                <AnimatedProgress value={analytics.match.salary} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Статистика видимости */}
      <AnimatedCard className="bg-white dark:bg-dark/50">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 dark:text-white flex items-center gap-4">
            <Eye className="w-5 h-5 text-primary" />
            Статистика видимости
          </h3>
          <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Активность вашего профиля</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.views7d}</div>
              <div className="text-xs text-muted-foreground dark:text-gray-400">Просмотров за 7 дней</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.views30d}</div>
              <div className="text-xs text-muted-foreground dark:text-gray-400">Просмотров за 30 дней</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.sentToEmployers}</div>
              <div className="text-xs text-muted-foreground dark:text-gray-400">Отправлено работодателям</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.autoMatched}</div>
              <div className="text-xs text-muted-foreground dark:text-gray-400">Автоподбор</div>
            </div>
          </div>
        </div>
      </AnimatedCard>


      {/* Динамика улучшений */}
      <AnimatedCard className="bg-white dark:bg-dark/50">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 dark:text-white flex items-center gap-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            Динамика улучшений
          </h3>
          <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Изменения за последний месяц</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Релевантность</p>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Было: {analytics.dynamics.relevance.previous}%</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{analytics.dynamics.relevance.current}%</p>
                <AnimatedBadge variant="default" className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3" />
                  +{analytics.dynamics.relevance.change}%
                </AnimatedBadge>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Просмотры</p>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Было: {analytics.dynamics.views.previous}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{analytics.dynamics.views.current}</p>
                <AnimatedBadge variant="default" className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3" />
                  +{analytics.dynamics.views.change}
                </AnimatedBadge>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Совпадения</p>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Было: {analytics.dynamics.matches.previous}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{analytics.dynamics.matches.current}</p>
                <AnimatedBadge variant="default" className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3" />
                  +{analytics.dynamics.matches.change}
                </AnimatedBadge>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  )
}


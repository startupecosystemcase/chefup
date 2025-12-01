'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DollarSign, TrendingUp, Target, Eye, Send, Sparkles, AlertCircle, CheckCircle2, ArrowUp, ArrowDown, Minus } from 'lucide-react'
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
    <div className="space-y-6">
      {/* Средняя зарплата по должности */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Средняя зарплата по должности
          </CardTitle>
          <CardDescription>Сравнение ваших ожиданий с рынком</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Минимум: {analytics.salary.min.toLocaleString()} ₸</span>
              <span className="text-muted-foreground">Максимум: {analytics.salary.max.toLocaleString()} ₸</span>
            </div>
            <div className="relative h-8 bg-muted rounded-md overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                <div className="flex-1 h-full bg-gradient-to-r from-orange-500/20 via-primary/30 to-green-500/20" />
              </div>
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary"
                style={{ left: `${Math.max(0, Math.min(100, salaryPosition))}%` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Badge variant="default" className="text-xs">
                    Ваши ожидания: {userSalary.toLocaleString()} ₸
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Средняя зарплата: <span className="font-semibold">{analytics.salary.average.toLocaleString()} ₸</span>
              </p>
              <Badge variant={salaryStatus.status === 'above' ? 'default' : 'secondary'} className="mt-2">
                {salaryStatus.text}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Индекс востребованности */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Индекс востребованности
          </CardTitle>
          <CardDescription>Общий показатель спроса на вашу должность</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">{analytics.demand.score}%</span>
              <Badge variant={analytics.demand.trend === 'up' ? 'default' : 'secondary'} className="flex items-center gap-1">
                {analytics.demand.trend === 'up' && <ArrowUp className="w-3 h-3" />}
                {analytics.demand.trend === 'down' && <ArrowDown className="w-3 h-3" />}
                {analytics.demand.trend === 'stable' && <Minus className="w-3 h-3" />}
                {analytics.demand.trend === 'up' ? 'Растёт' : analytics.demand.trend === 'down' ? 'Падает' : 'Стабильно'}
              </Badge>
            </div>
            <Progress value={analytics.demand.score} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Высокий спрос на специалистов вашего профиля на рынке труда
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Индикатор совпадения с вакансиями */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Совпадение с вакансиями
          </CardTitle>
          <CardDescription>Общий рейтинг вашего профиля</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
            <div className="text-5xl font-bold text-primary mb-2">{analytics.match.overall}%</div>
            <p className="text-sm text-muted-foreground">Общее совпадение</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Навыки</span>
                <span className="font-semibold">{analytics.match.skills}%</span>
              </div>
              <Progress value={analytics.match.skills} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Опыт</span>
                <span className="font-semibold">{analytics.match.experience}%</span>
              </div>
              <Progress value={analytics.match.experience} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Специализация</span>
                <span className="font-semibold">{analytics.match.specialization}%</span>
              </div>
              <Progress value={analytics.match.specialization} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>График</span>
                <span className="font-semibold">{analytics.match.schedule}%</span>
              </div>
              <Progress value={analytics.match.schedule} className="h-2" />
            </div>
            <div className="col-span-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Зарплата</span>
                <span className="font-semibold">{analytics.match.salary}%</span>
              </div>
              <Progress value={analytics.match.salary} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика видимости */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Статистика видимости
          </CardTitle>
          <CardDescription>Активность вашего профиля</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white border border-border/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.views7d}</div>
                <div className="text-xs text-muted-foreground">Просмотров за 7 дней</div>
              </div>
              <div className="text-center p-4 bg-white border border-border/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.views30d}</div>
                <div className="text-xs text-muted-foreground">Просмотров за 30 дней</div>
              </div>
              <div className="text-center p-4 bg-white border border-border/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.sentToEmployers}</div>
                <div className="text-xs text-muted-foreground">Отправлено работодателям</div>
              </div>
              <div className="text-center p-4 bg-white border border-border/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{analytics.visibility.autoMatched}</div>
                <div className="text-xs text-muted-foreground">Автоподбор</div>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* Рекомендации по улучшению */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Рекомендации по улучшению
          </CardTitle>
          <CardDescription>Как повысить релевантность вашего профиля</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={cn(
                  'p-3 rounded-lg border flex items-start gap-3',
                  rec.priority === 'high' && 'border-orange-200 bg-orange-50',
                  rec.priority === 'medium' && 'border-primary/20 bg-primary/5',
                  rec.priority === 'low' && 'border-muted bg-muted/50'
                )}
              >
                {rec.priority === 'high' ? (
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{rec.text}</p>
                  {rec.type === 'course' && (
                    <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                      Посмотреть курс →
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Динамика улучшений */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Динамика улучшений
          </CardTitle>
          <CardDescription>Изменения за последний месяц</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white border border-border/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Релевантность</p>
                <p className="text-xs text-muted-foreground">Было: {analytics.dynamics.relevance.previous}%</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{analytics.dynamics.relevance.current}%</p>
                <Badge variant="default" className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3" />
                  +{analytics.dynamics.relevance.change}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-border/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Просмотры</p>
                <p className="text-xs text-muted-foreground">Было: {analytics.dynamics.views.previous}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{analytics.dynamics.views.current}</p>
                <Badge variant="default" className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3" />
                  +{analytics.dynamics.views.change}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-border/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Совпадения</p>
                <p className="text-xs text-muted-foreground">Было: {analytics.dynamics.matches.previous}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{analytics.dynamics.matches.current}</p>
                <Badge variant="default" className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3" />
                  +{analytics.dynamics.matches.change}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


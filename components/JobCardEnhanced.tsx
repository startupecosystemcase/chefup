'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MapPin, Briefcase, Clock, DollarSign, TrendingUp, CheckCircle2, XCircle, AlertCircle, Sparkles, BarChart3, Send, CheckCircle, Building2, Phone, Mail, AlertTriangle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { useResponseStore } from '@/stores/useOnboardingStore'
import type { JobRelevance } from '@/lib/jobRecommendations'
import type { Job } from '@/lib/mockData'
import type { OnboardingFormData } from '@/types/onboarding.types'

interface JobCardEnhancedProps {
  job: Job
  relevance?: JobRelevance | null
  applicantData?: Partial<OnboardingFormData>
  onClick?: () => void
}

interface MatchAnalysis {
  skills: { match: number; missing: string[]; extra: string[] }
  experience: { match: number; applicant: string; job: string }
  salary: { match: number; applicantRange?: string; jobRange: string; status: 'above' | 'within' | 'below' }
  overall: { score: number; status: 'perfect' | 'good' | 'needs-improvement' }
}

export function JobCardEnhanced({ job, relevance, applicantData, onClick }: JobCardEnhancedProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const userId = useAuthStore((state) => state.userId)
  const { addResponse, getResponseByJobId } = useResponseStore()
  const existingResponse = userId && job.id ? getResponseByJobId(job.id, userId) : undefined

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!userId) {
      toast.error('Необходимо войти в систему')
      return
    }
    if (!job.id) {
      toast.error('Ошибка: ID вакансии не найден')
      return
    }
    addResponse({
      jobId: job.id,
      applicantId: userId,
      status: 'sent',
    })
    toast.success('Отклик отправлен!')
  }

  // Анализ соответствия
  const analysis: MatchAnalysis | null = relevance && applicantData ? {
    skills: {
      match: 75, // Упрощенный расчет
      missing: ['HACCP сертификация', 'Знание английского'],
      extra: ['Управление командой', 'Работа с POS-системами'],
    },
    experience: {
      match: applicantData.experience === job.experience ? 100 : 70,
      applicant: applicantData.experience || 'Не указано',
      job: job.experience,
    },
    salary: {
      match: 85,
      applicantRange: applicantData.salaryExpectation || undefined,
      jobRange: job.salary,
      status: 'within',
    },
    overall: {
      score: relevance.score,
      status: relevance.score >= 85 ? 'perfect' : relevance.score >= 60 ? 'good' : 'needs-improvement',
    },
  } : null

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 60) return 'text-primary'
    return 'text-orange-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-500/20 border-green-500'
    if (score >= 60) return 'bg-primary/20 border-primary'
    return 'bg-orange-500/20 border-orange-500'
  }

  const getStatusLabel = (status: MatchAnalysis['overall']['status']) => {
    switch (status) {
      case 'perfect':
        return 'Идеальное совпадение'
      case 'good':
        return 'Хорошее совпадение'
      case 'needs-improvement':
        return 'Требуются доработки'
    }
  }

  const isTopMatch = relevance && relevance.score >= 85

  return (
    <Card
      className={cn(
        'cursor-pointer card-hover relative overflow-hidden transition-all duration-300 bg-white animate-fade-in',
        isTopMatch ? 'top-match-glow animate-bounce-in' : 'card-soft-shadow',
        !isTopMatch && relevance && 'border border-primary/20'
      )}
      onClick={onClick}
    >
      {/* Анимированный индикатор релевантности */}
      {relevance && (
        <div className="absolute top-0 right-0 p-4">
          <div className="relative">
            <div
              className={cn(
                'w-20 h-20 rounded-full flex items-center justify-center border-4 font-bold text-2xl transition-all duration-500 animate-pulse',
                getScoreBgColor(relevance.score),
                getScoreColor(relevance.score)
              )}
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              <span className="relative z-10">{relevance.score}%</span>
              <div
                className={cn(
                  'absolute inset-0 rounded-full opacity-20',
                  relevance.score >= 85 ? 'bg-green-500' : relevance.score >= 60 ? 'bg-primary' : 'bg-orange-500'
                )}
                style={{
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className={cn('w-5 h-5', getScoreColor(relevance.score))} />
            </div>
          </div>
        </div>
      )}

      <CardHeader className={cn('pb-3', relevance && 'pr-28')}>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl pr-4">{job.title}</CardTitle>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.city}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {job.position}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.experience}
          </Badge>
          <Badge variant="secondary">{job.cuisine}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">{job.description}</CardDescription>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="font-semibold">{job.salary}</span>
          </div>
          
          {/* Новые индикаторы */}
          <div className="flex flex-wrap gap-2 text-xs">
            {job.hoursPerWeek && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {job.hoursPerWeek} ч/нед
              </Badge>
            )}
            {job.workload && (
              <Badge 
                variant="outline" 
                className={cn(
                  job.workload === 'high' && 'border-orange-500 text-orange-700',
                  job.workload === 'medium' && 'border-primary text-primary',
                  job.workload === 'low' && 'border-green-500 text-green-700'
                )}
              >
                {job.workload === 'high' && 'Высокая загруженность'}
                {job.workload === 'medium' && 'Средняя загруженность'}
                {job.workload === 'low' && 'Низкая загруженность'}
              </Badge>
            )}
            {job.urgency && job.urgency !== 'normal' && (
              <Badge 
                variant="destructive" 
                className="flex items-center gap-1"
              >
                <AlertTriangle className="w-3 h-3" />
                {job.urgency === 'urgent' && 'Срочно'}
                {job.urgency === 'very-urgent' && 'Очень срочно'}
              </Badge>
            )}
          </div>
        </div>

        {/* Расширенная аналитика (только для рекомендованных) */}
        {relevance && analysis && (
          <div className="space-y-3 pt-3 border-t border-border/50">
            {/* Сводная шкала */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Общее совпадение</span>
                <Badge
                  variant={analysis.overall.status === 'perfect' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {getStatusLabel(analysis.overall.status)}
                </Badge>
              </div>
              <Progress value={analysis.overall.score} className="h-2" />
            </div>

            {/* Быстрые индикаторы - белый фон */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center p-2 rounded-md bg-white border border-border/50">
                <BarChart3 className="w-4 h-4 mb-1 text-primary" />
                <span className="font-semibold">{analysis.skills.match}%</span>
                <span className="text-muted-foreground">Навыки</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-white border border-border/50">
                <TrendingUp className="w-4 h-4 mb-1 text-primary" />
                <span className="font-semibold">{analysis.experience.match}%</span>
                <span className="text-muted-foreground">Опыт</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-white border border-border/50">
                <DollarSign className="w-4 h-4 mb-1 text-primary" />
                <span className="font-semibold">{analysis.salary.match}%</span>
                <span className="text-muted-foreground">Зарплата</span>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-2">
              {existingResponse ? (
                <Button variant="outline" size="sm" className="flex-1" disabled>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {existingResponse.status === 'sent' && 'Отправлен'}
                  {existingResponse.status === 'viewed' && 'Просмотрен'}
                  {existingResponse.status === 'interested' && 'Интерес'}
                  {existingResponse.status === 'rejected' && 'Отклонён'}
                </Button>
              ) : (
                <Button size="sm" className="flex-1" onClick={handleApply}>
                  <Send className="w-4 h-4 mr-2" />
                  Откликнуться
                </Button>
              )}
              <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation()
                    setIsDetailsOpen(true)
                  }}>
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Детальный анализ совпадения</DialogTitle>
                  <DialogDescription>
                    Подробная информация о соответствии вашего профиля требованиям вакансии
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Общий показатель */}
                  <div className="p-4 rounded-lg border-2 bg-gradient-to-r from-primary/10 to-primary/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold">Общая релевантность</span>
                      <span className={cn('text-3xl font-bold', getScoreColor(analysis.overall.score))}>
                        {analysis.overall.score}%
                      </span>
                    </div>
                    <Progress value={analysis.overall.score} className="h-3 mt-2" />
                    <Badge className="mt-2" variant={analysis.overall.status === 'perfect' ? 'default' : 'secondary'}>
                      {getStatusLabel(analysis.overall.status)}
                    </Badge>
                  </div>

                  {/* Соответствие навыков */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Соответствие навыков: {analysis.skills.match}%
                    </h3>
                    <Progress value={analysis.skills.match} className="h-2" />
                    {analysis.skills.missing.length > 0 && (
                      <div className="p-3 rounded-md bg-orange-50 border border-orange-200">
                        <p className="text-sm font-medium mb-2 flex items-center gap-2 text-orange-800">
                          <AlertCircle className="w-4 h-4" />
                          Отсутствующие навыки:
                        </p>
                        <ul className="text-sm text-orange-700 space-y-1">
                          {analysis.skills.missing.map((skill, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <XCircle className="w-3 h-3" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysis.skills.extra.length > 0 && (
                      <div className="p-3 rounded-md bg-green-50 border border-green-200">
                        <p className="text-sm font-medium mb-2 flex items-center gap-2 text-green-800">
                          <CheckCircle2 className="w-4 h-4" />
                          Дополнительные навыки:
                        </p>
                        <ul className="text-sm text-green-700 space-y-1">
                          {analysis.skills.extra.map((skill, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3 h-3" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Соответствие опыта */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Соответствие опыта: {analysis.experience.match}%
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-md bg-muted">
                        <p className="text-xs text-muted-foreground mb-1">Ваш опыт</p>
                        <p className="font-medium">{analysis.experience.applicant}</p>
                      </div>
                      <div className="p-3 rounded-md bg-muted">
                        <p className="text-xs text-muted-foreground mb-1">Требуется</p>
                        <p className="font-medium">{analysis.experience.job}</p>
                      </div>
                    </div>
                    <Progress value={analysis.experience.match} className="h-2" />
                  </div>

                  {/* Соответствие зарплаты */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Соответствие зарплатных ожиданий: {analysis.salary.match}%
                    </h3>
                    <div className="p-3 rounded-md bg-muted">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Предлагаемая зарплата:</span>
                        <span className="font-semibold">{analysis.salary.jobRange}</span>
                      </div>
                      {analysis.salary.applicantRange && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Ваши ожидания:</span>
                          <span className="font-semibold">{analysis.salary.applicantRange}</span>
                        </div>
                      )}
                    </div>
                    <Progress value={analysis.salary.match} className="h-2" />
                    <Badge
                      variant={
                        analysis.salary.status === 'above'
                          ? 'default'
                          : analysis.salary.status === 'within'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {analysis.salary.status === 'above'
                        ? 'Выше ваших ожиданий'
                        : analysis.salary.status === 'within'
                        ? 'В пределах ожиданий'
                        : 'Ниже ваших ожиданий'}
                    </Badge>
                  </div>

                  {/* Ключевые совпадения */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Ключевые совпадения:</h3>
                    <ul className="space-y-1">
                      {relevance.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


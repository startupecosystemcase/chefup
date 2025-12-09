'use client'

import React, { useState, memo } from 'react'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { AnimatedProgress } from '@/components/magicui/animated-progress'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { MapPin, Briefcase, Clock, CreditCard, TrendingUp, CheckCircle2, XCircle, AlertCircle, Sparkles, BarChart3, Send, CheckCircle, Building2, Phone, Mail, AlertTriangle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { useResponseStore } from '@/stores/useOnboardingStore'
import type { JobRelevance, Job } from '@/lib/jobRecommendations'
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

export const JobCardEnhanced = memo(function JobCardEnhanced({ job, relevance, applicantData, onClick }: JobCardEnhancedProps) {
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

  const getStatusLabel = (status: MatchAnalysis['overall']['status']): string => {
    switch (status) {
      case 'perfect':
        return 'Идеальное совпадение'
      case 'good':
        return 'Хорошее совпадение'
      case 'needs-improvement':
        return 'Требуются доработки'
      default:
        return 'Неизвестно'
    }
  }

  const isTopMatch = relevance && relevance.score >= 85

  return (
    <AnimatedCard
      className={cn(
        'cursor-pointer relative overflow-hidden transition-all duration-300 bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 hover:shadow-md',
        isTopMatch && 'ring-2 ring-primary/20'
      )}
      onClick={onClick}
    >
      {/* Анимированный индикатор релевантности */}
      {relevance && (
        <div className="absolute top-0 right-0 p-4">
          <div className="relative">
            <div
              className={cn(
                'w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 font-bold text-lg md:text-2xl transition-all duration-500 animate-pulse',
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

      <div className={cn('p-6', relevance && 'pr-20 md:pr-28')}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg md:text-xl pr-2 md:pr-4 font-semibold dark:text-white leading-tight">{job.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <AnimatedBadge variant="outline" className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.city}
          </AnimatedBadge>
          <AnimatedBadge variant="outline" className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {job.position}
          </AnimatedBadge>
          <AnimatedBadge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.experience}
          </AnimatedBadge>
          <AnimatedBadge variant="secondary">{job.cuisine}</AnimatedBadge>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">{job.description}</p>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <CreditCard className="w-4 h-4 text-primary" />
            <span className="font-semibold dark:text-white">{job.salary}</span>
          </div>
          
          {/* Новые индикаторы */}
          <div className="flex flex-wrap gap-4 text-xs">
            {(job as any).hoursPerWeek && (
              <AnimatedBadge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {(job as any).hoursPerWeek} ч/нед
              </AnimatedBadge>
            )}
            {(job as any).workload && (
              <AnimatedBadge 
                variant="outline" 
                className={cn(
                  (job as any).workload === 'high' && 'border-orange-500 text-orange-700 dark:text-orange-400',
                  (job as any).workload === 'medium' && 'border-primary text-primary',
                  (job as any).workload === 'low' && 'border-green-500 text-green-700 dark:text-green-400'
                )}
              >
                {(job as any).workload === 'high' && 'Высокая загруженность'}
                {(job as any).workload === 'medium' && 'Средняя загруженность'}
                {(job as any).workload === 'low' && 'Низкая загруженность'}
              </AnimatedBadge>
            )}
            {(job as any).urgency && (job as any).urgency !== 'normal' && (
              <AnimatedBadge 
                variant="destructive" 
                className="flex items-center gap-1"
              >
                <AlertTriangle className="w-3 h-3" />
                {(job as any).urgency === 'urgent' && 'Срочно'}
                {(job as any).urgency === 'very-urgent' && 'Очень срочно'}
              </AnimatedBadge>
            )}
          </div>
        </div>

        {/* Расширенная аналитика (только для рекомендованных) */}
        {relevance && analysis && (
          <div className="space-y-5 pt-3 border-t border-border/50 dark:border-gray-700/50">
            {/* Сводная шкала */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium dark:text-gray-300">Общее совпадение</span>
                <AnimatedBadge
                  variant={analysis.overall.status === 'perfect' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {getStatusLabel(analysis.overall.status)}
                </AnimatedBadge>
              </div>
              <AnimatedProgress value={analysis.overall.score} className="h-2" />
            </div>

            {/* Быстрые индикаторы - белый фон */}
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col items-center p-2 rounded-md bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50">
                <BarChart3 className="w-4 h-4 mb-1 text-primary" />
                <span className="font-semibold dark:text-white">{analysis.skills.match}%</span>
                <span className="text-muted-foreground dark:text-gray-400">Навыки</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50">
                <TrendingUp className="w-4 h-4 mb-1 text-primary" />
                <span className="font-semibold dark:text-white">{analysis.experience.match}%</span>
                <span className="text-muted-foreground dark:text-gray-400">Опыт</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-white dark:bg-dark/70 border border-border/50 dark:border-gray-700/50">
                <CreditCard className="w-4 h-4 mb-1 text-primary" />
                <span className="font-semibold dark:text-white">{analysis.salary.match}%</span>
                <span className="text-muted-foreground dark:text-gray-400">Зарплата</span>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-4">
              {existingResponse ? (
                <ShinyButton variant="outline" size="sm" className="flex-1" disabled>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {existingResponse.status === 'sent' && 'Отправлен'}
                  {existingResponse.status === 'viewed' && 'Просмотрен'}
                  {existingResponse.status === 'interested' && 'Интерес'}
                  {existingResponse.status === 'rejected' && 'Отклонён'}
                </ShinyButton>
              ) : (
                <ShinyButton size="sm" className="flex-1" onClick={handleApply}>
                  <Send className="w-4 h-4 mr-2" />
                  Откликнуться
                </ShinyButton>
              )}
              <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogTrigger asChild>
                  <ShinyButton variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation()
                    setIsDetailsOpen(true)
                  }}>
                    <Sparkles className="w-4 h-4" />
                  </ShinyButton>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark/90">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Детальный анализ совпадения</DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    Подробная информация о соответствии вашего профиля требованиям вакансии
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-8">
                  {/* Общий показатель */}
                  <div className="p-4 rounded-lg border-2 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold dark:text-white">Общая релевантность</span>
                      <span className={cn('text-3xl font-bold', getScoreColor(analysis.overall.score))}>
                        {analysis.overall.score}%
                      </span>
                    </div>
                    <AnimatedProgress value={analysis.overall.score} className="h-3 mt-2" />
                    <AnimatedBadge className="mt-2" variant={analysis.overall.status === 'perfect' ? 'default' : 'secondary'}>
                      {getStatusLabel(analysis.overall.status)}
                    </AnimatedBadge>
                  </div>

                  {/* Соответствие навыков */}
                  <div className="space-y-5">
                    <h3 className="font-semibold flex items-center gap-4 dark:text-white">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Соответствие навыков: {analysis.skills.match}%
                    </h3>
                    <AnimatedProgress value={analysis.skills.match} className="h-2" />
                    {analysis.skills.missing.length > 0 && (
                      <div className="p-3 rounded-md bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50">
                        <p className="text-sm font-medium mb-2 flex items-center gap-4 text-orange-800 dark:text-orange-300">
                          <AlertCircle className="w-4 h-4" />
                          Отсутствующие навыки:
                        </p>
                        <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                          {analysis.skills.missing.map((skill, idx) => (
                            <li key={idx} className="flex items-center gap-4">
                              <XCircle className="w-3 h-3" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysis.skills.extra.length > 0 && (
                      <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50">
                        <p className="text-sm font-medium mb-2 flex items-center gap-4 text-green-800 dark:text-green-300">
                          <CheckCircle2 className="w-4 h-4" />
                          Дополнительные навыки:
                        </p>
                        <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                          {analysis.skills.extra.map((skill, idx) => (
                            <li key={idx} className="flex items-center gap-4">
                              <CheckCircle2 className="w-3 h-3" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Соответствие опыта */}
                  <div className="space-y-5">
                    <h3 className="font-semibold flex items-center gap-4 dark:text-white">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Соответствие опыта: {analysis.experience.match}%
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-md bg-muted dark:bg-dark/70">
                        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-1">Ваш опыт</p>
                        <p className="font-medium dark:text-white">{analysis.experience.applicant}</p>
                      </div>
                      <div className="p-3 rounded-md bg-muted dark:bg-dark/70">
                        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-1">Требуется</p>
                        <p className="font-medium dark:text-white">{analysis.experience.job}</p>
                      </div>
                    </div>
                    <AnimatedProgress value={analysis.experience.match} className="h-2" />
                  </div>

                  {/* Соответствие зарплаты */}
                  <div className="space-y-5">
                    <h3 className="font-semibold flex items-center gap-4 dark:text-white">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Соответствие зарплатных ожиданий: {analysis.salary.match}%
                    </h3>
                    <div className="p-3 rounded-md bg-muted dark:bg-dark/70">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm dark:text-gray-400">Предлагаемая зарплата:</span>
                        <span className="font-semibold dark:text-white">{analysis.salary.jobRange}</span>
                      </div>
                      {analysis.salary.applicantRange && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm dark:text-gray-400">Ваши ожидания:</span>
                          <span className="font-semibold dark:text-white">{analysis.salary.applicantRange}</span>
                        </div>
                      )}
                    </div>
                    <AnimatedProgress value={analysis.salary.match} className="h-2" />
                    <AnimatedBadge
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
                    </AnimatedBadge>
                  </div>

                  {/* Ключевые совпадения */}
                  <div className="space-y-4">
                    <h3 className="font-semibold dark:text-white">Ключевые совпадения:</h3>
                    <ul className="space-y-1">
                      {relevance.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-sm dark:text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </AnimatedCard>
  )
})


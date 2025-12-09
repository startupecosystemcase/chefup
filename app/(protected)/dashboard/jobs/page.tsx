'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Search, MapPin, Briefcase, Clock, Sparkles, Filter, CheckCircle2, Loader2, CreditCard, Plus } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { mockJobs } from '@/lib/mockData'
import { cities, positions, cuisines, experienceRanges } from '@/lib/data'
import { useOnboardingStore } from '@/stores/useOnboardingStore'
import { useAuthStore, useEmployerJobsStore } from '@/stores/useOnboardingStore'
import { getRecommendedJobs, filterByRelevanceThreshold, type JobRelevance } from '@/lib/jobRecommendations'
import { JobCardEnhanced } from '@/components/JobCardEnhanced'
import { ScrollReveal } from '@/components/ScrollReveal'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
import type { JobPosting } from '@/types/job.types'
import { Users, ChevronDown, ChevronUp, UserCheck, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'

export default function JobsPage() {
  const router = useRouter()
  const formData = useOnboardingStore((state) => state.formData)
  const userRole = useAuthStore((state) => state.userRole)
  const userId = useAuthStore((state) => state.userId)
  const { jobs: employerJobs } = useEmployerJobsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedPosition, setSelectedPosition] = useState<string>('all')
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<string>('all')
  const [showRecommended, setShowRecommended] = useState(true)
  const [showOnlyMatches, setShowOnlyMatches] = useState(false)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  
  // Проверяем, заполнена ли анкета
  const isProfileComplete = useMemo(() => {
    return !!(formData.firstName && formData.lastName && (formData.desiredPosition || formData.currentPosition))
  }, [formData])

  // Вычисляем рекомендации для соискателей
  const recommendedJobs = useMemo(() => {
    if (userRole !== 'applicant' || (!formData.desiredPosition && !formData.currentPosition)) {
      return []
    }
    const recommendations = getRecommendedJobs(mockJobs, formData)
    return filterByRelevanceThreshold(recommendations, 30) // Минимальный порог 30%
  }, [formData, userRole])

  // Фильтрация вакансий
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const cityLabel = cities.find(c => c.label === selectedCity)?.label
      const matchesCity = selectedCity === 'all' || job.city === cityLabel || job.city === selectedCity
      
      const positionLabel = positions.find(p => p.label === selectedPosition)?.label
      const matchesPosition = selectedPosition === 'all' || job.position === positionLabel || job.position === selectedPosition
      
      const cuisineLabel = cuisines.find(c => c.label === selectedCuisine)?.label
      const matchesCuisine = selectedCuisine === 'all' || job.cuisine === cuisineLabel || job.cuisine === selectedCuisine
      
      const experienceLabel = experienceRanges.find(e => e.label === selectedExperience)?.label
      const matchesExperience = selectedExperience === 'all' || job.experience === experienceLabel || job.experience === selectedExperience

      return matchesSearch && matchesCity && matchesPosition && matchesCuisine && matchesExperience
    })
  }, [searchQuery, selectedCity, selectedPosition, selectedCuisine, selectedExperience])

  // Симуляция загрузки рекомендаций
  useEffect(() => {
    if (userRole === 'applicant' && isProfileComplete && showRecommended) {
      setIsLoadingRecommendations(true)
      // Имитация загрузки
      setTimeout(() => {
        setIsLoadingRecommendations(false)
      }, 1500)
    }
  }, [userRole, isProfileComplete, showRecommended])

  // Определяем, какие вакансии показывать
  const jobsToDisplay = useMemo(() => {
    let jobs: typeof mockJobs = []
    
    if (showRecommended && userRole === 'applicant' && recommendedJobs.length > 0) {
      let relevantJobs = recommendedJobs.map(r => r.job)
      
      // Фильтр "показывать только совпадения"
      if (showOnlyMatches) {
        relevantJobs = recommendedJobs
          .filter(r => r.score >= 60)
          .map(r => r.job)
      }
      
      jobs = relevantJobs
    } else {
      jobs = filteredJobs
      
      // Умная сортировка: сначала релевантные, затем близкие по навыкам
      if (userRole === 'applicant' && (formData.desiredPosition || formData.currentPosition)) {
        const jobsWithRelevance = jobs.map(job => {
          const relevance = getRecommendedJobs([job], formData)[0]
          return { job, relevance: relevance?.score || 0 }
        })
        
        jobs = jobsWithRelevance
          .sort((a, b) => b.relevance - a.relevance)
          .map(item => item.job)
      }
    }

    return jobs
  }, [showRecommended, recommendedJobs, filteredJobs, userRole, formData, showOnlyMatches])

  // Функция для получения релевантности вакансии
  const getJobRelevance = (jobId: string): JobRelevance | null => {
    if (userRole === 'applicant' && (formData.desiredPosition || formData.currentPosition)) {
      return recommendedJobs.find(r => r.job.id === jobId) || null
    }
    return null
  }

  // Логика для работодателей
  if (userRole === 'employer') {
    const myJobs = employerJobs.filter((job) => job.employerId === userId)
    const [expandedJobId, setExpandedJobId] = useState<string | null>(null)
    
    // Mock кандидаты для вакансий
    const getCandidatesForJob = (jobId: string) => {
      // В реальном приложении это будет API запрос
      return [
        { id: '1', name: 'Иван Иванов', position: 'Шеф-повар', experience: '5 лет', match: 95 },
        { id: '2', name: 'Мария Петрова', position: 'Су-шеф', experience: '3 года', match: 87 },
      ]
    }

    const statusConfig: Record<JobPosting['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }> = {
      pending: { label: 'На модерации', variant: 'outline', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400' },
      moderating: { label: 'На модерации', variant: 'outline', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400' },
      approved: { label: 'Опубликовано', variant: 'default', color: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' },
      rejected: { label: 'Отклонена', variant: 'destructive', color: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400' },
      closed: { label: 'Закрыта', variant: 'outline', color: 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400' },
    }

    return (
      <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 md:mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2 dark:text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6 md:w-8 md:h-8" />
                Вакансии
              </h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Управляйте созданными вакансиями и просматривайте кандидатов
              </p>
            </div>
                <ShinyButton onClick={() => router.push('/dashboard/jobs/create')} className="whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              Создать вакансию
            </ShinyButton>
          </div>

          {myJobs.length === 0 ? (
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="py-12 text-center">
                <p className="text-muted-foreground dark:text-gray-400 mb-8">У вас пока нет созданных вакансий</p>
                <ShinyButton onClick={() => router.push('/dashboard/jobs/create')} className="whitespace-nowrap">
                  Создать первую вакансию
                </ShinyButton>
              </div>
            </AnimatedCard>
          ) : (
            <div className="space-y-6">
              {myJobs.map((job) => {
                const status = statusConfig[job.status]
                const candidates = getCandidatesForJob(job.id)
                const hasCandidates = candidates.length > 0
                const isExpanded = expandedJobId === job.id
                
                return (
                  <AnimatedCard key={job.id} className="bg-white dark:bg-dark/50">
                    <div className="p-3 md:p-6">
                      <div className="flex items-start justify-between mb-6 md:mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-6 md:mb-3">
                            <h3 className="text-xl font-semibold dark:text-white">{job.title}</h3>
                            <AnimatedBadge className={status.color}>
                              {status.label}
                            </AnimatedBadge>
                            {job.status === 'approved' && hasCandidates && (
                              <AnimatedBadge variant="secondary" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Проверьте кандидатов
                              </AnimatedBadge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-3 mb-6 md:mb-3">
                            <AnimatedBadge variant="outline" className="text-xs">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.city}, {job.country}
                            </AnimatedBadge>
                            {job.company && (
                              <AnimatedBadge variant="outline" className="text-xs">
                                {job.company}
                              </AnimatedBadge>
                            )}
                            {job.salary && (
                              <AnimatedBadge variant="outline" className="text-xs">
                                <CreditCard className="w-3 h-3 mr-1" />
                                {job.salary}
                              </AnimatedBadge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
                            {job.description}
                          </p>
                        </div>
                      </div>

                      {/* Кандидаты внутри карточки */}
                      {hasCandidates && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                            className="flex items-center justify-between w-full text-left"
                          >
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-primary" />
                              <span className="font-semibold dark:text-white">
                                Кандидаты ({candidates.length})
                              </span>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          
                          {isExpanded && (
                            <div className="mt-4 space-y-3">
                              {candidates.map((candidate) => (
                                <AnimatedCard key={candidate.id} className="bg-gray-50 dark:bg-dark/70 p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-semibold dark:text-white">{candidate.name}</h4>
                                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                                        {candidate.position} • {candidate.experience}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <AnimatedBadge variant="secondary" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                        Совпадение {candidate.match}%
                                      </AnimatedBadge>
                                      <ShinyButton variant="outline" size="sm" onClick={() => router.push(`/profile/${candidate.id}`)} className="whitespace-nowrap">
                                        Профиль
                                      </ShinyButton>
                                    </div>
                                  </div>
                                </AnimatedCard>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-muted-foreground dark:text-gray-400">
                          Создано: {new Date(job.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                        <div className="flex gap-2">
                          <ShinyButton variant="outline" size="sm" onClick={() => router.push(`/dashboard/jobs/${job.id}`)} className="whitespace-nowrap">
                            Подробнее
                          </ShinyButton>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                )
              })}

              {/* Кнопка "Создать ещё одну вакансию" */}
              <AnimatedCard className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20">
                <div className="p-3 md:p-6 text-center">
                  <ShinyButton onClick={() => router.push('/dashboard/jobs/create')} variant="outline" className="whitespace-nowrap">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать ещё одну вакансию
                  </ShinyButton>
                </div>
              </AnimatedCard>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Логика для соискателей (существующий код)
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2 dark:text-white flex items-center gap-3">
            <Briefcase className="w-6 h-6 md:w-8 md:h-8" />
            Вакансии
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            {userRole === 'applicant' 
              ? 'Персональная лента вакансий, подобранных специально для вас'
              : 'Найдите подходящую вакансию для вашей карьеры'}
          </p>
        </div>

        {/* Toggle для соискателей */}
        {userRole === 'applicant' && (
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium dark:text-white">Все вакансии</span>
              <button
                onClick={() => setShowRecommended(!showRecommended)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${showRecommended ? 'bg-[#F97316]' : 'bg-gray-300 dark:bg-gray-600'}
                  focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2
                `}
                role="switch"
                aria-checked={showRecommended}
                aria-label="Переключить между рекомендациями и всеми вакансиями"
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${showRecommended ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
              <span className="text-sm font-medium dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Рекомендации
                {recommendedJobs.length > 0 && (
                  <AnimatedBadge variant="secondary" className="ml-1">
                    {recommendedJobs.length}
                  </AnimatedBadge>
                )}
              </span>
            </div>
          </div>
        )}

        {/* Сообщение о неполной анкете */}
        {userRole === 'applicant' && !isProfileComplete && showRecommended && (
          <AnimatedCard className="mb-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="p-6 text-center">
              <p className="text-amber-800 dark:text-amber-200">
                Рекомендации появятся после заполнения анкеты
              </p>
            </div>
          </AnimatedCard>
        )}

        {/* Индикатор загрузки рекомендаций */}
        {userRole === 'applicant' && isProfileComplete && showRecommended && isLoadingRecommendations && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6 text-center">
              <Loader2 className="w-6 h-6 mx-auto mb-6 md:mb-2 animate-spin text-[#F97316]" />
              <p className="text-muted-foreground dark:text-gray-400">
                Ожидайте, система подбирает лучшие вакансии...
              </p>
            </div>
          </AnimatedCard>
        )}

        {/* Поиск и фильтры - статичная полоса без hover эффектов */}
        <div className="mb-8 md:mb-8 bg-white dark:bg-dark/50 rounded-xl border border-gray-200/50 dark:border-border/50 shadow-sm">
          <div className="px-3 py-4 md:p-6">
            <div className="flex items-center gap-4 mb-6 md:mb-4">
              <Filter className="w-4 h-4 dark:text-gray-400" />
              <h3 className="text-base md:text-lg font-semibold dark:text-white">Поиск и фильтры</h3>
            </div>
            <div className="space-y-5 md:space-y-4">
              {/* Поиск */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-gray-400 w-4 h-4" />
                <AnimatedInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск вакансий..."
                  className="pl-10"
                />
              </div>

              {/* Фильтры */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="dark:bg-dark/70 dark:text-white">
                    <SelectValue placeholder="Город" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-dark/90">
                    <SelectItem value="all">Все города</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.label}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="dark:bg-dark/70 dark:text-white">
                    <SelectValue placeholder="Должность" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-dark/90">
                    <SelectItem value="all">Все должности</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.label}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger className="dark:bg-dark/70 dark:text-white">
                    <SelectValue placeholder="Кухня" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-dark/90">
                    <SelectItem value="all">Все кухни</SelectItem>
                    {cuisines.map((cuisine) => (
                      <SelectItem key={cuisine.value} value={cuisine.label}>
                        {cuisine.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger className="dark:bg-dark/70 dark:text-white">
                    <SelectValue placeholder="Опыт" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-dark/90">
                    <SelectItem value="all">Любой опыт</SelectItem>
                    {experienceRanges.map((exp) => (
                      <SelectItem key={exp.value} value={exp.label}>
                        {exp.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Сброс фильтров */}
              {(searchQuery || selectedCity !== 'all' || selectedPosition !== 'all' || 
                selectedCuisine !== 'all' || selectedExperience !== 'all') && (
                <ShinyButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCity('all')
                    setSelectedPosition('all')
                    setSelectedCuisine('all')
                    setSelectedExperience('all')
                  }}
                  className="whitespace-nowrap"
                >
                  Сбросить фильтры
                </ShinyButton>
              )}
            </div>
          </div>
        </div>

        {/* Список вакансий */}
        <StaggerAnimation className="space-y-6" staggerDelay={0.05}>
          {showRecommended && userRole === 'applicant' && recommendedJobs.length === 0 && !isProfileComplete && (
            <StaggerItem>
              <AnimatedCard className="glass bg-white dark:bg-dark/50">
                <div className="py-16 text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-6 text-muted-foreground dark:text-gray-400" />
                  <p className="text-lg text-muted-foreground dark:text-gray-400 mb-6 md:mb-4">
                    Рекомендации появятся после заполнения анкеты
                  </p>
                  <ShinyButton variant="outline" onClick={() => router.push('/onboarding')} className="whitespace-nowrap">
                    Заполнить анкету
                  </ShinyButton>
                </div>
              </AnimatedCard>
            </StaggerItem>
          )}

          {jobsToDisplay.length === 0 ? (
            <StaggerItem>
              <AnimatedCard className="glass bg-white dark:bg-dark/50">
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground dark:text-gray-400">Вакансии не найдены</p>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ) : (
            jobsToDisplay.map((job) => {
              const relevance = getJobRelevance(job.id)
              return (
                <StaggerItem key={job.id}>
                  <JobCardEnhanced
                    job={job}
                    relevance={relevance || null}
                    applicantData={formData}
                    onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                  />
                </StaggerItem>
              )
            })
          )}
        </StaggerAnimation>
      </div>
    </div>
  )
}


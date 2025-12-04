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
import { Search, MapPin, Briefcase, Clock, Sparkles, Filter, CheckCircle2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { mockJobs } from '@/lib/mockData'
import { cities, positions, cuisines, experienceRanges } from '@/lib/data'
import { useOnboardingStore } from '@/stores/useOnboardingStore'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { getRecommendedJobs, filterByRelevanceThreshold, type JobRelevance } from '@/lib/jobRecommendations'
import { JobCardEnhanced } from '@/components/JobCardEnhanced'
import { ScrollReveal } from '@/components/ScrollReveal'

export default function JobsPage() {
  const router = useRouter()
  const formData = useOnboardingStore((state) => state.formData)
  const userRole = useAuthStore((state) => state.userRole)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedPosition, setSelectedPosition] = useState<string>('all')
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended')
  const [showOnlyMatches, setShowOnlyMatches] = useState(false)

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

  // Определяем, какие вакансии показывать
  const jobsToDisplay = useMemo(() => {
    let jobs: typeof mockJobs = []
    
    if (activeTab === 'recommended' && userRole === 'applicant' && recommendedJobs.length > 0) {
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
  }, [activeTab, recommendedJobs, filteredJobs, userRole, formData, showOnlyMatches])

  // Функция для получения релевантности вакансии
  const getJobRelevance = (jobId: string): JobRelevance | null => {
    if (userRole === 'applicant' && (formData.desiredPosition || formData.currentPosition)) {
      return recommendedJobs.find(r => r.job.id === jobId) || null
    }
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Вакансии</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            {userRole === 'applicant' 
              ? 'Персональная лента вакансий, подобранных специально для вас'
              : 'Найдите подходящую вакансию для вашей карьеры'}
          </p>
        </div>

        {/* Вкладки для соискателей */}
        {userRole === 'applicant' && (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'recommended' | 'all')} className="mb-8">
            <TabsList className="dark:bg-dark/50">
              <TabsTrigger value="recommended" className="flex items-center gap-4 dark:text-gray-300 dark:data-[state=active]:text-white">
                <Sparkles className="w-4 h-4" />
                Рекомендации
                {recommendedJobs.length > 0 && (
                  <AnimatedBadge variant="secondary" className="ml-1">
                    {recommendedJobs.length}
                  </AnimatedBadge>
                )}
              </TabsTrigger>
              <TabsTrigger value="all" className="dark:text-gray-300 dark:data-[state=active]:text-white">
                Все вакансии
                {filteredJobs.length > 0 && (
                  <AnimatedBadge variant="secondary" className="ml-1">
                    {filteredJobs.length}
                  </AnimatedBadge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Поиск и фильтры */}
        <AnimatedCard className="mb-8 md:mb-8 bg-white dark:bg-dark/50">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-4 mb-4">
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
                >
                  Сбросить фильтры
                </ShinyButton>
              )}
            </div>
          </div>
        </AnimatedCard>

        {/* Список вакансий */}
        <div className="space-y-6">
          {activeTab === 'recommended' && userRole === 'applicant' && recommendedJobs.length === 0 && (
            <ScrollReveal>
              <AnimatedCard className="glass bg-white dark:bg-dark/50">
                <div className="py-16 text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-6 text-muted-foreground dark:text-gray-400" />
                  <p className="text-lg text-muted-foreground dark:text-gray-400 mb-4">
                    Рекомендации появятся после заполнения анкеты
                  </p>
                  <ShinyButton variant="outline" onClick={() => router.push('/onboarding')}>
                    Заполнить анкету
                  </ShinyButton>
                </div>
              </AnimatedCard>
            </ScrollReveal>
          )}

          {jobsToDisplay.length === 0 ? (
            <ScrollReveal>
              <AnimatedCard className="glass bg-white dark:bg-dark/50">
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground dark:text-gray-400">Вакансии не найдены</p>
                </div>
              </AnimatedCard>
            </ScrollReveal>
          ) : (
            jobsToDisplay.map((job, index) => {
              const relevance = getJobRelevance(job.id)
              return (
                <ScrollReveal key={job.id} delay={index * 0.1} direction="up">
                  <JobCardEnhanced
                    job={job}
                    relevance={relevance || null}
                    applicantData={formData}
                    onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                  />
                </ScrollReveal>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}


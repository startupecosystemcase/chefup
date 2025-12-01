'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
    if (userRole !== 'applicant' || !formData.position) {
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
      if (userRole === 'applicant' && formData.position) {
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
    if (userRole === 'applicant' && formData.position) {
      return recommendedJobs.find(r => r.job.id === jobId) || null
    }
    return null
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Вакансии</h1>
          <p className="text-muted-foreground">
            {userRole === 'applicant' 
              ? 'Персональная лента вакансий, подобранных специально для вас'
              : 'Найдите подходящую вакансию для вашей карьеры'}
          </p>
        </div>

        {/* Вкладки для соискателей */}
        {userRole === 'applicant' && (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'recommended' | 'all')} className="mb-6">
            <TabsList>
              <TabsTrigger value="recommended" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Рекомендации
                {recommendedJobs.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {recommendedJobs.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="all">
                Все вакансии
                {filteredJobs.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {filteredJobs.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Поиск и фильтры */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <CardTitle>Поиск и фильтры</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Поиск */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск вакансий..."
                  className="pl-10"
                />
              </div>

              {/* Фильтры */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.label}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Должность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все должности</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.label}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Кухня" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все кухни</SelectItem>
                    {cuisines.map((cuisine) => (
                      <SelectItem key={cuisine.value} value={cuisine.label}>
                        {cuisine.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Опыт" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Button
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
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Список вакансий */}
        <div className="space-y-4">
          {activeTab === 'recommended' && userRole === 'applicant' && recommendedJobs.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  Рекомендации появятся после заполнения анкеты
                </p>
                <Button variant="outline" onClick={() => router.push('/onboarding')}>
                  Заполнить анкету
                </Button>
              </CardContent>
            </Card>
          )}

          {jobsToDisplay.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Вакансии не найдены</p>
              </CardContent>
            </Card>
          ) : (
            jobsToDisplay.map((job) => {
              const relevance = getJobRelevance(job.id)
              return (
                <JobCardEnhanced
                  key={job.id}
                  job={job}
                  relevance={relevance || null}
                  applicantData={formData}
                  onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}


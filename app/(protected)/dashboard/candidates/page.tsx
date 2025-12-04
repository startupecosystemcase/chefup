'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
import { useEmployerJobsStore, useAuthStore } from '@/stores/useOnboardingStore'
import { mockResumes } from '@/lib/mockData'
import { cities, positions, experienceRanges, cuisines } from '@/lib/data'
import { Search, MapPin, Briefcase, Clock, ChefHat, User, Mail, Phone, ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function CandidatesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const userId = useAuthStore((state) => state.userId)
  const { getJobById } = useEmployerJobsStore()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('')

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
    setMounted(true)
  }, [userId, router])

  const job = jobId ? getJobById(jobId) : null

  // Определяем, какие кандидаты показывать
  const candidatesToShow = useMemo(() => {
    if (job && job.finalCandidates && job.finalCandidates.length > 0) {
      // Показываем финальный список после модерации
      return mockResumes.filter((c) => job.finalCandidates?.includes(c.id))
    } else if (job && job.autoMatchedCandidates && job.autoMatchedCandidates.length > 0) {
      // Показываем автоподобранных кандидатов (еще на модерации)
      return mockResumes.filter((c) => job.autoMatchedCandidates?.includes(c.id))
    }
    // Показываем всех кандидатов, если нет привязки к вакансии
    return mockResumes
  }, [job])

  // Фильтрация кандидатов
  const filteredCandidates = useMemo(() => {
    return candidatesToShow.filter((candidate) => {
      const matchesSearch = searchTerm === '' ||
        `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.about.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCity = selectedCity === '' || candidate.city === selectedCity
      const matchesPosition = selectedPosition === '' || candidate.position === selectedPosition
      const matchesExperience = selectedExperience === '' || candidate.experience === selectedExperience
      const matchesCuisine = selectedCuisine === '' || candidate.cuisine === selectedCuisine

      return matchesSearch && matchesCity && matchesPosition && matchesExperience && matchesCuisine
    })
  }, [candidatesToShow, searchTerm, selectedCity, selectedPosition, selectedExperience, selectedCuisine])

  const handleContactCandidate = (candidateId: string) => {
    toast('Контакты кандидата будут доступны после одобрения модератором')
  }

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </ShinyButton>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">
            {job ? `Кандидаты на вакансию: ${job.title}` : 'Кандидаты'}
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            {job
              ? job.finalCandidates && job.finalCandidates.length > 0
                ? `Финальный список кандидатов после проверки модератором (${job.finalCandidates.length} кандидатов)`
                : job.autoMatchedCandidates && job.autoMatchedCandidates.length > 0
                ? 'Автоматически подобранные кандидаты. Финальный список будет отправлен после проверки модератором.'
                : 'Кандидаты будут подобраны автоматически после одобрения вакансии модератором.'
              : 'Просмотр всех доступных кандидатов'}
          </p>
        </div>

        {/* Фильтры */}
        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Поиск и фильтры</h2>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <AnimatedInput
                  placeholder="Поиск по имени или описанию"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select onValueChange={setSelectedCity} value={selectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все города</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.label}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedPosition} value={selectedPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Должность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все должности</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.label}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedExperience} value={selectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Опыт" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой опыт</SelectItem>
                    {experienceRanges.map((exp) => (
                      <SelectItem key={exp.value} value={exp.label}>
                        {exp.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedCuisine} value={selectedCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Кухня" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все кухни</SelectItem>
                    {cuisines.map((cuisine) => (
                      <SelectItem key={cuisine.value} value={cuisine.label}>
                        {cuisine.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Список кандидатов */}
        <StaggerAnimation className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
          {filteredCandidates.length === 0 ? (
            <StaggerItem className="col-span-full">
              <AnimatedCard className="bg-white dark:bg-dark/50">
                <div className="py-12 text-center">
                  <p className="text-muted-foreground dark:text-gray-400">Кандидаты не найдены</p>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ) : (
            filteredCandidates.map((candidate) => (
              <StaggerItem key={candidate.id}>
                <AnimatedCard className="h-full flex flex-col bg-white dark:bg-dark/50">
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="dark:bg-gray-800 dark:text-white">
                        {candidate.firstName[0]}{candidate.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold dark:text-white">
                        {candidate.firstName} {candidate.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {candidate.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                        <Briefcase className="w-4 h-4" />
                        {candidate.position}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {candidate.experience}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                        <ChefHat className="w-4 h-4" />
                        {candidate.cuisine}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-8 line-clamp-3">
                      {candidate.about}
                    </p>
                    <div className="flex gap-4">
                      <ShinyButton variant="outline" className="flex-1" asChild>
                        <Link href={`/profile/${candidate.id}`}>
                          Профиль
                        </Link>
                      </ShinyButton>
                      <ShinyButton
                        className="flex-1"
                        onClick={() => handleContactCandidate(candidate.id)}
                      >
                        Связаться
                      </ShinyButton>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
              </StaggerItem>
            ))
          )}
        </StaggerAnimation>
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
import { Search, MapPin, Briefcase, Clock } from 'lucide-react'
import { mockResumes } from '@/lib/mockData'
import { cities, positions, cuisines, experienceRanges } from '@/lib/data'

export default function ResumesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedPosition, setSelectedPosition] = useState<string>('all')
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<string>('all')

  const filteredResumes = mockResumes.filter((resume) => {
    const matchesSearch = 
      `${resume.firstName} ${resume.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.about.toLowerCase().includes(searchQuery.toLowerCase())
    
    const cityLabel = cities.find(c => c.label === selectedCity)?.label
    const matchesCity = selectedCity === 'all' || resume.city === cityLabel || resume.city === selectedCity
    
    const positionLabel = positions.find(p => p.label === selectedPosition)?.label
    const matchesPosition = selectedPosition === 'all' || resume.position === positionLabel || resume.position === selectedPosition
    
    const cuisineLabel = cuisines.find(c => c.label === selectedCuisine)?.label
    const matchesCuisine = selectedCuisine === 'all' || resume.cuisine === cuisineLabel || resume.cuisine === selectedCuisine
    
    const experienceLabel = experienceRanges.find(e => e.label === selectedExperience)?.label
    const matchesExperience = selectedExperience === 'all' || resume.experience === experienceLabel || resume.experience === selectedExperience

    return matchesSearch && matchesCity && matchesPosition && matchesCuisine && matchesExperience
  })

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Резюме</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Список зарегистрированных участников платформы
          </p>
        </div>

        {/* Поиск и фильтры */}
        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-6">
            <div className="space-y-4">
              {/* Поиск */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-gray-400 w-4 h-4" />
                <AnimatedInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по резюме..."
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
            </div>
          </div>
        </AnimatedCard>

        {/* Список резюме */}
        <StaggerAnimation className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
          {filteredResumes.length === 0 ? (
            <StaggerItem className="col-span-full">
              <AnimatedCard className="bg-white dark:bg-dark/50">
                <div className="py-12 text-center">
                  <p className="text-muted-foreground dark:text-gray-400">Резюме не найдены</p>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ) : (
            filteredResumes.map((resume) => (
              <StaggerItem key={resume.id}>
                <AnimatedCard className="card-hover bg-white dark:bg-dark/50">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="dark:bg-gray-800 dark:text-white">
                        {resume.firstName[0]}{resume.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold dark:text-white">
                        {resume.firstName} {resume.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">{resume.position}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-4">
                      <AnimatedBadge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {resume.city}
                      </AnimatedBadge>
                      <AnimatedBadge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {resume.experience}
                      </AnimatedBadge>
                      <AnimatedBadge variant="secondary" className="text-xs">
                        {resume.cuisine}
                      </AnimatedBadge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-3">
                      {resume.about}
                    </p>
                    <ShinyButton variant="outline" className="w-full" asChild>
                      <Link href={`/profile/${resume.id}`}>Посмотреть профиль</Link>
                    </ShinyButton>
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


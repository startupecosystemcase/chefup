'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Резюме</h1>
          <p className="text-muted-foreground">
            Список зарегистрированных участников платформы
          </p>
        </div>

        {/* Поиск и фильтры */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Поиск */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
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
          </CardContent>
        </Card>

        {/* Список резюме */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResumes.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Резюме не найдены</p>
              </CardContent>
            </Card>
          ) : (
            filteredResumes.map((resume) => (
              <Card key={resume.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {resume.firstName[0]}{resume.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {resume.firstName} {resume.lastName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{resume.position}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {resume.city}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {resume.experience}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {resume.cuisine}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {resume.about}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/profile/${resume.id}`}>Посмотреть профиль</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}


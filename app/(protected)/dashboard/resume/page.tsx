'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useOnboardingStore, useAuthStore } from '@/stores/useOnboardingStore'
import {
  cities,
  ageRanges,
  experienceRanges,
  positions,
  educationLevels,
  ranks,
  cuisines,
  goals,
  venueFormats,
  salaryRanges,
} from '@/lib/data'
import { Download, Share2, FileText, MapPin, Briefcase, GraduationCap, Award, Target, DollarSign } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ResumePage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const formData = useOnboardingStore((state) => state.formData)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
    setMounted(true)
  }, [userId, router])

  const getLabel = (value: string, options: readonly { readonly value: string; readonly label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value
  }

  const handleDownloadPDF = () => {
    toast('Функция экспорта в PDF будет доступна в следующей версии')
    // В реальном приложении здесь будет генерация PDF
  }

  const handleShareResume = () => {
    const resumeUrl = `${window.location.origin}/profile/${userId}`
    navigator.clipboard.writeText(resumeUrl)
    toast.success('Ссылка на резюме скопирована!')
  }

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Моё резюме</h1>
            <p className="text-muted-foreground">
              Автоматически сформировано на основе вашей анкеты
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShareResume}>
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Скачать PDF
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {formData.firstName?.[0] || 'U'}
                  {formData.lastName?.[0] || ''}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-1">
                  {formData.firstName || 'Имя'} {formData.lastName || 'Фамилия'}
                </CardTitle>
                {(formData.desiredPosition || formData.currentPosition) && (
                  <p className="text-lg text-muted-foreground">
                    {formData.desiredPosition && getLabel(formData.desiredPosition, positions)}
                    {!formData.desiredPosition && formData.currentPosition && getLabel(formData.currentPosition, positions)}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  {formData.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {getLabel(formData.city, cities)}
                    </div>
                  )}
                  {formData.age && (
                    <div className="flex items-center gap-1">
                      <span>{getLabel(formData.age, ageRanges)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Контакты */}
        {(formData.phone || formData.email) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Контактная информация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                )}
                {formData.email && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Опыт работы */}
        {(formData.experience || formData.desiredPosition || formData.currentPosition || formData.rank) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Опыт работы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.experience && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Опыт работы</p>
                  <p className="font-medium">{getLabel(formData.experience, experienceRanges)}</p>
                </div>
              )}
              {(formData.currentPosition || formData.desiredPosition) && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {formData.currentPosition ? 'Текущая позиция' : 'Желаемая позиция'}
                  </p>
                  <p className="font-medium">
                    {formData.currentPosition && getLabel(formData.currentPosition, positions)}
                    {!formData.currentPosition && formData.desiredPosition && getLabel(formData.desiredPosition, positions)}
                  </p>
                </div>
              )}
              {formData.rank && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Разряд</p>
                  <p className="font-medium">{getLabel(formData.rank, ranks)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Образование */}
        {formData.education && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Образование
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{getLabel(formData.education, educationLevels)}</p>
            </CardContent>
          </Card>
        )}

        {/* Специализация */}
        {formData.cuisines && formData.cuisines.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Специализация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.cuisines.map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="text-sm py-1 px-3">
                    {getLabel(cuisine, cuisines)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Предпочтения */}
        {(formData.preferredVenueFormat || formData.salaryExpectation) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Предпочтения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.preferredVenueFormat && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Формат заведения</p>
                  <p className="font-medium">
                    {getLabel(formData.preferredVenueFormat, venueFormats)}
                  </p>
                </div>
              )}
              {formData.salaryExpectation && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Ожидаемая зарплата
                  </p>
                  <p className="font-medium">
                    {getLabel(formData.salaryExpectation, salaryRanges)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Цели */}
        {formData.goals && formData.goals.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Цели и интересы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.goals.map((goal) => (
                  <Badge key={goal} variant="outline" className="text-sm py-1 px-3">
                    {getLabel(goal, goals)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* О себе */}
        {formData.about && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>О себе</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{formData.about}</p>
            </CardContent>
          </Card>
        )}

        {/* Действия */}
        <div className="flex gap-4">
          <Button onClick={() => router.push('/onboarding')} variant="outline" className="flex-1">
            Редактировать анкету
          </Button>
          <Button onClick={handleShareResume} className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Поделиться резюме
          </Button>
        </div>
      </div>
    </div>
  )
}


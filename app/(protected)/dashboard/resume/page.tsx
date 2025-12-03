'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
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
import { Download, Share2, FileText, MapPin, Briefcase, GraduationCap, Award, Target, DollarSign, Pencil } from 'lucide-react'
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
    <div className="p-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-5xl w-full">
        <div className="mb-8 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Моё резюме</h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Автоматически сформировано на основе вашей анкеты
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <ShinyButton variant="outline" onClick={handleShareResume} className="w-full sm:w-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </ShinyButton>
            <ShinyButton onClick={handleDownloadPDF} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Скачать PDF
            </ShinyButton>
          </div>
        </div>

        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl dark:bg-dark/70 dark:text-white">
                  {formData.firstName?.[0] || 'U'}
                  {formData.lastName?.[0] || ''}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl mb-1 font-semibold dark:text-white">
                  {formData.firstName || 'Имя'} {formData.lastName || 'Фамилия'}
                </h2>
                {(formData.desiredPosition || formData.currentPosition) && (
                  <p className="text-lg text-muted-foreground dark:text-gray-400">
                    {formData.desiredPosition && getLabel(formData.desiredPosition, positions)}
                    {!formData.desiredPosition && formData.currentPosition && getLabel(formData.currentPosition, positions)}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground dark:text-gray-400">
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
          </div>
        </AnimatedCard>

        {/* Контакты */}
        {(formData.phone || formData.email) && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5" />
                  Контактная информация
                </div>
                <ShinyButton variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </ShinyButton>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Телефон</p>
                    <p className="font-medium dark:text-white">{formData.phone}</p>
                  </div>
                )}
                {formData.email && (
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Email</p>
                    <p className="font-medium dark:text-white">{formData.email}</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Опыт работы */}
        {(formData.experience || formData.desiredPosition || formData.currentPosition || formData.rank) && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Briefcase className="w-5 h-5" />
                  Опыт работы
                </div>
                <ShinyButton variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </ShinyButton>
              </h3>
              <div className="space-y-4">
              {formData.experience && (
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Опыт работы</p>
                  <p className="font-medium dark:text-white">{getLabel(formData.experience, experienceRanges)}</p>
                </div>
              )}
              {(formData.currentPosition || formData.desiredPosition) && (
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">
                    {formData.currentPosition ? 'Текущая позиция' : 'Желаемая позиция'}
                  </p>
                  <p className="font-medium dark:text-white">
                    {formData.currentPosition && getLabel(formData.currentPosition, positions)}
                    {!formData.currentPosition && formData.desiredPosition && getLabel(formData.desiredPosition, positions)}
                  </p>
                </div>
              )}
              {formData.rank && (
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Разряд</p>
                  <p className="font-medium dark:text-white">{getLabel(formData.rank, ranks)}</p>
                </div>
              )}
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Образование */}
        {formData.education && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-5 h-5" />
                  Образование
                </div>
                <ShinyButton variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </ShinyButton>
              </h3>
              <p className="font-medium dark:text-white">{getLabel(formData.education, educationLevels)}</p>
            </div>
          </AnimatedCard>
        )}

        {/* Специализация */}
        {formData.cuisines && formData.cuisines.length > 0 && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Award className="w-5 h-5" />
                  Специализация
                </div>
                <ShinyButton variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </ShinyButton>
              </h3>
              <div className="flex flex-wrap gap-4">
                {formData.cuisines.map((cuisine) => (
                  <AnimatedBadge key={cuisine} variant="secondary" className="text-sm py-1 px-3">
                    {getLabel(cuisine, cuisines)}
                  </AnimatedBadge>
                ))}
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Предпочтения */}
        {(formData.preferredVenueFormat || formData.salaryExpectation) && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                <Target className="w-5 h-5" />
                Предпочтения
              </h3>
              <div className="space-y-4">
                {formData.preferredVenueFormat && (
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Формат заведения</p>
                    <p className="font-medium dark:text-white">
                      {getLabel(formData.preferredVenueFormat, venueFormats)}
                    </p>
                  </div>
                )}
                {formData.salaryExpectation && (
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Ожидаемая зарплата
                    </p>
                    <p className="font-medium dark:text-white">
                      {getLabel(formData.salaryExpectation, salaryRanges)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Цели */}
        {formData.goals && formData.goals.length > 0 && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                <Target className="w-5 h-5" />
                Цели и интересы
              </h3>
              <div className="flex flex-wrap gap-4">
                {formData.goals.map((goal) => (
                  <AnimatedBadge key={goal} variant="outline" className="text-sm py-1 px-3">
                    {getLabel(goal, goals)}
                  </AnimatedBadge>
                ))}
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* О себе */}
        {formData.about && (
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">О себе</h3>
              <p className="text-muted-foreground dark:text-gray-400 whitespace-pre-wrap break-words">{formData.about}</p>
            </div>
          </AnimatedCard>
        )}

        {/* Действия */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ShinyButton onClick={() => router.push('/onboarding')} variant="outline" className="flex-1 text-sm">
            <Pencil className="w-4 h-4 mr-2" />
            Редактировать анкету
          </ShinyButton>
          <ShinyButton onClick={handleShareResume} className="flex-1 text-sm">
            <Share2 className="w-4 h-4 mr-2" />
            Поделиться резюме
          </ShinyButton>
        </div>
      </div>
    </div>
  )
}


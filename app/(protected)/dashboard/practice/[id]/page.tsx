'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { Separator } from '@/components/ui/separator'
import { useAuthStore, useEducationStore } from '@/stores/useOnboardingStore'
import { mockEducationItems } from '@/lib/mockEducation'
import { BookOpen, Clock, Users, Calendar, MapPin, Video, Award, ArrowLeft, CheckCircle2, Download, DollarSign } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const typeIcons = {
  course: BookOpen,
  webinar: Video,
  training: BookOpen,
  certification: Award,
}

const typeLabels = {
  course: 'Курс',
  webinar: 'Вебинар',
  training: 'Тренинг',
  certification: 'Сертификация',
}

export default function EducationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const educationId = params.id as string
  const userId = useAuthStore((state) => state.userId)
  const { items, enrollments, enroll, completeEducation, issueCertificate, getEducationById, getUserEnrollments } = useEducationStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  // Ищем курс в store или mock данных
  const education = getEducationById(educationId) || mockEducationItems.find((item) => item.id === educationId)

  const userEnrollments = getUserEnrollments(userId || '')
  const enrollment = userEnrollments.find((e) => e.educationId === educationId)

  const handleEnroll = () => {
    if (!userId) {
      toast.error('Необходимо войти в систему')
      return
    }
    enroll(userId, educationId)
    toast.success('Вы успешно записались на курс!')
  }

  const handleComplete = () => {
    if (!enrollment) return
    completeEducation(enrollment.id)
    toast.success('Курс завершен!')
  }

  const handleIssueCertificate = () => {
    if (!enrollment || !education) return
    issueCertificate(enrollment.id, educationId, education.title)
    toast.success('Сертификат выдан!')
  }

  if (!mounted || !userId || !education) {
    return null
  }

  const Icon = typeIcons[education.type]
  const isEnrolled = !!enrollment
  const isCompleted = enrollment?.status === 'completed' || enrollment?.status === 'certified'
  const hasCertificate = enrollment?.status === 'certified'

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl">
        <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </ShinyButton>

        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-6">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <AnimatedBadge variant="secondary" className="mb-2">
                    {typeLabels[education.type]}
                  </AnimatedBadge>
                  <h2 className="text-2xl font-semibold dark:text-white">{education.title}</h2>
                </div>
              </div>
            </div>
            <p className="text-base text-muted-foreground dark:text-gray-400 mb-4">Автор: {education.author}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Clock className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-sm dark:text-white">{education.duration}</span>
              </div>
              {education.maxParticipants && (
                <div className="flex items-center gap-4">
                  <Users className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                  <span className="text-sm dark:text-white">До {education.maxParticipants} участников</span>
                </div>
              )}
              {education.startDate && (
                <div className="flex items-center gap-4">
                  <Calendar className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                  <span className="text-sm dark:text-white">
                    {format(new Date(education.startDate), 'dd MMM yyyy', { locale: ru })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-4">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold dark:text-white">
                  {education.price === 0 ? 'Бесплатно' : `${education.price.toLocaleString('ru-RU')} ₸`}
                </span>
              </div>
            </div>

            {education.location && (
              <div className="flex items-center gap-4 mb-8">
                <MapPin className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-sm dark:text-white">{education.location}</span>
              </div>
            )}

            {education.isOnline && !education.location && (
              <div className="flex items-center gap-4 mb-8">
                <Video className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-sm dark:text-white">Онлайн формат</span>
              </div>
            )}

            <Separator className="my-6 dark:bg-gray-700" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">Описание</h3>
                <p className="text-muted-foreground dark:text-gray-400">{education.description}</p>
              </div>

              {education.content && (
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Программа</h3>
                  <p className="text-muted-foreground dark:text-gray-400 whitespace-pre-line">{education.content}</p>
                </div>
              )}

              {education.materials && education.materials.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Материалы</h3>
                  <div className="space-y-4">
                    {education.materials.map((material, index) => (
                      <a
                        key={index}
                        href={material}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 text-primary hover:underline"
                      >
                        <Download className="w-4 h-4" />
                        <span>Материал {index + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {education.videoUrl && (
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">Видео</h3>
                  <div className="aspect-video w-full rounded-md overflow-hidden">
                    <iframe
                      src={education.videoUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-6 dark:bg-gray-700" />

            <div className="flex gap-4">
              {!isEnrolled ? (
                <ShinyButton onClick={handleEnroll} className="flex-1">
                  Записаться на курс
                </ShinyButton>
              ) : (
                <>
                  {!isCompleted && (
                    <ShinyButton onClick={handleComplete} variant="outline" className="flex-1">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Завершить курс
                    </ShinyButton>
                  )}
                  {isCompleted && !hasCertificate && education.type === 'certification' && (
                    <ShinyButton onClick={handleIssueCertificate} className="flex-1">
                      <Award className="w-4 h-4 mr-2" />
                      Получить сертификат
                    </ShinyButton>
                  )}
                  {hasCertificate && (
                    <ShinyButton variant="outline" className="flex-1" asChild>
                      <Link href={`/dashboard/certificates/${enrollment.certificateId}`}>
                        <Download className="w-4 h-4 mr-2" />
                        Скачать сертификат
                      </Link>
                    </ShinyButton>
                  )}
                </>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {typeLabels[education.type]}
                  </Badge>
                  <CardTitle className="text-2xl">{education.title}</CardTitle>
                </div>
              </div>
            </div>
            <CardDescription className="text-base">Автор: {education.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{education.duration}</span>
              </div>
              {education.maxParticipants && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">До {education.maxParticipants} участников</span>
                </div>
              )}
              {education.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(education.startDate), 'dd MMM yyyy', { locale: ru })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">
                  {education.price === 0 ? 'Бесплатно' : `${education.price.toLocaleString('ru-RU')} ₸`}
                </span>
              </div>
            </div>

            {education.location && (
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{education.location}</span>
              </div>
            )}

            {education.isOnline && !education.location && (
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Онлайн формат</span>
              </div>
            )}

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Описание</h3>
                <p className="text-muted-foreground">{education.description}</p>
              </div>

              {education.content && (
                <div>
                  <h3 className="font-semibold mb-2">Программа</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{education.content}</p>
                </div>
              )}

              {education.materials && education.materials.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Материалы</h3>
                  <div className="space-y-2">
                    {education.materials.map((material, index) => (
                      <a
                        key={index}
                        href={material}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
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
                  <h3 className="font-semibold mb-2">Видео</h3>
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

            <Separator className="my-6" />

            <div className="flex gap-4">
              {!isEnrolled ? (
                <Button onClick={handleEnroll} className="flex-1">
                  Записаться на курс
                </Button>
              ) : (
                <>
                  {!isCompleted && (
                    <Button onClick={handleComplete} variant="outline" className="flex-1">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Завершить курс
                    </Button>
                  )}
                  {isCompleted && !hasCertificate && education.type === 'certification' && (
                    <Button onClick={handleIssueCertificate} className="flex-1">
                      <Award className="w-4 h-4 mr-2" />
                      Получить сертификат
                    </Button>
                  )}
                  {hasCertificate && (
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/dashboard/certificates/${enrollment.certificateId}`}>
                        <Download className="w-4 h-4 mr-2" />
                        Скачать сертификат
                      </Link>
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


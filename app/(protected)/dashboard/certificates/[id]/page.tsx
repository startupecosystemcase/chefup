'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { useAuthStore, useEducationStore } from '@/stores/useOnboardingStore'
import { Award, Download, ExternalLink, Calendar, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function CertificateDetailPage() {
  const router = useRouter()
  const params = useParams()
  const certificateId = params.id as string
  const userId = useAuthStore((state) => state.userId)
  const { certificates, getUserCertificates } = useEducationStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  const userCertificates = userId ? getUserCertificates(userId) : []
  const certificate = userCertificates.find((c) => c.id === certificateId)

  if (!mounted || !userId || !certificate) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl">
        <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </ShinyButton>

        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl mb-6 md:mb-4 md:mb-2 font-semibold dark:text-white">Сертификат</h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400">
              Подтверждает успешное прохождение обучения
            </p>
            <div className="space-y-6 mt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold dark:text-white">{certificate.educationTitle}</h3>
                <p className="text-muted-foreground dark:text-gray-400">
                  Номер сертификата: {certificate.certificateNumber}
                </p>
              </div>

              <div className="border-t dark:border-gray-700 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground dark:text-gray-400">Дата выдачи:</span>
                  <div className="flex items-center gap-4">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium dark:text-white">
                      {format(new Date(certificate.issuedAt), 'dd MMMM yyyy', { locale: ru })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <p className="text-sm text-muted-foreground dark:text-gray-400 text-center mb-8">
                  Данный сертификат подтверждает успешное прохождение образовательной программы
                  и может быть использован для подтверждения квалификации.
                </p>
                <div className="flex gap-4 justify-center">
                  <ShinyButton asChild>
                    <a
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Проверить сертификат
                    </a>
                  </ShinyButton>
                  <ShinyButton variant="outline" onClick={() => window.print()}>
                    <Download className="w-4 h-4 mr-2" />
                    Скачать PDF
                  </ShinyButton>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}


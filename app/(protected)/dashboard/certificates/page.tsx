'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { useAuthStore, useEducationStore } from '@/stores/useOnboardingStore'
import { Award, Download, ExternalLink, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function CertificatesPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const { getUserCertificates } = useEducationStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  const certificates = userId ? getUserCertificates(userId) : []

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Мои сертификаты</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Все полученные сертификаты об обучении и прохождении курсов
          </p>
        </div>

        {certificates.length === 0 ? (
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <Award className="w-16 h-16 mx-auto mb-8 text-muted-foreground dark:text-gray-400" />
              <p className="text-muted-foreground dark:text-gray-400 mb-8">У вас пока нет сертификатов</p>
              <ShinyButton onClick={() => router.push('/dashboard/practice')}>
                Добавить сертификат
              </ShinyButton>
            </div>
          </AnimatedCard>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <AnimatedCard key={certificate.id} className="card-hover bg-white dark:bg-dark/50">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <AnimatedBadge variant="default">Сертификат</AnimatedBadge>
                  </div>
                  <h3 className="text-lg mb-2 font-semibold dark:text-white">{certificate.educationTitle}</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                    Номер: {certificate.certificateNumber}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Выдан: {format(new Date(certificate.issuedAt), 'dd MMMM yyyy', { locale: ru })}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <ShinyButton variant="outline" className="flex-1" asChild>
                        <Link href={`/dashboard/certificates/${certificate.id}`}>
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Link>
                      </ShinyButton>
                      <ShinyButton variant="ghost" size="icon" asChild>
                        <a
                          href={certificate.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </ShinyButton>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


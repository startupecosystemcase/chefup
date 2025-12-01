'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Сертификат</CardTitle>
            <CardDescription className="text-lg">
              Подтверждает успешное прохождение обучения
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{certificate.educationTitle}</h2>
              <p className="text-muted-foreground">
                Номер сертификата: {certificate.certificateNumber}
              </p>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Дата выдачи:</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {format(new Date(certificate.issuedAt), 'dd MMMM yyyy', { locale: ru })}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Данный сертификат подтверждает успешное прохождение образовательной программы
                и может быть использован для подтверждения квалификации.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Проверить сертификат
                  </a>
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Download className="w-4 h-4 mr-2" />
                  Скачать PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Мои сертификаты</h1>
          <p className="text-muted-foreground">
            Все полученные сертификаты об обучении и прохождении курсов
          </p>
        </div>

        {certificates.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">У вас пока нет сертификатов</p>
              <Button asChild>
                <Link href="/dashboard/practice">Посмотреть доступные курсы</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="default">Сертификат</Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">{certificate.educationTitle}</CardTitle>
                  <CardDescription>
                    Номер: {certificate.certificateNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Выдан: {format(new Date(certificate.issuedAt), 'dd MMMM yyyy', { locale: ru })}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/dashboard/certificates/${certificate.id}`}>
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={certificate.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


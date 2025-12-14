'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { Label } from '@/components/ui/label'
import { useAuthStore, useEducationStore } from '@/stores/useOnboardingStore'
import { Award, Download, ExternalLink, Calendar, Upload, X } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { toast } from 'react-hot-toast'

export default function CertificatesPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const { getUserCertificates } = useEducationStore()
  const [mounted, setMounted] = useState(false)
  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false)
  const [certificateForm, setCertificateForm] = useState({
    title: '',
    organization: '',
    issueDate: '',
    certificateNumber: '',
    file: null as File | null,
  })

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  const certificates = userId ? getUserCertificates(userId) : []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Размер файла не должен превышать 10 МБ')
        return
      }
      setCertificateForm({ ...certificateForm, file })
    }
  }

  const handleAddCertificate = async () => {
    if (!certificateForm.title || !certificateForm.organization || !certificateForm.file) {
      toast.error('Заполните все обязательные поля')
      return
    }

    // Имитация загрузки сертификата
    toast.success('Сертификат успешно добавлен!')
    setIsAddCertificateOpen(false)
    setCertificateForm({
      title: '',
      organization: '',
      issueDate: '',
      certificateNumber: '',
      file: null,
    })
  }

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2 dark:text-white">Мои сертификаты</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Все полученные сертификаты об обучении и прохождении курсов
          </p>
        </div>

        {certificates.length === 0 ? (
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <Award className="w-16 h-16 mx-auto mb-8 text-muted-foreground dark:text-gray-400" />
              <p className="text-muted-foreground dark:text-gray-400 mb-8">У вас пока нет сертификатов</p>
              <ShinyButton onClick={() => setIsAddCertificateOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Добавить сертификат
              </ShinyButton>
            </div>
          </AnimatedCard>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <AnimatedCard key={certificate.id} className="card-hover bg-white dark:bg-dark/50">
                <div className="p-3 md:p-6">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <AnimatedBadge variant="default">Сертификат</AnimatedBadge>
                  </div>
                  <h3 className="text-lg mb-6 md:mb-2 font-semibold dark:text-white">{certificate.educationTitle}</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6 md:mb-4">
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

        {/* Кнопка добавления сертификата для непустого списка */}
        {certificates.length > 0 && (
          <div className="mt-8 flex justify-center">
            <ShinyButton onClick={() => setIsAddCertificateOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Добавить сертификат
            </ShinyButton>
          </div>
        )}

        {/* Модальное окно добавления сертификата */}
        <Dialog open={isAddCertificateOpen} onOpenChange={setIsAddCertificateOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark/90">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Добавить сертификат</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Загрузите документ сертификата об обучении или прохождении курса
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div>
                <Label htmlFor="certificate-title" className="dark:text-white">
                  Название сертификата *
                </Label>
                <AnimatedInput
                  id="certificate-title"
                  value={certificateForm.title}
                  onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                  placeholder="Например: Сертификат по кулинарному мастерству"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="certificate-organization" className="dark:text-white">
                  Организация / Учебное заведение *
                </Label>
                <AnimatedInput
                  id="certificate-organization"
                  value={certificateForm.organization}
                  onChange={(e) => setCertificateForm({ ...certificateForm, organization: e.target.value })}
                  placeholder="Название организации"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="certificate-date" className="dark:text-white">
                    Дата выдачи
                  </Label>
                  <AnimatedInput
                    id="certificate-date"
                    type="date"
                    value={certificateForm.issueDate}
                    onChange={(e) => setCertificateForm({ ...certificateForm, issueDate: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="certificate-number" className="dark:text-white">
                    Номер сертификата
                  </Label>
                  <AnimatedInput
                    id="certificate-number"
                    value={certificateForm.certificateNumber}
                    onChange={(e) => setCertificateForm({ ...certificateForm, certificateNumber: e.target.value })}
                    placeholder="Номер сертификата"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="certificate-file" className="dark:text-white">
                  Файл сертификата * (PDF, JPG, PNG, до 10 МБ)
                </Label>
                <div className="mt-2">
                  <input
                    id="certificate-file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="certificate-file">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
                      {certificateForm.file ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Upload className="w-5 h-5 text-primary" />
                            <span className="text-sm dark:text-white">{certificateForm.file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setCertificateForm({ ...certificateForm, file: null })
                            }}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            Нажмите для выбора файла или перетащите файл сюда
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <ShinyButton
                  variant="outline"
                  onClick={() => {
                    setIsAddCertificateOpen(false)
                    setCertificateForm({
                      title: '',
                      organization: '',
                      issueDate: '',
                      certificateNumber: '',
                      file: null,
                    })
                  }}
                  className="flex-1"
                >
                  Отмена
                </ShinyButton>
                <ShinyButton onClick={handleAddCertificate} className="flex-1">
                  Сохранить сертификат
                </ShinyButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}


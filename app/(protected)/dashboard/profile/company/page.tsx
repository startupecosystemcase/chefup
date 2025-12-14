'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAuthStore, useEmployerOnboardingStore } from '@/stores/useOnboardingStore'
import { Building2, Edit, Settings, MapPin, Copy, Check, Briefcase, Users, Award, FileText, Globe, Phone, Mail, Pencil, Plus, Eye, FilePlus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Label } from '@/components/ui/label'
import { useEmployerJobsStore } from '@/stores/useOnboardingStore'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { AvatarDialog } from '@/components/AvatarDialog'

export default function CompanyProfilePage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const username = useAuthStore((state) => state.username)
  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus)
  const employerFormData = useEmployerOnboardingStore((state) => state.formData)
  const setEmployerFormData = useEmployerOnboardingStore((state) => state.setFormData)
  const { jobs } = useEmployerJobsStore()
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const companyJobs = jobs.filter((job) => job.employerId === userId)
  const approvedJobs = companyJobs.filter((job) => job.status === 'approved')
  const pendingJobs = companyJobs.filter((job) => job.status === 'moderating' || job.status === 'pending')

  const handleCopyId = () => {
    if (userId) {
      navigator.clipboard.writeText(userId)
      setCopied(true)
      toast.success('ID скопирован!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full">
        {/* Заголовок страницы */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 md:w-8 md:h-8" />
            Профиль компании
          </h1>
        </div>

        {/* Company Header - только логотип, без обложки */}
        <div className="mb-8">
          <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
            <div className="p-3 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Логотип компании */}
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary/20 to-[#FB923C]/20 flex items-center justify-center overflow-hidden">
                    {employerFormData?.companyLogo ? (
                      <img 
                        src={employerFormData.companyLogo} 
                        alt={employerFormData.companyName || 'Company'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                    )}
                  </div>
                  <button
                    onClick={() => setIsAvatarDialogOpen(true)}
                    className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10"
                  >
                    <Edit className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Информация о компании */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-4">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-6 md:mb-2 truncate">
                        {employerFormData?.companyName || 'Название компании'}
                      </h1>
                      
                      {/* ID и Username */}
                      <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-4 text-sm">
                        {userId && (
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-gray-700 dark:text-gray-300">ID:</span>
                            <span className="font-mono break-all text-gray-900 dark:text-white">{userId}</span>
                            <button
                              onClick={handleCopyId}
                              className="ml-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                              title="Копировать ID"
                            >
                              {copied ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                // TODO: Открыть диалог редактирования логина
                                toast('Редактирование логина будет доступно в следующей версии')
                              }}
                              className="ml-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                              title="Редактировать логин"
                            >
                              <Pencil className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        )}
                        {username && (
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Username:</span>
                            <span className="font-mono break-all text-gray-900 dark:text-white">@{username}</span>
                            <button
                              onClick={() => {
                                // TODO: Открыть диалог редактирования логина
                                toast('Редактирование логина будет доступно в следующей версии')
                              }}
                              className="ml-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                              title="Редактировать логин"
                            >
                              <Pencil className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Badges - Город, Статус подписки */}
                      <div className="flex flex-wrap gap-2 mb-6 md:mb-4">
                        {employerFormData?.city && (
                          <AnimatedBadge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {employerFormData.city}
                          </AnimatedBadge>
                        )}
                        <AnimatedBadge variant={subscriptionStatus === 'PRO' ? 'default' : 'secondary'} className="text-xs">
                          {subscriptionStatus === 'PRO' ? 'PRO' : 'BASIC'}
                        </AnimatedBadge>
                      </div>

                      {/* Краткое описание */}
                      {(employerFormData?.companyDescription || employerFormData?.description) && (
                        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6 md:mb-4">
                          {employerFormData.companyDescription || employerFormData.description}
                        </p>
                      )}

                      {/* Статистика */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          <span>{approvedJobs.length} активных вакансий</span>
                        </div>
                        {employerFormData?.branchesCount && (
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            <span>{employerFormData.branchesCount} филиалов</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Кнопки действий */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <ShinyButton 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2 whitespace-nowrap"
                        onClick={() => {
                          // Открыть диалог редактирования
                        }}
                      >
                        <Edit className="w-4 h-4 flex-shrink-0" />
                        <span>Редактировать</span>
                      </ShinyButton>
                      <ShinyButton 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2 whitespace-nowrap"
                        onClick={() => router.push('/dashboard/subscription')}
                      >
                        <Settings className="w-4 h-4 flex-shrink-0" />
                        <span>Управление подпиской</span>
                      </ShinyButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h3 className="text-lg font-semibold mb-6 md:mb-4 dark:text-white">Всего вакансий</h3>
              <div className="text-3xl font-bold dark:text-white">{companyJobs.length}</div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h3 className="text-lg font-semibold mb-6 md:mb-4 dark:text-white">Опубликовано</h3>
              <div className="text-3xl font-bold text-green-600">{approvedJobs.length}</div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h3 className="text-lg font-semibold mb-6 md:mb-4 dark:text-white">На модерации</h3>
              <div className="text-3xl font-bold text-orange-600">{pendingJobs.length}</div>
            </div>
          </AnimatedCard>
        </div>

        {/* Кнопки действий */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <AnimatedCard className="bg-white dark:bg-dark/50 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/dashboard/jobs/create')}>
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FilePlus className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold dark:text-white mb-1">Создать вакансию</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium">Добавить новую вакансию на платформу</p>
                </div>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="bg-white dark:bg-dark/50 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/dashboard/jobs')}>
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold dark:text-white mb-1">Посмотреть текущие вакансии</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium">Просмотр и управление вакансиями</p>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Информация о компании */}
        <AnimatedCard className="bg-white dark:bg-dark/50 mb-6">
          <div className="p-3 md:p-6">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">О компании</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Название компании</Label>
                <p className="text-base dark:text-white">{employerFormData?.companyName || 'Не указано'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Тип заведения</Label>
                <p className="text-base dark:text-white">{employerFormData?.companyType || 'Не указано'}</p>
              </div>
              {employerFormData?.referralCode && employerFormData?.referralBy && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Реферальный промокод</Label>
                  <div className="mt-2 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                    <p className="text-sm dark:text-white">
                      <span className="font-semibold">Промокод:</span> {employerFormData.referralCode}
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                      Пришёл по реферальному промокоду: <span className="font-medium">{employerFormData.referralBy}</span>
                    </p>
                  </div>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Город</Label>
                <p className="text-base dark:text-white">{employerFormData?.city || 'Не указано'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Адрес</Label>
                <p className="text-base dark:text-white">{employerFormData?.address || 'Не указано'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Описание</Label>
                <p className="text-base dark:text-white whitespace-pre-wrap">{employerFormData?.description || 'Не указано'}</p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Контакты */}
        <AnimatedCard className="bg-white dark:bg-dark/50 mb-6">
          <div className="p-3 md:p-6">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">Контакты</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Контактное лицо</Label>
                <p className="text-base dark:text-white">{employerFormData?.contactPerson || 'Не указано'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Должность</Label>
                <p className="text-base dark:text-white">{employerFormData?.position || 'Не указано'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Email</Label>
                <p className="text-base dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {employerFormData?.email || 'Не указано'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Телефон</Label>
                <p className="text-base dark:text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {employerFormData?.phone || 'Не указано'}
                </p>
              </div>
              {employerFormData?.website && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Веб-сайт</Label>
                  <p className="text-base dark:text-white flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <a href={employerFormData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {employerFormData.website}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>

        {/* Avatar Dialog */}
        <AvatarDialog
          open={isAvatarDialogOpen}
          onOpenChange={setIsAvatarDialogOpen}
          currentAvatar={employerFormData?.companyLogo}
          firstName={employerFormData?.companyName}
          lastName=""
          onSave={(logo) => {
            setEmployerFormData({ companyLogo: logo })
            toast.success('Логотип обновлён!')
          }}
        />
      </div>
    </div>
  )
}


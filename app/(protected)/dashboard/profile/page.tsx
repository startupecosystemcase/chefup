'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useOnboardingStore, useAuthStore, useEmployerOnboardingStore } from '@/stores/useOnboardingStore'
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
import { Download, Share2, FileText, MapPin, Briefcase, GraduationCap, Award, Target, DollarSign, Pencil, Edit, Eye, Heart, UserPlus, Users, CheckCircle2, Globe, Plus, FileCheck, Clock, Upload, Crop, Instagram, Facebook, Linkedin, Youtube, Send, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileAnalytics } from '@/components/ProfileAnalytics'
import { ProfileCompleteness } from '@/components/ProfileCompleteness'
import { ProfileTips } from '@/components/ProfileTips'
import { SkillsProgress } from '@/components/SkillsProgress'
import { PortfolioPostCard } from '@/components/PortfolioPostCard'
import { PortfolioPostForm } from '@/components/PortfolioPostForm'
import { usePortfolioStore, usePublicProfilesStore } from '@/stores/useOnboardingStore'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { PortfolioPost } from '@/types/portfolio.types'
import { ExtendedQuestionnaire } from '@/components/ExtendedQuestionnaire'
import { ImageCropDialog } from '@/components/ImageCropDialog'
import { AvatarDialog } from '@/components/AvatarDialog'
import { Label } from '@/components/ui/label'
import { BadgeSelector } from '@/components/BadgeSelector'
import { useEmployerJobsStore } from '@/stores/useOnboardingStore'
import { Copy, Check } from 'lucide-react'

// Компонент профиля компании для работодателей
function CompanyProfilePage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const username = useAuthStore((state) => state.username)
  const employerFormData = useEmployerOnboardingStore((state) => state.formData)
  const { jobs } = useEmployerJobsStore()
  const [copied, setCopied] = useState(false)

  const companyJobs = jobs.filter((job) => job.employerId === userId)
  const approvedJobs = companyJobs.filter((job) => job.status === 'approved')
  const pendingJobs = companyJobs.filter((job) => job.status === 'moderating' || job.status === 'pending')

  const handleCopyId = () => {
    if (userId) {
      navigator.clipboard.writeText(userId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Профиль компании</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Управление данными компании и статистика
          </p>
        </div>

        {/* ID и Username */}
        <AnimatedCard className="bg-white dark:bg-dark/50 mb-6">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold dark:text-white mb-2">
                  {employerFormData?.companyName || 'Компания'}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                  {username && <span>@{username}</span>}
                  {userId && (
                    <div className="flex items-center gap-2">
                      <span>ID: {userId.slice(0, 8)}...</span>
                      <button
                        onClick={handleCopyId}
                        className="flex items-center gap-1 text-primary hover:text-primary/80"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3" />
                            Скопировано
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Копировать
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Всего вакансий</h3>
              <div className="text-3xl font-bold dark:text-white">{companyJobs.length}</div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Опубликовано</h3>
              <div className="text-3xl font-bold text-green-600">{approvedJobs.length}</div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">На модерации</h3>
              <div className="text-3xl font-bold text-orange-600">{pendingJobs.length}</div>
            </div>
          </AnimatedCard>
        </div>

        {/* Информация о компании */}
        <AnimatedCard className="bg-white dark:bg-dark/50 mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">Общая информация</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Название компании</Label>
                <p className="text-base dark:text-white">{employerFormData?.companyName || 'Не указано'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Тип заведения</Label>
                <p className="text-base dark:text-white">{employerFormData?.companyType || 'Не указано'}</p>
              </div>
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
                <p className="text-base dark:text-white">{employerFormData?.description || 'Не указано'}</p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Контакты */}
        <AnimatedCard className="bg-white dark:bg-dark/50 mb-6">
          <div className="p-6">
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
                <p className="text-base dark:text-white">{employerFormData?.email || 'Не указано'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Телефон</Label>
                <p className="text-base dark:text-white">{employerFormData?.phone || 'Не указано'}</p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const username = useAuthStore((state) => state.username)
  const formData = useOnboardingStore((state) => state.formData)
  const employerFormData = useEmployerOnboardingStore((state) => state.formData)
  const { posts, addPost } = usePortfolioStore()
  const isUsernameAvailable = usePublicProfilesStore((state) => state.isUsernameAvailable)
  const publishProfile = usePublicProfilesStore((state) => state.publishProfile)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'blog'>('about')
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
  const [isPublishSuccessDialogOpen, setIsPublishSuccessDialogOpen] = useState(false)
  const [publishUsername, setPublishUsername] = useState('')
  const [usernameCheckStatus, setUsernameCheckStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPortfolioDialogOpen, setIsPortfolioDialogOpen] = useState(false)
  const [isExtendedQuestionnaireOpen, setIsExtendedQuestionnaireOpen] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>((formData.coverImage as string | undefined) || null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [isCoverUploading, setIsCoverUploading] = useState(false)
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false)
  const [coverImageToCrop, setCoverImageToCrop] = useState<string | null>(null)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
  const [editDialogs, setEditDialogs] = useState({
    about: false,
    contacts: false,
    goals: false,
    experience: false,
    education: false,
    specialization: false,
    preferences: false,
    social: false,
  })

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
    setMounted(true)
  }, [userId, router])

  // Vanta.js FOG effect
  useEffect(() => {
    if (!mounted || coverImage) return

    const initVanta = async () => {
      if (typeof window === 'undefined') return

      try {
        // Load Three.js
        if (!(window as any).THREE) {
          const threeScript = document.createElement('script')
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
          threeScript.onload = () => {
            // Load Vanta.js FOG
            const vantaScript = document.createElement('script')
            vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js'
            vantaScript.onload = () => {
              if ((window as any).VANTA && (window as any).VANTA.FOG) {
                const effect = (window as any).VANTA.FOG({
                  el: '#cover-vanta',
                  mouseControls: true,
                  touchControls: true,
                  gyroControls: false,
                  minHeight: 200.00,
                  minWidth: 200.00,
                  blurFactor: 0.64,
                })
                setVantaEffect(effect)
              }
            }
            document.body.appendChild(vantaScript)
          }
          document.body.appendChild(threeScript)
        } else {
          // Three.js already loaded
          if (!(window as any).VANTA) {
            const vantaScript = document.createElement('script')
            vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js'
            vantaScript.onload = () => {
              if ((window as any).VANTA && (window as any).VANTA.FOG) {
                const effect = (window as any).VANTA.FOG({
                  el: '#cover-vanta',
                  mouseControls: true,
                  touchControls: true,
                  gyroControls: false,
                  minHeight: 200.00,
                  minWidth: 200.00,
                  blurFactor: 0.64,
                })
                setVantaEffect(effect)
              }
            }
            document.body.appendChild(vantaScript)
          } else {
            // Vanta.js already loaded
            if ((window as any).VANTA && (window as any).VANTA.FOG) {
              const effect = (window as any).VANTA.FOG({
                el: '#cover-vanta',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                blurFactor: 0.64,
              })
              setVantaEffect(effect)
            }
          }
        }
      } catch (error) {
        console.error('Error initializing Vanta.js:', error)
      }
    }

    const timer = setTimeout(() => {
      initVanta()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (vantaEffect && vantaEffect.destroy) {
        vantaEffect.destroy()
      }
    }
  }, [mounted, coverImage])

  const getLabel = (value: string, options: readonly { readonly value: string; readonly label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value
  }

  // Пастельные цвета Notion для характеристик
  const getCharacteristicColor = (type: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      rank: { bg: '#DBE4EF', text: '#1E3A5F' }, // Синий
      specialization: { bg: '#F4E4C1', text: '#8B6914' }, // Оранжевый
      experience: { bg: '#DBEDDB', text: '#2D5016' }, // Зеленый
      education: { bg: '#E4DFEC', text: '#5B4E77' }, // Фиолетовый
      goals: { bg: '#F4DFEB', text: '#8B3A5B' }, // Розовый
      venueFormat: { bg: '#EDE4D9', text: '#6B5B47' }, // Коричневый
      salary: { bg: '#FBF3DB', text: '#8B6F1E' }, // Желтый
      city: { bg: '#E3E2E0', text: '#37352F' }, // Серый
      position: { bg: '#FBE4E4', text: '#8B2E2E' }, // Красный
    }
    return colors[type] || { bg: '#E3E2E0', text: '#37352F' }
  }

  const setFormData = useOnboardingStore((state) => state.setFormData)

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${userId}`
    navigator.clipboard.writeText(profileUrl)
    toast.success('Ссылка на профиль скопирована!')
  }

  // Проверка доступности username
  useEffect(() => {
    if (!publishUsername.trim()) {
      setUsernameCheckStatus('idle')
      return
    }

    const normalizedUsername = publishUsername.toLowerCase().trim()
    if (normalizedUsername.length < 3) {
      setUsernameCheckStatus('idle')
      return
    }

    // Проверка на валидность (только буквы, цифры, подчеркивания, дефисы)
    if (!/^[a-zA-Z0-9_-]+$/.test(normalizedUsername)) {
      setUsernameCheckStatus('idle')
      return
    }

    setUsernameCheckStatus('checking')
    // Имитация проверки (в реальном приложении здесь будет API запрос)
    setTimeout(() => {
      const available = isUsernameAvailable(normalizedUsername)
      setUsernameCheckStatus(available ? 'available' : 'taken')
    }, 500)
  }, [publishUsername, isUsernameAvailable])

  const handlePublishPage = async () => {
    if (!publishUsername.trim()) {
      toast.error('Введите никнейм')
      return
    }

    const normalizedUsername = publishUsername.toLowerCase().trim()
    
    if (!isUsernameAvailable(normalizedUsername)) {
      toast.error('Этот никнейм уже занят')
      return
    }

    if (!userId) {
      toast.error('Ошибка: пользователь не найден')
      return
    }

    setIsPublishing(true)
    
    // Имитация публикации (в реальном приложении здесь будет API запрос)
    setTimeout(() => {
      publishProfile(userId, normalizedUsername)
      setIsPublishing(false)
      setIsPublishDialogOpen(false)
      setIsPublishSuccessDialogOpen(true)
    }, 1000)
  }

  const handleAddPortfolioPost = (postData: Omit<PortfolioPost, 'id' | 'createdAt'>) => {
    addPost(postData)
    setIsPortfolioDialogOpen(false)
    toast.success('Пост добавлен в микроблог!')
  }

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="p-12 md:p-[72px] lg:p-[96px] w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full">
        {/* Profile Header with Cover Image or Vanta.js FOG */}
        <div className="relative mb-8 h-[180px] md:h-[224px]">
          {/* Cover Container */}
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            {coverImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                {isCoverUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-white text-base font-medium">Загрузка...</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div id="cover-vanta" className="w-full h-full bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400" />
            )}
          </div>
          
          {/* Edit Cover Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-30">
            <ShinyButton
              variant="outline"
              size="sm"
              className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm"
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    if (file.size > 25 * 1024 * 1024) {
                      toast.error('Размер файла не должен превышать 25 МБ')
                      return
                    }
                    setIsCoverUploading(true)
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      const imageUrl = event.target?.result as string
                      setCoverImageToCrop(imageUrl)
                      setIsCropDialogOpen(true)
                      setIsCoverUploading(false)
                    }
                    reader.readAsDataURL(file)
                  }
                }
                input.click()
              }}
            >
              <Upload className="w-4 h-4 mr-1.5" />
              <span className="text-xs">Загрузить</span>
            </ShinyButton>
            {coverImage && (
              <ShinyButton
                variant="outline"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm"
                onClick={() => {
                  if (coverImage) {
                    setCoverImageToCrop(coverImage)
                    setIsCropDialogOpen(true)
                  }
                }}
              >
                <Crop className="w-4 h-4 mr-1.5" />
                <span className="text-xs">Обрезать</span>
              </ShinyButton>
            )}
          </div>

          {/* Avatar positioned on left, overlapping banner (half on cover, half below) - OUTSIDE cover container */}
          <div className="absolute left-6 md:left-8 bottom-0 translate-y-1/2 z-30">
            <div className="relative group">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 ring-4 ring-white shadow-xl rounded-full overflow-visible">
                <AvatarImage src={formData.avatarUrl} className="rounded-full" />
                <AvatarFallback className="text-3xl md:text-4xl bg-white text-gray-700 dark:bg-gray-800 dark:text-white rounded-full">
                  {formData.firstName?.[0] || 'U'}
                  {formData.lastName?.[0] || ''}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => setIsAvatarDialogOpen(true)}
                className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10"
              >
                <Pencil className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Crop Dialog */}
        <ImageCropDialog
          open={isCropDialogOpen}
          onOpenChange={setIsCropDialogOpen}
          imageSrc={coverImageToCrop}
          onCrop={(croppedImage) => {
            setCoverImage(croppedImage)
            setFormData({ coverImage: croppedImage })
            toast.success('Обложка обновлена!')
          }}
          aspectRatio={16/9}
        />

        {/* Avatar Dialog */}
        <AvatarDialog
          open={isAvatarDialogOpen}
          onOpenChange={setIsAvatarDialogOpen}
          currentAvatar={formData.avatarUrl}
          firstName={formData.firstName}
          lastName={formData.lastName}
          onSave={(avatar) => {
            setFormData({ avatarUrl: avatar })
            toast.success('Аватарка обновлена!')
          }}
        />

        {/* Profile Info Section */}
        <div className="mt-20 md:mt-24 mb-8">
          {/* Full Name with Verification */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white flex items-center gap-2 mb-8">
              {formData.firstName || 'Пользователь'} {formData.lastName || ''}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => router.push('/dashboard/subscription')}>
                      <CheckCircle2 className="w-6 h-6 text-gray-400 hover:text-gray-500 transition-colors cursor-pointer" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Не верифицированный профиль</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h1>

            {/* ID и Username */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground dark:text-gray-400">
              {userId && (
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">ID:</span>
                  <span className="font-mono">{userId.slice(0, 8)}...</span>
                </div>
              )}
              {username && (
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">Username:</span>
                  <span className="font-mono">@{username}</span>
                </div>
              )}
            </div>

            {/* Badges - Specialization, City, Profession (Orange) */}
            <div className="flex flex-wrap gap-2 mb-6">
              {formData.cuisines && formData.cuisines.length > 0 && (
                <div className="px-3 py-1.5 bg-[#F97316] text-white rounded-lg text-sm font-medium">
                  {getLabel(formData.cuisines[0], cuisines)}
                </div>
              )}
              {formData.city && (
                <div className="px-3 py-1.5 bg-[#F97316] text-white rounded-lg text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {getLabel(formData.city, cities)}
                </div>
              )}
              {(formData.desiredPosition || formData.currentPosition) && (
                <div className="px-3 py-1.5 bg-[#F97316] text-white rounded-lg text-sm font-medium flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {formData.desiredPosition && getLabel(formData.desiredPosition, positions)}
                  {!formData.desiredPosition && formData.currentPosition && getLabel(formData.currentPosition, positions)}
                </div>
              )}
            </div>

            {/* Buttons Row - White buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Dialog open={isExtendedQuestionnaireOpen} onOpenChange={setIsExtendedQuestionnaireOpen}>
                <DialogTrigger asChild>
                  <ShinyButton variant="outline" size="sm" className="text-xs leading-tight whitespace-nowrap bg-white border-gray-200 hover:bg-gray-50 px-3 py-2">
                    <FileCheck className="w-3 h-3 mr-1.5" />
                    Расширенная анкета
                  </ShinyButton>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl mb-2">Расширенная анкета</DialogTitle>
                    <DialogDescription className="text-base">
                      Заполните расширенную анкету для лучшего подбора вакансий
                    </DialogDescription>
                  </DialogHeader>
                  <ExtendedQuestionnaire
                    onComplete={() => {
                      setIsExtendedQuestionnaireOpen(false)
                      setActiveTab('about')
                    }}
                    onCancel={() => setIsExtendedQuestionnaireOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              
              <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
                <DialogTrigger asChild>
                  <ShinyButton 
                    variant="outline" 
                    size="sm" 
                    className="text-xs leading-tight whitespace-nowrap bg-white border-gray-200 hover:bg-gray-50 px-3 py-2"
                  >
                    <Globe className="w-3 h-3 mr-1.5" />
                    Опубликовать и поделиться
                  </ShinyButton>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-dark">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl mb-2">Опубликовать публичную страницу</DialogTitle>
                    <DialogDescription className="text-base">
                      Создайте публичную страницу профиля с уникальным никнеймом
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Никнейм</label>
                      <AnimatedInput
                        value={publishUsername}
                        onChange={(e) => setPublishUsername(e.target.value)}
                        placeholder="например: chef_savva"
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1 mb-2">
                        Ваша страница будет доступна по адресу: {typeof window !== 'undefined' ? window.location.origin : ''}/{publishUsername || 'никнейм'}
                      </p>
                      {publishUsername.trim() && (
                        <div className="mt-2">
                          {usernameCheckStatus === 'checking' && (
                            <p className="text-xs text-gray-500 flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-gray-300 border-t-[#F97316] rounded-full animate-spin" />
                              Проверка доступности...
                            </p>
                          )}
                          {usernameCheckStatus === 'available' && (
                            <p className="text-xs text-green-600 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Никнейм свободен
                            </p>
                          )}
                          {usernameCheckStatus === 'taken' && (
                            <p className="text-xs text-red-600 flex items-center gap-2">
                              <X className="w-4 h-4" />
                              Никнейм уже занят
                            </p>
                          )}
                          {publishUsername.trim().length > 0 && publishUsername.trim().length < 3 && (
                            <p className="text-xs text-amber-600">
                              Никнейм должен содержать минимум 3 символа
                            </p>
                          )}
                          {publishUsername.trim() && !/^[a-zA-Z0-9_-]+$/.test(publishUsername.trim()) && (
                            <p className="text-xs text-amber-600">
                              Используйте только буквы, цифры, подчеркивания и дефисы
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <ShinyButton 
                        onClick={handlePublishPage} 
                        className="flex-1"
                        disabled={usernameCheckStatus !== 'available' || isPublishing}
                      >
                        {isPublishing ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Публикация...
                          </>
                        ) : (
                          'Опубликовать'
                        )}
                      </ShinyButton>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Success Dialog */}
              <Dialog open={isPublishSuccessDialogOpen} onOpenChange={setIsPublishSuccessDialogOpen}>
                <DialogContent className="bg-white dark:bg-dark max-w-md">
                  <DialogHeader className="mb-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <DialogTitle className="text-2xl mb-2 text-center">Ваша страница успешно опубликована!</DialogTitle>
                    <DialogDescription className="text-base text-center">
                      Теперь ваш профиль доступен по адресу: {typeof window !== 'undefined' ? window.location.origin : ''}/{publishUsername}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3">
                    <ShinyButton 
                      variant="outline" 
                      onClick={() => setIsPublishSuccessDialogOpen(false)}
                      className="flex-1"
                    >
                      Закрыть
                    </ShinyButton>
                    <ShinyButton 
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(`/${publishUsername}`, '_blank')
                        }
                        setIsPublishSuccessDialogOpen(false)
                      }}
                      className="flex-1"
                    >
                      Перейти
                    </ShinyButton>
                  </div>
                </DialogContent>
              </Dialog>
              
              <ShinyButton variant="outline" size="sm" className="text-xs leading-tight whitespace-nowrap bg-white border-gray-200 hover:bg-gray-50 px-3 py-2">
                <Edit className="w-3 h-3 mr-1.5" />
                Редактировать
              </ShinyButton>
            </div>
          </div>

          {/* Social Activity Statistics */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>0 подписчиков</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>0 подписок</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>0 просмотров</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>0 лайков</span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-6">
            <TabsList className="bg-transparent border-b border-gray-200 dark:border-border/50 rounded-none p-0 h-auto">
              <TabsTrigger 
                value="about" 
                className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                О себе
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Активность
              </TabsTrigger>
              <TabsTrigger 
                value="blog" 
                className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Микроблог
              </TabsTrigger>
            </TabsList>

            {/* О себе Tab - объединенный с Данными */}
            <TabsContent value="about" className="mt-6 space-y-6">
              {/* Кнопка Расширенная анкета */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Расширенная анкета</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {formData.extendedQuestionnaire 
                          ? 'Расширенная анкета заполнена' 
                          : 'Заполните расширенную анкету для лучшего подбора вакансий'}
                      </p>
                    </div>
                    <Dialog open={isExtendedQuestionnaireOpen} onOpenChange={setIsExtendedQuestionnaireOpen}>
                      <DialogTrigger asChild>
                        <ShinyButton variant={formData.extendedQuestionnaire ? "outline" : "default"} size="sm">
                          <FileCheck className="w-4 h-4 mr-2" />
                          {formData.extendedQuestionnaire ? 'Редактировать анкету' : 'Заполнить анкету'}
                        </ShinyButton>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark">
                        <DialogHeader className="mb-6">
                          <DialogTitle className="text-2xl mb-2">Расширенная анкета</DialogTitle>
                          <DialogDescription className="text-base">
                            Заполните расширенную анкету для лучшего подбора вакансий
                          </DialogDescription>
                        </DialogHeader>
                        <ExtendedQuestionnaire
                          onComplete={() => {
                            setIsExtendedQuestionnaireOpen(false)
                          }}
                          onCancel={() => setIsExtendedQuestionnaireOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </AnimatedCard>

              {/* О себе */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <FileText className="w-5 h-5" />
                    О себе
                  </h3>
                  {formData.about ? (
                    <p className="text-muted-foreground dark:text-gray-400 whitespace-pre-wrap break-words">{formData.about}</p>
                  ) : (
                    <p className="text-muted-foreground dark:text-gray-400 italic">Расскажите о себе</p>
                  )}
                </div>
                <Dialog open={editDialogs.about} onOpenChange={(open) => setEditDialogs({ ...editDialogs, about: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать "О себе"</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">О себе</Label>
                        <AnimatedTextarea
                          value={formData.about || ''}
                          onChange={(e) => setFormData({ about: e.target.value })}
                          placeholder="Расскажите о себе..."
                          className="min-h-[200px]"
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, about: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, about: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>

              {/* Данные расширенной анкеты */}
              {formData.extendedQuestionnaire && (
                <>
                  {/* Лучшие блюда */}
                  {formData.extendedQuestionnaire.bestDishes && formData.extendedQuestionnaire.bestDishes.length > 0 && (
                    <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                          <Award className="w-5 h-5" />
                          Лучшие блюда
                        </h3>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {formData.extendedQuestionnaire.bestDishes.map((dish) => (
                              <AnimatedBadge key={dish} variant="secondary" className="text-sm py-1 px-3">
                                {dish}
                              </AnimatedBadge>
                            ))}
                          </div>
                          {formData.extendedQuestionnaire.bestDishesWhy && (
                            <p className="text-sm text-muted-foreground dark:text-gray-400">
                              {formData.extendedQuestionnaire.bestDishesWhy}
                            </p>
                          )}
                        </div>
                      </div>
                    </AnimatedCard>
                  )}

                  {/* Опыт с сезонными ингредиентами */}
                  {formData.extendedQuestionnaire.seasonalIngredientsExperience && (
                    <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                          <Target className="w-5 h-5" />
                          Опыт с сезонными ингредиентами
                        </h3>
                        <p className="text-sm font-medium dark:text-white">
                          {formData.extendedQuestionnaire.seasonalIngredientsExperience}
                        </p>
                      </div>
                    </AnimatedCard>
                  )}

                  {/* Оптимизация отходов */}
                  {formData.extendedQuestionnaire.wasteOptimization && (
                    <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                          <Target className="w-5 h-5" />
                          Оптимизация кухонного процесса
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400 whitespace-pre-wrap">
                          {formData.extendedQuestionnaire.wasteOptimization}
                        </p>
                      </div>
                    </AnimatedCard>
                  )}

                  {/* Готовность к сменному графику и переезду */}
                  {(formData.extendedQuestionnaire.shiftScheduleReady !== undefined || formData.extendedQuestionnaire.relocationReady !== undefined) && (
                    <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                          <Briefcase className="w-5 h-5" />
                          Готовность к работе
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground dark:text-gray-400">Сменный график:</span>
                            <AnimatedBadge variant={formData.extendedQuestionnaire.shiftScheduleReady ? "default" : "outline"}>
                              {formData.extendedQuestionnaire.shiftScheduleReady ? "Да" : "Нет"}
                            </AnimatedBadge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground dark:text-gray-400">Переезд за доплату:</span>
                            <AnimatedBadge variant={formData.extendedQuestionnaire.relocationReady ? "default" : "outline"}>
                              {formData.extendedQuestionnaire.relocationReady ? "Да" : "Нет"}
                            </AnimatedBadge>
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  )}

                  {/* Предпочтения по графику */}
                  {formData.extendedQuestionnaire.schedulePreferences && formData.extendedQuestionnaire.schedulePreferences.length > 0 && (
                    <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                          <Clock className="w-5 h-5" />
                          Предпочтения по графику работы
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.extendedQuestionnaire.schedulePreferences.map((pref) => (
                            <AnimatedBadge key={pref} variant="outline" className="text-sm py-1 px-3">
                              {pref}
                            </AnimatedBadge>
                          ))}
                        </div>
                      </div>
                    </AnimatedCard>
                  )}

                  {/* Причины поиска работы */}
                  {formData.extendedQuestionnaire.jobSearchReasons && formData.extendedQuestionnaire.jobSearchReasons.length > 0 && (
                    <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                          <Target className="w-5 h-5" />
                          Причины поиска новой работы
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.extendedQuestionnaire.jobSearchReasons.map((reason) => (
                            <AnimatedBadge key={reason} variant="secondary" className="text-sm py-1 px-3">
                              {reason}
                            </AnimatedBadge>
                          ))}
                        </div>
                      </div>
                    </AnimatedCard>
                  )}

                  {/* Предпочтения по команде */}
                  {formData.extendedQuestionnaire.teamCulturePreferences && formData.extendedQuestionnaire.teamCulturePreferences.length > 0 && (
                    <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                          <Users className="w-5 h-5" />
                          Предпочтения по команде и культуре
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.extendedQuestionnaire.teamCulturePreferences.map((pref) => (
                            <AnimatedBadge key={pref} variant="outline" className="text-sm py-1 px-3">
                              {pref}
                            </AnimatedBadge>
                          ))}
                        </div>
                      </div>
                    </AnimatedCard>
                  )}
                </>
              )}

              {/* Контакты */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <FileText className="w-5 h-5" />
                    Контактная информация
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.phone && (
                      <div 
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('city').bg,
                          color: getCharacteristicColor('city').text
                        }}
                      >
                        {formData.phone}
                      </div>
                    )}
                    {formData.email && (
                      <div 
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('city').bg,
                          color: getCharacteristicColor('city').text
                        }}
                      >
                        {formData.email}
                      </div>
                    )}
                    {!formData.phone && !formData.email && (
                      <p className="text-muted-foreground dark:text-gray-400 italic">Добавьте контактную информацию</p>
                    )}
                  </div>
                </div>
                <Dialog open={editDialogs.contacts} onOpenChange={(open) => setEditDialogs({ ...editDialogs, contacts: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать контакты</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Телефон</Label>
                        <AnimatedInput
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ phone: e.target.value })}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Email</Label>
                        <AnimatedInput
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ email: e.target.value })}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, contacts: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, contacts: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>

              {/* Цели и интересы */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <Target className="w-5 h-5" />
                    Цели и интересы
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.goals && formData.goals.length > 0 ? (
                      formData.goals.map((goal) => {
                        const color = getCharacteristicColor('goals')
                        return (
                          <div
                            key={goal}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: color.bg, color: color.text }}
                          >
                            {getLabel(goal, goals)}
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-muted-foreground dark:text-gray-400 italic">Добавьте цели и интересы</p>
                    )}
                  </div>
                </div>
                <Dialog open={editDialogs.goals} onOpenChange={(open) => setEditDialogs({ ...editDialogs, goals: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать цели и интересы</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Выберите цели и интересы</Label>
                        <BadgeSelector
                          options={goals}
                          selected={formData.goals || []}
                          onChange={(selected) => setFormData({ goals: selected })}
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, goals: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, goals: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>

              {/* Опыт работы */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <Briefcase className="w-5 h-5" />
                    Опыт работы
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.experience && (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('experience').bg,
                          color: getCharacteristicColor('experience').text
                        }}
                      >
                        {getLabel(formData.experience, experienceRanges)}
                      </div>
                    )}
                    {formData.currentPosition && (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('position').bg,
                          color: getCharacteristicColor('position').text
                        }}
                      >
                        {getLabel(formData.currentPosition, positions)}
                      </div>
                    )}
                    {formData.desiredPosition && !formData.currentPosition && (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('position').bg,
                          color: getCharacteristicColor('position').text
                        }}
                      >
                        {getLabel(formData.desiredPosition, positions)}
                      </div>
                    )}
                    {formData.rank && (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('rank').bg,
                          color: getCharacteristicColor('rank').text
                        }}
                      >
                        {getLabel(formData.rank, ranks)}
                      </div>
                    )}
                    {!formData.experience && !formData.desiredPosition && !formData.currentPosition && !formData.rank && (
                      <p className="text-muted-foreground dark:text-gray-400 italic">Добавьте информацию об опыте работы</p>
                    )}
                  </div>
                </div>
                <Dialog open={editDialogs.experience} onOpenChange={(open) => setEditDialogs({ ...editDialogs, experience: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark max-w-2xl">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать опыт работы</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Опыт работы</Label>
                        <BadgeSelector
                          options={experienceRanges}
                          selected={formData.experience ? [formData.experience] : []}
                          onChange={(selected) => setFormData({ experience: selected[0] || '' })}
                          maxSelections={1}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Текущая позиция</Label>
                        <BadgeSelector
                          options={positions}
                          selected={formData.currentPosition ? [formData.currentPosition] : []}
                          onChange={(selected) => setFormData({ currentPosition: selected[0] || '' })}
                          maxSelections={1}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Желаемая позиция</Label>
                        <BadgeSelector
                          options={positions}
                          selected={formData.desiredPosition ? [formData.desiredPosition] : []}
                          onChange={(selected) => setFormData({ desiredPosition: selected[0] || '' })}
                          maxSelections={1}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Разряд</Label>
                        <BadgeSelector
                          options={ranks}
                          selected={formData.rank ? [formData.rank] : []}
                          onChange={(selected) => setFormData({ rank: selected[0] || '' })}
                          maxSelections={1}
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, experience: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, experience: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>

              {/* Образование */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <GraduationCap className="w-5 h-5" />
                    Образование
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.education ? (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('education').bg,
                          color: getCharacteristicColor('education').text
                        }}
                      >
                        {getLabel(formData.education, educationLevels)}
                      </div>
                    ) : (
                      <p className="text-muted-foreground dark:text-gray-400 italic">Добавьте образование</p>
                    )}
                  </div>
                </div>
                <Dialog open={editDialogs.education} onOpenChange={(open) => setEditDialogs({ ...editDialogs, education: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать образование</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Выберите уровень образования</Label>
                        <BadgeSelector
                          options={educationLevels}
                          selected={formData.education ? [formData.education] : []}
                          onChange={(selected) => setFormData({ education: selected[0] || '' })}
                          maxSelections={1}
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, education: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, education: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>

              {/* Специализация */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <Award className="w-5 h-5" />
                    Специализация
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.cuisines && formData.cuisines.length > 0 ? (
                      formData.cuisines.map((cuisine) => {
                        const color = getCharacteristicColor('specialization')
                        return (
                          <div
                            key={cuisine}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: color.bg, color: color.text }}
                          >
                            {getLabel(cuisine, cuisines)}
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-muted-foreground dark:text-gray-400 italic">Добавьте специализацию</p>
                    )}
                  </div>
                </div>
                <Dialog open={editDialogs.specialization} onOpenChange={(open) => setEditDialogs({ ...editDialogs, specialization: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать специализацию</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Выберите специализации</Label>
                        <BadgeSelector
                          options={cuisines}
                          selected={formData.cuisines || []}
                          onChange={(selected) => setFormData({ cuisines: selected })}
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, specialization: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, specialization: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>

              {/* Предпочтения */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <Target className="w-5 h-5" />
                    Предпочтения
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.preferredVenueFormat && (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: getCharacteristicColor('venueFormat').bg,
                          color: getCharacteristicColor('venueFormat').text
                        }}
                      >
                        {getLabel(formData.preferredVenueFormat, venueFormats)}
                      </div>
                    )}
                    {formData.salaryExpectation && (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
                        style={{ 
                          backgroundColor: getCharacteristicColor('salary').bg,
                          color: getCharacteristicColor('salary').text
                        }}
                      >
                        <DollarSign className="w-3 h-3" />
                        {getLabel(formData.salaryExpectation, salaryRanges)}
                      </div>
                    )}
                    {!formData.preferredVenueFormat && !formData.salaryExpectation && (
                      <p className="text-muted-foreground dark:text-gray-400 italic">Добавьте предпочтения</p>
                    )}
                  </div>
                </div>
                <Dialog open={editDialogs.preferences} onOpenChange={(open) => setEditDialogs({ ...editDialogs, preferences: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать предпочтения</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Формат заведения</Label>
                        <BadgeSelector
                          options={venueFormats}
                          selected={formData.preferredVenueFormat ? [formData.preferredVenueFormat] : []}
                          onChange={(selected) => setFormData({ preferredVenueFormat: selected[0] || '' })}
                          maxSelections={1}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Ожидаемая зарплата</Label>
                        <BadgeSelector
                          options={salaryRanges}
                          selected={formData.salaryExpectation ? [formData.salaryExpectation] : []}
                          onChange={(selected) => setFormData({ salaryExpectation: selected[0] || '' })}
                          maxSelections={1}
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, preferences: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, preferences: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>

              {/* Соцсети */}
              <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 relative">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center gap-4">
                    <Globe className="w-5 h-5" />
                    Соцсети
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.instagram && (
                      <a 
                        href={formData.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        style={{ 
                          backgroundColor: getCharacteristicColor('city').bg,
                          color: getCharacteristicColor('city').text
                        }}
                      >
                        <Instagram className="w-3 h-3" />
                        Instagram
                      </a>
                    )}
                    {formData.telegram && (
                      <a 
                        href={formData.telegram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        style={{ 
                          backgroundColor: getCharacteristicColor('city').bg,
                          color: getCharacteristicColor('city').text
                        }}
                      >
                        <Send className="w-3 h-3" />
                        Telegram
                      </a>
                    )}
                    {formData.portfolio && (
                      <a 
                        href={formData.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        style={{ 
                          backgroundColor: getCharacteristicColor('city').bg,
                          color: getCharacteristicColor('city').text
                        }}
                      >
                        <Globe className="w-3 h-3" />
                        Портфолио
                      </a>
                    )}
                    {!formData.instagram && !formData.telegram && !formData.portfolio && (
                      <p className="text-muted-foreground dark:text-gray-400 italic">Добавьте ссылки на соцсети</p>
                    )}
                  </div>
                </div>
                <Dialog open={editDialogs.social} onOpenChange={(open) => setEditDialogs({ ...editDialogs, social: open })}>
                  <DialogTrigger asChild>
                    <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-[#F97316] hover:border-[#F97316] transition-colors group">
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-dark">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl mb-2">Редактировать соцсети</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Instagram</Label>
                        <AnimatedInput
                          value={formData.instagram || ''}
                          onChange={(e) => setFormData({ instagram: e.target.value })}
                          placeholder="https://instagram.com/username"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Telegram</Label>
                        <AnimatedInput
                          value={formData.telegram || ''}
                          onChange={(e) => setFormData({ telegram: e.target.value })}
                          placeholder="https://t.me/username"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Портфолио</Label>
                        <AnimatedInput
                          value={formData.portfolio || ''}
                          onChange={(e) => setFormData({ portfolio: e.target.value })}
                          placeholder="https://portfolio.com"
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ShinyButton variant="outline" onClick={() => setEditDialogs({ ...editDialogs, social: false })}>
                          Отмена
                        </ShinyButton>
                        <ShinyButton onClick={() => setEditDialogs({ ...editDialogs, social: false })}>
                          Сохранить
                        </ShinyButton>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </AnimatedCard>
            </TabsContent>

            {/* Активность Tab */}
            <TabsContent value="activity" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Статистика и аналитика */}
                  <ProfileAnalytics formData={formData} />
                  
                  {/* Прогресс навыков */}
                  <SkillsProgress skills={[
                    { name: 'Управление кухней', level: 85 },
                    { name: 'Работа с командой', level: 75 },
                    { name: 'Меню-планирование', level: 90 },
                  ]} />
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  {/* Завершенность профиля */}
                  <ProfileCompleteness formData={formData} />
                  
                  {/* Рекомендации */}
                  <ProfileTips tips={[
                    ...(!formData.extendedQuestionnaire ? [{
                      id: 'extended-questionnaire',
                      type: 'hot' as const,
                      title: 'Заполните расширенную анкету',
                      description: 'Расширенная анкета поможет работодателям лучше понять ваши навыки, опыт и предпочтения. Это увеличит ваши шансы найти подходящую работу.',
                      impact: 'увеличит количество совпадений на 45%',
                      action: {
                        label: 'Заполнить анкету',
                        onClick: () => setIsExtendedQuestionnaireOpen(true),
                      },
                    }] : []),
                    {
                      id: '1',
                      type: 'recommendation',
                      title: 'Заполните раздел "О себе"',
                      description: 'Добавьте информацию о себе для лучшего представления',
                      action: {
                        label: 'Заполнить',
                        onClick: () => setActiveTab('about'),
                      },
                    },
                  ]} />
                </div>
              </div>
            </TabsContent>

            {/* Микроблог Tab */}
            <TabsContent value="blog" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold dark:text-white">Микроблог</h2>
                  {posts.length > 0 && (
                    <Dialog open={isPortfolioDialogOpen} onOpenChange={setIsPortfolioDialogOpen}>
                      <DialogTrigger asChild>
                        <ShinyButton size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Создать пост
                        </ShinyButton>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark">
                        <DialogHeader>
                          <DialogTitle>Создать пост</DialogTitle>
                          <DialogDescription>
                            Создайте новый пост для вашего микроблога
                          </DialogDescription>
                        </DialogHeader>
                        <PortfolioPostForm
                          onSubmit={handleAddPortfolioPost}
                          onCancel={() => setIsPortfolioDialogOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {posts.length > 0 ? (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <PortfolioPostCard key={post.id} post={post} showActions={true} />
                    ))}
                  </div>
                ) : (
                  <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground dark:text-gray-400 mb-4">Пока нет постов в микроблоге</p>
                      <ShinyButton onClick={() => setIsPortfolioDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Создать первый пост
                      </ShinyButton>
                    </div>
                  </AnimatedCard>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

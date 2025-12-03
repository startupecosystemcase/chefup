'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { HoverBorderGradient } from '@/components/magicui/hover-border-gradient'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuthStore, useOnboardingStore, usePortfolioStore, useEmployerJobsStore } from '@/stores/useOnboardingStore'
import { PortfolioPostForm } from '@/components/PortfolioPostForm'
import { PortfolioPostCard } from '@/components/PortfolioPostCard'
import { Plus, Crown, Share2, Instagram, Send, Facebook, Linkedin, Globe, Youtube, CheckCircle2, BookOpen, Users, Camera, UserCircle as AvatarIcon, User, Sparkles, ChefHat } from 'lucide-react'
import { AvatarImage } from '@/components/ui/avatar'
import { ProfileAnalytics } from '@/components/ProfileAnalytics'
import { ProfileCompleteness } from '@/components/ProfileCompleteness'
import { ProfileTips } from '@/components/ProfileTips'
import { SkillsProgress } from '@/components/SkillsProgress'
import type { PortfolioPost } from '@/types/portfolio.types'
import {
  cities,
  ageRanges,
  experienceRanges,
  positions,
  educationLevels,
  ranks,
  cuisines,
  goals,
} from '@/lib/data'
import { getRecommendedSkills } from '@/lib/recommendations'

export default function DashboardPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const formData = useOnboardingStore((state) => state.formData)
  const setFormData = useOnboardingStore((state) => state.setFormData)
  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus)
  const { posts, socialLinks, addPost, updatePost, deletePost, setSocialLinks } = usePortfolioStore()
  const [isPortfolioDialogOpen, setIsPortfolioDialogOpen] = useState(false)
  const [isSocialLinksDialogOpen, setIsSocialLinksDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<PortfolioPost | null>(null)
  const [tempSocialLinks, setTempSocialLinks] = useState(socialLinks)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
  }, [userId, router])

  const getLabel = (value: string, options: readonly { readonly value: string; readonly label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value
  }

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${userId}`
    navigator.clipboard.writeText(profileUrl)
    toast.success('Ссылка на профиль скопирована!')
  }

  useEffect(() => {
    setTempSocialLinks(socialLinks)
  }, [socialLinks])

  const handleAddPortfolioPost = (postData: Omit<PortfolioPost, 'id' | 'createdAt'>) => {
    addPost(postData)
    setIsPortfolioDialogOpen(false)
    setEditingPost(null)
    toast.success('Пост добавлен в портфолио!')
  }

  const handleUpdatePortfolioPost = (postData: Omit<PortfolioPost, 'id' | 'createdAt'>) => {
    if (editingPost) {
      updatePost(editingPost.id, postData)
      setIsPortfolioDialogOpen(false)
      setEditingPost(null)
      toast.success('Пост обновлен!')
    }
  }

  const handleDeletePortfolioPost = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот пост?')) {
      deletePost(id)
      toast.success('Пост удален!')
    }
  }

  const handleEditPortfolioPost = (post: PortfolioPost) => {
    setEditingPost(post)
    setIsPortfolioDialogOpen(true)
  }

  const handleSaveSocialLinks = () => {
    setSocialLinks(tempSocialLinks)
    setIsSocialLinksDialogOpen(false)
    toast.success('Ссылки на соцсети сохранены!')
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Пожалуйста, выберите изображение')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 5 МБ')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string
      setFormData({ ...formData, avatarUrl: imageUrl })
      setIsAvatarDialogOpen(false)
      toast.success('Фото профиля обновлено!')
    }
    reader.readAsDataURL(file)
  }

  if (!userId) {
    return null
  }

  // Показываем разный контент в зависимости от роли
  if (userRole === 'employer') {
    const { jobs } = useEmployerJobsStore()
    const employerJobs = jobs.filter((job) => job.employerId === userId)
    const pendingJobs = employerJobs.filter((job) => job.status === 'pending' || job.status === 'moderating')
    const approvedJobs = employerJobs.filter((job) => job.status === 'approved')

    return (
      <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-8 dark:text-white">Личный кабинет работодателя</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-8">
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Всего вакансий</h3>
                <div className="text-2xl md:text-3xl font-bold dark:text-white">{employerJobs.length}</div>
              </div>
            </AnimatedCard>
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">На модерации</h3>
                <div className="text-2xl md:text-3xl font-bold text-primary">{pendingJobs.length}</div>
              </div>
            </AnimatedCard>
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Одобрено</h3>
                <div className="text-2xl md:text-3xl font-bold text-green-600">{approvedJobs.length}</div>
              </div>
            </AnimatedCard>
          </div>

          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">Быстрые действия</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Управляйте вакансиями и просматривайте кандидатов
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShinyButton onClick={() => router.push('/dashboard/jobs/create')} className="h-auto py-6 justify-start">
                  <div className="text-left">
                    <div className="font-semibold mb-1">Создать вакансию</div>
                    <div className="text-sm text-muted-foreground">Подать новую вакансию на модерацию</div>
                  </div>
                </ShinyButton>
                <ShinyButton variant="outline" onClick={() => router.push('/dashboard/jobs/history')} className="h-auto py-6 justify-start">
                  <div className="text-left">
                    <div className="font-semibold mb-1">История вакансий</div>
                    <div className="text-sm text-muted-foreground">Просмотр всех созданных вакансий</div>
                  </div>
                </ShinyButton>
                <ShinyButton variant="outline" onClick={() => router.push('/dashboard/candidates')} className="h-auto py-6 justify-start">
                  <div className="text-left">
                    <div className="font-semibold mb-1">Кандидаты</div>
                    <div className="text-sm text-muted-foreground">Просмотр доступных кандидатов</div>
                  </div>
                </ShinyButton>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    )
  }

  if (userRole === 'moderator') {
    const { jobs } = useEmployerJobsStore()
    const pendingJobs = jobs.filter((job) => job.status === 'pending' || job.status === 'moderating')
    const approvedJobs = jobs.filter((job) => job.status === 'approved')

    return (
      <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-8 dark:text-white">Панель модератора</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-8">
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Вакансии на модерации</h3>
                <div className="text-2xl md:text-3xl font-bold text-primary">{pendingJobs.length}</div>
              </div>
            </AnimatedCard>
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Одобрено вакансий</h3>
                <div className="text-2xl md:text-3xl font-bold text-green-600">{approvedJobs.length}</div>
              </div>
            </AnimatedCard>
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Всего вакансий</h3>
                <div className="text-2xl md:text-3xl font-bold dark:text-white">{jobs.length}</div>
              </div>
            </AnimatedCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <AnimatedCard className="bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Быстрые действия</h3>
                <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Основные функции модерации</p>
                <div className="space-y-4">
                  <ShinyButton
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/dashboard/moderate/jobs')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Проверка вакансий
                    {pendingJobs.length > 0 && (
                      <AnimatedBadge variant="secondary" className="ml-auto">
                        {pendingJobs.length}
                      </AnimatedBadge>
                    )}
                  </ShinyButton>
                  <ShinyButton
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/dashboard/moderate/profiles')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Модерация профилей
                  </ShinyButton>
                  <ShinyButton
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/dashboard/moderate/education')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Модерация образования
                  </ShinyButton>
                  <ShinyButton
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/dashboard/moderate/users')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Управление пользователями
                  </ShinyButton>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-4 ring-primary/10 shadow-lg">
                <AvatarImage src={formData.avatarUrl} alt={`${formData.firstName} ${formData.lastName}`} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-[#FB923C]/20 flex items-center justify-center">
                  <ChefHat className="w-10 h-10 md:w-12 md:h-12 text-[#F97316]" />
                </AvatarFallback>
              </Avatar>
              <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsAvatarDialogOpen(true)
                    }}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Загрузить фото профиля</DialogTitle>
                    <DialogDescription>
                      Выберите изображение для вашего профиля (макс. 5 МБ)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <AnimatedInput
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="cursor-pointer"
                    />
                    {formData.avatarUrl && (
                      <div className="relative">
                        <img
                          src={formData.avatarUrl}
                          alt="Предпросмотр"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold dark:text-white">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground dark:text-gray-400">ID: {userId.slice(0, 8)}</p>
            </div>
          </div>
          
          {/* Статус подписки */}
          <div className="flex items-center gap-4 md:gap-5">
            <AnimatedBadge variant={subscriptionStatus === 'PRO' ? 'default' : 'outline'} className="text-sm px-4 py-2">
              {subscriptionStatus === 'PRO' ? (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  PRO
                </>
              ) : (
                <>
                  Статус аккаунта: BASIC
                </>
              )}
            </AnimatedBadge>
          </div>
        </div>

        {/* Прогресс заполненности профиля */}
        {userRole === 'applicant' && (
          <>
            <AnimatedCard className="mb-8 md:mb-12 glass shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_8px_-1px_rgba(0,0,0,0.04)] bg-white dark:bg-dark/50">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Заполненность профиля</h3>
                <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Чем больше информации, тем выше ваши шансы найти работу</p>
                <ProfileCompleteness formData={formData} />
              </div>
            </AnimatedCard>

          </>
        )}

        {/* Аналитика профиля и рекомендации (только для соискателей) */}
        {userRole === 'applicant' && (
          <div className="mb-8 md:mb-12 space-y-6 md:space-y-8">
            <ProfileAnalytics formData={formData} />
            
            {/* Персональные рекомендации на основе ChefUp AI */}
            <AnimatedCard className="glass shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_8px_-1px_rgba(0,0,0,0.04)] bg-white dark:bg-dark/50">
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Улучшите свой профиль и получите больше совпадений</p>
                <ProfileTips
                  tips={(() => {
                    const currentPosition = formData.desiredPosition || formData.currentPosition
                    const recommendedSkills = getRecommendedSkills(currentPosition, formData.additionalSkills || [])
                    const tips: any[] = []
                    
                    // Рекомендации по навыкам на основе профессии
                    if (recommendedSkills.length > 0) {
                      recommendedSkills.slice(0, 3).forEach((skill, idx) => {
                        tips.push({
                          id: `skill-${idx}`,
                          type: 'hot' as const,
                          title: `Добавьте навык "${skill}"`,
                          description: 'Этот навык часто требуется для вашей профессии и повысит вашу релевантность',
                          impact: 'Увеличит количество совпадений на 20-30%',
                          action: {
                            label: 'Добавить навык',
                            onClick: () => router.push('/onboarding?step=3'),
                            onboardingStep: 3,
                          },
                        })
                      })
                    }
                    
                    // Остальные рекомендации
                    if (!formData.about) {
                      tips.push({
                        id: 'about',
                        type: 'recommendation' as const,
                        title: 'Заполните раздел "О себе"',
                        description: 'Расскажите о себе работодателям - это повысит ваши шансы',
                        action: {
                          label: 'Заполнить',
                          onClick: () => router.push('/onboarding?step=5'),
                          onboardingStep: 5,
                        },
                      })
                    }
                    
                    if (!formData.avatarUrl) {
                      tips.push({
                        id: 'avatar',
                        type: 'recommendation' as const,
                        title: 'Добавьте фото профиля',
                        description: 'Профили с фото получают в 2 раза больше просмотров',
                        action: {
                          label: 'Добавить фото',
                          onClick: () => setIsAvatarDialogOpen(true),
                        },
                      })
                    }
                    
                    if (!formData.certificates || formData.certificates.length === 0) {
                      tips.push({
                        id: 'certificate',
                        type: 'recommendation' as const,
                        title: 'Добавьте сертификаты',
                        description: 'Сертификаты повышают вашу релевантность для работодателей',
                        impact: 'Повысит релевантность на 15%',
                        action: {
                          label: 'Добавить сертификат',
                          onClick: () => router.push('/onboarding?step=3'),
                          onboardingStep: 3,
                        },
                      })
                    }
                    
                    return tips.slice(0, 5) // Максимум 5 рекомендаций
                  })()}
                />
              </div>
            </AnimatedCard>
          </div>
        )}

          {/* Вакансии */}
          <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Вакансии</h3>
              <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Подходящие вакансии для вас</p>
              <p className="text-center text-muted-foreground dark:text-gray-400">Скоро...</p>
            </div>
          </AnimatedCard>

        {/* Микроблог / Портфолио */}
        <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold dark:text-white">Микроблог / Портфолио</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Публикуйте свои работы, достижения и делитесь опытом</p>
              </div>
              {posts.length > 0 && (
                <Dialog open={isPortfolioDialogOpen} onOpenChange={(open) => {
                  setIsPortfolioDialogOpen(open)
                  if (!open) setEditingPost(null)
                }}>
                  <DialogTrigger asChild>
                    <ShinyButton variant="outline" size="icon" className="h-9 w-9">
                      <Plus className="w-4 h-4" />
                    </ShinyButton>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Новый пост в портфолио</DialogTitle>
                      <DialogDescription>
                        Добавьте заголовок, описание, фотографии, видео и ссылки
                      </DialogDescription>
                    </DialogHeader>
                    <PortfolioPostForm
                      onSubmit={handleAddPortfolioPost}
                      onCancel={() => {
                        setIsPortfolioDialogOpen(false)
                        setEditingPost(null)
                      }}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          <div className="p-6 pt-0">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-6">
                  У вас пока нет постов в микроблоге. Добавьте первый пост!
                </p>
                <Dialog open={isPortfolioDialogOpen} onOpenChange={(open) => {
                  setIsPortfolioDialogOpen(open)
                  if (!open) setEditingPost(null)
                }}>
                  <DialogTrigger asChild>
                    <ShinyButton size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Создать первый пост
                    </ShinyButton>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Новый пост в портфолио</DialogTitle>
                      <DialogDescription>
                        Добавьте заголовок, описание, фотографии, видео и ссылки
                      </DialogDescription>
                    </DialogHeader>
                    <PortfolioPostForm
                      onSubmit={handleAddPortfolioPost}
                      onCancel={() => {
                        setIsPortfolioDialogOpen(false)
                        setEditingPost(null)
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <PortfolioPostCard
                    key={post.id}
                    post={post}
                    onEdit={handleEditPortfolioPost}
                    onDelete={handleDeletePortfolioPost}
                    showActions={true}
                  />
                ))}
              </div>
            )}
          </div>
        </AnimatedCard>

        {/* Ссылки на соцсети */}
        <AnimatedCard className="mb-10 md:mb-12 glass bg-white dark:bg-dark/50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_8px_-1px_rgba(0,0,0,0.04)]">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold dark:text-white">Ссылки на соцсети</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Добавьте ссылки на ваши социальные сети</p>
              </div>
              <Dialog open={isSocialLinksDialogOpen} onOpenChange={setIsSocialLinksDialogOpen}>
                <DialogTrigger asChild>
                  <ShinyButton variant="outline">
                    <Plus className="w-5 h-5 mr-2" />
                    Редактировать
                  </ShinyButton>
                </DialogTrigger>
                <DialogContent className="glass modal-shadow">
                  <DialogHeader>
                    <DialogTitle>Ссылки на соцсети</DialogTitle>
                    <DialogDescription>
                      Добавьте ссылки на ваши профили в социальных сетях
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <label className="text-base font-medium mb-3 block flex items-center gap-3">
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </label>
                      <AnimatedInput
                        value={tempSocialLinks.instagram || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, instagram: e.target.value })}
                        placeholder="https://instagram.com/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4 dark:text-gray-300">
                        <Send className="w-4 h-4" />
                        Telegram
                      </label>
                      <AnimatedInput
                        value={tempSocialLinks.telegram || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, telegram: e.target.value })}
                        placeholder="https://t.me/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4 dark:text-gray-300">
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </label>
                      <AnimatedInput
                        value={tempSocialLinks.facebook || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, facebook: e.target.value })}
                        placeholder="https://facebook.com/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4 dark:text-gray-300">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </label>
                      <AnimatedInput
                        value={tempSocialLinks.linkedin || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4 dark:text-gray-300">
                        <Youtube className="w-4 h-4" />
                        YouTube
                      </label>
                      <AnimatedInput
                        value={tempSocialLinks.youtube || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, youtube: e.target.value })}
                        placeholder="https://youtube.com/@username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4 dark:text-gray-300">
                        <Globe className="w-4 h-4" />
                        Веб-сайт
                      </label>
                      <AnimatedInput
                        value={tempSocialLinks.website || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, website: e.target.value })}
                        placeholder="https://example.com"
                        type="url"
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <ShinyButton variant="outline" onClick={() => setIsSocialLinksDialogOpen(false)} className="flex-1">
                        Отмена
                      </ShinyButton>
                      <ShinyButton onClick={handleSaveSocialLinks} className="flex-1">
                        Сохранить
                      </ShinyButton>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="flex flex-wrap gap-6">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="font-medium">Instagram</span>
                </a>
              )}
              {socialLinks.telegram && (
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
                >
                  <Send className="w-6 h-6" />
                  <span className="font-medium">Telegram</span>
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="font-medium">Facebook</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
                >
                  <Youtube className="w-6 h-6" />
                  <span className="font-medium">YouTube</span>
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
                >
                  <Globe className="w-6 h-6" />
                  <span className="font-medium">Веб-сайт</span>
                </a>
              )}
              {Object.keys(socialLinks).length === 0 && (
                <p className="text-muted-foreground dark:text-gray-400">Ссылки на соцсети не добавлены</p>
              )}
            </div>
          </div>
        </AnimatedCard>

        {/* Поделиться профилем */}
        <AnimatedCard className="bg-white dark:bg-dark/50">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Поделиться профилем
            </h3>
            <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">Поделитесь ссылкой на ваш профиль</p>
            <ShinyButton onClick={handleShareProfile} className="w-full sm:w-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Копировать ссылку
            </ShinyButton>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}


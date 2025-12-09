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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { useAuthStore, useOnboardingStore, usePortfolioStore, useEmployerJobsStore, useEmployerOnboardingStore } from '@/stores/useOnboardingStore'
import { PortfolioPostForm } from '@/components/PortfolioPostForm'
import { PortfolioPostCard } from '@/components/PortfolioPostCard'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
import { Plus, Crown, Share2, Instagram, Send, Facebook, Linkedin, Globe, Youtube, CheckCircle2, BookOpen, Users, Camera, UserCircle as AvatarIcon, User, Sparkles, ChefHat, Calendar, MapPin, Clock, ArrowRight, TrendingUp, Newspaper, DollarSign, Briefcase, Heart, Building2, Edit, Settings, Briefcase as BriefcaseIcon } from 'lucide-react'
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
import { mockJobs } from '@/lib/mockData'
import { mockEvents } from '@/lib/mockEvents'
import { mockEducationItems } from '@/lib/mockEducation'
import { getRecommendedJobs } from '@/lib/jobRecommendations'
import { useEventsStore } from '@/stores/useOnboardingStore'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const username = useAuthStore((state) => state.username)
  const formData = useOnboardingStore((state) => state.formData)
  const setFormData = useOnboardingStore((state) => state.setFormData)
  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus)
  
  // Mock данные для статистики (в реальном приложении будут из API)
  const [subscribersCount, setSubscribersCount] = useState(0)
  const [likesCount, setLikesCount] = useState(0)
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
    const { formData: employerFormData } = useEmployerOnboardingStore()
    const employerJobs = jobs.filter((job) => job.employerId === userId)
    const pendingJobs = employerJobs.filter((job) => job.status === 'pending' || job.status === 'moderating')
    const approvedJobs = employerJobs.filter((job) => job.status === 'approved')

    return (
      <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-8 dark:text-white">Личный кабинет работодателя</h1>
          
          {/* Карточка компании */}
          <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Логотип / Аватар */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-primary/20 to-[#FB923C]/20 flex items-center justify-center">
                    {employerFormData?.companyLogo ? (
                      <img src={employerFormData.companyLogo} alt={employerFormData.companyName || 'Company'} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      <Building2 className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                    )}
                  </div>
                </div>
                
                {/* Информация о компании */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold dark:text-white mb-2 truncate">
                        {employerFormData?.companyName || 'Название компании'}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
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
                      {employerFormData?.companyDescription && (
                        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-1">
                          {employerFormData.companyDescription}
                        </p>
                      )}
                      
                      {/* Статистика */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <BriefcaseIcon className="w-4 h-4" />
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
                    
                    {/* Кнопки */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <ShinyButton 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2 whitespace-nowrap"
                        onClick={() => router.push('/dashboard/profile')}
                      >
                        <Edit className="w-4 h-4 flex-shrink-0" />
                        <span>Редактировать профиль</span>
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

          {/* Блок быстрых действий - упрощённый */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <ShinyButton 
              onClick={() => router.push('/dashboard/jobs/create')} 
              className="h-auto min-h-[120px] p-6 flex items-center gap-4 active:scale-100 hover:scale-100 transition-colors"
            >
              <div className="flex-shrink-0">
                <Plus className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="text-left flex-1">
                <div className="text-lg md:text-xl font-bold mb-1">Создать вакансию</div>
                <div className="text-sm font-medium text-white/80">Подать новую вакансию на модерацию</div>
              </div>
            </ShinyButton>
            <ShinyButton 
              variant="outline" 
              onClick={() => router.push('/dashboard/jobs')} 
              className="h-auto min-h-[120px] p-6 flex items-center gap-4 active:scale-100 hover:scale-100 transition-colors"
            >
              <div className="flex-shrink-0">
                <BriefcaseIcon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="text-left flex-1">
                <div className="text-lg md:text-xl font-bold mb-1">Вакансии</div>
                <div className="text-sm font-medium text-muted-foreground">Просмотр всех созданных вакансий</div>
              </div>
            </ShinyButton>
          </div>
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

  // Данные для ленты
  const { events } = useEventsStore()
  const upcomingEvents = [...mockEvents, ...events]
    .filter((event) => event.status === 'approved')
    .slice(0, 3)
  
  const popularPrograms = mockEducationItems
    .filter((item) => item.status === 'approved')
    .slice(0, 3)
  
  const recommendedJobs = userRole === 'applicant' 
    ? getRecommendedJobs(mockJobs, formData).slice(0, 6).map(r => r.job)
    : mockJobs.slice(0, 6)

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full bg-gray-50 dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full space-y-8">
        {/* Верхняя плашка профиля */}
        {userRole === 'applicant' && (
          <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-2xl border border-gray-200/50 dark:border-border/50">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Аватар */}
                <Avatar className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0">
                <AvatarImage src={formData.avatarUrl} alt={`${formData.firstName} ${formData.lastName}`} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-[#FB923C]/20 text-2xl md:text-3xl">
                    {formData.firstName?.[0] || 'U'}
                    {formData.lastName?.[0] || ''}
                </AvatarFallback>
              </Avatar>
                
                {/* Информация */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* ФИО */}
                      <h1 className="text-xl md:text-2xl font-bold dark:text-white mb-2 truncate">
                        {formData.firstName || ''} {formData.lastName || ''}
                      </h1>
                      
                      {/* Специализация, Город, ID/Username */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {(formData.desiredPosition || formData.currentPosition) && (
                          <AnimatedBadge variant="outline" className="text-xs">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {getLabel(formData.desiredPosition || formData.currentPosition || '', positions)}
                          </AnimatedBadge>
                        )}
                        {formData.city && (
                          <AnimatedBadge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {getLabel(formData.city, cities)}
                          </AnimatedBadge>
                        )}
                        {username && (
                          <AnimatedBadge variant="outline" className="text-xs">
                            <User className="w-3 h-3 mr-1" />
                            @{username}
                          </AnimatedBadge>
                        )}
                        {userId && (
                          <span className="text-xs text-muted-foreground dark:text-gray-400 font-mono break-all">
                            ID: {userId}
                          </span>
                        )}
                      </div>
                      
                      {/* Статистика */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                        {subscribersCount > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{subscribersCount} подписчиков</span>
                          </div>
                        )}
                        {likesCount > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4" />
                            <span>{likesCount} лайков</span>
                      </div>
                    )}
            </div>
          </div>
          
                    {/* Кнопка перехода в профиль */}
                    <ShinyButton 
                      onClick={() => router.push('/dashboard/profile')}
                      className="w-full md:w-auto whitespace-nowrap flex items-center gap-2"
                    >
                      <span>Перейти в мой профиль</span>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </ShinyButton>
          </div>
        </div>
              </div>
              </div>
            </AnimatedCard>
        )}

        {/* Вакансии для вас */}
        {userRole === 'applicant' && recommendedJobs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Вакансии для вас
              </h2>
              <Link href="/dashboard/jobs">
                <ShinyButton variant="ghost" size="sm" className="text-sm">
                  Все вакансии
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ShinyButton>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.slice(0, 6).map((job) => (
                <AnimatedCard key={job.id} className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 hover:shadow-md transition-shadow">
              <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <AnimatedBadge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.city}
                      </AnimatedBadge>
                      <AnimatedBadge variant="outline" className="text-xs">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {job.position}
                      </AnimatedBadge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 mb-4">
                      {job.description}
                    </p>
                    <Link href={`/dashboard/jobs/${job.id}`}>
                      <ShinyButton variant="outline" size="sm" className="w-full">
                        Подробнее
                      </ShinyButton>
                    </Link>
              </div>
            </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* Предстоящие мероприятия */}
        {upcomingEvents.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Предстоящие мероприятия
              </h2>
              <Link href="/dashboard/community">
                <ShinyButton variant="ghost" size="sm" className="text-sm">
                  Все мероприятия
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ShinyButton>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <AnimatedCard key={event.id} className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 hover:shadow-md transition-shadow">
          <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(event.date), 'd MMMM yyyy', { locale: ru })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      {event.price > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                          <DollarSign className="w-4 h-4" />
                          {event.price} KZT
                        </div>
                      )}
              </div>
                    <Link href={`/dashboard/community/${event.id}`}>
                      <ShinyButton variant="outline" size="sm" className="w-full">
                        Подробнее
                    </ShinyButton>
                    </Link>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* Популярные программы */}
        {popularPrograms.length > 0 && (
              <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Популярные программы
              </h2>
              <Link href="/dashboard/practice">
                <ShinyButton variant="ghost" size="sm" className="text-sm">
                  Все программы
                  <ArrowRight className="w-4 h-4 ml-2" />
                  </ShinyButton>
              </Link>
                    </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularPrograms.map((program) => (
                <AnimatedCard key={program.id} className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50 hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">{program.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                    </div>
                      {program.price > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                          <DollarSign className="w-4 h-4" />
                          {program.price} KZT
                    </div>
                      )}
                    </div>
                    <Link href={`/dashboard/practice/${program.id}`}>
                      <ShinyButton variant="outline" size="sm" className="w-full">
                        Подробнее
                      </ShinyButton>
                    </Link>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

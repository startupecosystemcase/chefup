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
import { useAuthStore, useOnboardingStore, usePortfolioStore, useEmployerJobsStore } from '@/stores/useOnboardingStore'
import { PortfolioPostForm } from '@/components/PortfolioPostForm'
import { PortfolioPostCard } from '@/components/PortfolioPostCard'
import { StaggerAnimation, StaggerItem } from '@/components/magicui/stagger-animation'
import { Plus, Crown, Share2, Instagram, Send, Facebook, Linkedin, Globe, Youtube, CheckCircle2, BookOpen, Users, Camera, UserCircle as AvatarIcon, User, Sparkles, ChefHat, Calendar, MapPin, Clock, ArrowRight, TrendingUp, Newspaper, DollarSign, Briefcase } from 'lucide-react'
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
        {/* Баннер / Приветствие */}
        <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-2xl border border-gray-200/50 dark:border-border/50">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20">
                <AvatarImage src={formData.avatarUrl} alt={`${formData.firstName} ${formData.lastName}`} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-[#FB923C]/20">
                  <ChefHat className="w-8 h-8 md:w-10 md:h-10 text-[#F97316]" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">
                  Добро пожаловать, {formData.firstName || 'Пользователь'}!
                </h1>
                <p className="text-sm md:text-base text-muted-foreground dark:text-gray-400 mt-1">
                  Ваша персональная лента обновлений и рекомендаций
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Рекомендовано для вас */}
        {userRole === 'applicant' && recommendedJobs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Рекомендовано для вас
              </h2>
              <Link href="/dashboard/jobs">
                <ShinyButton variant="ghost" size="sm" className="text-sm">
                  Все вакансии
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ShinyButton>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.slice(0, 3).map((job) => (
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

        {/* Вакансии */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Вакансии
            </h2>
            <Link href="/dashboard/jobs">
              <ShinyButton variant="ghost" size="sm" className="text-sm">
                Все вакансии
                <ArrowRight className="w-4 h-4 ml-2" />
              </ShinyButton>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 6).map((job) => (
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

        {/* Старый контент профиля - скрыт, но можно добавить ссылку на профиль */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-border/50">
          <Link href="/dashboard/profile">
            <ShinyButton variant="outline" className="w-full sm:w-auto">
              Перейти в личный кабинет
              <ArrowRight className="w-4 h-4 ml-2" />
            </ShinyButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

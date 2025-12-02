'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuthStore, useOnboardingStore, usePortfolioStore, useEmployerJobsStore } from '@/stores/useOnboardingStore'
import { PortfolioPostForm } from '@/components/PortfolioPostForm'
import { PortfolioPostCard } from '@/components/PortfolioPostCard'
import { Plus, Crown, Share2, Instagram, Send, Facebook, Linkedin, Globe, Youtube, CheckCircle2, BookOpen, Users, Camera, UserCircle as AvatarIcon, User, Sparkles } from 'lucide-react'
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
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-8">Личный кабинет работодателя</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Всего вакансий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{employerJobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">На модерации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-primary">{pendingJobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Одобрено</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-green-600">{approvedJobs.length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Быстрые действия</CardTitle>
                  <CardDescription>
                    Управляйте вакансиями и просматривайте кандидатов
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => router.push('/dashboard/jobs/create')} className="h-auto py-6">
                  <div className="text-left">
                    <div className="font-semibold mb-1">Создать вакансию</div>
                    <div className="text-sm text-muted-foreground">Подать новую вакансию на модерацию</div>
                  </div>
                </Button>
                <Button variant="outline" onClick={() => router.push('/dashboard/jobs/history')} className="h-auto py-6">
                  <div className="text-left">
                    <div className="font-semibold mb-1">История вакансий</div>
                    <div className="text-sm text-muted-foreground">Просмотр всех созданных вакансий</div>
                  </div>
                </Button>
                <Button variant="outline" onClick={() => router.push('/dashboard/candidates')} className="h-auto py-6">
                  <div className="text-left">
                    <div className="font-semibold mb-1">Кандидаты</div>
                    <div className="text-sm text-muted-foreground">Просмотр доступных кандидатов</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (userRole === 'moderator') {
    const { jobs } = useEmployerJobsStore()
    const pendingJobs = jobs.filter((job) => job.status === 'pending' || job.status === 'moderating')
    const approvedJobs = jobs.filter((job) => job.status === 'approved')

    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-8">Панель модератора</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Вакансии на модерации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-primary">{pendingJobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Одобрено вакансий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-green-600">{approvedJobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Всего вакансий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{jobs.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Основные функции модерации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/moderate/jobs')}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Проверка вакансий
                  {pendingJobs.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {pendingJobs.length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/moderate/profiles')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Модерация профилей
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/moderate/education')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Модерация образования
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/moderate/users')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Управление пользователями
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 lg:p-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-4 ring-primary/10 shadow-lg">
                <AvatarImage src={formData.avatarUrl} alt={`${formData.firstName} ${formData.lastName}`} />
                <AvatarFallback className="text-xl md:text-2xl bg-gradient-to-br from-primary/20 to-[#FB923C]/20">
                  {formData.firstName?.[0] || 'U'}
                  {formData.lastName?.[0] || ''}
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
                    <Input
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
              <h1 className="text-lg md:text-2xl font-bold">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">ID: {userId.slice(0, 8)}</p>
            </div>
          </div>
          
          {/* Статус подписки */}
          <div className="flex items-center gap-4 md:gap-5">
            <Badge variant={subscriptionStatus === 'PRO' ? 'default' : 'outline'} className="text-sm px-4 py-2">
              {subscriptionStatus === 'PRO' ? (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  PRO
                </>
              ) : (
                'BASIC'
              )}
            </Badge>
          </div>
        </div>

        {/* Прогресс заполненности профиля */}
        {userRole === 'applicant' && (
          <>
            <Card className="mb-8 md:mb-12 glass">
              <CardHeader>
                <CardTitle>Заполненность профиля</CardTitle>
                <CardDescription>Чем больше информации, тем выше ваши шансы найти работу</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileCompleteness formData={formData} />
              </CardContent>
            </Card>

          </>
        )}

        {/* Аналитика профиля и рекомендации (только для соискателей) */}
        {userRole === 'applicant' && (
          <div className="mb-8 md:mb-12 space-y-8 md:space-y-10">
            <ProfileAnalytics formData={formData} />
            
            {/* Персональные рекомендации на основе ChefUp AI */}
            <Card>
              <CardHeader>
                <CardDescription>Улучшите свой профиль и получите больше совпадений</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileTips
                  tips={[
                    {
                      id: 'tip1',
                      type: 'hot',
                      title: 'Добавьте навыки "Пицца-овен" и "Тестомес"',
                      description: 'Эти навыки часто требуются в вакансиях, подходящих вашему профилю',
                      impact: 'Увеличит количество совпадений на 34%',
                      action: {
                        label: 'Добавить навыки',
                        onClick: () => router.push('/onboarding'),
                        onboardingStep: 3, // Шаг 3 - Специализация и навыки
                      },
                    },
                    {
                      id: 'tip2',
                      type: 'recommendation',
                      title: 'Заполните раздел "О себе"',
                      description: 'Расскажите о себе работодателям - это повысит ваши шансы',
                      action: {
                        label: 'Заполнить',
                        onClick: () => router.push('/onboarding'),
                        onboardingStep: 5, // Шаг 5 - Финал и о себе
                      },
                    },
                    {
                      id: 'tip3',
                      type: 'recommendation',
                      title: 'Добавьте фото профиля',
                      description: 'Профили с фото получают в 2 раза больше просмотров',
                      action: {
                        label: 'Добавить фото',
                        onClick: () => setIsAvatarDialogOpen(true),
                      },
                    },
                    {
                      id: 'tip4',
                      type: 'recommendation',
                      title: 'Добавьте сертификат HACCP',
                      description: 'Сертификаты повышают вашу релевантность для работодателей',
                      impact: 'Повысит релевантность на 15%',
                      action: {
                        label: 'Добавить сертификат',
                        onClick: () => router.push('/onboarding'),
                        onboardingStep: 3, // Шаг 3 - Специализация и навыки
                      },
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        )}

          {/* Моя анкета */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Моя анкета</CardTitle>
                  <CardDescription>Ваши данные и предпочтения</CardDescription>
                </div>
                <Button variant="outline" onClick={() => router.push('/onboarding')}>
                  Редактировать
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Личная информация</h3>
                <div className="grid gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Город: </span>
                    {formData.city && getLabel(formData.city, cities)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Возраст: </span>
                    {formData.age && getLabel(formData.age, ageRanges)}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 font-semibold">Опыт и образование</h3>
                <div className="grid gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Опыт: </span>
                    {formData.experience && getLabel(formData.experience, experienceRanges)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Позиция: </span>
                    {(formData.desiredPosition && getLabel(formData.desiredPosition, positions)) || 
                     (formData.currentPosition && getLabel(formData.currentPosition, positions))}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Образование: </span>
                    {formData.education && getLabel(formData.education, educationLevels)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Разряд: </span>
                    {formData.rank && getLabel(formData.rank, ranks)}
                  </div>
                </div>
              </div>

              <Separator />

              {formData.cuisines && formData.cuisines.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="mb-2 font-semibold">Кухни</h3>
                    <div className="flex flex-wrap gap-4">
                      {formData.cuisines.map((cuisine) => (
                        <Badge key={cuisine} variant="secondary">
                          {getLabel(cuisine, cuisines)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div>
                <h3 className="mb-2 font-semibold">Навыки</h3>
                {((formData.certificates && formData.certificates.length > 0) || 
                  (formData.additionalSkills && formData.additionalSkills.length > 0)) ? (
                  <div className="space-y-4">
                    {formData.additionalSkills && formData.additionalSkills.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Дополнительные навыки</p>
                        <SkillsProgress
                          skills={formData.additionalSkills.map((skill) => ({
                            name: skill,
                            level: 75, // Mock уровень, в реальном приложении будет из данных
                          }))}
                        />
                      </div>
                    )}
                    {formData.certificates && formData.certificates.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Сертификаты</p>
                        <div className="flex flex-wrap gap-4">
                          {formData.certificates.map((cert, idx) => (
                            <Badge key={idx} variant="secondary">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Навыки не указаны</p>
                )}
              </div>

              {formData.goals && formData.goals.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold">Цели</h3>
                  <div className="flex flex-wrap gap-4">
                    {formData.goals.map((goal) => (
                      <Badge key={goal} variant="outline">
                        {getLabel(goal, goals)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.about && (
                <div>
                  <h3 className="mb-2 font-semibold">О себе</h3>
                  <p className="text-sm text-muted-foreground">{formData.about}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Вакансии */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Вакансии</CardTitle>
              <CardDescription>Подходящие вакансии для вас</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Скоро...</p>
            </CardContent>
          </Card>

        {/* Микроблог / Портфолио */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Микроблог / Портфолио</CardTitle>
                <CardDescription>Публикуйте свои работы, достижения и делитесь опытом</CardDescription>
              </div>
              <div className="flex gap-4">
                <Dialog open={isPortfolioDialogOpen} onOpenChange={(open) => {
                  setIsPortfolioDialogOpen(open)
                  if (!open) setEditingPost(null)
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      {editingPost ? 'Редактировать пост' : 'Новый пост'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingPost ? 'Редактировать пост' : 'Новый пост в портфолио'}
                      </DialogTitle>
                      <DialogDescription>
                        Добавьте заголовок, описание, фотографии, видео и ссылки
                      </DialogDescription>
                    </DialogHeader>
                    <PortfolioPostForm
                      onSubmit={editingPost ? handleUpdatePortfolioPost : handleAddPortfolioPost}
                      onCancel={() => {
                        setIsPortfolioDialogOpen(false)
                        setEditingPost(null)
                      }}
                      initialData={editingPost || undefined}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-8">
                  У вас пока нет постов в микроблоге. Добавьте первый пост!
                </p>
                <Button onClick={() => setIsPortfolioDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Создать первый пост
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
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
          </CardContent>
        </Card>

        {/* Ссылки на соцсети */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ссылки на соцсети</CardTitle>
                <CardDescription>Добавьте ссылки на ваши социальные сети</CardDescription>
              </div>
              <Dialog open={isSocialLinksDialogOpen} onOpenChange={setIsSocialLinksDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ссылки на соцсети</DialogTitle>
                    <DialogDescription>
                      Добавьте ссылки на ваши профили в социальных сетях
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4">
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </label>
                      <Input
                        value={tempSocialLinks.instagram || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, instagram: e.target.value })}
                        placeholder="https://instagram.com/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4">
                        <Send className="w-4 h-4" />
                        Telegram
                      </label>
                      <Input
                        value={tempSocialLinks.telegram || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, telegram: e.target.value })}
                        placeholder="https://t.me/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4">
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </label>
                      <Input
                        value={tempSocialLinks.facebook || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, facebook: e.target.value })}
                        placeholder="https://facebook.com/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </label>
                      <Input
                        value={tempSocialLinks.linkedin || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4">
                        <Youtube className="w-4 h-4" />
                        YouTube
                      </label>
                      <Input
                        value={tempSocialLinks.youtube || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, youtube: e.target.value })}
                        placeholder="https://youtube.com/@username"
                        type="url"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-4">
                        <Globe className="w-4 h-4" />
                        Веб-сайт
                      </label>
                      <Input
                        value={tempSocialLinks.website || ''}
                        onChange={(e) => setTempSocialLinks({ ...tempSocialLinks, website: e.target.value })}
                        placeholder="https://example.com"
                        type="url"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setIsSocialLinksDialogOpen(false)} className="flex-1">
                        Отмена
                      </Button>
                      <Button onClick={handleSaveSocialLinks} className="flex-1">
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              )}
              {socialLinks.telegram && (
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>Telegram</span>
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Веб-сайт</span>
                </a>
              )}
              {Object.keys(socialLinks).length === 0 && (
                <p className="text-muted-foreground">Ссылки на соцсети не добавлены</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Поделиться профилем */}
        <Card>
          <CardHeader>
            <CardTitle>Поделиться профилем</CardTitle>
            <CardDescription>Поделитесь ссылкой на ваш профиль</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleShareProfile} className="w-full sm:w-auto">
              Копировать ссылку
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


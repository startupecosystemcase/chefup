'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useAuthStore, useOnboardingStore, useEmployerOnboardingStore } from '@/stores/useOnboardingStore'
import { isUsernameAvailable, suggestUsernameAlternatives, validateTelegramUsername } from '@/lib/usernameUtils'
import { Settings, Phone, User, Bell, Lock, Trash2, AlertTriangle, Users, Building, Link2, CreditCard } from 'lucide-react'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/magicui/animated-dialog'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const settingsSchema = z.object({
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  username: z.string().min(3, 'Username должен содержать минимум 3 символа').max(30, 'Username не должен превышать 30 символов').regex(/^[a-zA-Z0-9_]+$/, 'Username может содержать только буквы, цифры и подчёркивание').optional().or(z.literal('')),
  telegramUsername: z.string().optional().or(z.literal('')),
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function SettingsPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const username = useAuthStore((state) => state.username)
  const setUsername = useAuthStore((state) => state.setUsername)
  const notifications = useAuthStore((state) => state.notifications)
  const setNotifications = useAuthStore((state) => state.setNotifications)
  const profilePrivacy = useAuthStore((state) => state.profilePrivacy)
  const setProfilePrivacy = useAuthStore((state) => state.setProfilePrivacy)
  const formData = useOnboardingStore((state) => state.formData)
  const setFormData = useOnboardingStore((state) => state.setFormData)
  const employerFormData = useEmployerOnboardingStore((state) => state.formData)
  const setEmployerFormData = useEmployerOnboardingStore((state) => state.setFormData)
  
  // Если работодатель - показываем корпоративные настройки
  if (userRole === 'employer') {
    return <EmployerSettingsPage />
  }
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([])

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      phone: formData.phone || '',
      username: username || '',
      telegramUsername: formData.telegramUsername || '',
    },
  })

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
  }, [userId, router])

  const handleUsernameChange = (value: string) => {
    form.setValue('username', value)
    if (value && !isUsernameAvailable(value)) {
      const suggestions = suggestUsernameAlternatives(value, userId || '')
      setUsernameSuggestions(suggestions)
    } else {
      setUsernameSuggestions([])
    }
  }

  const onSubmit = async (data: SettingsFormData) => {
    if (data.username && !isUsernameAvailable(data.username)) {
      toast.error('Этот username уже занят')
      return
    }

    if (data.telegramUsername && !validateTelegramUsername(data.telegramUsername)) {
      toast.error('Неверный формат Telegram username')
      return
    }

    setFormData({
      phone: data.phone,
      telegramUsername: data.telegramUsername,
    })

    if (data.username) {
      setUsername(data.username)
    }

    toast.success('Настройки сохранены!')
  }

  const handleDeleteAccount = () => {
    // В реальном приложении здесь будет запрос к API
    toast.success('Аккаунт удалён')
    router.push('/')
  }

  if (!userId) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4 md:mb-2 flex items-center gap-4 dark:text-white">
            <Settings className="w-8 h-8" />
            Настройки
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">Управление аккаунтом и настройками профиля</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Контактная информация */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <Phone className="w-5 h-5" />
                Контактная информация
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Обновите ваши контактные данные</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="dark:text-gray-300">Телефон</Label>
                  <AnimatedInput
                    id="phone"
                    {...form.register('phone')}
                    placeholder="+7 (XXX) XXX-XX-XX"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      let formatted = '+7'
                      if (value.length > 1) {
                        formatted += ` (${value.slice(1, 4)}`
                        if (value.length > 4) {
                          formatted += `) ${value.slice(4, 7)}`
                          if (value.length > 7) {
                            formatted += `-${value.slice(7, 9)}`
                            if (value.length > 9) {
                              formatted += `-${value.slice(9, 11)}`
                            }
                          }
                        }
                      }
                      form.setValue('phone', formatted)
                    }}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Username и Telegram */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <User className="w-5 h-5" />
                Username и Telegram
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Настройте отображаемое имя и Telegram username</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="dark:text-gray-300">Username</Label>
                  <AnimatedInput
                    id="username"
                    {...form.register('username')}
                    placeholder="chef_saul"
                    onChange={(e) => handleUsernameChange(e.target.value)}
                  />
                  {form.formState.errors.username && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.username.message}</p>
                  )}
                  {usernameSuggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6 md:mb-4 md:mb-2">Этот username занят. Предлагаем:</p>
                      <div className="flex flex-wrap gap-4">
                        {usernameSuggestions.slice(0, 3).map((suggestion, idx) => (
                          <ShinyButton
                            key={idx}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              form.setValue('username', suggestion)
                              setUsernameSuggestions([])
                            }}
                          >
                            {suggestion}
                          </ShinyButton>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="telegramUsername" className="dark:text-gray-300">Telegram Username</Label>
                  <AnimatedInput
                    id="telegramUsername"
                    {...form.register('telegramUsername')}
                    placeholder="@username"
                    onChange={(e) => {
                      let value = e.target.value
                      if (!value.startsWith('@')) {
                        value = '@' + value
                      }
                      form.setValue('telegramUsername', value)
                    }}
                  />
                  {form.formState.errors.telegramUsername && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.telegramUsername.message}</p>
                  )}
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Уведомления */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <Bell className="w-5 h-5" />
                Уведомления
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Управление уведомлениями</p>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="dark:text-gray-300">Email и push-уведомления</Label>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Получать уведомления о новых вакансиях и сообщениях</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
          </AnimatedCard>

          {/* Приватность */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <Lock className="w-5 h-5" />
                Приватность
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Настройки видимости профиля</p>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="privacy" className="dark:text-gray-300">Публичный профиль</Label>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {profilePrivacy === 'public' 
                      ? 'Ваш профиль виден всем пользователям' 
                      : 'Ваш профиль скрыт от других пользователей'}
                  </p>
                </div>
                <Switch
                  id="privacy"
                  checked={profilePrivacy === 'public'}
                  onCheckedChange={(checked) => setProfilePrivacy(checked ? 'public' : 'private')}
                />
              </div>
            </div>
          </AnimatedCard>

          {/* Удаление аккаунта */}
          <AnimatedCard className="border-destructive/50 dark:border-red-500/50 bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4 text-destructive">
                <Trash2 className="w-5 h-5" />
                Удаление аккаунта
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Это действие нельзя отменить</p>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <ShinyButton variant="destructive">Удалить аккаунт</ShinyButton>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-dark/90">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-4 dark:text-white">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Подтвердите удаление
                    </DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Вы уверены, что хотите удалить аккаунт? Все ваши данные будут безвозвратно удалены.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <ShinyButton variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Отмена
                    </ShinyButton>
                    <ShinyButton variant="destructive" onClick={handleDeleteAccount}>
                      Удалить
                    </ShinyButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </AnimatedCard>

          <div className="flex justify-end">
            <ShinyButton type="submit" size="lg">
              Сохранить изменения
            </ShinyButton>
          </div>
        </form>
      </div>
    </div>
  )
}

// Компонент настроек для работодателей
function EmployerSettingsPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const employerFormData = useEmployerOnboardingStore((state) => state.formData)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
  }, [userId, router])

  if (!userId) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4 md:mb-2 flex items-center gap-4 dark:text-white">
            <Settings className="w-8 h-8" />
            Настройки компании
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">Управление корпоративными настройками</p>
        </div>

        <div className="space-y-6">
          {/* Данные компании */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <Building className="w-5 h-5" />
                Данные компании
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Основная информация о компании</p>
              <div className="space-y-4">
                <div>
                  <Label className="dark:text-gray-300">Название компании</Label>
                  <p className="text-base dark:text-white mt-1">{employerFormData?.companyName || 'Не указано'}</p>
                </div>
                <div>
                  <Label className="dark:text-gray-300">Тип компании</Label>
                  <p className="text-base dark:text-white mt-1">{employerFormData?.companyType || 'Не указано'}</p>
                </div>
                <div>
                  <Label className="dark:text-gray-300">Город</Label>
                  <p className="text-base dark:text-white mt-1">{employerFormData?.city || 'Не указано'}</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Управление ролями */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <Users className="w-5 h-5" />
                Управление ролями и доступами
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Назначение ролей сотрудникам</p>
              <ShinyButton variant="outline">
                Управление ролями
              </ShinyButton>
            </div>
          </AnimatedCard>

          {/* Уведомления */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <Bell className="w-5 h-5" />
                Уведомления
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Управление уведомлениями</p>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="dark:text-gray-300">Email и push-уведомления</Label>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Получать уведомления о новых заявках и сообщениях</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
          </AnimatedCard>

          {/* Интеграции */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <Link2 className="w-5 h-5" />
                Управление интеграциями
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">HR-системы и партнёры</p>
              <ShinyButton variant="outline" onClick={() => router.push('/dashboard/hr-system')}>
                Интеграция HR-системы
              </ShinyButton>
            </div>
          </AnimatedCard>

          {/* Подписки */}
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white flex items-center gap-4">
                <CreditCard className="w-5 h-5" />
                Подписки / Биллинг
              </h2>
              <p className="text-sm text-muted-foreground mb-6 md:mb-4 dark:text-gray-400">Управление подпиской</p>
              <ShinyButton variant="outline" onClick={() => router.push('/dashboard/subscription')}>
                Управление подпиской
              </ShinyButton>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}


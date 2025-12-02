'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useAuthStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { isUsernameAvailable, suggestUsernameAlternatives, validateTelegramUsername } from '@/lib/usernameUtils'
import { Settings, Phone, User, Bell, Lock, Trash2, AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

const settingsSchema = z.object({
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  username: z.string().min(3, 'Username должен содержать минимум 3 символа').max(30, 'Username не должен превышать 30 символов').regex(/^[a-zA-Z0-9_]+$/, 'Username может содержать только буквы, цифры и подчёркивание').optional().or(z.literal('')),
  telegramUsername: z.string().optional().or(z.literal('')),
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function SettingsPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const username = useAuthStore((state) => state.username)
  const setUsername = useAuthStore((state) => state.setUsername)
  const notifications = useAuthStore((state) => state.notifications)
  const setNotifications = useAuthStore((state) => state.setNotifications)
  const profilePrivacy = useAuthStore((state) => state.profilePrivacy)
  const setProfilePrivacy = useAuthStore((state) => state.setProfilePrivacy)
  const formData = useOnboardingStore((state) => state.formData)
  const setFormData = useOnboardingStore((state) => state.setFormData)
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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Настройки
          </h1>
          <p className="text-muted-foreground">Управление аккаунтом и настройками профиля</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Контактная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Контактная информация
              </CardTitle>
              <CardDescription>Обновите ваши контактные данные</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
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
            </CardContent>
          </Card>

          {/* Username и Telegram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Username и Telegram
              </CardTitle>
              <CardDescription>Настройте отображаемое имя и Telegram username</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
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
                    <p className="text-sm text-muted-foreground mb-2">Этот username занят. Предлагаем:</p>
                    <div className="flex flex-wrap gap-2">
                      {usernameSuggestions.slice(0, 3).map((suggestion, idx) => (
                        <Button
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
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="telegramUsername">Telegram Username</Label>
                <Input
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
            </CardContent>
          </Card>

          {/* Уведомления */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Уведомления
              </CardTitle>
              <CardDescription>Управление уведомлениями</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Email и push-уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать уведомления о новых вакансиях и сообщениях</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Приватность */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Приватность
              </CardTitle>
              <CardDescription>Настройки видимости профиля</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="privacy">Публичный профиль</Label>
                  <p className="text-sm text-muted-foreground">
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
            </CardContent>
          </Card>

          {/* Удаление аккаунта */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="w-5 h-5" />
                Удаление аккаунта
              </CardTitle>
              <CardDescription>Это действие нельзя отменить</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Удалить аккаунт</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Подтвердите удаление
                    </DialogTitle>
                    <DialogDescription>
                      Вы уверены, что хотите удалить аккаунт? Все ваши данные будут безвозвратно удалены.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Удалить
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


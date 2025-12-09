'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { Search, User, Building2, Shield, Ban, CheckCircle2, Gift, Plus, Copy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UserForManagement {
  id: string
  firstName: string
  lastName: string
  role: 'applicant' | 'employer' | 'moderator'
  email?: string
  phone?: string
  status: 'active' | 'banned'
  createdAt: string
}

// Mock данные для управления пользователями
const mockUsers: UserForManagement[] = [
  {
    id: 'user1',
    firstName: 'Иван',
    lastName: 'Иванов',
    role: 'applicant',
    email: 'ivan@example.com',
    phone: '+7 (777) 123-45-67',
    status: 'active',
    createdAt: '2025-01-15',
  },
  {
    id: 'user2',
    firstName: 'Мария',
    lastName: 'Петрова',
    role: 'employer',
    email: 'maria@example.com',
    phone: '+7 (777) 234-56-78',
    status: 'active',
    createdAt: '2025-01-14',
  },
  {
    id: 'user3',
    firstName: 'Алексей',
    lastName: 'Сидоров',
    role: 'applicant',
    email: 'alex@example.com',
    phone: '+7 (777) 345-67-89',
    status: 'banned',
    createdAt: '2025-01-10',
  },
]

export default function ModerateUsersPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState<UserForManagement[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false)
  const [newPromoCode, setNewPromoCode] = useState('')
  const [generatedPromoCodes, setGeneratedPromoCodes] = useState<string[]>(['CHEFUP2026', 'CHEFAPP2026', 'PRO2026'])

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    if (userRole !== 'moderator') {
      router.push('/dashboard')
      return
    }
    setMounted(true)
  }, [userId, userRole, router])

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const search = searchTerm.toLowerCase()
    return fullName.includes(search) || user.email?.toLowerCase().includes(search)
  })

  const handleBan = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: 'banned' as const } : u))
    )
    toast.success('Пользователь заблокирован')
  }

  const handleUnban = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: 'active' as const } : u))
    )
    toast.success('Пользователь разблокирован')
  }

  if (!mounted || userRole !== 'moderator') {
    return null
  }

  const roleLabels = {
    applicant: 'Соискатель',
    employer: 'Работодатель',
    moderator: 'Модератор',
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Управление пользователями</h1>
          <p className="text-muted-foreground">
            Управляйте пользователями платформы, блокируйте и разблокируйте аккаунты
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Поиск пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, фамилии или email"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Пользователи не найдены</p>
              </CardContent>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-5 mb-1">
                        <CardTitle>
                          {user.firstName} {user.lastName}
                        </CardTitle>
                        <Badge
                          variant={user.status === 'active' ? 'default' : 'destructive'}
                        >
                          {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                        </Badge>
                        <Badge variant="outline">
                          {user.role === 'applicant' && <User className="w-3 h-3 mr-1" />}
                          {user.role === 'employer' && <Building2 className="w-3 h-3 mr-1" />}
                          {user.role === 'moderator' && <Shield className="w-3 h-3 mr-1" />}
                          {roleLabels[user.role]}
                        </Badge>
                      </div>
                      <CardDescription>
                        {user.email && <span>{user.email}</span>}
                        {user.phone && <span className="ml-2">• {user.phone}</span>}
                        <span className="ml-2">• Регистрация: {user.createdAt}</span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-4">
                      {user.status === 'active' ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleBan(user.id)}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Заблокировать
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleUnban(user.id)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Разблокировать
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        {/* Генерация промокодов */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Управление промокодами
                </CardTitle>
                <CardDescription>Генерация и управление промокодами для PRO подписки</CardDescription>
              </div>
              <ShinyButton onClick={() => setIsPromoDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Создать промокод
              </ShinyButton>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedPromoCodes.map((code) => (
                <div key={code} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <code className="font-mono text-sm font-semibold">{code}</code>
                    <Badge variant="outline">Активен</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(code)
                      toast.success('Промокод скопирован!')
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Диалог создания промокода */}
        <Dialog open={isPromoDialogOpen} onOpenChange={setIsPromoDialogOpen}>
          <DialogContent className="bg-white dark:bg-dark max-w-md">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl mb-2">Создать промокод</DialogTitle>
              <DialogDescription className="text-base">
                Введите название промокода для генерации
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-base font-medium">Название промокода</label>
                <AnimatedInput
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                  placeholder="Например: CHEFUP2026"
                  className="w-full"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <ShinyButton variant="outline" onClick={() => setIsPromoDialogOpen(false)}>
                  Отмена
                </ShinyButton>
                <ShinyButton
                  onClick={() => {
                    if (!newPromoCode.trim()) {
                      toast.error('Введите название промокода')
                      return
                    }
                    const code = newPromoCode.trim().toUpperCase()
                    setGeneratedPromoCodes([...generatedPromoCodes, code])
                    toast.success(`Промокод ${code} создан!`)
                    setNewPromoCode('')
                    setIsPromoDialogOpen(false)
                  }}
                >
                  Создать
                </ShinyButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}


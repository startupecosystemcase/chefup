'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { Search, User, Building2, Shield, Ban, CheckCircle2 } from 'lucide-react'
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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Управление пользователями</h1>
          <p className="text-muted-foreground">
            Управляйте пользователями платформы, блокируйте и разблокируйте аккаунты
          </p>
        </div>

        <Card className="mb-6">
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
                      <div className="flex items-center gap-3 mb-1">
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
                    <div className="flex gap-2">
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
      </div>
    </div>
  )
}


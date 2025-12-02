'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { usePortfolioStore } from '@/stores/useOnboardingStore'
import { CheckCircle2, XCircle, Eye, User } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ProfileModeration {
  userId: string
  firstName: string
  lastName: string
  status: 'pending' | 'approved' | 'rejected'
  moderationComment?: string
}

// Mock данные для модерации профилей
const mockProfilesForModeration: ProfileModeration[] = [
  {
    userId: 'user1',
    firstName: 'Иван',
    lastName: 'Иванов',
    status: 'pending',
  },
  {
    userId: 'user2',
    firstName: 'Мария',
    lastName: 'Петрова',
    status: 'pending',
  },
]

export default function ModerateProfilesPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const { posts } = usePortfolioStore()
  const [mounted, setMounted] = useState(false)
  const [profiles, setProfiles] = useState<ProfileModeration[]>(mockProfilesForModeration)

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

  const handleApprove = (profileUserId: string) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.userId === profileUserId ? { ...p, status: 'approved' as const } : p
      )
    )
    toast.success('Профиль одобрен')
  }

  const handleReject = (profileUserId: string) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.userId === profileUserId ? { ...p, status: 'rejected' as const } : p
      )
    )
    toast.success('Профиль отклонен')
  }

  if (!mounted || userRole !== 'moderator') {
    return null
  }

  const pendingProfiles = profiles.filter((p) => p.status === 'pending')

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Модерация профилей</h1>
          <p className="text-muted-foreground">
            Проверьте профили и микроблоги пользователей
          </p>
        </div>

        {pendingProfiles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Нет профилей на модерации</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingProfiles.map((profile) => {
              const userPosts = posts.filter((p) => p.id.startsWith(profile.userId))

              return (
                <Card key={profile.userId}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {profile.firstName[0]}{profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle>
                          {profile.firstName} {profile.lastName}
                        </CardTitle>
                        <CardDescription>ID: {profile.userId}</CardDescription>
                      </div>
                      <Badge variant="outline">На проверке</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-4">
                          <User className="w-4 h-4" />
                          Посты в микроблоге: {userPosts.length}
                        </h4>
                        {userPosts.length > 0 && (
                          <div className="space-y-4">
                            {userPosts.slice(0, 3).map((post) => (
                              <div key={post.id} className="p-3 border rounded-md">
                                <p className="font-medium text-sm">{post.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {post.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" asChild>
                          <Link href={`/profile/${profile.userId}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Просмотреть профиль
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(profile.userId)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Отклонить
                        </Button>
                        <Button onClick={() => handleApprove(profile.userId)}>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Одобрить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


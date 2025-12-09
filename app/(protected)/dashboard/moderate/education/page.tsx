'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore, useEducationStore } from '@/stores/useOnboardingStore'
import { CheckCircle2, XCircle, BookOpen, Video, Award } from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { EducationItem } from '@/types/education.types'

const typeIcons = {
  course: BookOpen,
  webinar: Video,
  training: BookOpen,
  certification: Award,
}

const typeLabels = {
  course: 'Курс',
  webinar: 'Вебинар',
  training: 'Тренинг',
  certification: 'Сертификация',
}

export default function ModerateEducationPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const { items, updateEducation } = useEducationStore()
  const [mounted, setMounted] = useState(false)
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null)
  const [moderatorComment, setModeratorComment] = useState('')

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

  const handleApprove = (itemId: string) => {
    updateEducation(itemId, {
      status: 'approved',
      moderatorComment: moderatorComment || undefined,
    })
    setSelectedItem(null)
    setModeratorComment('')
    toast.success('Материал одобрен')
  }

  const handleReject = (itemId: string) => {
    if (!moderatorComment.trim()) {
      toast.error('Укажите причину отклонения')
      return
    }
    updateEducation(itemId, {
      status: 'rejected',
      moderatorComment: moderatorComment,
    })
    setSelectedItem(null)
    setModeratorComment('')
    toast.success('Материал отклонен')
  }

  if (!mounted || userRole !== 'moderator') {
    return null
  }

  const pendingItems = items.filter((item) => item.status === 'pending' || item.status === 'draft')

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2">Модерация образовательных материалов</h1>
          <p className="text-muted-foreground">
            Проверьте курсы, тренинги, вебинары и сертификации перед публикацией
          </p>
        </div>

        {pendingItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Нет материалов на модерации</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingItems.map((item) => {
              const Icon = typeIcons[item.type]

              return (
                <Card key={item.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start gap-5 mb-6 md:mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {typeLabels[item.type]}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Автор: {item.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground mb-8">{item.description}</p>
                    {selectedItem?.id === item.id ? (
                      <div className="space-y-4 p-4 border rounded-md bg-muted/50">
                        <div>
                          <label className="text-sm font-medium mb-6 md:mb-2 block">
                            Комментарий модератора
                          </label>
                          <Textarea
                            value={moderatorComment}
                            onChange={(e) => setModeratorComment(e.target.value)}
                            placeholder="Оставьте комментарий (обязательно при отклонении)"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedItem(null)
                              setModeratorComment('')
                            }}
                          >
                            Отмена
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(item.id!)}
                            disabled={!moderatorComment.trim()}
                            className="flex-1"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Отклонить
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(item.id!)}
                            className="flex-1"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Одобрить
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item)
                            setModeratorComment(item.moderatorComment || '')
                          }}
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Отклонить
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item)
                            setModeratorComment(item.moderatorComment || '')
                          }}
                          className="flex-1"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Одобрить
                        </Button>
                      </div>
                    )}
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


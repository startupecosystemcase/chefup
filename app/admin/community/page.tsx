'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { usePortfolioStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import type { PortfolioPost } from '@/types/portfolio.types'

// Адаптация типа для совместимости
interface PortfolioPostAdapted {
  id: string
  content: string
  authorId: string
  createdAt: string
  images?: string[]
  videos?: string[]
  links?: Array<{ title: string; url: string }>
}

export default function AdminCommunityPage() {
  const { posts } = usePortfolioStore()
  const [allPosts, setAllPosts] = useState<PortfolioPostAdapted[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    content: '',
    images: [] as string[],
    videos: [] as string[],
    links: [] as { title: string; url: string }[],
  })

  useEffect(() => {
    // Адаптируем посты к нужному формату
    const adaptedPosts: PortfolioPostAdapted[] = posts.map((post) => ({
      id: post.id,
      content: post.text || post.title || '',
      authorId: 'user', // В реальном приложении будет из данных
      createdAt: post.createdAt,
      images: post.images || [],
      videos: post.videos || [],
      links: post.links || [],
    }))
    setAllPosts(adaptedPosts)
  }, [posts])

  const filteredPosts = allPosts.filter((post) => {
    const search = searchTerm.toLowerCase()
    return post.content.toLowerCase().includes(search)
  })

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast.error('Заполните содержание поста')
      return
    }

    usePortfolioStore.getState().addPost({
      title: 'Пост администратора',
      text: newPost.content,
      images: newPost.images,
      videos: newPost.videos,
      links: newPost.links,
    })
    toast.success('Пост создан')
    setIsCreateDialogOpen(false)
    setNewPost({
      content: '',
      images: [],
      videos: [],
      links: [],
    })
  }

  const handleDeletePost = (postId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот пост?')) {
      // В реальном приложении здесь будет вызов API
      setAllPosts(allPosts.filter((p) => p.id !== postId))
      toast.success('Пост удален')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Сообщество</h1>
          <p className="text-muted-foreground mt-1">Управление постами в микроблоге</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Создать пост
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по содержанию..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">ID: {post.authorId}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <p className="text-sm">{post.content}</p>
                      {post.images && post.images.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Фото: {post.images.length}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Посты не найдены
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Диалог создания поста */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создать пост</DialogTitle>
            <DialogDescription>Создать пост от имени администратора</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Содержание *</Label>
              <AnimatedTextarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Текст поста"
                rows={6}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreatePost}>Создать</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Label } from '@/components/ui/label'
import { Image as ImageIcon, Video, Link as LinkIcon, X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PortfolioPost } from '@/types/portfolio.types'

interface PortfolioPostFormProps {
  onSubmit: (post: Omit<PortfolioPost, 'id' | 'createdAt'>) => void
  onCancel?: () => void
  initialData?: Partial<PortfolioPost>
}

export function PortfolioPostForm({ onSubmit, onCancel, initialData }: PortfolioPostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [text, setText] = useState(initialData?.text || '')
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [videos, setVideos] = useState<string[]>(initialData?.videos || [])
  const [links, setLinks] = useState<Array<{ url: string; title: string; description?: string }>>(
    initialData?.links || []
  )
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [newLink, setNewLink] = useState({ url: '', title: '', description: '' })

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const canPublish = title.trim() && text.trim()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && images.length < 20) {
      const newImages: string[] = []
      Array.from(files)
        .slice(0, 20 - images.length)
        .forEach((file) => {
          const reader = new FileReader()
          reader.onload = (event) => {
            if (event.target?.result) {
              newImages.push(event.target.result as string)
              if (newImages.length === Math.min(files.length, 20 - images.length)) {
                setImages([...images, ...newImages])
              }
            }
          }
          reader.readAsDataURL(file)
        })
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addVideo = () => {
    if (newVideoUrl.trim()) {
      setVideos([...videos, newVideoUrl.trim()])
      setNewVideoUrl('')
    }
  }

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index))
  }

  const addLink = () => {
    if (newLink.url.trim() && newLink.title.trim()) {
      setLinks([...links, { ...newLink }])
      setNewLink({ url: '', title: '', description: '' })
    }
  }

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && text) {
      onSubmit({
        title,
        text,
        images,
        videos: videos.length > 0 ? videos : undefined,
        links: links.length > 0 ? links : undefined,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base font-medium block">Заголовок *</Label>
        <AnimatedInput
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
          className="h-12 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="text" className="text-base font-medium block">Текст *</Label>
        <AnimatedTextarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Опишите ваш пост"
          className="min-h-[150px] text-base"
          required
        />
      </div>

      {/* Фотографии */}
      <div className="space-y-3">
        <Label className="text-base font-medium block">Фотографии ({images.length}/20)</Label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
          disabled={images.length >= 20}
        />
        <label htmlFor="image-upload">
          <ShinyButton type="button" variant="outline" disabled={images.length >= 20} className="cursor-pointer w-full sm:w-auto">
            <ImageIcon className="w-4 h-4 mr-2" />
            Добавить фото
          </ShinyButton>
        </label>
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-8">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Видео */}
      <div className="space-y-3">
        <Label className="text-base font-medium block">Видео (YouTube, Vimeo и т.д.)</Label>
        <div className="flex gap-2">
          <AnimatedInput
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            type="url"
            className="flex-1"
          />
          <ShinyButton 
            type="button" 
            variant="outline" 
            onClick={addVideo}
            disabled={!isValidUrl(newVideoUrl)}
            className={cn(
              "px-4",
              isValidUrl(newVideoUrl) && "bg-[#F97316] text-white border-[#F97316] hover:bg-[#F97316]/90"
            )}
          >
            <Plus className="w-4 h-4" />
          </ShinyButton>
        </div>
        {videos.length > 0 && (
          <div className="space-y-4 mt-8">
            {videos.map((video, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <span className="text-sm truncate flex-1">{video}</span>
                <ShinyButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVideo(index)}
                >
                  <X className="w-4 h-4" />
                </ShinyButton>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ссылки */}
      <div className="space-y-3">
        <Label className="text-base font-medium block">Ссылки</Label>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 bg-gray-50/50 dark:bg-gray-900/50">
          <AnimatedInput
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="URL"
            type="url"
          />
          <AnimatedInput
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="Название ссылки"
          />
          <AnimatedTextarea
            value={newLink.description}
            onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
            placeholder="Описание (необязательно)"
            className="min-h-[60px]"
          />
          <ShinyButton type="button" variant="outline" onClick={addLink} className="w-full sm:w-auto">
            <LinkIcon className="w-4 h-4 mr-2" />
            Добавить ссылку
          </ShinyButton>
        </div>
        {links.length > 0 && (
          <div className="space-y-4 mt-8">
            {links.map((link, index) => (
              <div key={index} className="p-3 border rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{link.title}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {link.url}
                    </a>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                    )}
                  </div>
                  <ShinyButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(index)}
                  >
                    <X className="w-4 h-4" />
                  </ShinyButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <ShinyButton type="button" variant="outline" onClick={onCancel} className="flex-1">
            Отмена
          </ShinyButton>
        )}
        <ShinyButton 
          type="submit" 
          className="flex-1"
          disabled={!canPublish}
          style={!canPublish ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
          Опубликовать
        </ShinyButton>
      </div>
    </form>
  )
}


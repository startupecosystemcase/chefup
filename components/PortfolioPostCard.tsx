'use client'

import { memo } from 'react'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ExternalLink, Video as VideoIcon, Image as ImageIcon, Pencil, Trash2 } from 'lucide-react'
import type { PortfolioPost } from '@/types/portfolio.types'
import { formatDistanceToNow } from 'date-fns'

interface PortfolioPostCardProps {
  post: PortfolioPost
  onEdit?: (post: PortfolioPost) => void
  onDelete?: (id: string) => void
  showActions?: boolean
}

export const PortfolioPostCard = memo(function PortfolioPostCard({ post, onEdit, onDelete, showActions = false }: PortfolioPostCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return dateString
    }
  }

  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null
    }
    return null
  }

  return (
    <AnimatedCard className="mb-8 bg-white dark:bg-dark/50">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl mb-2 font-semibold dark:text-white">{post.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
              <span>{formatDate(post.createdAt)}</span>
              {post.updatedAt && post.updatedAt !== post.createdAt && (
                <AnimatedBadge variant="outline" className="text-xs">Обновлено</AnimatedBadge>
              )}
            </div>
          </div>
          {showActions && (
            <div className="flex gap-4">
              {onEdit && (
                <ShinyButton variant="ghost" size="sm" onClick={() => onEdit(post)}>
                  Редактировать
                </ShinyButton>
              )}
              {onDelete && (
                <ShinyButton variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
                  Удалить
                </ShinyButton>
              )}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground dark:text-gray-400 whitespace-pre-wrap">{post.text}</p>

        {/* Изображения */}
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {post.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`${post.title} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(img, '_blank')}
                />
              </div>
            ))}
          </div>
        )}

        {/* Видео */}
        {post.videos && post.videos.length > 0 && (
          <div className="space-y-6">
            {post.videos.map((videoUrl, index) => {
              const embedUrl = getVideoEmbedUrl(videoUrl)
              return (
                <div key={index} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full border rounded-md flex items-center justify-center bg-muted dark:bg-dark/70">
                      <div className="text-center">
                        <VideoIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground dark:text-gray-400" />
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Открыть видео
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Ссылки */}
        {post.links && post.links.length > 0 && (
          <div className="space-y-4">
            {post.links.map((link, index) => (
              <div key={index} className="p-3 border rounded-md hover:bg-muted/50 dark:hover:bg-dark/70 dark:border-gray-700/50 transition-colors">
                <div className="flex items-start gap-5">
                  <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary transition-colors block truncate dark:text-white"
                    >
                      {link.title}
                    </a>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 truncate">{link.url}</p>
                    {link.description && (
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">{link.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </AnimatedCard>
  )
}


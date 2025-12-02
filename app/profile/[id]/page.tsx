'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useOnboardingStore, usePortfolioStore } from '@/stores/useOnboardingStore'
import { PortfolioPostCard } from '@/components/PortfolioPostCard'
import { Share2, Instagram, Send, Facebook, Linkedin, Globe, Youtube } from 'lucide-react'
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

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params
  const formData = useOnboardingStore((state) => state.formData)
  const { posts, socialLinks } = usePortfolioStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleShareProfile = () => {
    const profileUrl = window.location.href
    navigator.clipboard.writeText(profileUrl)
    // В реальном приложении здесь будет toast
  }

  const getLabel = (value: string, options: readonly { readonly value: string; readonly label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value
  }

  // В реальном приложении здесь был бы запрос к API для получения данных по ID
  // Сейчас используем данные из store как mock

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 px-4 py-6 md:py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6 md:mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarFallback className="text-lg">
                {formData.firstName?.[0] || 'U'}
                {formData.lastName?.[0] || ''}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg md:text-2xl font-bold">
                {formData.firstName || 'Пользователь'} {formData.lastName || ''}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">Профиль #{id.slice(0, 8)}</p>
            </div>
          </div>

          {/* Профиль */}
          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
              <CardDescription>Информация о специалисте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Личная информация</h3>
                <div className="grid gap-2 text-sm">
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
                <div className="grid gap-2 text-sm">
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
                <div>
                  <h3 className="mb-2 font-semibold">Кухни</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.cuisines.map((cuisine) => (
                      <Badge key={cuisine} variant="secondary">
                        {getLabel(cuisine, cuisines)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.goals && formData.goals.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold">Цели</h3>
                  <div className="flex flex-wrap gap-2">
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

          {/* Ссылки на соцсети */}
          {Object.keys(socialLinks).length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Социальные сети</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Веб-сайт</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Микроблог / Портфолио */}
          {posts.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Микроблог / Портфолио</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleShareProfile}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Поделиться
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PortfolioPostCard key={post.id} post={post} showActions={false} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useOnboardingStore, usePortfolioStore, usePublicProfilesStore } from '@/stores/useOnboardingStore'
import { PortfolioPostCard } from '@/components/PortfolioPostCard'
import { Share2, Instagram, Send, Facebook, Linkedin, Globe, Youtube, CheckCircle2, Edit, Eye, Heart, UserPlus, Users, Plus, UserCheck, MessageCircle } from 'lucide-react'
import { AvatarImage } from '@/components/ui/avatar'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Label } from '@/components/ui/label'
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
  const [activeTab, setActiveTab] = useState<'activity' | 'about' | 'data'>('activity')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscribersCount, setSubscribersCount] = useState(0)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { getUserIdByUsername } = usePublicProfilesStore()

  useEffect(() => {
    setMounted(true)
    // В реальном приложении здесь будет запрос к API для получения данных подписки
    // Если id - это username, получаем userId
    const userId = getUserIdByUsername(id)
    if (userId) {
      // В реальном приложении здесь будет загрузка данных профиля по userId
    }
  }, [id, getUserIdByUsername])

  const handleShareProfile = () => {
    const profileUrl = window.location.href
    navigator.clipboard.writeText(profileUrl)
    toast.success('Ссылка на профиль скопирована!')
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Имитация отправки (в реальном приложении здесь будет API запрос)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsContactDialogOpen(false)
      setContactForm({ name: '', email: '', phone: '', message: '' })
      toast.success('Сообщение отправлено!')
    }, 1000)
  }

  const getLabel = (value: string, options: readonly { readonly value: string; readonly label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value
  }

  // В реальном приложении здесь был бы запрос к API для получения данных по ID
  // Сейчас используем данные из store как mock

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-dark">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Profile Header with Cover Image or ChefUp Logo */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-64 md:h-80">
              {formData.coverImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={formData.coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              ) : (
                <div className="w-full h-full bg-[#FFF8F0] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl md:text-8xl font-bold">
                      <span className="text-[#171616]">chef</span>
                      <span className="text-[#FF4617]">up</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Avatar positioned on left, overlapping banner (half on cover, half below) */}
              <div className="absolute left-6 md:left-8 bottom-0 translate-y-1/2 z-10">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 ring-4 ring-white shadow-xl rounded-full">
                  <AvatarImage src={formData.avatarUrl} />
                  <AvatarFallback className="text-3xl md:text-4xl bg-white text-gray-700 rounded-full">
                {formData.firstName?.[0] || 'U'}
                {formData.lastName?.[0] || ''}
              </AvatarFallback>
            </Avatar>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="mt-16 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold dark:text-white flex items-center gap-2">
                    {formData.firstName || 'Пользователь'} {formData.lastName || ''}
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  </h1>
                </div>
                <div className="flex gap-2">
                  <ShinyButton 
                    variant={isSubscribed ? "outline" : "default"}
                    size="sm"
                    onClick={() => {
                      setIsSubscribed(!isSubscribed)
                      setSubscribersCount(prev => isSubscribed ? prev - 1 : prev + 1)
                    }}
                  >
                    {isSubscribed ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Подписан
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Подписаться
                      </>
                    )}
                  </ShinyButton>
                  <ShinyButton 
                    variant="outline"
                    size="sm"
                    onClick={() => setIsContactDialogOpen(true)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться
                  </ShinyButton>
                </div>
              </div>

              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(formData.desiredPosition && (
                  <AnimatedBadge variant="secondary" className="text-sm px-3 py-1">
                    {getLabel(formData.desiredPosition, positions)}
                  </AnimatedBadge>
                )) || (formData.currentPosition && (
                  <AnimatedBadge variant="secondary" className="text-sm px-3 py-1">
                    {getLabel(formData.currentPosition, positions)}
                  </AnimatedBadge>
                ))}
                {formData.cuisines && formData.cuisines.slice(0, 2).map((cuisine) => (
                  <AnimatedBadge key={cuisine} variant="outline" className="text-sm px-3 py-1">
                    {getLabel(cuisine, cuisines)}
                  </AnimatedBadge>
                ))}
          </div>

              {/* Statistics */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span>{subscribersCount} подписчиков</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>0 подписок</span>
                  </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>0 просмотров</span>
                  </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>0 лайков</span>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-6">
                <TabsList className="bg-transparent border-b border-gray-200 dark:border-border/50 rounded-none p-0 h-auto">
                  <TabsTrigger 
                    value="activity" 
                    className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Активность
                  </TabsTrigger>
                  <TabsTrigger 
                    value="about" 
                    className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    О себе
                  </TabsTrigger>
                  <TabsTrigger 
                    value="data" 
                    className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Данные
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">

                {/* Активность Tab */}
                {activeTab === 'activity' && (
                  <>
                    {/* Микроблог / Портфолио */}
                    {posts.length > 0 ? (
                      <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold dark:text-white">Микроблог / Портфолио</h2>
                            <Button variant="outline" size="sm" onClick={handleShareProfile}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Поделиться
                            </Button>
                          </div>
                          <div className="space-y-6">
                            {posts.map((post) => (
                              <PortfolioPostCard key={post.id} post={post} showActions={false} />
                            ))}
                          </div>
                        </div>
                      </AnimatedCard>
                    ) : (
                      <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                        <div className="p-6 text-center py-12">
                          <p className="text-muted-foreground dark:text-gray-400">Пока нет активности</p>
                        </div>
                      </AnimatedCard>
                    )}
                  </>
                )}

                {/* О себе Tab */}
                {activeTab === 'about' && (
                  <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-6 dark:text-white">О себе</h2>
                      {formData.about ? (
                        <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                          {formData.about}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground dark:text-gray-400">Информация не указана</p>
                      )}
                    </div>
                  </AnimatedCard>
                )}

                {/* Данные Tab */}
                {activeTab === 'data' && (
                  <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-6 dark:text-white">Данные</h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-3 font-semibold text-base dark:text-white">Личная информация</h3>
                          <div className="grid gap-3 text-sm">
                            {formData.city && (
                              <div>
                                <span className="text-muted-foreground dark:text-gray-400">Город: </span>
                                <span className="dark:text-white">{getLabel(formData.city, cities)}</span>
                              </div>
                            )}
                            {formData.age && (
                              <div>
                                <span className="text-muted-foreground dark:text-gray-400">Возраст: </span>
                                <span className="dark:text-white">{getLabel(formData.age, ageRanges)}</span>
                              </div>
                            )}
                </div>
              </div>

              <Separator />

              <div>
                          <h3 className="mb-3 font-semibold text-base dark:text-white">Опыт и образование</h3>
                          <div className="grid gap-3 text-sm">
                            {formData.experience && (
                  <div>
                                <span className="text-muted-foreground dark:text-gray-400">Опыт: </span>
                                <span className="dark:text-white">{getLabel(formData.experience, experienceRanges)}</span>
                  </div>
                            )}
                            {(formData.desiredPosition || formData.currentPosition) && (
                  <div>
                                <span className="text-muted-foreground dark:text-gray-400">Позиция: </span>
                                <span className="dark:text-white">
                    {(formData.desiredPosition && getLabel(formData.desiredPosition, positions)) || 
                     (formData.currentPosition && getLabel(formData.currentPosition, positions))}
                                </span>
                  </div>
                            )}
                            {formData.education && (
                  <div>
                                <span className="text-muted-foreground dark:text-gray-400">Образование: </span>
                                <span className="dark:text-white">{getLabel(formData.education, educationLevels)}</span>
                  </div>
                            )}
                            {formData.rank && (
                  <div>
                                <span className="text-muted-foreground dark:text-gray-400">Разряд: </span>
                                <span className="dark:text-white">{getLabel(formData.rank, ranks)}</span>
                  </div>
                            )}
                </div>
              </div>

                        {formData.cuisines && formData.cuisines.length > 0 && (
                          <>
              <Separator />
                <div>
                              <h3 className="mb-3 font-semibold text-base dark:text-white">Кухни</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.cuisines.map((cuisine) => (
                                  <Badge key={cuisine} variant="secondary" className="text-sm">
                        {getLabel(cuisine, cuisines)}
                      </Badge>
                    ))}
                  </div>
                </div>
                          </>
              )}

              {formData.goals && formData.goals.length > 0 && (
                          <>
                            <Separator />
                <div>
                              <h3 className="mb-3 font-semibold text-base dark:text-white">Цели</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.goals.map((goal) => (
                                  <Badge key={goal} variant="outline" className="text-sm">
                        {getLabel(goal, goals)}
                      </Badge>
                    ))}
                  </div>
                </div>
                          </>
                        )}
                      </div>
                </div>
                  </AnimatedCard>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Контакты */}
                <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Контакты</h3>
                    {Object.keys(socialLinks).length > 0 ? (
                      <div className="space-y-3">
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Веб-сайт</span>
                    </a>
                  )}
                </div>
                    ) : (
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Контакты не указаны</p>
                    )}
                    <ShinyButton variant="outline" size="sm" className="w-full mt-4">
                      <Edit className="w-4 h-4 mr-2" />
                      Редактировать контакты
                    </ShinyButton>
                  </div>
                </AnimatedCard>

                {/* Компании (placeholder) */}
                <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Компании</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">Компании не указаны</p>
                    <ShinyButton variant="outline" size="sm" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить компанию
                    </ShinyButton>
                  </div>
                </AnimatedCard>
              </div>
                </div>
                </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { Bell, CheckCircle, X, Clock, Briefcase, Calendar, Award, Users } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  type: 'job' | 'event' | 'application' | 'system' | 'achievement'
  title: string
  message: string
  date: Date
  read: boolean
  link?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'job',
    title: 'Новая вакансия',
    message: 'Появилась новая вакансия "Шеф-повар" в ресторане "Astana Hub"',
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
    read: false,
    link: '/dashboard/jobs/1',
  },
  {
    id: '2',
    type: 'application',
    title: 'Отклик принят',
    message: 'Ваш отклик на вакансию "Су-шеф" был принят работодателем',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
    read: false,
    link: '/dashboard/responses',
  },
  {
    id: '3',
    type: 'event',
    title: 'Новое мероприятие',
    message: 'Регистрация на мастер-класс "Современная кухня" открыта',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 часов назад
    read: true,
    link: '/dashboard/community/1',
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Новое достижение',
    message: 'Вы получили бейдж "Активный пользователь"',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Обновление профиля',
    message: 'Рекомендуем заполнить раздел "Опыт работы" для лучших рекомендаций',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 дня назад
    read: true,
    link: '/dashboard/profile',
  },
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'job':
      return Briefcase
    case 'event':
      return Calendar
    case 'application':
      return CheckCircle
    case 'achievement':
      return Award
    case 'system':
      return Bell
    default:
      return Bell
  }
}

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'job':
      return 'text-blue-500 bg-blue-500/10'
    case 'event':
      return 'text-purple-500 bg-purple-500/10'
    case 'application':
      return 'text-green-500 bg-green-500/10'
    case 'achievement':
      return 'text-yellow-500 bg-yellow-500/10'
    case 'system':
      return 'text-gray-500 bg-gray-500/10'
    default:
      return 'text-gray-500 bg-gray-500/10'
  }
}

export default function NotificationsPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
    setMounted(true)
  }, [userId, router])

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!mounted || !userId) {
    return null
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4 md:mb-2 dark:text-white">Уведомления</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {unreadCount} непрочитанных
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <ShinyButton variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              Отметить все как прочитанные
            </ShinyButton>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              const iconColor = getNotificationColor(notification.type)

              return (
                <AnimatedCard
                  key={notification.id}
                  className={cn(
                    'bg-white dark:bg-dark/50 shadow-sm rounded-xl border transition-all cursor-pointer hover:shadow-md',
                    notification.read
                      ? 'border-gray-200/50 dark:border-border/50'
                      : 'border-[#F97316]/30 dark:border-[#F97316]/30 bg-[#F97316]/5 dark:bg-[#F97316]/5'
                  )}
                  onClick={() => {
                    if (notification.link) {
                      router.push(notification.link)
                    }
                    if (!notification.read) {
                      handleMarkAsRead(notification.id)
                    }
                  }}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={cn('p-2 rounded-lg flex-shrink-0', iconColor)}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3
                            className={cn(
                              'font-semibold text-sm md:text-base',
                              notification.read
                                ? 'text-gray-700 dark:text-gray-300'
                                : 'text-[#0F172A] dark:text-white'
                            )}
                          >
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-[#F97316] rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6 md:mb-4 md:mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground dark:text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            {format(notification.date, 'd MMMM yyyy, HH:mm', { locale: ru })}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(notification.id)
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title="Отметить как прочитанное"
                          >
                            <CheckCircle className="w-4 h-4 text-muted-foreground" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(notification.id)
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title="Удалить"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        ) : (
          <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6 md:mb-4" />
              <h3 className="text-lg font-semibold mb-6 md:mb-4 md:mb-2 dark:text-white">Нет уведомлений</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Когда появятся новые уведомления, они отобразятся здесь
              </p>
            </div>
          </AnimatedCard>
        )}
      </div>
    </div>
  )
}


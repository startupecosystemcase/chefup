'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthStore, type UserRole } from '@/stores/useOnboardingStore'
import { 
  LayoutDashboard, 
  Crown, 
  Users, 
  BookOpen, 
  Calendar, 
  Briefcase,
  FileText,
  FilePlus,
  UserCheck,
  History,
  GraduationCap,
  Settings,
  Shield,
  Search,
  CheckCircle,
  Award,
  Handshake
} from 'lucide-react'

const applicantMenuItems = [
  { href: '/dashboard', label: 'Личный кабинет', icon: LayoutDashboard },
  { href: '/dashboard/resume', label: 'Моё резюме', icon: FileText },
  { href: '/dashboard/subscription', label: 'Подписка', icon: Crown },
  { href: '/dashboard/team', label: 'Команда', icon: Users },
  { href: '/dashboard/practice', label: 'Практика', icon: BookOpen },
  { href: '/dashboard/certificates', label: 'Сертификаты', icon: Award },
  { href: '/dashboard/community', label: 'Коммьюнити', icon: Calendar },
  { href: '/dashboard/jobs', label: 'Вакансии', icon: Briefcase },
  { href: '/dashboard/responses', label: 'Мои отклики', icon: FileText },
  { href: '/dashboard/resumes', label: 'Сообщество', icon: FileText },
  { href: '/dashboard/partners', label: 'Партнёры', icon: Handshake },
  { href: '/dashboard/settings', label: 'Настройки', icon: Settings },
]

const employerMenuItems = [
  { href: '/dashboard', label: 'Личный кабинет', icon: LayoutDashboard },
  { href: '/dashboard/jobs/create', label: 'Подать вакансию', icon: FilePlus },
  { href: '/dashboard/candidates', label: 'Кандидаты', icon: UserCheck },
  { href: '/dashboard/jobs/history', label: 'История вакансий', icon: History },
  { href: '/dashboard/education', label: 'Образование', icon: GraduationCap },
  { href: '/dashboard/hr-system', label: 'HR-система', icon: Settings },
  { href: '/dashboard/partners', label: 'Партнёры', icon: Handshake },
  { href: '/dashboard/settings', label: 'Настройки', icon: Settings },
]

const moderatorMenuItems = [
  { href: '/dashboard', label: 'Главная', icon: LayoutDashboard },
  { href: '/dashboard/moderate/jobs', label: 'Проверка вакансий', icon: CheckCircle },
  { href: '/dashboard/moderate/candidates', label: 'Автоподбор кандидатов', icon: Search },
  { href: '/dashboard/moderate/profiles', label: 'Модерация профилей', icon: Shield },
  { href: '/dashboard/moderate/education', label: 'Модерация образования', icon: BookOpen },
  { href: '/dashboard/moderate/events', label: 'Модерация событий', icon: Calendar },
  { href: '/dashboard/moderate/users', label: 'Управление пользователями', icon: Users },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const userRole = useAuthStore((state) => state.userRole)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <aside className="hidden md:block w-64 p-4 md:p-6">
        <nav className="space-y-4">
          <div className="h-10 w-full animate-pulse bg-muted rounded-lg" />
        </nav>
      </aside>
    )
  }

  let menuItems = applicantMenuItems
  if (userRole === 'employer') {
    menuItems = employerMenuItems
  } else if (userRole === 'moderator') {
    menuItems = moderatorMenuItems
  }

  return (
    <aside className="hidden md:block w-64 relative">
      {/* Liquid Glass Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/50 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-900/50 backdrop-blur-2xl border-r border-white/40 dark:border-gray-700/40 shadow-lg" />
      
      {/* Content */}
      <nav className="relative p-6 md:p-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-5 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm font-medium transition-all duration-300',
                'group hover:scale-[1.02] active:scale-[0.98]',
                isActive
                  ? 'bg-primary/15 text-primary shadow-lg shadow-primary/10 backdrop-blur-sm'
                  : 'text-muted-foreground hover:bg-white/40 dark:hover:bg-gray-800/40 hover:text-foreground backdrop-blur-sm'
              )}
            >
              {/* Glass effect on active */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
              )}
              
              <Icon className={cn(
                'relative z-10 h-4 w-4 md:h-5 md:w-5 transition-all duration-300',
                isActive && 'scale-110'
              )} />
              <span className={cn(
                'relative z-10 text-xs md:text-sm transition-all duration-300',
                isActive && 'font-semibold'
              )}>{item.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

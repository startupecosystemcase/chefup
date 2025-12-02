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
    <aside className="hidden md:block w-64 relative bg-white border-r border-gray-200/50">
      {/* Content */}
      <nav className="relative p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn(
                'h-4 w-4 transition-all duration-300',
                isActive && 'text-primary'
              )} />
              <span className={cn(
                'transition-all duration-300',
                isActive && 'font-semibold text-primary'
              )}>{item.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary ml-auto" />
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

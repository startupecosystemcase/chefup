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
  Handshake,
  Home
} from 'lucide-react'
import { ThemeToggle } from '@/components/magicui/theme-toggle'

const applicantMenuItems = [
  { href: '/dashboard', label: 'Главная', icon: Home },
  { href: '/dashboard/team', label: 'Команда', icon: Users },
  { href: '/dashboard/practice', label: 'Практика', icon: BookOpen },
  { href: '/dashboard/certificates', label: 'Сертификаты', icon: Award },
  { href: '/dashboard/community', label: 'Коммьюнити', icon: Calendar },
  { href: '/dashboard/jobs', label: 'Вакансии', icon: Briefcase },
  { href: '/dashboard/resumes', label: 'Сообщество', icon: FileText },
  { href: '/dashboard/partners', label: 'Партнёры', icon: Handshake },
]

const employerMenuItems = [
  { href: '/dashboard', label: 'Главная', icon: Home },
  { href: '/dashboard/jobs', label: 'Вакансии', icon: FilePlus },
  { href: '/dashboard/education', label: 'Образование', icon: GraduationCap },
  { href: '/dashboard/hr-system', label: 'HR-система', icon: Settings },
  { href: '/dashboard/partners', label: 'Партнёры', icon: Handshake },
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
  const [language, setLanguage] = useState<'RU' | 'KZ' | 'EN'>('RU')

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
    <aside className="hidden md:flex flex-col w-64 relative bg-white dark:bg-dark border-r border-gray-200/50 dark:border-border/50">
      {/* Content */}
      <nav className="relative flex-1 py-6" style={{ paddingLeft: '20%' }}>
        <div className="space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                  'relative flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200',
                  'font-semibold',
                isActive
                    ? 'bg-[#F97316] text-white'
                    : 'text-[#0F172A] dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
              )}
                style={{ fontFamily: 'Gilroy, sans-serif' }}
            >
              <Icon className={cn(
                'h-4 w-4 transition-all duration-200 flex-shrink-0',
                isActive ? 'text-white' : 'text-[#0F172A] dark:text-white'
              )} />
              <span className="flex-1">{item.label}</span>
            </Link>
          )
        })}
        </div>
        
        {/* Theme toggle and Language selector after menu items */}
        <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-border/50 space-y-3">
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-0.5">
              {(['RU', 'KZ', 'EN'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    'px-2 py-1 text-xs font-semibold rounded-md transition-all',
                    language === lang
                      ? 'bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white'
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Users,
  Building2,
  Briefcase,
  Calendar,
  GraduationCap,
  UsersRound,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import { useAdminStore } from '@/stores/useAdminStore'
import { useRouter } from 'next/navigation'

const adminMenuItems = [
  {
    title: 'Работники',
    href: '/admin/workers',
    icon: Users,
  },
  {
    title: 'Компании',
    href: '/admin/companies',
    icon: Building2,
  },
  {
    title: 'Вакансии',
    href: '/admin/vacancies',
    icon: Briefcase,
  },
  {
    title: 'Мероприятия',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'Практика',
    href: '/admin/practice',
    icon: GraduationCap,
  },
  {
    title: 'Сообщество',
    href: '/admin/community',
    icon: UsersRound,
  },
  {
    title: 'Статистика',
    href: '/admin/stats',
    icon: BarChart3,
  },
  {
    title: 'Настройки',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout, adminLogin } = useAdminStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Админ-панель</h2>
        {adminLogin && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Вход: {adminLogin}</p>
        )}
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {adminMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  )
}


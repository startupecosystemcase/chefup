'use client'

import { useState, useMemo } from 'react'
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
  ChevronLeft,
  ChevronRight,
  Ticket,
  TrendingUp,
} from 'lucide-react'
import { useAdminStore } from '@/stores/useAdminStore'
import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SheetClose } from '@/components/ui/sheet'

interface AdminSidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export function AdminSidebar({ mobile = false, onClose }: AdminSidebarProps = {}) {
  const pathname = usePathname()
  const { logout, adminLogin } = useAdminStore()
  const router = useRouter()
  const t = useTranslation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const adminMenuItems = useMemo(() => [
    {
      title: t.admin.workers,
      href: '/admin/workers',
      icon: Users,
    },
    {
      title: t.admin.companies,
      href: '/admin/companies',
      icon: Building2,
    },
    {
      title: t.admin.vacancies,
      href: '/admin/vacancies',
      icon: Briefcase,
    },
    {
      title: t.admin.events,
      href: '/admin/events',
      icon: Calendar,
    },
    {
      title: t.admin.practice,
      href: '/admin/practice',
      icon: GraduationCap,
    },
    {
      title: t.admin.community,
      href: '/admin/community',
      icon: UsersRound,
    },
    {
      title: t.admin.promo,
      href: '/admin/promo',
      icon: Ticket,
    },
    {
      title: t.admin.promoAnalytics,
      href: '/admin/promo-analytics',
      icon: TrendingUp,
    },
    {
      title: t.admin.statistics,
      href: '/admin/stats',
      icon: BarChart3,
    },
    {
      title: t.admin.settings,
      href: '/admin/settings',
      icon: Settings,
    },
  ], [t])

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
    onClose?.()
  }

  const handleLinkClick = () => {
    if (mobile) {
      onClose?.()
    }
  }

  const sidebarClasses = mobile
    ? 'flex flex-col bg-white dark:bg-gray-900 h-full'
    : 'hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 relative'

  return (
    <motion.div
      className={sidebarClasses}
      initial={false}
      animate={mobile ? {} : { width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 relative">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Админ-панель</h2>
              {adminLogin && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Вход: {adminLogin}</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">A</h2>
            </motion.div>
          )}
        </AnimatePresence>
        {!mobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {adminMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          const linkContent = (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                (isCollapsed && !mobile) && 'justify-center'
              )}
              title={(isCollapsed && !mobile) ? item.title : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {(!isCollapsed || mobile) && <span>{item.title}</span>}
            </Link>
          )
          
          if (mobile) {
            return (
              <SheetClose key={item.href} asChild>
                {linkContent}
              </SheetClose>
            )
          }
          
          return linkContent
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {mobile ? (
          <SheetClose asChild>
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>{t.buttons.logout}</span>
            </button>
          </SheetClose>
        ) : (
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors',
              isCollapsed && 'justify-center'
            )}
            title={isCollapsed ? t.buttons.logout : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>{t.buttons.logout}</span>}
          </button>
        )}
      </div>
    </motion.div>
  )
}


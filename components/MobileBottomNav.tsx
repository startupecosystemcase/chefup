'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Briefcase, MessageSquare, User, FileText } from 'lucide-react'
import { useAuthStore } from '@/stores/useOnboardingStore'

const navItems = [
  { href: '/dashboard', label: 'Главная', icon: LayoutDashboard },
  { href: '/dashboard/jobs', label: 'Вакансии', icon: Briefcase },
  { href: '/dashboard/responses', label: 'Отклики', icon: FileText },
  { href: '/dashboard/chat', label: 'Чат', icon: MessageSquare },
  { href: '/dashboard', label: 'Профиль', icon: User },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)

  if (!userId) return null

  // Показываем только на мобильных устройствах
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full min-w-[44px] min-h-[44px] transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}


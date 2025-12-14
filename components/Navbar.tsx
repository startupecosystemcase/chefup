'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { useTranslation } from '@/hooks/useTranslation'
import { Logo } from '@/components/Logo'
import { LogOut, User, Settings, FileText, MapPin, Award, Crown, Bell } from 'lucide-react'
import { cities, positions, cuisines } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const formData = useOnboardingStore((state) => state.formData)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const t = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  const getUserName = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName} ${formData.lastName}`
    }
    return 'Пользователь'
  }

  const getRoleLabel = () => {
    switch (userRole) {
      case 'applicant':
        return t.roles.applicant
      case 'employer':
        return t.roles.employer
      case 'moderator':
        return t.roles.moderator
      default:
        return ''
    }
  }

  const getLabel = (value: string, options: readonly { readonly value: string; readonly label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value
  }

  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus)
  const [hasNotifications, setHasNotifications] = useState(true) // В реальном приложении это будет из store

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-dark/95 dark:border-border/50 transition-colors">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2 md:gap-3">
          {mounted && userId ? (
            <>
              {/* Иконка уведомлений */}
              <button
                onClick={() => router.push('/dashboard/notifications')}
                className="relative flex items-center justify-center h-8 md:h-9 w-8 md:w-9 rounded-lg hover:bg-[#FFF8F0] dark:hover:bg-gray-800 transition-colors"
              >
                <Bell className="w-5 h-5 text-[#0F172A] dark:text-white" />
                {hasNotifications && (
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-[#F97316] rounded-full border-2 border-white dark:border-dark" />
                )}
              </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center gap-2 h-8 md:h-9 px-3 md:px-4 rounded-lg bg-[#F97316] hover:bg-[#F97316]/90 transition-colors">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-white text-xs md:text-sm font-medium hidden sm:inline">
                      {userRole === 'employer' ? t.common.companyProfile : t.common.myProfile}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-background dark:bg-dark border-border/50">
                  <DropdownMenuLabel className="flex flex-col gap-2">
                    <span className="font-semibold">{getUserName()}</span>
                    {userRole && (
                      <span className="text-xs text-muted-foreground font-normal">{getRoleLabel()}</span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.city && (
                        <AnimatedBadge variant="outline" className="text-xs px-2 py-0.5">
                          <MapPin className="w-3 h-3 mr-1" />
                          {getLabel(formData.city, cities)}
                        </AnimatedBadge>
                      )}
                      <AnimatedBadge 
                        variant={subscriptionStatus === 'PRO' ? 'default' : 'outline'} 
                        className={cn(
                          "text-xs px-2 py-0.5",
                          subscriptionStatus === 'PRO' && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                        )}
                      >
                        <Crown className={cn(
                          "w-3 h-3 mr-1",
                          subscriptionStatus === 'PRO' ? "text-yellow-500" : ""
                        )} />
                        {subscriptionStatus === 'PRO' ? 'PRO' : 'Базовая'}
                      </AnimatedBadge>
                  </div>
                  </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(userRole === 'employer' ? '/profile/company' : '/profile/worker')}>
                  <User className="w-4 h-4 mr-2" />
                    {t.common.profile}
                  </DropdownMenuItem>
                  {userRole === 'applicant' && (
                    <DropdownMenuItem onClick={() => router.push('/dashboard/responses')}>
                      <FileText className="w-4 h-4 mr-2" />
                      {t.menu.myResponses}
                </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => router.push('/dashboard/subscription')}>
                    <Crown className="w-4 h-4 mr-2" />
                    {t.menu.subscription}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  {t.common.settings}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.buttons.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          ) : (
            <>
              <ShinyButton variant="ghost" size="sm" className="hidden sm:flex" onClick={() => router.push('/auth')}>
                Войти
              </ShinyButton>
              <ShinyButton size="sm" onClick={() => router.push('/auth')}>
                Создать профиль
              </ShinyButton>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

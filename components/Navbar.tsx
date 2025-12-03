'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Logo } from '@/components/Logo'
import { LogOut, User, Settings } from 'lucide-react'
import { ThemeToggle } from '@/components/magicui/theme-toggle'

export function Navbar() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const formData = useOnboardingStore((state) => state.formData)
  const clearAuth = useAuthStore((state) => state.clearAuth)
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
        return 'Кандидат'
      case 'employer':
        return 'Работодатель'
      case 'moderator':
        return 'Модератор'
      default:
        return ''
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-dark/95 dark:border-border/50 transition-colors">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          {mounted && userId ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ShinyButton variant="ghost" className="flex items-center gap-1.5 md:gap-4 h-auto py-1.5 md:py-2">
                  <Avatar className="h-7 w-7 md:h-8 md:w-8 ring-2 ring-[#F97316]">
                    <AvatarImage src={formData.avatarUrl} />
                    <AvatarFallback className="text-xs md:text-sm bg-[#F97316] text-white">
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-xs md:text-sm font-medium">{getUserName()}</span>
                    {userRole && (
                      <AnimatedBadge variant="secondary" className="text-xs px-1.5 py-0 mt-0.5">
                        {getRoleLabel()}
                      </AnimatedBadge>
                    )}
                  </div>
                </ShinyButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background dark:bg-dark border-border/50">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <User className="w-4 h-4 mr-2" />
                  Личный кабинет
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard?tab=settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

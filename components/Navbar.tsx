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
import { LogOut, User, Settings, FileText } from 'lucide-react'
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
        return 'Шеф-повар'
      case 'employer':
        return 'Работодатель'
      case 'moderator':
        return 'Модератор'
      default:
        return ''
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-dark/95 dark:border-border/50 transition-colors">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2 md:gap-3">
          {mounted && userId ? (
            <>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 h-8 md:h-9 px-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-7 w-7 md:h-8 md:w-8">
                      <AvatarImage src={formData.avatarUrl} />
                      <AvatarFallback className="text-xs md:text-sm bg-muted text-foreground">
                        <User className="w-4 h-4 md:w-5 md:h-5" />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background dark:bg-dark border-border/50">
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span className="font-semibold">{getUserName()}</span>
                    {userRole && (
                      <span className="text-xs text-muted-foreground font-normal">{getRoleLabel()}</span>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <User className="w-4 h-4 mr-2" />
                    Профиль
                  </DropdownMenuItem>
                  {userRole === 'applicant' && (
                    <DropdownMenuItem onClick={() => router.push('/dashboard/responses')}>
                      <FileText className="w-4 h-4 mr-2" />
                      Мои заявки
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
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
            </>
          ) : (
            <>
              <ThemeToggle />
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

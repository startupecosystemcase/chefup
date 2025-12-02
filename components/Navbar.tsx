'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-4 md:gap-4">
          {mounted && userId ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1.5 md:gap-4 h-auto py-1.5 md:py-2">
                  <Avatar className="h-7 w-7 md:h-8 md:w-8">
                    <AvatarImage src={formData.avatarUrl} />
                    <AvatarFallback className="text-xs md:text-sm">
                      {formData.firstName?.[0] || 'U'}
                      {formData.lastName?.[0] || ''}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-xs md:text-sm font-medium">{getUserName()}</span>
                    {userRole && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        {getRoleLabel()}
                      </Badge>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
              <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => router.push('/auth')}>
                Войти
              </Button>
              <Button size="sm" className="text-xs md:text-sm px-3 md:px-4" onClick={() => router.push('/auth')}>
                Создать профиль
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

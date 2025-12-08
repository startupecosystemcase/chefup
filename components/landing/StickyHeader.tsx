'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { Logo } from '@/components/Logo'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)
  const userId = useAuthStore((state) => state.userId)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#FEFCF9]/80 backdrop-blur-2xl shadow-sm border-b border-white/20' 
          : 'bg-[#FEFCF9]/60 backdrop-blur-xl'
      }`}
    >
      <div className="container mx-auto px-5 md:px-6 lg:px-[120px]">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-20">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            {userId ? (
              <ShinyButton 
                size="default"
                className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
                onClick={() => router.push('/dashboard')}
              >
                <User className="w-4 h-4 mr-2" />
                Профиль
              </ShinyButton>
            ) : (
              <>
                <ShinyButton 
                  variant="outline"
                  size="default"
                  className="hidden sm:flex"
                  onClick={() => router.push('/auth')}
                >
                  Войти
                </ShinyButton>
                <ShinyButton
                  size="default"
                  onClick={() => router.push('/auth')}
                >
                  Создать профиль
                </ShinyButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

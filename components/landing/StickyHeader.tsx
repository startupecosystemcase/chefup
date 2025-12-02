'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
          ? 'bg-white/90 backdrop-blur-2xl shadow-sm border-b border-white/30' 
          : 'bg-white/70 backdrop-blur-xl'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-28">
          <div className="flex items-center -ml-2 md:-ml-4">
            <Logo className="h-10 md:h-12 lg:h-14" />
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            {userId ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-11 w-11 md:h-12 md:w-12"
                onClick={() => router.push('/dashboard')}
                aria-label="Профиль"
              >
                <User className="w-6 h-6" />
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-11 w-11 md:h-12 md:w-12"
                  onClick={() => router.push('/auth')}
                  aria-label="Войти"
                >
                  <User className="w-6 h-6" />
                </Button>
                <Button
                  className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-sm md:text-base px-6 md:px-8 py-3 md:py-4 h-11 md:h-12"
                  onClick={() => router.push('/auth')}
                >
                  Создать профиль
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

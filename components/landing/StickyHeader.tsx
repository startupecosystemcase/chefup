'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { useRouter } from 'next/navigation'

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
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-5 lg:px-[120px]">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold text-[#0F172A]">ChefUp</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {userId ? (
              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                Войти
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push('/auth')}>
                  Войти
                </Button>
                <Button
                  className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
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


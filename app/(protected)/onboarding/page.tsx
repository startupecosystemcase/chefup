'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { OnboardingWizard } from '@/components/OnboardingWizard'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function OnboardingPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    // Перенаправляем работодателей на их онбординг
    if (userRole === 'employer') {
      router.push('/onboarding/employer')
    }
  }, [userId, userRole, router])

  if (!userId || userRole === 'employer') {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <OnboardingWizard />
      </main>
      <Footer />
    </div>
  )
}


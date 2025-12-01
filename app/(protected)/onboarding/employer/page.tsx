'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { EmployerOnboardingWizard } from '@/components/EmployerOnboardingWizard'

export default function EmployerOnboardingPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    // Перенаправляем соискателей на их онбординг
    if (userRole === 'applicant') {
      router.push('/onboarding')
    }
  }, [userId, userRole, router])

  if (!userId || userRole !== 'employer') {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <EmployerOnboardingWizard />
      </main>
      <Footer />
    </div>
  )
}


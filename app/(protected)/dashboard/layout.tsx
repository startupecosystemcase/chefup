'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MobileBottomNav } from '@/components/MobileBottomNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
    }
  }, [userId, router])

  if (!userId) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav />
      <Footer />
    </div>
  )
}


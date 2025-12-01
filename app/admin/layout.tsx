'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { MobileBottomNav } from '@/components/MobileBottomNav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    if (userRole !== 'moderator') {
      router.push('/dashboard')
      return
    }
  }, [userId, userRole, router])

  if (!userId || userRole !== 'moderator') {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
      <MobileBottomNav />
      <Footer />
    </div>
  )
}


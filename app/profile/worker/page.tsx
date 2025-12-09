'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useOnboardingStore'

export default function ProfileWorkerPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }

    // Редирект на соответствующий профиль
    if (userRole === 'employer') {
      router.push('/dashboard/profile/company')
    } else {
      router.push('/dashboard/profile')
    }
  }, [userId, userRole, router])

  return null
}


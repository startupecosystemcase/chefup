'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/stores/useAdminStore'

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated } = useAdminStore()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/workers')
    } else {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  return null
}


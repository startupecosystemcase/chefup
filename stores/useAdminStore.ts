'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AdminState {
  isAuthenticated: boolean
  adminId: string | null
  adminLogin: string | null
  login: (login: string, password: string) => Promise<boolean>
  logout: () => void
}

// Временные креденшлы (в продакшне должны быть в env переменных)
const ADMIN_CREDENTIALS = {
  login: 'admin',
  password: 'passport', // Временный пароль
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminId: null,
      adminLogin: null,
      login: async (login: string, password: string) => {
        // Простая проверка (в продакшне должна быть проверка через API с хешированием)
        if (login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
          const adminId = `admin-${Date.now()}`
          set({
            isAuthenticated: true,
            adminId,
            adminLogin: login,
          })
          return true
        }
        return false
      },
      logout: () => {
        set({
          isAuthenticated: false,
          adminId: null,
          adminLogin: null,
        })
      },
    }),
    {
      name: 'admin-storage',
      storage: typeof window !== 'undefined' 
        ? createJSONStorage(() => localStorage)
        : createJSONStorage(() => ({
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          })),
    }
  )
)


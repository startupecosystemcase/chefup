'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-7 w-14 rounded-lg bg-gray-100/50 dark:bg-gray-800/50" />
    )
  }

  return (
    <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-0.5">
      <button
        onClick={() => setTheme('light')}
        className={cn(
          'px-2 py-1 rounded-md transition-all flex items-center justify-center',
          theme === 'light'
            ? 'bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white'
        )}
        aria-label="Светлая тема"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={cn(
          'px-2 py-1 rounded-md transition-all flex items-center justify-center',
          theme === 'dark'
            ? 'bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white'
        )}
        aria-label="Темная тема"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}


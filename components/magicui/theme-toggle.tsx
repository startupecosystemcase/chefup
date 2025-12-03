'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full bg-muted" />
    )
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative h-9 w-9 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center justify-center transition-all duration-300 hover:bg-primary/10 hover:border-primary/30"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Переключить тему"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-4 w-4 text-primary" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? -180 : 0,
          opacity: theme === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-4 w-4 text-primary" />
      </motion.div>
    </motion.button>
  )
}


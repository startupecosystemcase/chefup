'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          ref={ref}
          className={cn(
            'flex h-12 md:h-12 min-h-[44px] w-full rounded-xl border border-input bg-background/80 backdrop-blur-sm px-4 py-3 text-sm',
            'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-300',
            'focus:border-primary focus:shadow-lg focus:shadow-primary/20',
            className
          )}
          {...props}
        />
      </motion.div>
    )
  }
)
AnimatedInput.displayName = 'AnimatedInput'


'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AnimatedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AnimatedTextarea = React.forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-xl border border-input bg-background/80 backdrop-blur-sm px-4 py-3 text-sm',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-400',
          'resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
AnimatedTextarea.displayName = 'AnimatedTextarea'

export { AnimatedTextarea }

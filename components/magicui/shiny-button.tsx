'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

interface ShinyButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  asChild?: boolean
}

export function ShinyButton({
  children,
  className,
  variant = 'default',
  size = 'default',
  onClick,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
  asChild = false,
  ...props
}: ShinyButtonProps) {
  const sizeClasses = {
    sm: 'h-9 px-3 text-sm min-h-[36px]',
    default: 'h-12 px-6 text-base min-h-[56px]',
    lg: 'h-14 px-8 text-lg min-h-[56px]',
    icon: 'h-12 w-12 min-h-[56px] min-w-[56px] p-0',
  }

  const baseClasses = 'relative inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group'

  if (variant === 'default') {
    const defaultClasses = cn(
      baseClasses,
      sizeClasses[size],
      'bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] text-white',
      'shadow-lg shadow-[#F97316]/30 hover:shadow-xl hover:shadow-[#F97316]/40',
      className
    )
    
    if (asChild) {
      return (
        <Slot className={defaultClasses}>
          {children}
        </Slot>
      )
    }
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(defaultClasses, 'hover:scale-105 active:scale-95')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </motion.button>
    )
  }

  if (variant === 'outline') {
    const outlineClasses = cn(
      baseClasses,
      sizeClasses[size],
      'border-2 border-primary/50 bg-background/80 backdrop-blur-sm text-primary',
      'hover:bg-primary/10 hover:border-primary',
      'shadow-sm hover:shadow-md',
      className
    )
    
    if (asChild) {
      return (
        <Slot className={outlineClasses}>
          {children}
        </Slot>
      )
    }
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={outlineClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  if (variant === 'destructive') {
    const destructiveClasses = cn(
      baseClasses,
      sizeClasses[size],
      'bg-destructive text-destructive-foreground',
      'hover:bg-destructive/90',
      'shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40',
      className
    )
    
    if (asChild) {
      return (
        <Slot className={destructiveClasses}>
          {children}
        </Slot>
      )
    }
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={destructiveClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  const ghostClasses = cn(
    baseClasses,
    sizeClasses[size],
    'hover:bg-accent/80 hover:text-accent-foreground',
    className
  )

  if (asChild) {
    return (
      <Slot className={ghostClasses}>
        {children}
      </Slot>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={ghostClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}


'use client'

import React, { useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'

interface ShinyButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  asChild?: boolean
  withConfetti?: boolean
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
  withConfetti = false,
  ...props
}: ShinyButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    // Ripple effect
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { x, y, id: Date.now() }
    
    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    // Confetti effect
    if (withConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F97316', '#FB923C', '#FDBA74'],
      })
    }

    onClick?.(e)
  }

  const sizeClasses = {
    sm: 'h-11 px-4 text-sm font-semibold min-h-[44px]',
    default: 'h-16 px-8 text-base font-semibold min-h-[64px]',
    lg: 'h-16 px-10 text-lg font-semibold min-h-[64px]',
    icon: 'h-16 w-16 min-h-[64px] min-w-[64px] p-0',
  }

  const baseClasses = 'relative inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group'

  if (variant === 'default') {
    const defaultClasses = cn(
      baseClasses,
      sizeClasses[size],
      'bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] text-white',
      'shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.4)]',
      'border border-[#F97316]/20',
      'backdrop-blur-xl',
      className
    )
    
    if (asChild) {
      return (
        <Slot className={defaultClasses} onClick={handleClick}>
          {children}
        </Slot>
      )
    }
    
    const { onDrag, onDragEnd, onDragStart, ...buttonProps } = props
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={defaultClasses}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...(buttonProps as any)}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
            animate={{
              width: 300,
              height: 300,
              x: -150,
              y: -150,
              opacity: [0.5, 0],
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F97316] via-[#FB923C] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100"
          style={{
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    )
  }

  if (variant === 'outline') {
    const outlineClasses = cn(
      baseClasses,
      sizeClasses[size],
      'border border-[#F97316]/30 bg-white/60 dark:bg-dark/40 backdrop-blur-2xl text-[#F97316]',
      'hover:bg-white/80 dark:hover:bg-dark/60 hover:border-[#F97316]/50',
      'shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(249,115,22,0.15)]',
      className
    )
    
    if (asChild) {
      return (
        <Slot className={outlineClasses} onClick={handleClick}>
          {children}
        </Slot>
      )
    }
    
    const { onDrag, onDragEnd, onDragStart, ...buttonProps } = props
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={outlineClasses}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...(buttonProps as any)}
      >
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-[#F97316]/20"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
            animate={{
              width: 200,
              height: 200,
              x: -100,
              y: -100,
              opacity: [0.4, 0],
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        <span className="relative z-10">{children}</span>
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
        <Slot className={destructiveClasses} onClick={handleClick}>
          {children}
        </Slot>
      )
    }
    
    const { onDrag, onDragEnd, onDragStart, ...buttonProps } = props
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={destructiveClasses}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        {...(buttonProps as any)}
      >
        {children}
      </motion.button>
    )
  }

  const ghostClasses = cn(
    baseClasses,
    sizeClasses[size],
    'hover:bg-white/40 dark:hover:bg-dark/60 backdrop-blur-xl',
    'hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
    className
  )

  if (asChild) {
    return (
      <Slot className={ghostClasses} onClick={handleClick}>
        {children}
      </Slot>
    )
  }

  const { onDrag, onDragEnd, onDragStart, ...buttonProps } = props
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={ghostClasses}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...(buttonProps as any)}
    >
      {children}
    </motion.button>
  )
}

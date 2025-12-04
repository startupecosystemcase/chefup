'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'default' | 'card' | 'text' | 'circular'
  width?: string | number
  height?: string | number
}

export function LoadingSkeleton({ 
  className, 
  variant = 'default',
  width,
  height 
}: LoadingSkeletonProps) {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] rounded'
  
  const variantClasses = {
    default: 'h-4',
    card: 'h-48',
    text: 'h-4',
    circular: 'rounded-full',
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

interface LoadingCardProps {
  className?: string
  lines?: number
}

export function LoadingCard({ className, lines = 3 }: LoadingCardProps) {
  return (
    <div className={cn('p-6 space-y-4 bg-white dark:bg-dark/50 rounded-xl border border-border/50', className)}>
      <LoadingSkeleton variant="default" className="w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton key={i} variant="text" className="w-full" />
      ))}
    </div>
  )
}


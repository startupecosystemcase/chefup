'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  style?: React.CSSProperties
  onClick?: () => void
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function AnimatedCard({
  children,
  className,
  hover = true,
  style,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-3 md:p-6 shadow-sm transition-all duration-300',
        hover && 'hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}


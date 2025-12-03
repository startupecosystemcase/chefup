'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HoverBorderGradientProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function HoverBorderGradient({
  children,
  className,
  containerClassName,
}: HoverBorderGradientProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl border border-transparent bg-background/80 backdrop-blur-sm p-6 transition-all duration-300',
        'hover:shadow-lg hover:shadow-primary/20',
        containerClassName
      )}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, #F97316, #FB923C, #F97316)',
          backgroundSize: '200% 200%',
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
      <div className="relative rounded-xl bg-background dark:bg-dark p-6">
        <div className={cn('relative z-10', className)}>
          {children}
        </div>
      </div>
    </div>
  )
}


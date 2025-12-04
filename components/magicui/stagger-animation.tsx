'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerAnimationProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
}

export function StaggerAnimation({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  duration = 0.5 
}: StaggerAnimationProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  duration?: number
}

export function StaggerItem({ 
  children, 
  className = '',
  duration = 0.5 
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: 'easeOut',
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}


'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 40, x: 0 }
      case 'down': return { y: -40, x: 0 }
      case 'left': return { y: 0, x: 40 }
      case 'right': return { y: 0, x: -40 }
      default: return { y: 40, x: 0 }
    }
  }

  const initialPos = getInitialPosition()

  const variants = {
    hidden: {
      opacity: 0,
      y: initialPos.y,
      x: initialPos.x,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1] as const, // Apple HIG easing
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}


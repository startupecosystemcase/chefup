'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ end, suffix = '', duration = 2, className }: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <span ref={ref} className={className}>
      {inView && <CountUp end={end} duration={duration} suffix={suffix} />}
      {!inView && '0'}
    </span>
  )
}


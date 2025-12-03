'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedNumber({
  value,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedNumberProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <>
          {prefix}
          <CountUp
            end={value}
            duration={duration}
            decimals={decimals}
            separator=" "
          />
          {suffix}
        </>
      ) : (
        <>
          {prefix}0{suffix}
        </>
      )}
    </span>
  )
}


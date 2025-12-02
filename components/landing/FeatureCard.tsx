'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  stat?: string
  description?: string
}

export function FeatureCard({ icon: Icon, title, stat, description }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-full border-2 border-transparent hover:border-[#F97316]/20 transition-all duration-300 bg-white">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <motion.div
            animate={hovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-[#F97316]/10 flex items-center justify-center mb-8"
          >
            <Icon className="w-8 h-8 text-[#F97316]" />
          </motion.div>
          
          {hovered && stat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl font-bold text-[#F97316] mb-2"
            >
              {stat}
            </motion.div>
          )}
          
          <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3>
          {description && (
            <p className="text-sm text-[#64748B] mt-2">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}


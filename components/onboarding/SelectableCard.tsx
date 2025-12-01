'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectableCardProps {
  icon?: LucideIcon
  label: string
  value: string
  selected: boolean
  onSelect: (value: string) => void
  className?: string
}

export function SelectableCard({
  icon: Icon,
  label,
  value,
  selected,
  onSelect,
  className,
}: SelectableCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(value)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={selected ? { scale: 1 } : { scale: 1 }}
      className={cn(
        'p-4 rounded-lg border-2 transition-all duration-300 text-left',
        'flex flex-col items-center gap-3',
        selected
          ? 'bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-[#F97316]/50 ring-4 ring-[#F97316]/30'
          : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-[#F97316]/30',
        className
      )}
    >
      {Icon && (
        <motion.div
          animate={selected ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className={cn('w-6 h-6', selected ? 'text-white' : 'text-gray-500')} />
        </motion.div>
      )}
      <span className="font-medium text-sm md:text-base">{label}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center"
        >
          <span className="text-[#F97316] text-xs">✓</span>
        </motion.div>
      )}
    </motion.button>
  )
}


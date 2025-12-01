'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectableBadgeProps {
  icon?: LucideIcon
  label: string
  value: string
  selected: boolean
  onToggle: (value: string) => void
  className?: string
}

export function SelectableBadge({
  icon: Icon,
  label,
  value,
  selected,
  onToggle,
  className,
}: SelectableBadgeProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(value)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={selected ? { scale: 1 } : { scale: 1 }}
      className={cn(
        'px-4 py-2 rounded-full border-2 transition-all duration-300',
        'flex items-center gap-2 text-sm font-medium',
        selected
          ? 'bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-[#F97316]/50 ring-2 ring-[#F97316]/30'
          : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-[#F97316]/30',
        className
      )}
    >
      {Icon && (
        <Icon className={cn('w-4 h-4', selected ? 'text-white' : 'text-gray-500')} />
      )}
      {label}
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-1"
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  )
}


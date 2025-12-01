'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BadgeOption {
  value: string
  label: string
}

interface BadgeSelectorProps {
  options: BadgeOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

export function BadgeSelector({ options, selected, onChange, className }: BadgeSelectorProps) {
  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value)
        return (
          <Badge
            key={option.value}
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer transition-all hover:scale-105',
              isSelected && 'bg-primary text-white'
            )}
            onClick={() => toggleSelection(option.value)}
          >
            {option.label}
          </Badge>
        )
      })}
    </div>
  )
}


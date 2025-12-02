'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BadgeOption {
  value: string
  label: string
}

interface BadgeSelectorProps {
  options: readonly BadgeOption[] | readonly { readonly value: string; readonly label: string }[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
  maxSelections?: number
}

export function BadgeSelector({ options, selected, onChange, className, maxSelections }: BadgeSelectorProps) {
  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      if (maxSelections && selected.length >= maxSelections) {
        return
      }
      onChange([...selected, value])
    }
  }

  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
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


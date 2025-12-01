'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface VisualCardSelectorProps<T extends string> {
  options: Array<{ value: T; label: string; icon?: React.ReactNode; description?: string; color?: string }>
  selected: T | T[]
  onChange: (value: T | T[]) => void
  multiple?: boolean
  className?: string
}

export function VisualCardSelector<T extends string>({
  options,
  selected,
  onChange,
  multiple = false,
  className,
}: VisualCardSelectorProps<T>) {
  const isSelected = (value: T) => {
    if (multiple) {
      return Array.isArray(selected) && selected.includes(value)
    }
    return selected === value
  }

  const handleClick = (value: T) => {
    if (multiple) {
      const current = Array.isArray(selected) ? selected : []
      if (current.includes(value)) {
        onChange(current.filter((v) => v !== value))
      } else {
        onChange([...current, value])
      }
    } else {
      onChange(value)
    }
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
      {options.map((option) => {
        const selectedState = isSelected(option.value)
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleClick(option.value)}
            className={cn(
              'relative p-6 rounded-xl border-2 transition-all duration-300 text-left group',
              'hover:scale-105 hover:shadow-lg',
              selectedState
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-muted bg-background hover:border-primary/50'
            )}
          >
            {selectedState && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            {option.icon && (
              <div
                className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors',
                  selectedState ? 'bg-primary/10' : 'bg-muted group-hover:bg-primary/5'
                )}
              >
                <div className={cn(selectedState ? 'text-primary' : 'text-muted-foreground')}>
                  {option.icon}
                </div>
              </div>
            )}
            <h3 className={cn('font-semibold mb-1', selectedState ? 'text-primary' : 'text-foreground')}>
              {option.label}
            </h3>
            {option.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{option.description}</p>
            )}
          </button>
        )
      })}
    </div>
  )
}


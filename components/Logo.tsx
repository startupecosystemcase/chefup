import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showAssociation?: boolean
  variant?: 'default' | 'white'
}

export function Logo({ className, showAssociation = false, variant = 'default' }: LogoProps) {
  const chefColor = variant === 'white' ? 'text-white' : 'text-black'
  const upColor = variant === 'white' ? 'text-white' : 'text-primary'
  const associationColor = variant === 'white' ? 'text-white/80' : 'text-gray-600'
  const shadowColor = variant === 'white' ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]'

  return (
    <Link href="/" className={cn('inline-block', className)}>
      <div className="flex flex-col items-start">
        <div className={cn('text-2xl md:text-3xl font-bold leading-none tracking-tight', shadowColor)}>
          <span className={chefColor}>chef</span>
          <span className={upColor}>up</span>
        </div>
        {showAssociation && (
          <div className={cn('text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mt-1', associationColor, shadowColor)}>
            association
          </div>
        )}
      </div>
    </Link>
  )
}


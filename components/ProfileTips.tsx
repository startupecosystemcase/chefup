'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AlertCircle, Sparkles, X, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tip {
  id: string
  type: 'hot' | 'recommendation' | 'warning'
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    onboardingStep?: number // Шаг онбординга для перехода
  }
  impact?: string // Например: "увеличит количество совпадений на 34%"
}

interface ProfileTipsProps {
  tips: Tip[]
  onDismiss?: (tipId: string) => void
}

export function ProfileTips({ tips, onDismiss }: ProfileTipsProps) {
  const router = useRouter()
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const handleDismiss = (tipId: string) => {
    setDismissed((prev) => new Set([...prev, tipId]))
    onDismiss?.(tipId)
  }

  const handleAction = (tip: Tip) => {
    if (tip.action) {
      if (tip.action.onboardingStep) {
        // Переходим на конкретный шаг онбординга
        router.push(`/onboarding?step=${tip.action.onboardingStep}`)
      } else {
        tip.action.onClick()
      }
    }
  }

  const visibleTips = tips.filter((tip) => !dismissed.has(tip.id))

  if (visibleTips.length === 0) return null

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 mb-8">
        <Brain className="w-5 h-5 text-[#F97316]" />
        <h3 className="text-lg font-semibold">Персональные рекомендации на основе ChefUp AI</h3>
      </div>
      {visibleTips.map((tip) => (
        <AnimatedCard
          key={tip.id}
          className={cn(
            'relative border-l-4 transition-all duration-300 animate-fade-in',
            tip.type === 'hot' && 'border-l-orange-500 bg-orange-50/50 dark:bg-orange-900/20',
            tip.type === 'recommendation' && 'border-l-primary bg-primary/5 dark:bg-primary/10',
            tip.type === 'warning' && 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/20'
          )}
        >
          <div className="pt-4 p-6">
            <div className="flex items-start justify-between gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  {tip.type === 'hot' && (
                    <AnimatedBadge variant="default" className="bg-[#F97316]">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Рекомендация
                    </AnimatedBadge>
                  )}
                  {tip.type === 'recommendation' && (
                    <AnimatedBadge variant="secondary">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Рекомендация
                    </AnimatedBadge>
                  )}
                  {tip.type === 'warning' && (
                    <AnimatedBadge variant="outline" className="border-yellow-500 text-yellow-700 dark:text-yellow-400">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Важно
                    </AnimatedBadge>
                  )}
                </div>
                <h4 className="font-semibold mb-1 dark:text-white">{tip.title}</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">{tip.description}</p>
                {tip.impact && (
                  <p className="text-xs text-primary font-medium mb-2">{tip.impact}</p>
                )}
                {tip.action && (
                  <ShinyButton
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(tip)}
                    className="mt-2"
                  >
                    {tip.action.label}
                  </ShinyButton>
                )}
              </div>
              <ShinyButton
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleDismiss(tip.id)}
              >
                <X className="w-4 h-4" />
              </ShinyButton>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  )
}


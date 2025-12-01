'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-[#F97316]" />
        <h3 className="text-lg font-semibold">Персональные рекомендации на основе ChefUp AI</h3>
      </div>
      {visibleTips.map((tip) => (
        <Card
          key={tip.id}
          className={cn(
            'relative border-l-4 transition-all duration-300 animate-fade-in',
            tip.type === 'hot' && 'border-l-orange-500 bg-orange-50/50',
            tip.type === 'recommendation' && 'border-l-primary bg-primary/5',
            tip.type === 'warning' && 'border-l-yellow-500 bg-yellow-50/50'
          )}
        >
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {tip.type === 'hot' && (
                    <Badge variant="default" className="bg-[#F97316]">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Рекомендация
                    </Badge>
                  )}
                  {tip.type === 'recommendation' && (
                    <Badge variant="secondary">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Рекомендация
                    </Badge>
                  )}
                  {tip.type === 'warning' && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Важно
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                {tip.impact && (
                  <p className="text-xs text-primary font-medium mb-2">{tip.impact}</p>
                )}
                {tip.action && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(tip)}
                    className="mt-2"
                  >
                    {tip.action.label}
                  </Button>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleDismiss(tip.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


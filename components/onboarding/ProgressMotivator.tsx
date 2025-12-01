'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from '@/components/ui/progress'

interface ProgressMotivatorProps {
  currentStep: number
  totalSteps: number
}

const motivators = [
  "Вперёд! Расскажи о себе",
  "Отлично! Уже 30%",
  "Круто! Ещё немного...",
  "Почти готово!",
  "Последний рывок!",
]

export function ProgressMotivator({ currentStep, totalSteps }: ProgressMotivatorProps) {
  const progress = ((currentStep) / totalSteps) * 100
  const motivator = motivators[currentStep - 1] || motivators[0]

  return (
    <div className="w-full space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-lg font-semibold text-[#F97316]"
          >
            {motivator}
          </motion.p>
        </AnimatePresence>
        <span className="text-sm text-[#64748B]">
          Шаг {currentStep} из {totalSteps}
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-3 bg-gray-200"
      />
    </div>
  )
}


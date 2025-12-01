'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, BarChart3, Award } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Заполните профиль',
    description: 'Укажите опыт, навыки, специализацию и предпочтения',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Алгоритм анализирует',
    description: 'Система автоматически подбирает релевантные вакансии',
    icon: BarChart3,
  },
  {
    id: 3,
    title: 'Получайте предложения',
    description: 'Работодатели видят ваше резюме и отправляют приглашения',
    icon: Award,
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep >= step.id
            const progress = activeStep > step.id ? 100 : activeStep === step.id ? 50 : 0

            return (
              <div key={step.id} className="relative z-10">
                <motion.button
                  onClick={() => setActiveStep(step.id)}
                  className="w-16 h-16 rounded-full bg-white border-4 flex items-center justify-center transition-all"
                  style={{
                    borderColor: isActive ? '#F97316' : '#E2E8F0',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-8 h-8 ${isActive ? 'text-[#F97316]' : 'text-[#64748B]'}`} />
                </motion.button>
                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 left-full w-full h-1 bg-[#F97316] -translate-y-1/2 -z-10"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white border-2 border-[#F97316]/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                {steps[activeStep - 1].title}
              </h3>
              <p className="text-lg text-[#64748B]">
                {steps[activeStep - 1].description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


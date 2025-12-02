'use client'

import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OnboardingFormData } from '@/types/onboarding.types'

interface ProfileCompletenessProps {
  formData: Partial<OnboardingFormData>
}

const requiredFields = [
  { key: 'firstName', label: 'Имя', weight: 5 },
  { key: 'lastName', label: 'Фамилия', weight: 5 },
  { key: 'city', label: 'Город', weight: 5 },
  { key: 'age', label: 'Возраст', weight: 5 },
  { key: 'currentPosition', label: 'Текущая должность', weight: 5 },
  { key: 'desiredPosition', label: 'Желаемая должность', weight: 5 },
  { key: 'experience', label: 'Опыт работы', weight: 10 },
  { key: 'education', label: 'Образование', weight: 5 },
  { key: 'cuisines', label: 'Специализация', weight: 10 },
  { key: 'salaryExpectation', label: 'Зарплатные ожидания', weight: 10 },
  { key: 'phone', label: 'Телефон', weight: 10 },
]

const optionalFields = [
  { key: 'about', label: 'О себе', weight: 5 },
  { key: 'avatarUrl', label: 'Фото профиля', weight: 5 },
  { key: 'certificates', label: 'Сертификаты', weight: 5 },
  { key: 'additionalSkills', label: 'Дополнительные навыки', weight: 5 },
  { key: 'email', label: 'Email', weight: 5 },
]

export function ProfileCompleteness({ formData }: ProfileCompletenessProps) {
  const calculateCompleteness = () => {
    let totalWeight = 0
    let filledWeight = 0

    // Проверяем обязательные поля
    requiredFields.forEach((field) => {
      totalWeight += field.weight
      const value = formData[field.key as keyof OnboardingFormData]
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          filledWeight += field.weight
        } else if (!Array.isArray(value)) {
          filledWeight += field.weight
        }
      }
    })

    // Проверяем необязательные поля
    optionalFields.forEach((field) => {
      totalWeight += field.weight
      const value = formData[field.key as keyof OnboardingFormData]
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          filledWeight += field.weight
        } else if (!Array.isArray(value)) {
          filledWeight += field.weight
        }
      }
    })

    return Math.round((filledWeight / totalWeight) * 100)
  }

  const completeness = calculateCompleteness()

  const getMissingFields = () => {
    const missing: string[] = []
    
    requiredFields.forEach((field) => {
      const value = formData[field.key as keyof OnboardingFormData]
      if (value === undefined || value === null || value === '') {
        missing.push(field.label)
      } else if (Array.isArray(value) && value.length === 0) {
        missing.push(field.label)
      }
    })

    return missing
  }

  const missingFields = getMissingFields()

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-medium">Заполненность профиля</span>
          <span className="text-lg font-bold text-primary bg-gradient-to-r from-primary to-[#FB923C] bg-clip-text text-transparent">{completeness}%</span>
        </div>
        <Progress value={completeness} className="h-4 rounded-full" />
      </div>

      {completeness === 100 && (
        <Badge variant="default" className="flex items-center gap-3 px-4 py-2 w-fit bg-gradient-to-r from-primary to-[#FB923C]">
          <CheckCircle2 className="w-5 h-5" />
          Профиль заполнен на 100%
        </Badge>
      )}

      {missingFields.length > 0 && (
        <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 backdrop-blur-sm">
          <div className="flex items-start gap-4 mb-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-medium text-orange-800 mb-2">Не заполнены обязательные поля:</p>
              <ul className="text-sm text-orange-700 space-y-2">
                {missingFields.map((field, idx) => (
                  <li key={idx}>• {field}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Микро-награды */}
      <div className="flex flex-wrap gap-3">
        {(formData.currentPosition || formData.desiredPosition) && (
          <Badge variant="secondary" className="text-xs">
            ✓ Заполнил должность
          </Badge>
        )}
        {formData.experience && (
          <Badge variant="secondary" className="text-xs">
            ✓ Заполнил опыт
          </Badge>
        )}
        {formData.avatarUrl && (
          <Badge variant="secondary" className="text-xs">
            ✓ Добавил фото
          </Badge>
        )}
        {formData.certificates && formData.certificates.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            ✓ Добавил сертификаты
          </Badge>
        )}
      </div>
    </div>
  )
}


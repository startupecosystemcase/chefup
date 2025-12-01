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
  { key: 'position', label: 'Должность', weight: 10 },
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
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Заполненность профиля</span>
          <span className="text-sm font-bold text-primary">{completeness}%</span>
        </div>
        <Progress value={completeness} className="h-3" />
      </div>

      {completeness === 100 && (
        <Badge variant="default" className="flex items-center gap-2 w-fit">
          <CheckCircle2 className="w-4 h-4" />
          Профиль заполнен на 100%
        </Badge>
      )}

      {missingFields.length > 0 && (
        <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 mb-1">Не заполнены обязательные поля:</p>
              <ul className="text-xs text-orange-700 space-y-1">
                {missingFields.map((field, idx) => (
                  <li key={idx}>• {field}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Микро-награды */}
      <div className="flex flex-wrap gap-2">
        {formData.position && (
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


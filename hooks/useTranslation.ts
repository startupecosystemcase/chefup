'use client'

import { useAuthStore } from '@/stores/useOnboardingStore'
import { getTranslations, type Translations } from '@/lib/translations'

export function useTranslation(): Translations {
  const language = useAuthStore((state) => state.language || 'RU')
  return getTranslations(language)
}


import type { OnboardingFormData } from '@/types/onboarding.types'
import { mockJobs } from '@/lib/mockData'
import { positions, experienceRanges, cuisines, cities } from '@/lib/data'

export type Job = typeof mockJobs[number]

export interface JobRelevance {
  job: Job
  score: number
  reasons: string[]
}

/**
 * Вычисляет релевантность вакансии для соискателя на основе его данных онбординга
 */
export function calculateJobRelevance(
  job: Job,
  applicantData: Partial<OnboardingFormData>
): JobRelevance {
  let score = 0
  const reasons: string[] = []

  // 1. Соответствие позиции (40 баллов)
  if (applicantData.position) {
    const applicantPosition = positions.find(p => p.value === applicantData.position)?.label
    if (applicantPosition && job.position.toLowerCase().includes(applicantPosition.toLowerCase())) {
      score += 40
      reasons.push('Соответствие желаемой должности')
    } else if (applicantPosition) {
      // Частичное соответствие (например, "Повар" и "Повар горячего цеха")
      const applicantPosLower = applicantPosition.toLowerCase()
      const jobPosLower = job.position.toLowerCase()
      if (jobPosLower.includes(applicantPosLower) || applicantPosLower.includes(jobPosLower)) {
        score += 25
        reasons.push('Частичное соответствие должности')
      }
    }
  }

  // 2. Соответствие опыта работы (25 баллов)
  if (applicantData.experience && job.experience) {
    const applicantExp = experienceRanges.find(e => e.value === applicantData.experience)?.label
    if (applicantExp === job.experience) {
      score += 25
      reasons.push('Точное соответствие опыта работы')
    } else if (applicantExp && job.experience) {
      // Проверяем диапазоны опыта
      const expMatch = checkExperienceMatch(applicantExp, job.experience)
      if (expMatch) {
        score += 15
        reasons.push('Соответствие опыта работы')
      }
    }
  }

  // 3. Соответствие кухни (20 баллов)
  if (applicantData.cuisines && applicantData.cuisines.length > 0) {
    const applicantCuisines = applicantData.cuisines
      .map(c => cuisines.find(cu => cu.value === c)?.label)
      .filter(Boolean) as string[]
    
    const jobCuisineLower = job.cuisine.toLowerCase()
    const hasMatchingCuisine = applicantCuisines.some(c => 
      jobCuisineLower.includes(c.toLowerCase()) || c.toLowerCase().includes(jobCuisineLower)
    )
    
    if (hasMatchingCuisine) {
      score += 20
      reasons.push('Соответствие специализации по кухне')
    }
  }

  // 4. Соответствие города (10 баллов)
  if (applicantData.city) {
    const applicantCity = cities.find(c => c.value === applicantData.city)?.label
    if (applicantCity === job.city) {
      score += 10
      reasons.push('Работа в вашем городе')
    }
  }

  // 5. Бонус за полное соответствие (5 баллов)
  if (score >= 80) {
    score += 5
    reasons.push('Отличное соответствие вашим требованиям')
  }

  return {
    job,
    score: Math.min(score, 100), // Максимум 100 баллов
    reasons,
  }
}

/**
 * Проверяет соответствие опыта работы
 */
function checkExperienceMatch(applicantExp: string, jobExp: string): boolean {
  // Упрощенная проверка - в реальном приложении нужна более сложная логика
  const applicantExpLower = applicantExp.toLowerCase()
  const jobExpLower = jobExp.toLowerCase()

  // Если оба "от X до Y лет", проверяем пересечение
  if (applicantExpLower.includes('от') && jobExpLower.includes('от')) {
    // Извлекаем числа из строк
    const applicantNums = applicantExpLower.match(/\d+/g)?.map(Number) || []
    const jobNums = jobExpLower.match(/\d+/g)?.map(Number) || []

    if (applicantNums.length > 0 && jobNums.length > 0) {
      // Проверяем пересечение диапазонов
      const applicantMin = applicantNums[0]
      const applicantMax = applicantNums[1] || applicantNums[0]
      const jobMin = jobNums[0]
      const jobMax = jobNums[1] || jobNums[0]

      return (applicantMin <= jobMax && applicantMax >= jobMin)
    }
  }

  return applicantExpLower === jobExpLower
}

/**
 * Сортирует вакансии по релевантности
 */
export function getRecommendedJobs(
  jobs: Job[],
  applicantData: Partial<OnboardingFormData>
): JobRelevance[] {
  const jobsWithRelevance = jobs.map(job => 
    calculateJobRelevance(job, applicantData)
  )

  // Сортируем по убыванию релевантности
  return jobsWithRelevance.sort((a, b) => b.score - a.score)
}

/**
 * Фильтрует вакансии по минимальному порогу релевантности
 */
export function filterByRelevanceThreshold(
  jobs: JobRelevance[],
  threshold: number = 30
): JobRelevance[] {
  return jobs.filter(job => job.score >= threshold)
}


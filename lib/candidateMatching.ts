import type { JobPosting } from '@/types/job.types'
import type { OnboardingFormData } from '@/types/onboarding.types'
import { mockResumes } from '@/lib/mockData'
import { positions, experienceRanges, cuisines, cities } from '@/lib/data'

interface CandidateMatch {
  candidateId: string
  score: number
  reasons: string[]
}

/**
 * Автоматически подбирает кандидатов для вакансии на основе требований
 */
export function autoMatchCandidates(job: JobPosting): CandidateMatch[] {
  const matches: CandidateMatch[] = []

  // В реальном приложении здесь был бы запрос к базе данных кандидатов
  // Сейчас используем mockResumes как пример
  mockResumes.forEach((candidate) => {
    let score = 0
    const reasons: string[] = []

    // 1. Соответствие позиции (40 баллов)
    if (job.position && candidate.position) {
      const jobPosLower = job.position.toLowerCase()
      const candidatePosLower = candidate.position.toLowerCase()
      
      if (jobPosLower === candidatePosLower) {
        score += 40
        reasons.push('Точное соответствие должности')
      } else if (
        jobPosLower.includes(candidatePosLower) || 
        candidatePosLower.includes(jobPosLower)
      ) {
        score += 25
        reasons.push('Частичное соответствие должности')
      }
    }

    // 2. Соответствие опыта (25 баллов)
    if (job.experience && candidate.experience) {
      if (job.experience === candidate.experience) {
        score += 25
        reasons.push('Точное соответствие опыта')
      } else {
        const expMatch = checkExperienceMatch(job.experience, candidate.experience)
        if (expMatch) {
          score += 15
          reasons.push('Соответствие опыта работы')
        }
      }
    }

    // 3. Соответствие кухни (20 баллов)
    if (job.cuisine && candidate.cuisine) {
      const jobCuisineLower = job.cuisine.toLowerCase()
      const candidateCuisineLower = candidate.cuisine.toLowerCase()
      
      if (jobCuisineLower === candidateCuisineLower) {
        score += 20
        reasons.push('Точное соответствие кухни')
      } else if (
        jobCuisineLower.includes(candidateCuisineLower) ||
        candidateCuisineLower.includes(jobCuisineLower)
      ) {
        score += 10
        reasons.push('Частичное соответствие кухни')
      }
    }

    // 4. Соответствие города (10 баллов)
    if (job.city && candidate.city) {
      if (job.city === candidate.city) {
        score += 10
        reasons.push('Работа в том же городе')
      }
    }

    // 5. Бонус за высокое соответствие (5 баллов)
    if (score >= 70) {
      score += 5
      reasons.push('Высокое общее соответствие')
    }

    if (score >= 30) {
      matches.push({
        candidateId: candidate.id,
        score: Math.min(score, 100),
        reasons,
      })
    }
  })

  // Сортируем по убыванию релевантности
  return matches.sort((a, b) => b.score - a.score)
}

/**
 * Проверяет соответствие опыта работы
 */
function checkExperienceMatch(jobExp: string, candidateExp: string): boolean {
  const jobExpLower = jobExp.toLowerCase()
  const candidateExpLower = candidateExp.toLowerCase()

  if (jobExpLower.includes('от') && candidateExpLower.includes('от')) {
    const jobNums = jobExpLower.match(/\d+/g)?.map(Number) || []
    const candidateNums = candidateExpLower.match(/\d+/g)?.map(Number) || []

    if (jobNums.length > 0 && candidateNums.length > 0) {
      const jobMin = jobNums[0]
      const jobMax = jobNums[1] || jobNums[0]
      const candidateMin = candidateNums[0]
      const candidateMax = candidateNums[1] || candidateNums[0]

      return candidateMin >= jobMin && candidateMin <= jobMax
    }
  }

  return jobExpLower === candidateExpLower
}


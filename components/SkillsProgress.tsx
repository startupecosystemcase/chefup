'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Skill {
  name: string
  level: number // 0-100, но без отображения цифр
}

interface SkillsProgressProps {
  skills: Skill[]
  className?: string
}

export function SkillsProgress({ skills, className }: SkillsProgressProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {skills.map((skill, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
          <Progress value={skill.level} className="h-2" />
        </div>
      ))}
    </div>
  )
}


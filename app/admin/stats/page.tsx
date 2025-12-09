'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useOnboardingStore, useEmployerJobsStore, useResponseStore, useEventsStore, useEducationStore, usePortfolioStore } from '@/stores/useOnboardingStore'
import { Users, Building2, Briefcase, Calendar, GraduationCap, FileText } from 'lucide-react'

export default function AdminStatsPage() {
  const { formData: allUsersData } = useOnboardingStore()
  const { jobs } = useEmployerJobsStore()
  const { responses } = useResponseStore()
  const { events } = useEventsStore()
  const { items } = useEducationStore()
  const { posts } = usePortfolioStore()

  // Mock статистика (в реальном приложении - API запрос)
  const stats = {
    workers: 150,
    companies: 45,
    vacancies: jobs.length + 20,
    responses: responses.length,
    events: events.length + 15,
    education: items.length + 25,
    posts: posts.length,
  }

  const statCards = [
    {
      title: 'Работники',
      value: stats.workers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Компании',
      value: stats.companies,
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Вакансии',
      value: stats.vacancies,
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Отклики',
      value: stats.responses,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Мероприятия',
      value: stats.events,
      icon: Calendar,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Курсы/Тренинги',
      value: stats.education,
      icon: GraduationCap,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Статистика</h1>
        <p className="text-muted-foreground mt-1">Общая статистика платформы</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Дополнительная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Всего постов в микроблоге:</span>
              <span className="font-semibold">{stats.posts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Активных вакансий:</span>
              <span className="font-semibold">{jobs.filter((j) => j.status === 'approved').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">На модерации:</span>
              <span className="font-semibold">{jobs.filter((j) => j.status === 'moderating').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


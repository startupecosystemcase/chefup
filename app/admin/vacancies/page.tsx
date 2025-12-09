'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useEmployerJobsStore, useResponseStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { mockJobs } from '@/lib/mockData'
import { Plus, Search, Edit, Trash2, Eye, Users } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { cities, employmentTypes, workSchedules } from '@/lib/data'
import { standardJobRequirements } from '@/lib/jobRequirements'
import type { JobPosting } from '@/types/job.types'
import type { Response } from '@/types/responses.types'

export default function AdminVacanciesPage() {
  const { jobs: employerJobs } = useEmployerJobsStore()
  const { responses } = useResponseStore()
  const { formData: allUsersData } = useOnboardingStore()
  const [allJobs, setAllJobs] = useState<JobPosting[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    country: 'Казахстан',
    city: '',
    isRemote: false,
    employmentType: '',
    workSchedule: [] as string[],
    salary: '',
    description: '',
    requirements: [] as string[],
    conditions: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  })

  useEffect(() => {
    // Объединяем mock вакансии и вакансии из store
    const allJobsList: JobPosting[] = [
      ...employerJobs,
      ...mockJobs.map((job) => ({
        ...job,
        id: job.id,
        employerId: 'mock-employer',
        status: 'approved' as const,
        createdAt: new Date().toISOString(),
        company: job.title.split(' в ')[1] || 'Компания',
        country: job.country || 'Казахстан',
        city: job.city || '',
        isRemote: false,
        employmentType: 'full-time',
        workSchedule: ['5/2'],
        conditions: 'Официальное трудоустройство, соцпакет',
        contactName: 'HR',
        contactEmail: 'hr@example.com',
        contactPhone: '+7 (777) 123-45-67',
      })),
    ]
    setAllJobs(allJobsList)
  }, [employerJobs])

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getJobResponses = (jobId: string): Response[] => {
    return responses.filter((r) => r.jobId === jobId)
  }

  const handleViewJob = (job: JobPosting) => {
    setSelectedJob(job)
    setIsViewDialogOpen(true)
  }

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.company || !newJob.city || !newJob.employmentType || 
        !newJob.workSchedule.length || !newJob.salary || !newJob.description || 
        !newJob.requirements.length || !newJob.conditions || !newJob.contactName || 
        !newJob.contactEmail || !newJob.contactPhone) {
      toast.error('Заполните все обязательные поля')
      return
    }

    const job: JobPosting = {
      id: `job-${Date.now()}`,
      ...newJob,
      employerId: 'admin-created',
      status: 'moderating',
      createdAt: new Date().toISOString(),
    }

    // Добавляем в store
    useEmployerJobsStore.getState().addJob(job, 'admin-created')
    toast.success('Вакансия создана')
    setIsCreateDialogOpen(false)
    setNewJob({
      title: '',
      company: '',
      country: 'Казахстан',
      city: '',
      isRemote: false,
      employmentType: '',
      workSchedule: [],
      salary: '',
      description: '',
      requirements: [],
      conditions: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
    })
  }

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Вы уверены, что хотите удалить эту вакансию?')) {
      useEmployerJobsStore.getState().deleteJob(jobId)
      setAllJobs(allJobs.filter((j) => j.id !== jobId))
      toast.success('Вакансия удалена')
    }
  }

  const handleStatusChange = (jobId: string, newStatus: JobPosting['status']) => {
    useEmployerJobsStore.getState().updateJob(jobId, { status: newStatus })
    setAllJobs(allJobs.map((j) => j.id === jobId ? { ...j, status: newStatus } : j))
    toast.success('Статус вакансии обновлен')
  }

  const statusLabels: Record<JobPosting['status'], string> = {
    pending: 'Ожидает',
    moderating: 'На модерации',
    approved: 'Опубликовано',
    rejected: 'Отклонено',
    closed: 'Закрыто',
  }

  const jobResponses = selectedJob ? getJobResponses(selectedJob.id) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Вакансии</h1>
          <p className="text-muted-foreground mt-1">Управление всеми вакансиями</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Создать вакансию
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, компании..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="moderating">На модерации</SelectItem>
                <SelectItem value="approved">Опубликовано</SelectItem>
                <SelectItem value="rejected">Отклонено</SelectItem>
                <SelectItem value="closed">Закрыто</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredJobs.length === 0 && allJobs.length > 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Вакансии не найдены по заданным фильтрам
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Должность</th>
                    <th className="text-left p-2">Компания</th>
                    <th className="text-left p-2">Город</th>
                    <th className="text-left p-2">Статус</th>
                    <th className="text-left p-2">Дата</th>
                    <th className="text-left p-2">Отклики</th>
                    <th className="text-left p-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => {
                    const responsesCount = getJobResponses(job.id).length
                    return (
                      <tr key={job.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-2 text-sm font-mono">{job.id.slice(0, 8)}...</td>
                        <td className="p-2">{job.title}</td>
                        <td className="p-2">{job.company}</td>
                        <td className="p-2">{job.city}</td>
                        <td className="p-2">
                          <Select
                            value={job.status}
                            onValueChange={(value) => handleStatusChange(job.id, value as JobPosting['status'])}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="moderating">На модерации</SelectItem>
                              <SelectItem value="approved">Опубликовано</SelectItem>
                              <SelectItem value="rejected">Отклонено</SelectItem>
                              <SelectItem value="closed">Закрыто</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2">{new Date(job.createdAt).toLocaleDateString('ru-RU')}</td>
                        <td className="p-2">
                          <Badge variant={responsesCount > 0 ? 'default' : 'secondary'}>
                            {responsesCount}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewJob(job)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteJob(job.id)}>
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {filteredJobs.length === 0 && allJobs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">На данный момент вакансий нет</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить вакансию
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Диалог просмотра вакансии с откликами */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>Детали вакансии и отклики кандидатов</DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Информация о вакансии</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Компания:</strong> {selectedJob.company}</p>
                  <p><strong>Город:</strong> {selectedJob.city}</p>
                  <p><strong>Зарплата:</strong> {selectedJob.salary}</p>
                  <p><strong>Описание:</strong> {selectedJob.description}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Отклики кандидатов ({jobResponses.length})
                </h3>
                {jobResponses.length > 0 ? (
                  <div className="space-y-3">
                    {jobResponses.map((response) => {
                      // Находим данные пользователя (в реальном приложении - API запрос)
                      const userData = allUsersData // Упрощенная версия
                      return (
                        <Card key={response.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Кандидат ID: {response.applicantId}</p>
                                <p className="text-sm text-muted-foreground">
                                  Статус: <Badge variant="outline">{response.status}</Badge>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Дата отклика: {new Date(response.createdAt || '').toLocaleDateString('ru-RU')}
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Просмотр профиля
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Откликов пока нет</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог создания вакансии */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Создать вакансию</DialogTitle>
            <DialogDescription>Заполните данные для новой вакансии</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Должность *</Label>
              <AnimatedInput
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                placeholder="Название вакансии"
              />
            </div>
            <div>
              <Label>Компания *</Label>
              <AnimatedInput
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                placeholder="Название компании"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Город *</Label>
                <Select value={newJob.city} onValueChange={(value) => setNewJob({ ...newJob, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.label}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Тип занятости *</Label>
                <Select value={newJob.employmentType} onValueChange={(value) => setNewJob({ ...newJob, employmentType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип занятости" />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Зарплата *</Label>
              <AnimatedInput
                value={newJob.salary}
                onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                placeholder="300 000 - 500 000 KZT"
              />
            </div>
            <div>
              <Label>Описание *</Label>
              <AnimatedTextarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                placeholder="Описание вакансии"
                rows={4}
              />
            </div>
            <div>
              <Label>Требования *</Label>
              <div className="space-y-2">
                {standardJobRequirements.slice(0, 10).map((req) => (
                  <div key={req} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newJob.requirements.includes(req)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewJob({ ...newJob, requirements: [...newJob.requirements, req] })
                        } else {
                          setNewJob({ ...newJob, requirements: newJob.requirements.filter((r) => r !== req) })
                        }
                      }}
                    />
                    <Label className="font-normal">{req}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Условия и бонусы *</Label>
              <AnimatedTextarea
                value={newJob.conditions}
                onChange={(e) => setNewJob({ ...newJob, conditions: e.target.value })}
                placeholder="Условия работы и бонусы"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Контактное лицо *</Label>
                <AnimatedInput
                  value={newJob.contactName}
                  onChange={(e) => setNewJob({ ...newJob, contactName: e.target.value })}
                  placeholder="Имя"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <AnimatedInput
                  type="email"
                  value={newJob.contactEmail}
                  onChange={(e) => setNewJob({ ...newJob, contactEmail: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <Label>Телефон *</Label>
              <AnimatedInput
                value={newJob.contactPhone}
                onChange={(e) => setNewJob({ ...newJob, contactPhone: e.target.value })}
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreateJob}>Создать</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


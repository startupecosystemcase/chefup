'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/useOnboardingStore'
import { useEmployerOnboardingStore } from '@/stores/useOnboardingStore'
import { Settings, CheckCircle2, Upload, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'

const hrTasks = [
  'Подбор персонала',
  'Управление персоналом',
  'Учет рабочего времени',
  'Расчет зарплаты',
  'Обучение и развитие',
  'Аналитика и отчетность',
  'Интеграция с другими системами',
]

const priorityRequirements = [
  'Простота использования',
  'Мобильное приложение',
  'Интеграция с 1С',
  'Многофилиальность',
  'Автоматизация расчетов',
  'Отчетность и аналитика',
  'Техническая поддержка 24/7',
]

export default function HRSystemPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const employerData = useEmployerOnboardingStore((state) => state.formData)
  const [mounted, setMounted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: employerData?.companyName || '',
    contactPerson: employerData?.contactPerson || '',
    contactPosition: employerData?.position || '',
    email: employerData?.email || '',
    phone: employerData?.phone || '',
    branchesCount: '',
    vacanciesPerMonth: '',
    tasks: [] as string[],
    currentProblems: '',
    priorityRequirements: [] as string[],
    documents: [] as File[],
  })

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    setMounted(true)
  }, [userId, router])

  const handleTaskToggle = (task: string) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.includes(task)
        ? prev.tasks.filter(t => t !== task)
        : [...prev.tasks, task]
    }))
  }

  const handleRequirementToggle = (req: string) => {
    setFormData(prev => ({
      ...prev,
      priorityRequirements: prev.priorityRequirements.includes(req)
        ? prev.priorityRequirements.filter(r => r !== req)
        : [...prev.priorityRequirements, req]
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }))
  }

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
      toast.error('Заполните все обязательные поля')
      return
    }

    // Имитация отправки данных на сервер
    try {
      // В реальном приложении здесь будет POST /api/hr-integration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      toast.success('Заявка успешно отправлена!')
    } catch (error) {
      toast.error('Ошибка при отправке заявки')
    }
  }

  if (!mounted || !userId) {
    return null
  }

  if (isSubmitted) {
    return (
      <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
        <div className="mx-auto max-w-3xl">
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-6 md:mb-4 dark:text-white">Форма отправлена</h2>
              <p className="text-muted-foreground dark:text-gray-400 mb-8">
                С вами свяжутся в ближайшее время для обсуждения интеграции HR-системы
              </p>
              <ShinyButton onClick={() => router.push('/dashboard')}>
                Вернуться на главную
              </ShinyButton>
            </div>
          </AnimatedCard>
        </div>
      </div>
    )
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-2 dark:text-white flex items-center gap-3">
            <Settings className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            Интеграция HR-системы
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Заполните форму для подачи заявки на интеграцию HR-системы
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatedCard className="bg-white dark:bg-dark/50 mb-6">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Информация о компании</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Название компании *</Label>
                  <AnimatedInput
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Введите название компании"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Контактное лицо *</Label>
                    <AnimatedInput
                      value={formData.contactPerson}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      placeholder="Имя и фамилия"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Должность *</Label>
                    <AnimatedInput
                      value={formData.contactPosition}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPosition: e.target.value }))}
                      placeholder="Должность"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">E-mail *</Label>
                    <AnimatedInput
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Телефон *</Label>
                    <AnimatedInput
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (777) 123-45-67"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Количество филиалов *</Label>
                    <AnimatedInput
                      type="number"
                      value={formData.branchesCount}
                      onChange={(e) => setFormData(prev => ({ ...prev, branchesCount: e.target.value }))}
                      placeholder="Введите число"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Среднее количество вакансий/заявок в месяц (на филиал) *</Label>
                    <AnimatedInput
                      type="number"
                      value={formData.vacanciesPerMonth}
                      onChange={(e) => setFormData(prev => ({ ...prev, vacanciesPerMonth: e.target.value }))}
                      placeholder="Введите число"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="bg-white dark:bg-dark/50 mb-6">
            <div className="p-3 md:p-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Задачи и требования</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-6 md:mb-4 block dark:text-gray-300">Какие задачи вы хотите решать с помощью HR-системы? *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hrTasks.map((task) => (
                      <div key={task} className="flex items-center space-x-2">
                        <Checkbox
                          id={`task-${task}`}
                          checked={formData.tasks.includes(task)}
                          onCheckedChange={() => handleTaskToggle(task)}
                        />
                        <label
                          htmlFor={`task-${task}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300 cursor-pointer"
                        >
                          {task}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Текущие проблемы *</Label>
                  <AnimatedTextarea
                    value={formData.currentProblems}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentProblems: e.target.value }))}
                    placeholder="Опишите текущие проблемы в управлении персоналом..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-6 md:mb-4 block dark:text-gray-300">Приоритетные требования</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {priorityRequirements.map((req) => (
                      <div key={req} className="flex items-center space-x-2">
                        <Checkbox
                          id={`req-${req}`}
                          checked={formData.priorityRequirements.includes(req)}
                          onCheckedChange={() => handleRequirementToggle(req)}
                        />
                        <label
                          htmlFor={`req-${req}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300 cursor-pointer"
                        >
                          {req}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-6 md:mb-2 block dark:text-gray-300">Прикрепить документы (опционально)</Label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {formData.documents.length > 0 && (
                      <div className="space-y-2">
                        {formData.documents.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark/70 rounded-lg">
                            <span className="text-sm text-muted-foreground dark:text-gray-400">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <div className="flex gap-4 justify-end">
            <ShinyButton type="button" variant="outline" onClick={() => router.back()}>
              Отмена
            </ShinyButton>
            <ShinyButton type="submit">
              Отправить заявку
            </ShinyButton>
          </div>
        </form>
      </div>
    </div>
  )
}


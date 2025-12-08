'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Checkbox } from '@/components/ui/checkbox'
import { jobPostingSchema } from '@/types/job.types'
import { useEmployerJobsStore, useAuthStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { cities, employmentTypes, workSchedules } from '@/lib/data'
import { standardJobRequirements } from '@/lib/jobRequirements'
import { ArrowLeft, Plus, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { AnimatedBadge } from '@/components/magicui/animated-badge'

const countries = [
  { value: 'Казахстан', label: 'Казахстан' },
  { value: 'Узбекистан', label: 'Узбекистан' },
  { value: 'Кыргызстан', label: 'Кыргызстан' },
  { value: 'Таджикистан', label: 'Таджикистан' },
  { value: 'Армения', label: 'Армения' },
  { value: 'Грузия', label: 'Грузия' },
] as const

export default function CreateJobPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const employerData = useOnboardingStore((state) => state.employerFormData)
  const addJob = useEmployerJobsStore((state) => state.addJob)
  const [selectedStandardRequirements, setSelectedStandardRequirements] = useState<string[]>([])
  const [customRequirements, setCustomRequirements] = useState<string[]>([])
  const [newCustomRequirement, setNewCustomRequirement] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: '',
      company: employerData?.companyName || '',
      country: '',
      city: '',
      isRemote: false,
      employmentType: '',
      workSchedule: [] as string[],
      salary: '',
      description: '',
      requirements: [] as string[],
      conditions: '',
      contactName: employerData?.contactPerson || '',
      contactEmail: employerData?.email || '',
      contactPhone: employerData?.phone || '',
    },
  })

  const watchedValues = form.watch()
  const isFormValid = form.formState.isValid && 
    selectedStandardRequirements.length + customRequirements.length > 0 &&
    watchedValues.workSchedule.length > 0

  const handleStandardRequirementToggle = (value: string) => {
    setSelectedStandardRequirements(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const handleAddCustomRequirement = () => {
    if (newCustomRequirement.trim()) {
      setCustomRequirements([...customRequirements, newCustomRequirement.trim()])
      setNewCustomRequirement('')
    }
  }

  const handleRemoveCustomRequirement = (index: number) => {
    setCustomRequirements(customRequirements.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: any) => {
    if (!userId) {
      toast.error('Необходима авторизация')
      return
    }

    const allRequirements = [
      ...selectedStandardRequirements.map(v => {
        const req = standardJobRequirements.find(r => r.value === v)
        return req?.label || v
      }),
      ...customRequirements
    ]

    if (allRequirements.length === 0) {
      toast.error('Добавьте хотя бы одно требование')
      return
    }

    if (data.workSchedule.length === 0) {
      toast.error('Выберите график работы')
      return
    }

    setIsSubmitting(true)

    const jobData = {
      ...data,
      requirements: allRequirements,
      position: data.position || '',
      experience: data.experience || '',
      cuisine: data.cuisine || '',
    }

    try {
      addJob(jobData, userId)
      toast.success('Вакансия успешно создана и отправлена на модерацию!')
      router.push('/dashboard/jobs')
    } catch (error) {
      toast.error('Ошибка при создании вакансии')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors min-h-screen">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </ShinyButton>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Создать вакансию</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Заполните информацию о вакансии. После создания она будет отправлена на модерацию.
          </p>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatedCard className={`bg-white dark:bg-dark/50 ${!form.watch('title') && form.formState.submitCount > 0 ? 'border-red-300 dark:border-red-700' : ''}`}>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold dark:text-white">Информация о вакансии</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 dark:text-gray-400">
                  Все поля обязательны для заполнения
                </p>

                <div className="space-y-6">
                  {/* 1. Заголовок вакансии */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300 text-base font-semibold">1. Заголовок вакансии *</FormLabel>
                        <FormControl>
                          <AnimatedInput placeholder="Например: Шеф-повар в ресторане европейской кухни" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 2. Компания / Подразделение */}
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300 text-base font-semibold">2. Компания / Подразделение *</FormLabel>
                        <FormControl>
                          <AnimatedInput placeholder="Название компании или подразделения" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 3. Локация (город/удалённо) */}
                  <div className="space-y-4">
                    <FormLabel className="dark:text-gray-300 text-base font-semibold">3. Локация *</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">Страна *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите страну" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem key={country.value} value={country.value}>
                                    {country.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">Город *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите город" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city.value} value={city.label}>
                                    {city.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="isRemote"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="dark:text-gray-300">Удалённая работа</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 4. Тип занятости */}
                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300 text-base font-semibold">4. Тип занятости *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип занятости" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employmentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 5. График / смены */}
                  <div className="space-y-4">
                    <FormLabel className="dark:text-gray-300 text-base font-semibold">5. График / смены *</FormLabel>
                    <FormField
                      control={form.control}
                      name="workSchedule"
                      render={() => (
                        <FormItem>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {workSchedules.map((schedule) => (
                              <FormField
                                key={schedule.value}
                                control={form.control}
                                name="workSchedule"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={schedule.value}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(schedule.value)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, schedule.value])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== schedule.value
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal text-sm dark:text-gray-300">
                                        {schedule.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 6. Зарплата (диапазон) */}
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300 text-base font-semibold">6. Зарплата (диапазон) *</FormLabel>
                        <FormControl>
                          <AnimatedInput placeholder="Например: 300 000 - 500 000 KZT" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 7. Описание вакансии */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300 text-base font-semibold">7. Описание вакансии *</FormLabel>
                        <FormControl>
                          <AnimatedTextarea
                            placeholder="Подробно опишите вакансию, условия работы..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground dark:text-gray-400">
                          Минимум 50 символов. {field.value?.length || 0}/1000
                        </p>
                      </FormItem>
                    )}
                  />

                  {/* 8. Требования */}
                  <div className="space-y-4">
                    <FormLabel className="dark:text-gray-300 text-base font-semibold">8. Требования *</FormLabel>
                    
                    {/* Стандартные требования */}
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Выберите из списка:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-3 border rounded-lg">
                        {standardJobRequirements.map((req) => (
                          <div key={req.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={req.value}
                              checked={selectedStandardRequirements.includes(req.value)}
                              onCheckedChange={() => handleStandardRequirementToggle(req.value)}
                            />
                            <label
                              htmlFor={req.value}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300 cursor-pointer"
                            >
                              {req.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Выбранные стандартные требования */}
                    {selectedStandardRequirements.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedStandardRequirements.map((value) => {
                          const req = standardJobRequirements.find(r => r.value === value)
                          return (
                            <AnimatedBadge key={value} variant="secondary" className="flex items-center gap-1">
                              {req?.label}
                              <button
                                type="button"
                                onClick={() => handleStandardRequirementToggle(value)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </AnimatedBadge>
                          )
                        })}
                      </div>
                    )}

                    {/* Пользовательские требования */}
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Добавить своё требование:</p>
                      <div className="flex gap-3">
                        <AnimatedInput
                          value={newCustomRequirement}
                          onChange={(e) => setNewCustomRequirement(e.target.value)}
                          placeholder="Введите требование"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleAddCustomRequirement()
                            }
                          }}
                        />
                        <ShinyButton type="button" variant="outline" onClick={handleAddCustomRequirement}>
                          <Plus className="w-4 h-4 mr-2" />
                          Добавить
                        </ShinyButton>
                      </div>
                      {customRequirements.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {customRequirements.map((req, index) => (
                            <AnimatedBadge key={index} variant="secondary" className="flex items-center gap-1">
                              {req}
                              <button
                                type="button"
                                onClick={() => handleRemoveCustomRequirement(index)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </AnimatedBadge>
                          ))}
                        </div>
                      )}
                    </div>
                    {(selectedStandardRequirements.length + customRequirements.length === 0) && form.formState.submitCount > 0 && (
                      <p className="text-sm text-red-600 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Добавьте хотя бы одно требование
                      </p>
                    )}
                  </div>

                  {/* 9. Условия и бонусы */}
                  <FormField
                    control={form.control}
                    name="conditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300 text-base font-semibold">9. Условия и бонусы *</FormLabel>
                        <FormControl>
                          <AnimatedTextarea
                            placeholder="Опишите условия работы, бонусы, льготы..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 10. Контактные данные */}
                  <div className="space-y-4">
                    <FormLabel className="dark:text-gray-300 text-base font-semibold">10. Контактные данные *</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">Контактное лицо *</FormLabel>
                            <FormControl>
                              <AnimatedInput placeholder="Имя и фамилия" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">Email *</FormLabel>
                            <FormControl>
                              <AnimatedInput type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-300">Телефон *</FormLabel>
                          <FormControl>
                            <AnimatedInput type="tel" placeholder="+7 (777) 123-45-67" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Кнопка Добавить - фиксирована внизу */}
            <div className="sticky bottom-0 bg-white dark:bg-dark pt-4 pb-4 border-t border-gray-200 dark:border-gray-700 z-10">
              <div className="max-w-4xl mx-auto flex gap-4">
                <ShinyButton 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()} 
                  className="flex-1"
                >
                  Отмена
                </ShinyButton>
                <ShinyButton 
                  type="submit" 
                  className="flex-1"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Добавить'}
                </ShinyButton>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

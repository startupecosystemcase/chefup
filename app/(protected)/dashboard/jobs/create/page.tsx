'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jobPostingSchema } from '@/types/job.types'
import { useEmployerJobsStore, useAuthStore } from '@/stores/useOnboardingStore'
import { cities, positions, experienceRanges, cuisines } from '@/lib/data'
import { ArrowLeft, Plus, X, FileText } from 'lucide-react'

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
  const addJob = useEmployerJobsStore((state) => state.addJob)
  const [requirements, setRequirements] = useState<string[]>([''])
  const [newRequirement, setNewRequirement] = useState('')

  const form = useForm({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: '',
      position: '',
      country: '',
      city: '',
      experience: '',
      cuisine: '',
      description: '',
      salary: '',
      requirements: [] as string[],
    },
  })

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement('')
    }
  }

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const onSubmit = (data: any) => {
    if (!userId) {
      toast.error('Необходима авторизация')
      return
    }

    const jobData = {
      ...data,
      requirements: requirements.filter((r) => r.trim()),
    }

    addJob(jobData, userId)
    toast.success('Вакансия успешно создана и отправлена на модерацию!')
    router.push('/dashboard/jobs/history')
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </ShinyButton>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Создать вакансию</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Заполните информацию о вакансии. После создания она будет отправлена на модерацию.
          </p>
        </div>

        <AnimatedCard className="bg-white dark:bg-dark/50">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold dark:text-white">Информация о вакансии</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6 dark:text-gray-400">
              Все поля обязательны для заполнения
            </p>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Название вакансии *</FormLabel>
                      <FormControl>
                        <AnimatedInput placeholder="Например: Шеф-повар в ресторане европейской кухни" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Должность *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите должность" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions.map((pos) => (
                              <SelectItem key={pos.value} value={pos.label}>
                                {pos.label}
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
                    name="cuisine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Кухня *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите кухню" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cuisines.map((cuisine) => (
                              <SelectItem key={cuisine.value} value={cuisine.label}>
                                {cuisine.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Страна *</FormLabel>
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
                        <FormLabel>Город *</FormLabel>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Требуемый опыт *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите опыт" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceRanges.map((exp) => (
                              <SelectItem key={exp.value} value={exp.label}>
                                {exp.label}
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
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Зарплата *</FormLabel>
                        <FormControl>
                          <AnimatedInput placeholder="Например: 300 000 - 500 000 KZT" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Описание вакансии *</FormLabel>
                      <FormControl>
                        <AnimatedTextarea
                          placeholder="Подробно опишите вакансию, условия работы, требования..."
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

                <div>
                  <FormLabel className="dark:text-gray-300">Требования *</FormLabel>
                  <div className="space-y-4 mt-2">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex gap-4">
                        <AnimatedInput
                          value={req}
                          onChange={(e) => {
                            const newReqs = [...requirements]
                            newReqs[index] = e.target.value
                            setRequirements(newReqs)
                          }}
                          placeholder="Введите требование"
                        />
                        {requirements.length > 1 && (
                          <ShinyButton
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveRequirement(index)}
                          >
                            <X className="w-4 h-4" />
                          </ShinyButton>
                        )}
                      </div>
                    ))}
                    <div className="flex gap-4">
                      <AnimatedInput
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="Добавить требование"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddRequirement()
                          }
                        }}
                      />
                      <ShinyButton type="button" variant="outline" onClick={handleAddRequirement}>
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить
                      </ShinyButton>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <ShinyButton type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                    Отмена
                  </ShinyButton>
                  <ShinyButton type="submit" className="flex-1">
                    Создать вакансию
                  </ShinyButton>
                </div>
              </form>
            </FormProvider>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}


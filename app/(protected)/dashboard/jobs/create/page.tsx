'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Создать вакансию</h1>
          <p className="text-muted-foreground">
            Заполните информацию о вакансии. После создания она будет отправлена на модерацию.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>Информация о вакансии</CardTitle>
            </div>
            <CardDescription>
              Все поля обязательны для заполнения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название вакансии *</FormLabel>
                      <FormControl>
                        <Input placeholder="Например: Шеф-повар в ресторане европейской кухни" {...field} />
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
                        <FormLabel>Зарплата *</FormLabel>
                        <FormControl>
                          <Input placeholder="Например: 300 000 - 500 000 KZT" {...field} />
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
                      <FormLabel>Описание вакансии *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Подробно опишите вакансию, условия работы, требования..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Минимум 50 символов. {field.value?.length || 0}/1000
                      </p>
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Требования *</FormLabel>
                  <div className="space-y-2 mt-2">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={req}
                          onChange={(e) => {
                            const newReqs = [...requirements]
                            newReqs[index] = e.target.value
                            setRequirements(newReqs)
                          }}
                          placeholder="Введите требование"
                        />
                        {requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveRequirement(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
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
                      <Button type="button" variant="outline" onClick={handleAddRequirement}>
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                    Отмена
                  </Button>
                  <Button type="submit" className="flex-1">
                    Создать вакансию
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


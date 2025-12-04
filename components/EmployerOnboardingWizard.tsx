'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { AnimatedProgress } from '@/components/magicui/animated-progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Textarea } from '@/components/ui/textarea'
import { BadgeSelector } from '@/components/BadgeSelector'
import { Checkbox } from '@/components/ui/checkbox'
import { employerOnboardingSchema, type EmployerOnboardingFormData } from '@/types/employer.types'
import { useEmployerOnboardingStore } from '@/stores/useOnboardingStore'
import { cities, companyTypes, employeeCounts, cuisines, employerNeeds } from '@/lib/data'
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react'

const TOTAL_STEPS = 4

export function EmployerOnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const { formData, setFormData } = useEmployerOnboardingStore()

  const form = useForm<EmployerOnboardingFormData>({
    resolver: zodResolver(employerOnboardingSchema),
    defaultValues: {
      companyName: formData.companyName || '',
      companyType: formData.companyType,
      city: formData.city || '',
      address: formData.address || '',
      website: formData.website || '',
      contactPerson: formData.contactPerson || '',
      position: formData.position || '',
      email: formData.email || '',
      phone: formData.phone || '',
      description: formData.description || '',
      employeeCount: formData.employeeCount,
      cuisines: formData.cuisines || [],
      needs: formData.needs || [],
      hrSystem: formData.hrSystem || false,
    },
  })

  const progress = (currentStep / TOTAL_STEPS) * 100

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof EmployerOnboardingFormData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate = ['companyName', 'companyType', 'city', 'address']
        break
      case 2:
        fieldsToValidate = ['contactPerson', 'position', 'email', 'phone']
        break
      case 3:
        fieldsToValidate = ['description', 'employeeCount', 'cuisines']
        break
      case 4:
        fieldsToValidate = ['needs']
        break
    }

    const result = await form.trigger(fieldsToValidate)
    return result
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля')
      return
    }

    const currentData = form.getValues()
    setFormData(currentData)

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const isValid = await form.trigger()
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля')
      return
    }

    const data = form.getValues()
    setFormData(data)
    toast.success('Регистрация завершена!')
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-5 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Регистрация работодателя</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Шаг {currentStep} из {TOTAL_STEPS}
              </p>
            </div>
          </div>
          <AnimatedProgress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Шаг 1: Информация о компании */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название компании *</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите название компании" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Тип заведения *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип заведения" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companyTypes.map((type) => (
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
                              <SelectItem key={city.value} value={city.value}>
                                {city.label}
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Адрес *</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите адрес" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Веб-сайт (необязательно)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Шаг 2: Контактная информация */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Контактное лицо *</FormLabel>
                        <FormControl>
                          <Input placeholder="ФИО контактного лица" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Должность *</FormLabel>
                        <FormControl>
                          <Input placeholder="Должность контактного лица" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+7 (XXX) XXX-XX-XX"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '')
                              let formatted = '+7'
                              if (value.length > 1) {
                                formatted += ` (${value.slice(1, 4)}`
                                if (value.length > 4) {
                                  formatted += `) ${value.slice(4, 7)}`
                                  if (value.length > 7) {
                                    formatted += `-${value.slice(7, 9)}`
                                    if (value.length > 9) {
                                      formatted += `-${value.slice(9, 11)}`
                                    }
                                  }
                                }
                              }
                              field.onChange(formatted)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Шаг 3: О компании */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Описание компании *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Расскажите о вашей компании, концепции, особенностях..."
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
                  <FormField
                    control={form.control}
                    name="employeeCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Количество сотрудников *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите количество сотрудников" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employeeCounts.map((count) => (
                              <SelectItem key={count.value} value={count.value}>
                                {count.label}
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
                    name="cuisines"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Кухни *</FormLabel>
                        <FormControl>
                          <BadgeSelector
                            options={cuisines}
                            selected={field.value || []}
                            onChange={field.onChange}
                            maxSelections={10}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Шаг 4: Потребности */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="needs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ваши потребности *</FormLabel>
                        <FormControl>
                          <BadgeSelector
                            options={employerNeeds}
                            selected={field.value || []}
                            onChange={field.onChange}
                            maxSelections={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hrSystem"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Интересуюсь корпоративной HR-системой ChefUp
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            ERP-система для управления персоналом, сменами, KPI и корпоративной культурой
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Навигация */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
                <Button type="button" onClick={handleNext}>
                  {currentStep === TOTAL_STEPS ? 'Завершить' : 'Далее'}
                  {currentStep < TOTAL_STEPS && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}


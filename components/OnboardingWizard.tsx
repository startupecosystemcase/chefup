'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { BadgeSelector } from '@/components/BadgeSelector'
import { VisualCardSelector } from '@/components/onboarding/VisualCardSelector'
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator'
import { onboardingSchema, type OnboardingFormData } from '@/types/onboarding.types'
import { useOnboardingStore } from '@/stores/useOnboardingStore'
import { positionIcons, educationIcons, venueFormatIcons, goalIcons, experienceIcons } from '@/lib/onboardingIcons'
import { Sparkles, User, Briefcase, Target, CheckCircle2, GraduationCap, Building2, DollarSign } from 'lucide-react'
import {
  cities,
  ageRanges,
  experienceRanges,
  positions,
  educationLevels,
  ranks,
  certificates,
  cuisines,
  venueFormats,
  goals,
  additionalSkills,
  salaryRanges,
} from '@/lib/data'

const TOTAL_STEPS = 5

export function OnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const { formData, setFormData } = useOnboardingStore()

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      city: formData.city || '',
      age: formData.age || '',
      experience: formData.experience || '',
      position: formData.position || '',
      education: formData.education || '',
      rank: formData.rank || '',
      hasTeam: formData.hasTeam || false,
      certificates: formData.certificates || [],
      cuisines: formData.cuisines || [],
      additionalSkills: formData.additionalSkills || [],
      preferredVenueFormat: formData.preferredVenueFormat || '',
      salaryExpectation: formData.salaryExpectation || '',
      goals: formData.goals || [],
      phone: formData.phone || '',
      email: formData.email || '',
      about: formData.about || '',
    },
  })

  const progress = (currentStep / TOTAL_STEPS) * 100

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof OnboardingFormData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate = ['firstName', 'lastName', 'city', 'age']
        break
      case 2:
        fieldsToValidate = ['experience', 'position', 'education', 'rank']
        break
      case 3:
        fieldsToValidate = ['cuisines']
        break
      case 4:
        fieldsToValidate = ['preferredVenueFormat', 'salaryExpectation']
        break
      case 5:
        fieldsToValidate = ['goals', 'phone']
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
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: OnboardingFormData) => {
    setFormData(data)
    toast.success('Анкета успешно сохранена!')
    router.push('/dashboard')
  }

  const stepLabels = ['Личные данные', 'Опыт', 'Навыки', 'Работа', 'Финал']

  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl">Создайте свой профиль</CardTitle>
          </div>
          <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} stepLabels={stepLabels} />
          <div className="mt-4">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Прогресс заполнения</span>
              <span className="font-semibold text-primary">{Math.round(progress)}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя *</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите имя" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Фамилия *</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите фамилию" {...field} />
                        </FormControl>
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
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Возраст *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите возраст" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ageRanges.map((age) => (
                              <SelectItem key={age.value} value={age.value}>
                                {age.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Опыт работы *
                    </h3>
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <VisualCardSelector
                              options={experienceRanges.map((exp) => ({
                                value: exp.value,
                                label: exp.label,
                                icon: experienceIcons[exp.value] || <Briefcase className="w-6 h-6" />,
                              }))}
                              selected={field.value || ''}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Текущая позиция *
                    </h3>
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <VisualCardSelector
                              options={positions.map((pos) => ({
                                value: pos.value,
                                label: pos.label,
                                icon: positionIcons[pos.value] || <Briefcase className="w-6 h-6" />,
                              }))}
                              selected={field.value || ''}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Образование *
                    </h3>
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <VisualCardSelector
                              options={educationLevels.map((edu) => ({
                                value: edu.value,
                                label: edu.label,
                                icon: educationIcons[edu.value] || <GraduationCap className="w-6 h-6" />,
                              }))}
                              selected={field.value || ''}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="rank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Разряд *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите разряд" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ranks.map((rank) => (
                              <SelectItem key={rank.value} value={rank.value}>
                                {rank.label}
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
                    name="hasTeam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Управляете командой? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === 'true')}
                            value={field.value ? 'true' : 'false'}
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id="team-yes" />
                              <label htmlFor="team-yes">Да</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id="team-no" />
                              <label htmlFor="team-no">Нет</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="certificates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Сертификаты</FormLabel>
                        <FormControl>
                          <BadgeSelector
                            options={certificates}
                            selected={field.value || []}
                            onChange={field.onChange}
                          />
                        </FormControl>
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Дополнительные навыки</FormLabel>
                        <FormControl>
                          <BadgeSelector
                            options={additionalSkills}
                            selected={field.value || []}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Предпочитаемый формат заведения *
                    </h3>
                    <FormField
                      control={form.control}
                      name="preferredVenueFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <VisualCardSelector
                              options={venueFormats.map((format) => ({
                                value: format.value,
                                label: format.label,
                                icon: venueFormatIcons[format.value] || <Building2 className="w-6 h-6" />,
                              }))}
                              selected={field.value || ''}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Ожидаемая зарплата *
                    </h3>
                    <FormField
                      control={form.control}
                      name="salaryExpectation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <VisualCardSelector
                              options={salaryRanges.map((range) => ({
                                value: range.value,
                                label: range.label,
                                icon: <DollarSign className="w-6 h-6" />,
                              }))}
                              selected={field.value || ''}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Цели и интересы *
                    </h3>
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <VisualCardSelector
                              options={goals.map((goal) => ({
                                value: goal.value,
                                label: goal.label,
                                icon: goalIcons[goal.value] || <Target className="w-6 h-6" />,
                              }))}
                              selected={field.value || []}
                              onChange={field.onChange}
                              multiple={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>О себе</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Расскажите о себе..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Назад
                </Button>
                {currentStep < TOTAL_STEPS ? (
                  <Button type="button" onClick={handleNext}>
                    Далее
                  </Button>
                ) : (
                  <Button type="submit">Сохранить</Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}


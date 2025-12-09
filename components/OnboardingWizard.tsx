'use client'

import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Confetti from 'react-confetti'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ProgressMotivator } from '@/components/onboarding/ProgressMotivator'
import { StepIcon } from '@/components/onboarding/StepIcon'
import { SelectableCard } from '@/components/onboarding/SelectableCard'
import { SelectableBadge } from '@/components/onboarding/SelectableBadge'
import { onboardingSchema, type OnboardingFormData } from '@/types/onboarding.types'
import { useOnboardingStore, useAuthStore } from '@/stores/useOnboardingStore'
import {
  User,
  Briefcase,
  Utensils,
  CreditCard,
  Target,
  Phone,
  MessageCircle,
  Send,
  ArrowLeft,
  ArrowRight,
  Star,
  Copy,
  CheckCircle2,
  ChefHat,
  UtensilsCrossed,
  Coffee,
  Cake,
  GraduationCap,
  BookOpen,
  Flame,
  Award,
  ShieldCheck,
  ScrollText,
  Palette,
  Calculator,
  Users,
  Beef,
  Croissant,
  Soup,
  Drumstick,
  Pizza,
  Search,
  UserPlus,
  Plane,
  Sparkles,
  Building2,
  Store,
  Hotel,
  Package,
  Instagram,
  Link as LinkIcon,
} from 'lucide-react'
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
import {
  positionIcons,
  cuisineIcons,
  educationIcons,
  rankIcons,
  venueFormatIcons,
  goalIcons,
  skillIcons,
  certificateIcons,
} from '@/lib/onboardingData'

const TOTAL_STEPS = 5

const stepIcons = [User, Briefcase, Utensils, CreditCard, Target]

export function OnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { formData, setFormData } = useOnboardingStore()
  const authPhone = useAuthStore((state) => state.phone)

  // Проверяем параметр step из URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const stepParam = params.get('step')
    if (stepParam) {
      const step = parseInt(stepParam, 10)
      if (step >= 1 && step <= TOTAL_STEPS) {
        setCurrentStep(step)
      }
    }
  }, [])

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      phone: formData.phone || authPhone || '',
      city: formData.city || '',
      age: formData.age || '',
      whatsapp: formData.whatsapp || authPhone || '',
      telegram: formData.telegram || authPhone || '',
      experience: formData.experience || '',
      currentPosition: formData.currentPosition || '',
      desiredPosition: formData.desiredPosition || '',
      hasTeam: formData.hasTeam || '',
      education: formData.education || '',
      rank: formData.rank || '',
      cuisines: formData.cuisines || [],
      certificates: formData.certificates || [],
      additionalSkills: formData.additionalSkills || [],
      currentVenueFormat: formData.currentVenueFormat || '',
      preferredVenueFormat: formData.preferredVenueFormat || '',
      currentSalary: formData.currentSalary || '',
      salaryExpectation: formData.salaryExpectation || '',
      goals: formData.goals || [],
      instagram: formData.instagram || '',
      portfolio: formData.portfolio || '',
      about: formData.about || '',
      rating: formData.rating || 0,
      suggestions: formData.suggestions || '',
      email: formData.email || '',
      avatarUrl: formData.avatarUrl || '',
      username: formData.username || '',
      telegramUsername: formData.telegramUsername || '',
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  // Автозаполнение полей телефона при загрузке
  useEffect(() => {
    if (authPhone) {
      const currentPhone = form.getValues('phone')
      const currentWhatsapp = form.getValues('whatsapp')
      const currentTelegram = form.getValues('telegram')
      
      if (!currentPhone || currentPhone === '') {
        form.setValue('phone', authPhone, { shouldValidate: true })
      }
      if (!currentWhatsapp || currentWhatsapp === '') {
        form.setValue('whatsapp', authPhone)
      }
      if (!currentTelegram || currentTelegram === '') {
        form.setValue('telegram', authPhone)
      }
    }
  }, [authPhone, form])

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof OnboardingFormData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate = ['firstName', 'lastName', 'phone', 'city', 'age']
        break
      case 2:
        fieldsToValidate = ['experience', 'currentPosition', 'desiredPosition', 'hasTeam', 'education', 'rank']
        break
      case 3:
        fieldsToValidate = ['cuisines']
        break
      case 4:
        fieldsToValidate = ['currentVenueFormat', 'preferredVenueFormat', 'currentSalary', 'salaryExpectation']
        break
      case 5:
        fieldsToValidate = ['goals', 'about', 'rating']
        break
    }

    const result = await form.trigger(fieldsToValidate)
    return result
  }

  const handleNext = async () => {
    // Убеждаемся, что телефон заполнен перед валидацией
    if (currentStep === 1 && authPhone && !form.getValues('phone')) {
      form.setValue('phone', authPhone, { shouldValidate: true })
    }
    
    const isValid = await validateStep(currentStep)
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля')
      // Показываем ошибки валидации
      form.trigger()
      return
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (data: OnboardingFormData) => {
    const isValid = await validateStep(5)
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля')
      return
    }

    setFormData(data)
    setShowConfetti(true)
    setTimeout(() => {
      setShowSuccess(true)
      setShowConfetti(false)
    }, 2000)
  }

  const handleCopyProfileLink = () => {
    const userId = useAuthStore.getState().userId
    const profileUrl = `${window.location.origin}/profile/${userId}`
    navigator.clipboard.writeText(profileUrl)
    toast.success('Ссылка скопирована!')
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F97316]/10 to-white dark:from-[#F97316]/20 dark:to-dark p-5 transition-colors">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-full bg-[#F97316] flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white">
            Поздравляем! Ты в ChefUp!
          </h1>
          
          <p className="text-xl text-[#64748B] dark:text-gray-400">
            Твой профессиональный профиль готов. Скоро начнут приходить офферы.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShinyButton
              variant="outline"
              size="lg"
              onClick={handleCopyProfileLink}
              className="min-h-[56px]"
            >
              <Copy className="w-5 h-5 mr-2" />
              Скопировать ссылку на профиль
            </ShinyButton>
            <ShinyButton
              size="lg"
              className="min-h-[56px]"
              onClick={() => router.push('/dashboard')}
            >
              Перейти в личный кабинет
              <ArrowRight className="w-5 h-5 ml-2" />
            </ShinyButton>
          </div>
        </motion.div>
      </div>
    )
  }

  const StepIconComponent = stepIcons[currentStep - 1]

  return (
    <div className="min-h-screen bg-white dark:bg-dark py-4 md:py-8 px-4 md:px-6 lg:px-8 transition-colors">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <StepIcon icon={StepIconComponent} />
        </div>

        <ProgressMotivator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {/* Шаг 1: Личная информация */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя *</FormLabel>
                          <FormControl>
                            <AnimatedInput {...field} placeholder="Введите имя" />
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
                            <AnimatedInput {...field} placeholder="Введите фамилию" />
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
                          <FormLabel>Номер телефона *</FormLabel>
                          <FormControl>
                            <AnimatedInput 
                              {...field} 
                              value={field.value || authPhone || ''}
                              readOnly 
                              placeholder="+7 (___) ___-__-__" 
                            />
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

                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                              <AnimatedInput 
                                {...field} 
                                value={field.value || authPhone || ''}
                                placeholder="+7 (___) ___-__-__" 
                                className="pl-10" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telegram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telegram</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                              <AnimatedInput 
                                {...field} 
                                value={field.value || authPhone || ''}
                                placeholder="@username или номер телефона" 
                                className="pl-10" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Шаг 2: Опыт и квалификация */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Опыт работы в HoReCa *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите опыт" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceRanges.map((exp) => (
                                <SelectItem key={exp.value} value={exp.value}>
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
                      name="currentPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Текущая позиция *</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {positions.map((pos) => {
                              const Icon = positionIcons[pos.value] || User
                              return (
                                <SelectableCard
                                  key={pos.value}
                                  icon={Icon}
                                  label={pos.label}
                                  value={pos.value}
                                  selected={field.value === pos.value}
                                  onSelect={field.onChange}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="desiredPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Желаемая позиция *</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {positions.map((pos) => {
                              const Icon = positionIcons[pos.value] || User
                              return (
                                <SelectableCard
                                  key={pos.value}
                                  icon={Icon}
                                  label={pos.label}
                                  value={pos.value}
                                  selected={field.value === pos.value}
                                  onSelect={field.onChange}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasTeam"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Есть своя команда? *</FormLabel>
                          <div className="grid grid-cols-2 gap-4">
                            <SelectableCard
                              label="Да"
                              value="yes"
                              selected={field.value === 'yes'}
                              onSelect={field.onChange}
                            />
                            <SelectableCard
                              label="Нет"
                              value="no"
                              selected={field.value === 'no'}
                              onSelect={field.onChange}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Образование и квалификация *</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {educationLevels.map((edu) => {
                              const Icon = educationIcons[edu.value] || GraduationCap
                              return (
                                <SelectableCard
                                  key={edu.value}
                                  icon={Icon}
                                  label={edu.label}
                                  value={edu.value}
                                  selected={field.value === edu.value}
                                  onSelect={field.onChange}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rank"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Разряд повара *</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {ranks.map((rank) => {
                              const Icon = rankIcons[rank.value] || Star
                              return (
                                <SelectableCard
                                  key={rank.value}
                                  icon={Icon}
                                  label={rank.label}
                                  value={rank.value}
                                  selected={field.value === rank.value}
                                  onSelect={field.onChange}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Шаг 3: Специализация и навыки */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="cuisines"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Кухни и специализация *</FormLabel>
                          <div className="flex flex-wrap gap-5">
                            {cuisines.map((cuisine) => {
                              const Icon = cuisineIcons[cuisine.value] || Utensils
                              return (
                                <SelectableBadge
                                  key={cuisine.value}
                                  icon={Icon}
                                  label={cuisine.label}
                                  value={cuisine.value}
                                  selected={!!(field.value?.includes(cuisine.value))}
                                  onToggle={(value) => {
                                    const current = field.value || []
                                    if (current.includes(value)) {
                                      field.onChange(current.filter((v) => v !== value))
                                    } else {
                                      field.onChange([...current, value])
                                    }
                                  }}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="certificates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Сертификаты</FormLabel>
                          <div className="flex flex-wrap gap-5">
                            {certificates.map((cert) => {
                              const Icon = certificateIcons[cert.value] || Award
                              return (
                                <SelectableBadge
                                  key={cert.value}
                                  icon={Icon}
                                  label={cert.label}
                                  value={cert.value}
                                  selected={!!(field.value?.includes(cert.value))}
                                  onToggle={(value) => {
                                    const current = field.value || []
                                    if (current.includes(value)) {
                                      field.onChange(current.filter((v) => v !== value))
                                    } else {
                                      field.onChange([...current, value])
                                    }
                                  }}
                                />
                              )
                            })}
                          </div>
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
                          <div className="flex flex-wrap gap-5">
                            {additionalSkills.map((skill) => {
                              const Icon = skillIcons[skill.value] || Users
                              return (
                                <SelectableBadge
                                  key={skill.value}
                                  icon={Icon}
                                  label={skill.label}
                                  value={skill.value}
                                  selected={!!(field.value?.includes(skill.value))}
                                  onToggle={(value) => {
                                    const current = field.value || []
                                    if (current.includes(value)) {
                                      field.onChange(current.filter((v) => v !== value))
                                    } else {
                                      field.onChange([...current, value])
                                    }
                                  }}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Шаг 4: Условия и ожидания */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="currentVenueFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Текущий формат заведения *</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {venueFormats.map((venue) => {
                              const Icon = venueFormatIcons[venue.value] || Building2
                              return (
                                <SelectableCard
                                  key={venue.value}
                                  icon={Icon}
                                  label={venue.label}
                                  value={venue.value}
                                  selected={field.value === venue.value}
                                  onSelect={field.onChange}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredVenueFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Желаемый формат заведения *</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {venueFormats.map((venue) => {
                              const Icon = venueFormatIcons[venue.value] || Building2
                              return (
                                <SelectableCard
                                  key={venue.value}
                                  icon={Icon}
                                  label={venue.label}
                                  value={venue.value}
                                  selected={field.value === venue.value}
                                  onSelect={field.onChange}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentSalary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Текущая зарплата *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите диапазон" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {salaryRanges.map((range) => (
                                <SelectItem key={range.value} value={range.value}>
                                  {range.label}
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
                      name="salaryExpectation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Желаемая зарплата *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите диапазон" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {salaryRanges.map((range) => (
                                <SelectItem key={range.value} value={range.value}>
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Шаг 5: Финал и о себе */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Цели использования ChefUp *</FormLabel>
                          <div className="flex flex-wrap gap-5">
                            {[
                              { value: 'find-job', label: 'Найти работу', icon: Search },
                              { value: 'find-employees', label: 'Найти сотрудников', icon: UserPlus },
                              { value: 'internship', label: 'Стажировки', icon: Plane },
                              { value: 'personal-brand', label: 'Личный бренд', icon: Sparkles },
                              { value: 'learning', label: 'Обучение', icon: GraduationCap },
                            ].map((goal) => {
                              const Icon = goal.icon
                              return (
                                <SelectableBadge
                                  key={goal.value}
                                  icon={Icon}
                                  label={goal.label}
                                  value={goal.value}
                                  selected={!!(field.value?.includes(goal.value))}
                                  onToggle={(value) => {
                                    const current = field.value || []
                                    if (current.includes(value)) {
                                      field.onChange(current.filter((v) => v !== value))
                                    } else {
                                      field.onChange([...current, value])
                                    }
                                  }}
                                />
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                              <AnimatedInput {...field} placeholder="@username" className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Портфолио (ссылка)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                              <AnimatedInput {...field} placeholder="https://..." className="pl-10" />
                            </div>
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
                          <FormLabel>Расскажите о себе *</FormLabel>
                          <FormControl>
                            <AnimatedTextarea
                              {...field}
                              placeholder="Минимум 50 символов..."
                              className="min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Оцените анкету ChefUp *</FormLabel>
                          <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                type="button"
                                onClick={() => field.onChange(star)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-4xl"
                              >
                                <Star
                                  className={`w-12 h-12 ${
                                    star <= (field.value || 0)
                                      ? 'fill-[#F97316] text-[#F97316]'
                                      : 'text-gray-300'
                                  }`}
                                />
                              </motion.button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="suggestions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ваши идеи и предложения</FormLabel>
                          <FormControl>
                            <AnimatedTextarea
                              {...field}
                              placeholder="Что можно улучшить?"
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Навигация */}
              <div className="flex gap-4 pt-8 border-t">
                {currentStep > 1 && (
                  <ShinyButton
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 md:flex-initial min-h-[56px]"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Назад
                  </ShinyButton>
                )}
                {currentStep < TOTAL_STEPS ? (
                  <ShinyButton
                    type="button"
                    onClick={handleNext}
                    className="flex-1 min-h-[56px]"
                  >
                    Далее
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </ShinyButton>
                ) : (
                  <ShinyButton
                    type="submit"
                    className="flex-1 min-h-[56px]"
                  >
                    Создать профиль
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  </ShinyButton>
                )}
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
    </div>
  )
}

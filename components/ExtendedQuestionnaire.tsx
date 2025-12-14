'use client'

import { useState, useEffect } from 'react'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Check, Utensils, Pizza, Fish, Salad, Soup, Beef, Coffee, Cake, Sandwich, Cookie, Apple, Cherry, Grape, Carrot, Egg, Milk, Croissant, Donut, Candy } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useOnboardingStore } from '@/stores/useOnboardingStore'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

interface ExtendedQuestionnaireData {
  bestDishes: string[]
  bestDishesWhy: string
  seasonalIngredientsExperience: string
  wasteOptimization: string
  shiftScheduleReady: boolean
  relocationReady: boolean
  schedulePreferences: string[]
  jobSearchReasons: string[]
  teamCulturePreferences: string[]
}

// Типы блюд с иконками
const dishTypes = [
  { name: 'Бургеры', icon: Sandwich },
  { name: 'Паста', icon: Utensils },
  { name: 'Пицца', icon: Pizza },
  { name: 'Суши', icon: Fish },
  { name: 'Роллы', icon: Fish },
  { name: 'Тако', icon: Sandwich },
  { name: 'Буррито', icon: Sandwich },
  { name: 'Салаты', icon: Salad },
  { name: 'Супы', icon: Soup },
  { name: 'Стейки', icon: Beef },
  { name: 'Гриль', icon: Beef },
  { name: 'Фритюр', icon: Beef },
  { name: 'Десерты', icon: Cake },
  { name: 'Завтраки', icon: Coffee },
  { name: 'Бранчи', icon: Coffee },
  { name: 'Обеды', icon: Utensils },
  { name: 'Ужины', icon: Utensils },
  { name: 'Закуски', icon: Cookie },
  { name: 'Ризотто', icon: Utensils },
  { name: 'Лазанья', icon: Utensils },
  { name: 'Хот-доги', icon: Sandwich },
  { name: 'Барбекю', icon: Beef },
  { name: 'Рамен', icon: Soup },
  { name: 'Темпура', icon: Fish },
  { name: 'Карри', icon: Soup },
  { name: 'Наан', icon: Cookie },
  { name: 'Круассаны', icon: Croissant },
  { name: 'Пад тай', icon: Utensils },
  { name: 'Донер', icon: Sandwich },
]

const scheduleOptions = [
  'Утренние смены (6:00 - 14:00)',
  'Дневные смены (14:00 - 22:00)',
  'Ночные смены (22:00 - 6:00)',
  'Гибкий график',
  'Выходные дни предпочтительно',
  'Готов к любому графику',
]

const jobSearchReasons = [
  'Рост зарплаты',
  'Развитие карьеры',
  'Новые вызовы',
  'Лучшие условия работы',
  'Смена обстановки',
  'Конфликт с руководством',
  'Переезд',
  'Другое',
]

const teamCultureOptions = [
  'Молодая команда (до 30 лет)',
  'Опытная команда (30+ лет)',
  'Смешанный возраст',
  'Корпоративная культура',
  'Семейная атмосфера',
  'Профессиональная среда',
  'Без предпочтений',
]

interface ExtendedQuestionnaireProps {
  onComplete: () => void
  onCancel?: () => void
}

export function ExtendedQuestionnaire({ onComplete, onCancel }: ExtendedQuestionnaireProps) {
  const formData = useOnboardingStore((state) => state.formData)
  const setFormData = useOnboardingStore((state) => state.setFormData)
  
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [data, setData] = useState<Partial<ExtendedQuestionnaireData>>({
    bestDishes: formData.extendedQuestionnaire?.bestDishes || [],
    bestDishesWhy: formData.extendedQuestionnaire?.bestDishesWhy || '',
    seasonalIngredientsExperience: formData.extendedQuestionnaire?.seasonalIngredientsExperience || '',
    wasteOptimization: formData.extendedQuestionnaire?.wasteOptimization || '',
    shiftScheduleReady: formData.extendedQuestionnaire?.shiftScheduleReady || false,
    relocationReady: formData.extendedQuestionnaire?.relocationReady || false,
    schedulePreferences: formData.extendedQuestionnaire?.schedulePreferences || [],
    jobSearchReasons: formData.extendedQuestionnaire?.jobSearchReasons || [],
    teamCulturePreferences: formData.extendedQuestionnaire?.teamCulturePreferences || [],
  })

  const totalSteps = 7
  const progress = ((currentStep + 1) / totalSteps) * 100

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleNext = () => {
    // Валидация текущего шага
    if (currentStep === 0) {
      if (data.bestDishes?.length !== 3 || !data.bestDishesWhy) {
        toast.error('Выберите 3 вида блюд и укажите причину')
        return
      }
    } else if (currentStep === 1) {
      if (!data.seasonalIngredientsExperience) {
        toast.error('Укажите опыт работы с сезонными ингредиентами')
        return
      }
    } else if (currentStep === 2) {
      if (!data.wasteOptimization) {
        toast.error('Опишите ситуацию оптимизации')
        return
      }
    } else if (currentStep === 3) {
      if (data.shiftScheduleReady === undefined || data.relocationReady === undefined) {
        toast.error('Ответьте на оба вопроса')
        return
      }
    } else if (currentStep === 4) {
      if (!data.schedulePreferences || data.schedulePreferences.length === 0) {
        toast.error('Выберите хотя бы один вариант')
        return
      }
    } else if (currentStep === 5) {
      if (!data.jobSearchReasons || data.jobSearchReasons.length === 0) {
        toast.error('Выберите хотя бы одну причину')
        return
      }
    } else if (currentStep === 6) {
      if (!data.teamCulturePreferences || data.teamCulturePreferences.length === 0) {
        toast.error('Выберите хотя бы один вариант')
        return
      }
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setFormData({
      extendedQuestionnaire: data as ExtendedQuestionnaireData,
    })
    setShowConfetti(true)
    toast.success('Расширенная анкета заполнена!')
    setTimeout(() => {
      setShowConfetti(false)
      onComplete()
    }, 3000)
  }

  const toggleArrayItem = (array: string[] | undefined, item: string) => {
    const current = array || []
    if (current.includes(item)) {
      return current.filter((i) => i !== item)
    }
    return [...current, item]
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-2 block">
                Какие 3 вида блюд вы готовите лучше всего и почему? <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-8">
                Выберите ровно 3 вида блюд
              </p>
              <div className="grid grid-cols-3 gap-3">
                {dishTypes.map((dish) => {
                  const Icon = dish.icon
                  const isSelected = data.bestDishes?.includes(dish.name) || false
                  return (
                    <motion.button
                      key={dish.name}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 relative
                        ${isSelected 
                          ? 'bg-gradient-to-br from-[#F97316] to-[#FB923C] text-white border-[#F97316] shadow-lg shadow-[#F97316]/50 ring-4 ring-[#F97316]/30 dark:ring-[#F97316]/50' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#F97316]/30 dark:hover:border-[#F97316]/50'
                        }
                      `}
                      onClick={() => {
                        if (isSelected) {
                          setData({ ...data, bestDishes: data.bestDishes?.filter((d) => d !== dish.name) })
                        } else {
                          if (data.bestDishes && data.bestDishes.length >= 3) {
                            toast.error('Можно выбрать только 3 вида блюд')
                            return
                          }
                          setData({ ...data, bestDishes: [...(data.bestDishes || []), dish.name] })
                        }
                      }}
                    >
                      <Icon className={`w-6 h-6 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium text-center ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {dish.name}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center"
                        >
                          <span className="text-[#F97316] text-xs font-bold">✓</span>
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
              {data.bestDishes && data.bestDishes.length > 0 && (
                <div className="mt-8">
                  <Label className="text-lg font-semibold mb-3 block">
                    Почему именно эти блюда? <span className="text-red-500">*</span>
                  </Label>
                  <AnimatedTextarea
                    value={data.bestDishesWhy}
                    onChange={(e) => setData({ ...data, bestDishesWhy: e.target.value })}
                    placeholder="Опишите, почему вы лучше всего готовите именно эти блюда..."
                    className="min-h-[120px]"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">
                Сколько лет опыта в работе с сезонными ингредиентами? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={data.seasonalIngredientsExperience}
                onValueChange={(value) => setData({ ...data, seasonalIngredientsExperience: value })}
              >
                <div className="space-y-3">
                  {['Меньше года', '1-2 года', '3-5 лет', '5-10 лет', 'Более 10 лет'].map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={`exp-${option}`} />
                      <Label htmlFor={`exp-${option}`} className="cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-2 block">
                Опишите ситуацию, когда вы оптимизировали кухонный процесс для снижения отходов. <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-8">
                Опишите конкретную ситуацию, методы оптимизации и результаты
              </p>
              <AnimatedTextarea
                value={data.wasteOptimization}
                onChange={(e) => setData({ ...data, wasteOptimization: e.target.value })}
                placeholder="Опишите конкретную ситуацию, методы оптимизации и результаты..."
                className="min-h-[200px]"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-2 block">
                Готовы ли вы к сменному графику и переезду за доплату? <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-8">
                Ответьте на оба вопроса
              </p>
              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <Label className="text-base font-medium mb-4 block">Сменный график</Label>
                  <RadioGroup
                    value={data.shiftScheduleReady?.toString()}
                    onValueChange={(value) => setData({ ...data, shiftScheduleReady: value === 'true' })}
                  >
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="shift-yes" />
                        <Label htmlFor="shift-yes" className="cursor-pointer">Да</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="shift-no" />
                        <Label htmlFor="shift-no" className="cursor-pointer">Нет</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <Label className="text-base font-medium mb-4 block">Переезд за доплату</Label>
                  <RadioGroup
                    value={data.relocationReady?.toString()}
                    onValueChange={(value) => setData({ ...data, relocationReady: value === 'true' })}
                  >
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="reloc-yes" />
                        <Label htmlFor="reloc-yes" className="cursor-pointer">Да</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="reloc-no" />
                        <Label htmlFor="reloc-no" className="cursor-pointer">Нет</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-2 block">
                Предпочтения по графику работы (смены, выходные)? <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-8">
                Выберите все подходящие варианты
              </p>
              <div className="space-y-3">
                {scheduleOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Checkbox
                      id={`schedule-${option}`}
                      checked={data.schedulePreferences?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        setData({
                          ...data,
                          schedulePreferences: toggleArrayItem(data.schedulePreferences, option),
                        })
                      }}
                      className="flex-shrink-0"
                    />
                    <Label htmlFor={`schedule-${option}`} className="cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-2 block">
                Основные причины поиска новой работы? <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-8">
                Выберите все подходящие варианты
              </p>
              <div className="space-y-3">
                {jobSearchReasons.map((reason) => (
                  <div key={reason} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Checkbox
                      id={`reason-${reason}`}
                      checked={data.jobSearchReasons?.includes(reason) || false}
                      onCheckedChange={(checked) => {
                        setData({
                          ...data,
                          jobSearchReasons: toggleArrayItem(data.jobSearchReasons, reason),
                        })
                      }}
                      className="flex-shrink-0"
                    />
                    <Label htmlFor={`reason-${reason}`} className="cursor-pointer flex-1">
                      {reason}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-2 block">
                Предпочтения по возрасту команды или корпоративной культуре? <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-8">
                Выберите все подходящие варианты
              </p>
              <div className="space-y-3">
                {teamCultureOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Checkbox
                      id={`culture-${option}`}
                      checked={data.teamCulturePreferences?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        setData({
                          ...data,
                          teamCulturePreferences: toggleArrayItem(data.teamCulturePreferences, option),
                        })
                      }}
                      className="flex-shrink-0"
                    />
                    <Label htmlFor={`culture-${option}`} className="cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      <div className="w-full max-w-3xl mx-auto">
        <AnimatedCard className="bg-white dark:bg-dark/50 shadow-sm rounded-xl border border-gray-200/50 dark:border-border/50">
          <div className="p-6 md:p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Вопрос {currentStep + 1} из {totalSteps}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200/50 dark:border-border/50">
            <div>
              {currentStep > 0 && (
                <ShinyButton variant="outline" onClick={handleBack} className="whitespace-nowrap min-w-[100px]">
                  <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Назад</span>
                </ShinyButton>
              )}
              {onCancel && currentStep === 0 && (
                <ShinyButton variant="ghost" onClick={onCancel} className="ml-2 whitespace-nowrap">
                  Отмена
                </ShinyButton>
              )}
            </div>
            <ShinyButton onClick={handleNext} className="whitespace-nowrap min-w-[120px]">
              {currentStep === totalSteps - 1 ? (
                <>
                  <span className="truncate">Завершить</span>
                  <Check className="w-4 h-4 ml-2 flex-shrink-0" />
                </>
              ) : (
                <>
                  <span className="truncate">Далее</span>
                  <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                </>
              )}
            </ShinyButton>
          </div>
          </div>
        </AnimatedCard>
      </div>
    </>
  )
}


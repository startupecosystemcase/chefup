'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { useAuthStore, useEventsStore } from '@/stores/useOnboardingStore'
import { eventSchema, type Event } from '@/types/events.types'
import { ArrowLeft } from 'lucide-react'

type EventFormData = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'organizerId'>

export default function CreateEventPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const { addEvent } = useEventsStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/auth')
      return
    }
    if (userRole !== 'moderator') {
      router.push('/dashboard')
      return
    }
    setMounted(true)
  }, [userId, userRole, router])

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema.omit({ id: true, createdAt: true, updatedAt: true, status: true, organizerId: true })),
    defaultValues: {
      title: '',
      type: 'business-breakfast',
      description: '',
      organizer: '',
      date: '',
      time: '',
      location: '',
      address: '',
      maxParticipants: 20,
      price: 0,
      imageUrl: '',
      tags: [],
    },
  })

  const onSubmit = (data: EventFormData) => {
    if (!userId) return

    addEvent(data, userId)
    toast.success('Событие создано и отправлено на модерацию!')
    router.push('/dashboard/community')
  }

  if (!mounted || userRole !== 'moderator') {
    return null
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-2xl">
        <ShinyButton variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </ShinyButton>

        <AnimatedCard className="bg-white dark:bg-dark/50">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 dark:text-white">Создать событие</h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
              Заполните информацию о событии. После создания оно будет отправлено на модерацию.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Название события *</FormLabel>
                      <FormControl>
                        <AnimatedInput placeholder="Например: Бизнес-завтрак шеф-поваров" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тип события *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип события" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="business-breakfast">Бизнес-завтрак</SelectItem>
                          <SelectItem value="restaurant-opening">Открытие ресторана</SelectItem>
                          <SelectItem value="networking">Нетворкинг</SelectItem>
                          <SelectItem value="conference">Конференция</SelectItem>
                          <SelectItem value="workshop">Мастер-класс</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Описание *</FormLabel>
                      <FormControl>
                        <AnimatedTextarea
                          placeholder="Подробное описание события..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Организатор *</FormLabel>
                      <FormControl>
                        <AnimatedInput placeholder="Название организатора" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Дата *</FormLabel>
                        <FormControl>
                          <AnimatedInput type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Время *</FormLabel>
                        <FormControl>
                          <AnimatedInput type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Город *</FormLabel>
                      <FormControl>
                        <AnimatedInput placeholder="Например: Алматы" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Адрес *</FormLabel>
                      <FormControl>
                        <AnimatedInput placeholder="Полный адрес места проведения" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Максимум участников *</FormLabel>
                        <FormControl>
                          <AnimatedInput
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Цена (₸) *</FormLabel>
                        <FormControl>
                          <AnimatedInput
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">URL изображения (необязательно)</FormLabel>
                      <FormControl>
                        <AnimatedInput placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <ShinyButton type="button" variant="outline" onClick={() => router.back()}>
                    Отмена
                  </ShinyButton>
                  <ShinyButton type="submit" className="flex-1">
                    Создать событие
                  </ShinyButton>
                </div>
              </form>
            </Form>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}


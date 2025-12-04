'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { DialogFooter } from '@/components/magicui/animated-dialog'
import { useAuthStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { User, Building2 } from 'lucide-react'

const registrationSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  email: z.string().email('Неверный формат email'),
  role: z.enum(['applicant', 'employer'], {
    required_error: 'Выберите вашу роль',
  }),
  comments: z.string().max(500, 'Максимум 500 символов').optional().or(z.literal('')),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

interface EventRegistrationFormProps {
  eventId: string
  eventTitle: string
  onSuccess: () => void
  onCancel: () => void
}

export function EventRegistrationForm({ eventId, eventTitle, onSuccess, onCancel }: EventRegistrationFormProps) {
  const userId = useAuthStore((state) => state.userId)
  const userRole = useAuthStore((state) => state.userRole)
  const formData = useOnboardingStore((state) => state.formData)

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      phone: formData.phone || '',
      email: formData.email || '',
      role: (userRole === 'employer' ? 'employer' : 'applicant') as 'applicant' | 'employer',
      comments: '',
    },
  })

  const onSubmit = async (data: RegistrationFormData) => {
    // Здесь будет отправка данных на сервер
    console.log('Registration data:', { eventId, ...data })
    toast.success('Заявка на участие отправлена! Ожидайте подтверждения.')
    onSuccess()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роль *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="applicant" id="reg-applicant" className="peer sr-only" />
                      <Label
                        htmlFor="reg-applicant"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <User className="mb-2 h-5 w-5" />
                        <span className="text-sm font-medium">Кандидат</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="employer" id="reg-employer" className="peer sr-only" />
                      <Label
                        htmlFor="reg-employer"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Building2 className="mb-2 h-5 w-5" />
                        <span className="text-sm font-medium">Работодатель</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарии (необязательно)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Дополнительная информация, вопросы..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit">
            Отправить заявку
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}


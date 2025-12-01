'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuthStore, type UserRole } from '@/stores/useOnboardingStore'
import { User, Building2 } from 'lucide-react'

const phoneSchema = z.object({
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  role: z.enum(['applicant', 'employer'], {
    required_error: 'Выберите тип аккаунта',
  }),
})

type PhoneFormData = z.infer<typeof phoneSchema>

export default function AuthPage() {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const setUserId = useAuthStore((state) => state.setUserId)
  const setUserRole = useAuthStore((state) => state.setUserRole)
  const [isLoading, setIsLoading] = useState(false)

  // Проверка на активную авторизацию
  useEffect(() => {
    if (userId) {
      router.push('/dashboard')
    }
  }, [userId, router])

  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
      role: undefined,
    },
  })

  const onSubmit = async (data: PhoneFormData) => {
    setIsLoading(true)
    // Mock аутентификация - генерируем UUID
    const userId = crypto.randomUUID()
    setUserId(userId)
    setUserRole(data.role as UserRole)
    
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Регистрация успешна!')
      // Перенаправляем в зависимости от роли
      if (data.role === 'applicant') {
        router.push('/onboarding')
      } else if (data.role === 'employer') {
        router.push('/onboarding/employer')
      }
    }, 500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Регистрация</CardTitle>
            <CardDescription>
              Введите номер телефона для начала регистрации
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тип аккаунта</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="applicant"
                              id="applicant"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="applicant"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <User className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">Соискатель</span>
                              <span className="text-xs text-muted-foreground text-center mt-1">
                                Повар, шеф, персонал кухни
                              </span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="employer"
                              id="employer"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="employer"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Building2 className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">Работодатель</span>
                              <span className="text-xs text-muted-foreground text-center mt-1">
                                Ресторан, управляющая компания
                              </span>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер телефона</FormLabel>
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Отправка...' : 'Продолжить'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}


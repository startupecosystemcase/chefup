'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import { StickyHeader } from '@/components/landing/StickyHeader'
import { AnimatedCounter } from '@/components/landing/AnimatedCounter'
import { TestimonialsSwiper } from '@/components/landing/TestimonialsSwiper'
import { StickyBottomBar } from '@/components/landing/StickyBottomBar'
import { Footer } from '@/components/Footer'
import {
  ChefHat,
  Building2,
  CheckCircle,
  ArrowRight,
  Users,
  Briefcase,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Award,
  FileText,
  Sparkles,
  MapPin,
  Clock,
  BarChart3,
  UserCheck,
  Settings,
  GraduationCap,
  Calendar,
  MessageSquare,
  Star,
  Play,
} from 'lucide-react'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

function FadeUpSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUpVariants}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const router = useRouter()
  const [phone, setPhone] = useState('')

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Код отправлен!')
    setPhone('')
  }

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader />
      <StickyBottomBar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Анимированное оранжевое свечение */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F97316]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </div>

          <div className="container mx-auto px-5 lg:px-[120px] relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] mb-6 leading-tight"
              >
                Всё для продуктивной работы в HoReCa
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-[#64748B] mb-12 max-w-3xl mx-auto"
              >
                ChefUp — это платформа для поиска работы, нетворкинга и обучения в сфере ресторанного бизнеса
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Button
                    size="lg"
                    className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-lg px-8 py-6 h-auto min-h-[56px] w-full sm:w-auto shadow-lg shadow-[#F97316]/30"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 h-auto min-h-[56px] w-full sm:w-auto border-2"
                  onClick={() => router.push('/auth')}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Смотреть демо
                </Button>
              </motion.div>

              {/* Статистика под Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F97316] mb-1">
                    <AnimatedCounter end={14200} suffix="+" />
                  </div>
                  <p className="text-sm text-[#64748B]">Специалистов</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F97316] mb-1">
                    <AnimatedCounter end={920} suffix="+" />
                  </div>
                  <p className="text-sm text-[#64748B]">Ресторанов</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F97316] mb-1">
                    <AnimatedCounter end={8} />
                  </div>
                  <p className="text-sm text-[#64748B]">Стран</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F97316] mb-1">
                    <AnimatedCounter end={42} />
                  </div>
                  <p className="text-sm text-[#64748B]">Городов</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Для кого - улучшенная версия */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Для кого
              </h2>
              <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                Платформа для специалистов и ресторанов
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Специалистам */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border-2 border-transparent hover:border-[#F97316]/30 transition-all bg-white shadow-lg hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mb-4"
                    >
                      <ChefHat className="w-8 h-8 text-[#F97316]" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-[#0F172A]">Специалистам</CardTitle>
                    <CardDescription className="text-base">
                      Для поваров, шефов и персонала кухни
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { icon: Target, text: 'Персональные рекомендации вакансий на основе AI' },
                        { icon: FileText, text: 'Автоматическое формирование резюме в 1 клик' },
                        { icon: Shield, text: 'Доступ к закрытым вакансиям от топ-ресторанов' },
                        { icon: GraduationCap, text: 'Образовательные программы и сертификации' },
                      ].map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 text-[#64748B]"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4 text-[#F97316]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <Button
                      className="w-full mt-6 bg-[#F97316] hover:bg-[#F97316]/90 text-white"
                      onClick={() => router.push('/auth')}
                    >
                      Зарегистрироваться
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Ресторанам */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border-2 border-transparent hover:border-[#F97316]/30 transition-all bg-white shadow-lg hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mb-4"
                    >
                      <Building2 className="w-8 h-8 text-[#F97316]" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-[#0F172A]">Ресторанам</CardTitle>
                    <CardDescription className="text-base">
                      Для ресторанов и управляющих компаний
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { icon: UserCheck, text: 'Автоматизированный подбор персонала' },
                        { icon: BarChart3, text: 'Продвинутая аналитика кандидатов' },
                        { icon: Settings, text: 'Собственная IT-система и ERP ChefUp' },
                        { icon: Users, text: 'Консалтинг и экспертиза HoReCa' },
                      ].map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 text-[#64748B]"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4 text-[#F97316]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <Button
                      className="w-full mt-6 bg-[#F97316] hover:bg-[#F97316]/90 text-white"
                      onClick={() => router.push('/auth')}
                    >
                      Подключить компанию
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </FadeUpSection>

        {/* Как это работает - улучшенная версия */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Как это работает
              </h2>
              <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                Три простых шага к новой карьере
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Прогресс-бар */}
                <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 hidden md:block" />
                <div className="grid md:grid-cols-3 gap-8 relative">
                  {[
                    {
                      step: 1,
                      icon: FileText,
                      title: 'Заполните профиль',
                      description: 'Укажите опыт, навыки, специализацию и предпочтения. Это займёт всего 5 минут.',
                    },
                    {
                      step: 2,
                      icon: Zap,
                      title: 'AI анализирует',
                      description: 'Наш алгоритм автоматически подбирает релевантные вакансии на основе вашего профиля.',
                    },
                    {
                      step: 3,
                      icon: Award,
                      title: 'Получайте предложения',
                      description: 'Работодатели видят ваше резюме и отправляют приглашения. Выбирайте лучшее!',
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative"
                      >
                        <div className="text-center">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-24 h-24 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mx-auto mb-6 relative z-10"
                          >
                            <Icon className="w-12 h-12 text-[#F97316]" />
                          </motion.div>
                          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#F97316] hidden md:flex items-center justify-center z-10">
                            <span className="text-sm font-bold text-[#F97316]">{item.step}</span>
                          </div>
                          <h3 className="text-xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
                          <p className="text-[#64748B]">{item.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Преимущества - инфографика */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Преимущества платформы
              </h2>
              <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                Всё, что нужно для успешной карьеры в HoReCa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: 'Закрытые вакансии',
                  description: 'Доступ к эксклюзивным предложениям от топ-ресторанов',
                  stat: '+35% к ЗП',
                  color: 'bg-blue-50 border-blue-200',
                },
                {
                  icon: Globe,
                  title: 'Стажировки за рубежом',
                  description: 'Международные возможности в 8 странах',
                  stat: '8 стран',
                  color: 'bg-green-50 border-green-200',
                },
                {
                  icon: FileText,
                  title: 'Авторезюме в 1 клик',
                  description: 'Автоматическое формирование профессионального резюме',
                  stat: '100%',
                  color: 'bg-purple-50 border-purple-200',
                },
                {
                  icon: Sparkles,
                  title: 'Персональные офферы',
                  description: 'AI-рекомендации на основе вашего профиля',
                  stat: 'AI',
                  color: 'bg-orange-50 border-orange-200',
                },
                {
                  icon: Users,
                  title: 'Нетворкинг',
                  description: 'Общение с топ-шефами и профессионалами индустрии',
                  stat: '1000+',
                  color: 'bg-pink-50 border-pink-200',
                },
                {
                  icon: GraduationCap,
                  title: 'Бесплатные курсы',
                  description: 'Образовательные программы и сертификации',
                  stat: '50+',
                  color: 'bg-indigo-50 border-indigo-200',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card className={`h-full border-2 ${feature.color} hover:border-[#F97316] transition-all cursor-pointer`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#F97316]" />
                          </div>
                          {feature.stat && (
                            <div className="px-3 py-1 rounded-full bg-[#F97316] text-white text-sm font-bold">
                              {feature.stat}
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-2">{feature.title}</h3>
                        <p className="text-sm text-[#64748B]">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* География - улучшенная версия */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                География присутствия
              </h2>
              <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                Мы работаем в крупнейших городах региона
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { city: 'Алматы', specialists: 3200 },
                { city: 'Астана', specialists: 2800 },
                { city: 'Шымкент', specialists: 1500 },
                { city: 'Караганда', specialists: 1200 },
                { city: 'Актобе', specialists: 900 },
                { city: 'Ташкент', specialists: 2100 },
              ].map((item, idx) => (
                <motion.div
                  key={item.city}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-white rounded-xl border-2 border-transparent hover:border-[#F97316] cursor-pointer text-center shadow-sm hover:shadow-md transition-all"
                >
                  <MapPin className="w-8 h-8 text-[#F97316] mx-auto mb-3" />
                  <h3 className="font-bold text-[#0F172A] mb-2">{item.city}</h3>
                  <p className="text-sm text-[#64748B]">
                    <AnimatedCounter end={item.specialists} />+ специалистов
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        {/* Отзывы */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Отзывы
              </h2>
              <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                Что говорят наши пользователи
              </p>
            </div>
            <TestimonialsSwiper />
          </div>
        </FadeUpSection>

        {/* Партнёры */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Наши партнёры
              </h2>
              <p className="text-xl text-[#64748B]">
                Проверенные компании и рестораны
              </p>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-6 max-w-6xl mx-auto">
              {Array.from({ length: 20 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
                  className="h-20 bg-gray-100 rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer border-2 border-transparent hover:border-[#F97316]/30"
                >
                  <span className="text-xs text-[#64748B] font-medium">Партнёр {idx + 1}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        {/* Final CTA */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <Card className="bg-gradient-to-br from-[#F97316]/10 via-white to-[#F97316]/5 border-2 border-[#F97316]/20 shadow-xl max-w-4xl mx-auto">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-[#F97316] flex items-center justify-center mx-auto mb-6"
                >
                  <Star className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                  Получи оффер уже завтра
                </h2>
                <p className="text-xl text-[#64748B] mb-8 max-w-2xl mx-auto">
                  Присоединяйся к тысячам специалистов, которые уже нашли работу мечты
                </p>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="mb-8"
                >
                  <Button
                    size="lg"
                    className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-lg px-8 py-6 h-auto min-h-[56px] w-full md:w-auto shadow-lg shadow-[#F97316]/30"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <div className="max-w-md mx-auto">
                  <p className="text-sm text-[#64748B] mb-3">Или оставь номер телефона</p>
                  <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white">
                      Отправить
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeUpSection>
      </main>

      <Footer />
    </div>
  )
}

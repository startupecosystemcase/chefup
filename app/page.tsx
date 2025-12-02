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
import Image from 'next/image'
import {
  ChefHat,
  Building2,
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
  Lock,
  DollarSign,
  Heart,
  Rocket,
  Trophy,
  BookOpen,
  ShoppingBag,
  TrendingDown,
  CheckCircle2,
  Phone,
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

  const cities = [
    { name: 'Алматы', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Астана', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Шымкент', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Ташкент', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Бишкек', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Актобе', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Баку', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Тбилиси', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Батуми', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
  ]

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
                Максимальная эффективность работы в HoReCa
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-[#64748B] mb-12 max-w-3xl mx-auto"
              >
                ChefUp — это первая экосистема в Центральной Евразии для поиска работы, нетворкинга и обучения в сфере ресторанного бизнеса
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
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
                  <Phone className="mr-2 w-5 h-5" />
                  Заказать консультацию
                </Button>
              </motion.div>

              {/* Статистика под Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-6"
              >
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F97316] mb-1">
                    <AnimatedCounter end={2000} suffix="+" />
                  </div>
                  <p className="text-sm text-[#64748B]">Специалистов</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F97316] mb-1">
                    <AnimatedCounter end={100} suffix="+" />
                  </div>
                  <p className="text-sm text-[#64748B]">Компаний</p>
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
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F97316] mb-1">
                    <AnimatedCounter end={10} suffix="+" />
                  </div>
                  <p className="text-sm text-[#64748B]">Лет экспертизы</p>
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
                      Для специалистов сферы HoReCa
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

              {/* Компаниям */}
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
                    <CardTitle className="text-2xl font-bold text-[#0F172A]">Компаниям</CardTitle>
                    <CardDescription className="text-base">
                      Для ресторанов, кафе, отелей, производств и других компаний
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

        {/* Экосистема ChefUp */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Экосистема ChefUp
              </h2>
              <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
                Одна платформа — вся карьера HoReCa в Центральной Евразии под контролем
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[
                {
                  icon: Lock,
                  title: 'Закрытые вакансии топ-ресторанов',
                  description: 'Доступ только для участников ChefUp — офферы, которых нет на HH, LinkedIn и Telegram-каналах.',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-200',
                },
                {
                  icon: Zap,
                  title: 'Персональные офферы за 24–48 часов',
                  description: 'Алгоритм сразу после заполнения профиля присылает подходящие вакансии и стажировки.',
                  color: 'text-yellow-600',
                  bgColor: 'bg-yellow-50',
                  borderColor: 'border-yellow-200',
                },
                {
                  icon: FileText,
                  title: 'Автоматическое резюме и профиль-блог',
                  description: 'Заполнил анкету один раз — получил красивую публичную страницу и PDF-резюме в 1 клик.',
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50',
                  borderColor: 'border-purple-200',
                },
                {
                  icon: TrendingUp,
                  title: 'Прозрачная зарплатная вилка и рост дохода',
                  description: 'Участники в среднем повышают доход на 30–40 % в первые 3 месяца (видно в статистике профиля).',
                  color: 'text-green-600',
                  bgColor: 'bg-green-50',
                  borderColor: 'border-green-200',
                },
                {
                  icon: Globe,
                  title: 'Стажировки и обмен опытом за рубежом',
                  description: 'Прямые программы с ресторанами Турции, ОАЭ, Грузии, Армении и Европы (оплачиваемые).',
                  color: 'text-indigo-600',
                  bgColor: 'bg-indigo-50',
                  borderColor: 'border-indigo-200',
                },
                {
                  icon: Users,
                  title: 'Нетворкинг с топ-шефами региона',
                  description: 'Закрытый чат и встречи с бренд-шефами, где можно найти ментора или партнёра.',
                  color: 'text-pink-600',
                  bgColor: 'bg-pink-50',
                  borderColor: 'border-pink-200',
                },
                {
                  icon: GraduationCap,
                  title: 'Бесплатные профессиональные курсы и сертификаты',
                  description: 'HACCP, сервис, калькуляция, фуд-фотография — всё внутри платформы.',
                  color: 'text-orange-600',
                  bgColor: 'bg-orange-50',
                  borderColor: 'border-orange-200',
                },
                {
                  icon: UserCheck,
                  title: 'Быстрый подбор команды для ресторанов',
                  description: 'Работодатели закрывают позиции шеф-поваров и линейных поваров за пару дней вместо 1-2 недель.',
                  color: 'text-cyan-600',
                  bgColor: 'bg-cyan-50',
                  borderColor: 'border-cyan-200',
                },
                {
                  icon: Rocket,
                  title: 'Личный бренд и медийность',
                  description: 'Лучшие профили продвигаем в Instagram и TikTok ChefUp (50k+ подписчиков), приглашаем на коллаборации и ТВ-съёмки.',
                  color: 'text-red-600',
                  bgColor: 'bg-red-50',
                  borderColor: 'border-red-200',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <Card className={`h-full border-2 ${feature.borderColor} hover:border-[#F97316] transition-all cursor-pointer relative overflow-hidden`}>
                      <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <CardContent className="p-6 relative z-10">
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                          className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#F97316]/30 transition-shadow`}
                        >
                          <Icon className={`w-7 h-7 ${feature.color}`} />
                        </motion.div>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* Наша миссия */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Наша миссия
              </h2>
              <p className="text-xl text-[#64748B] max-w-3xl mx-auto mb-4">
                ChefUp — это место, где повара находят работу мечты, а рестораны — надёжных людей.
              </p>
              <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                Вместе мы делаем HoReCa в нашем регионе лучше.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Больше не искать работу через знакомых и чаты',
                  description: 'Всё честно, быстро и в одном месте.',
                  icon: CheckCircle2,
                },
                {
                  title: 'Повар, бариста или официант мог легко перейти из маленького кафе в топовый ресторан или открыть своё дело',
                  description: 'Чтобы каждый имел шанс расти и строить настоящую карьеру.',
                  icon: TrendingUp,
                },
                {
                  title: 'Рестораны не мучились месяцами в поисках надежной команды',
                  description: 'Нашли хорошего повара или бариста — и сразу на работу.',
                  icon: Clock,
                },
                {
                  title: 'Люди перестали уезжать из профессии и из страны просто потому что «не видят перспективы»',
                  description: 'Чтобы талант оставался и развивался здесь, у нас дома.',
                  icon: Heart,
                },
                {
                  title: 'У поваров, барменов и шефов появилось своё живое профессиональное сообщество',
                  description: 'Где делятся опытом, помогают друг другу и вместе растут.',
                  icon: Users,
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border-2 border-transparent hover:border-[#F97316]/30 transition-all bg-white shadow-sm hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-[#F97316]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-3">{item.title}</h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* Возможности экосистемы */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Возможности экосистемы
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[
                {
                  icon: Target,
                  title: 'Умный поиск работы',
                  description: 'Персональная лента вакансий и стажировок, которая подстраивается под ваш профиль. Обновляется каждый день. Свайп влево/вправо как в Tinder — понравилось → отклик в 1 клик.',
                },
                {
                  icon: UserCheck,
                  title: 'Профиль-витрина',
                  description: 'Красивая публичная страница (chefup.kz/@ваше-имя) с фото, опытом, кухнями, зарплатной вилкой и отзывами. Можно отправлять ресторанам и шефам напрямую.',
                },
                {
                  icon: Lock,
                  title: 'Закрытые офферы',
                  description: 'Раздел «Только для своих» — вакансии и предложения, которых нет в открытом доступе. Приходят пушем и в Telegram-бот.',
                },
                {
                  icon: Briefcase,
                  title: 'Подбор команды (для ресторанов и шефов)',
                  description: 'Раздел «Нанимаю»: размещаете вакансию → получаете только подходящих и проверенных кандидатов за 3–7 дней.',
                },
                {
                  icon: GraduationCap,
                  title: 'Курсы и сертификаты',
                  description: 'Бесплатные и платные мини-курсы внутри приложения: HACCP, сервис, калькуляция, фуд-фото, молекулярка и т.д. После прохождения — сертификат в профиль.',
                },
                {
                  icon: Calendar,
                  title: 'События и стажировки',
                  description: 'Календарь мастер-классов, гастролей, ужинов и оплачиваемых стажировок (Турция, ОАЭ, Грузия и др.). Отклик → собеседование → чемодан.',
                },
                {
                  icon: MessageSquare,
                  title: 'Сообщество',
                  description: 'Закрытые чаты по городам и специализациям + общий чат «ChefUp Live». Здесь ищут замену на смену, делятся ТТК, находят партнёров и менторов.',
                },
                {
                  icon: Star,
                  title: 'Рейтинг и отзывы',
                  description: 'После работы ресторан оставляет вам отзыв и рейтинг (как в Uber). Чем выше рейтинг — тем выше вы в выдаче и больше офферов.',
                },
                {
                  icon: BarChart3,
                  title: 'Аналитика карьеры',
                  description: 'Раздел «Мой рост»: показывает, как менялась ваша зарплата, сколько откликов, в каких городах вас ждут, на сколько % вы выросли за год.',
                },
                {
                  icon: ShoppingBag,
                  title: 'Marketplace',
                  description: 'Покупка-продажа оборудования, инвентаря, формы б/у + поиск партнёров и инвесторов для своего кафе/фудтрака.',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border-2 border-transparent hover:border-[#F97316]/30 transition-all bg-white shadow-sm hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-[#F97316]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* География присутствия */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                География присутствия
              </h2>
              <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                Мы работаем в крупнейших городах Центральной Евразии
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cities.map((city, idx) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border-2 border-transparent hover:border-[#F97316] cursor-pointer bg-white shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-5 h-5" />
                        <h3 className="font-bold text-lg">{city.name}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ delay: 0.9 }}
                className="group relative overflow-hidden rounded-xl border-2 border-transparent hover:border-[#F97316] cursor-pointer bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 shadow-sm hover:shadow-lg transition-all flex items-center justify-center h-48"
              >
                <div className="text-center p-6">
                  <Globe className="w-12 h-12 text-[#F97316] mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-[#0F172A] mb-2">И еще 33 города</h3>
                  <p className="text-sm text-[#64748B]">Центральной Евразии</p>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeUpSection>

        {/* Отзывы */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Отзывы
              </h2>
              <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                Чего добились наши пользователи
              </p>
            </div>
            <TestimonialsSwiper />
          </div>
        </FadeUpSection>

        {/* Партнёры */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                Наши партнёры
              </h2>
              <p className="text-xl text-[#64748B]">
                Крупнейшие сети общепита в Казахстане
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
              {[
                'KFC',
                'Burger King',
                'McDonald\'s',
                'Papa John\'s',
                'Sulpak',
                'Astana Group',
                'Rixos',
                'Marriott',
              ].map((partner, idx) => (
                <motion.div
                  key={partner}
                  whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
                  className="h-24 bg-gray-100 rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer border-2 border-transparent hover:border-[#F97316]/30"
                >
                  <span className="text-sm font-semibold text-[#64748B] px-4 text-center">{partner}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        {/* Final CTA */}
        <FadeUpSection className="py-20 bg-gradient-to-br from-[#F97316]/10 via-white to-[#F97316]/5">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <Card className="bg-gradient-to-br from-[#F97316] via-[#F97316]/95 to-[#EA580C] border-0 shadow-2xl max-w-4xl mx-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <CardContent className="p-12 text-center relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, duration: 0.8 }}
                  className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 cursor-pointer"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Получи оффер уже завтра
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
                    className="bg-white hover:bg-white/90 text-[#F97316] text-lg px-8 py-6 h-auto min-h-[56px] w-full md:w-auto shadow-lg shadow-black/20 font-bold"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <div className="max-w-md mx-auto">
                  <p className="text-sm text-white/80 mb-3">Или оставь номер телефона</p>
                  <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-white/90 border-white/20"
                    />
                    <Button type="submit" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
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

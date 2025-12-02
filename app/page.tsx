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
  Building,
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
    { name: 'Астана', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Алматы', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Ташкент', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Бишкек', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Баку', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Тбилиси', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Шымкент', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Актобе', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
    { name: 'Батуми', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader />
      <StickyBottomBar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">
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

          <div className="container mx-auto px-4 md:px-6 lg:px-[120px] relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0F172A] mb-4 md:mb-6 leading-[1.2] md:leading-tight tracking-wide"
              >
                Максимальная эффективность работы в HoReCa
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-xl lg:text-2xl text-[#64748B] mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                ChefUp — это первая экосистема в Центральной Евразии для поиска работы, нетворкинга и обучения в сфере ресторанного бизнеса
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-12 md:mb-16"
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
                    className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto min-h-[52px] md:min-h-[56px] w-full sm:w-auto shadow-lg shadow-[#F97316]/30"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto min-h-[52px] md:min-h-[56px] w-full sm:w-auto border-2"
                  onClick={() => router.push('/auth')}
                >
                  <Phone className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                  Заказать консультацию
                </Button>
              </motion.div>

              {/* Статистика под Hero - вертикально на мобильных */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 max-w-4xl mx-auto"
              >
                {[
                  { value: 14200, suffix: '+', label: 'Специалистов' },
                  { value: 920, suffix: '+', label: 'Ресторанов' },
                  { value: 8, suffix: '', label: 'Стран' },
                  { value: 42, suffix: '', label: 'Городов' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0F172A] mb-2 leading-none">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm md:text-base text-[#64748B] font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Для кого - улучшенная версия */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4 tracking-wide">
                Для кого
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Специалистам */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border-2 border-transparent hover:border-gray-200 transition-all bg-white shadow-md hover:shadow-xl rounded-2xl">
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4"
                    >
                      <ChefHat className="w-7 h-7 md:w-8 md:h-8 text-[#0F172A]" />
                    </motion.div>
                    <CardTitle className="text-xl md:text-2xl font-black text-[#0F172A]">Специалистам</CardTitle>
                    <CardDescription className="text-sm md:text-base text-[#64748B]">
                      Для специалистов сферы HoReCa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 md:space-y-4">
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
                            className="flex items-start gap-3 text-sm md:text-base text-[#64748B]"
                          >
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3 h-3 md:w-4 md:h-4 text-[#0F172A]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <Button
                      className="w-full mt-6 bg-[#F97316] hover:bg-[#F97316]/90 text-white min-h-[52px] md:min-h-[56px]"
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
                <Card className="h-full border-2 border-transparent hover:border-gray-200 transition-all bg-white shadow-md hover:shadow-xl rounded-2xl">
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4"
                    >
                      <Building2 className="w-7 h-7 md:w-8 md:h-8 text-[#0F172A]" />
                    </motion.div>
                    <CardTitle className="text-xl md:text-2xl font-black text-[#0F172A]">Компаниям</CardTitle>
                    <CardDescription className="text-sm md:text-base text-[#64748B]">
                      Для ресторанов, кафе, отелей, производств и других компаний
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 md:space-y-4">
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
                            className="flex items-start gap-3 text-sm md:text-base text-[#64748B]"
                          >
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3 h-3 md:w-4 md:h-4 text-[#0F172A]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <Button
                      className="w-full mt-6 bg-[#F97316] hover:bg-[#F97316]/90 text-white min-h-[52px] md:min-h-[56px]"
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
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4 tracking-wide">
                Экосистема ChefUp
              </h2>
              <p className="text-base md:text-xl text-[#64748B] max-w-3xl mx-auto">
                Одна платформа — вся карьера HoReCa в Центральной Евразии под контролем
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
              {[
                {
                  icon: Lock,
                  title: 'Закрытые вакансии топ-ресторанов',
                  description: 'Доступ только для участников ChefUp — офферы, которых нет на HH, LinkedIn и Telegram-каналах.',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                },
                {
                  icon: Zap,
                  title: 'Персональные офферы за 24–48 часов',
                  description: 'Алгоритм сразу после заполнения профиля присылает подходящие вакансии и стажировки.',
                  color: 'text-yellow-600',
                  bgColor: 'bg-yellow-50',
                },
                {
                  icon: FileText,
                  title: 'Автоматическое резюме и профиль-блог',
                  description: 'Заполнил анкету один раз — получил красивую публичную страницу и PDF-резюме в 1 клик.',
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50',
                },
                {
                  icon: TrendingUp,
                  title: 'Прозрачная зарплатная вилка и рост дохода',
                  description: 'Участники в среднем повышают доход на 30–40 % в первые 3 месяца (видно в статистике профиля).',
                  color: 'text-green-600',
                  bgColor: 'bg-green-50',
                },
                {
                  icon: Globe,
                  title: 'Стажировки и обмен опытом за рубежом',
                  description: 'Прямые программы с ресторанами Турции, ОАЭ, Грузии, Армении и Европы (оплачиваемые).',
                  color: 'text-indigo-600',
                  bgColor: 'bg-indigo-50',
                },
                {
                  icon: Users,
                  title: 'Нетворкинг с топ-шефами региона',
                  description: 'Закрытый чат и встречи с бренд-шефами, где можно найти ментора или партнёра.',
                  color: 'text-pink-600',
                  bgColor: 'bg-pink-50',
                },
                {
                  icon: GraduationCap,
                  title: 'Бесплатные профессиональные курсы и сертификаты',
                  description: 'HACCP, сервис, калькуляция, фуд-фотография — всё внутри платформы.',
                  color: 'text-orange-600',
                  bgColor: 'bg-orange-50',
                },
                {
                  icon: UserCheck,
                  title: 'Быстрый подбор команды для ресторанов',
                  description: 'Работодатели закрывают позиции шеф-поваров и линейных поваров за пару дней вместо 1-2 недель.',
                  color: 'text-cyan-600',
                  bgColor: 'bg-cyan-50',
                },
                {
                  icon: Rocket,
                  title: 'Личный бренд и медийность',
                  description: 'Лучшие профили продвигаем в Instagram и TikTok ChefUp (50k+ подписчиков), приглашаем на коллаборации и ТВ-съёмки.',
                  color: 'text-red-600',
                  bgColor: 'bg-red-50',
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
                    <Card className="h-full border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer relative overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#F97316]/10 rounded-2xl">
                      <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <CardContent className="p-5 md:p-6 relative z-10">
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
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#F97316]/20 transition-shadow`}
                        >
                          <Icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.color}`} />
                        </motion.div>
                        <h3 className="text-base md:text-lg font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* Наша миссия - улучшенная версия с большими карточками */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4 tracking-wide">
                Наша миссия
              </h2>
              <p className="text-base md:text-xl text-[#64748B] max-w-3xl mx-auto mb-4">
                ChefUp — это место, где повара находят работу мечты, а рестораны — надёжных людей.
              </p>
              <p className="text-sm md:text-lg text-[#64748B] max-w-2xl mx-auto">
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    style={{ y: 0 }}
                  >
                    <Card className="h-full border-2 border-gray-200 hover:border-gray-300 transition-all bg-white shadow-md hover:shadow-xl rounded-2xl">
                      <CardContent className="p-6 md:p-8">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: idx * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                          className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-100 flex items-center justify-center mb-4 md:mb-6"
                        >
                          <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#0F172A]" />
                        </motion.div>
                        <h3 className="text-base md:text-lg font-bold text-[#0F172A] mb-3">{item.title}</h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* Возможности экосистемы - технологичный стиль */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Декоративные элементы */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px] relative z-10">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-wide">
                Возможности экосистемы
              </h2>
              <p className="text-base md:text-lg text-slate-300">
                Технологии будущего для HoReCa уже сегодня
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
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
                    initial={{ opacity: 0, y: 20, rotateY: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ rotateY: 5, scale: 1.02, z: 50 }}
                    className="group perspective-1000"
                  >
                    <Card className="h-full border-2 border-slate-700 hover:border-[#F97316] transition-all bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/20 rounded-2xl">
                      <CardContent className="p-5 md:p-6">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#F97316]/20 flex items-center justify-center mb-4 group-hover:bg-[#F97316]/30 transition-colors"
                        >
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#F97316]" />
                        </motion.div>
                        <h3 className="text-base md:text-lg font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* География присутствия */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4 tracking-wide">
                География присутствия
              </h2>
              <p className="text-base md:text-xl text-[#64748B] max-w-2xl mx-auto">
                Мы работаем в крупнейших городах Центральной Евразии
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {cities.map((city, idx) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer bg-white shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
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
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 shadow-md hover:shadow-xl transition-all flex items-center justify-center h-48"
              >
                <div className="text-center p-6">
                  <Globe className="w-12 h-12 text-[#0F172A] mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-[#0F172A] mb-2">И еще 33 города</h3>
                  <p className="text-sm text-[#64748B]">Центральной Евразии</p>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeUpSection>

        {/* Штаб-квартира */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-gray-200 shadow-lg rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                      alt="Штаб-квартира ChefUp"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Building className="w-8 h-8 text-[#F97316]" />
                      <h3 className="text-xl md:text-2xl font-black text-[#0F172A]">Штаб-квартира</h3>
                    </div>
                    <p className="text-base md:text-lg text-[#64748B] leading-relaxed">
                      Астана, Индустриальный парк,<br />
                      улица Кендірлі, 4
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </FadeUpSection>

        {/* Отзывы */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4 tracking-wide">
                Отзывы
              </h2>
              <p className="text-base md:text-xl text-[#64748B] max-w-2xl mx-auto">
                Чего добились наши пользователи
              </p>
            </div>
            <TestimonialsSwiper />
          </div>
        </FadeUpSection>

        {/* Партнёры */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-12 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4 tracking-wide">
                Нам доверяют лидеры рынка СНГ
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
              {[
                'ВкусВилл',
                'Choco',
                'Рядом',
                'Яндекс Лавка',
                'Airba Fresh',
                'URBO Coffee',
              ].map((partner, idx) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
                  className="h-20 md:h-24 bg-gray-100 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer border-2 border-transparent hover:border-gray-200"
                >
                  <span className="text-xs md:text-sm font-semibold text-[#64748B] px-3 text-center">{partner}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        {/* Final CTA */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#F97316]/10 via-white to-[#F97316]/5">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <Card className="bg-gradient-to-br from-[#F97316] via-[#F97316]/95 to-[#EA580C] border-0 shadow-2xl max-w-4xl mx-auto overflow-hidden relative rounded-2xl">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <CardContent className="p-8 md:p-12 text-center relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, duration: 0.8 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 cursor-pointer"
                >
                  <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-wide">
                  Получи оффер уже завтра
                </h2>
                <p className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
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
                  className="mb-8 md:mb-10"
                >
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 text-[#F97316] text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto min-h-[52px] md:min-h-[56px] w-full md:w-auto shadow-lg shadow-black/20 font-black"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>

                <div className="max-w-md mx-auto pt-8 md:pt-10 border-t border-white/20">
                  <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6">Или оставь номер телефона</p>
                  <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-white/90 border-white/20 h-12 md:h-14 text-base"
                    />
                    <Button type="submit" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-12 md:h-14 min-h-[52px] md:min-h-[56px]">
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

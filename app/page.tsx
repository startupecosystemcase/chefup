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
  ExternalLink,
} from 'lucide-react'
import { ImageWithSkeleton } from '@/components/ImageWithSkeleton'
import { imagePaths } from '@/lib/images'

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
    { name: 'Астана', image: imagePaths.cities.astana },
    { name: 'Алматы', image: imagePaths.cities.almaty },
    { name: 'Ташкент', image: imagePaths.cities.tashkent },
    { name: 'Бишкек', image: imagePaths.cities.bishkek },
    { name: 'Баку', image: imagePaths.cities.baku },
    { name: 'Тбилиси', image: imagePaths.cities.tbilisi },
    { name: 'Шымкент', image: imagePaths.cities.shymkent },
    { name: 'Актобе', image: imagePaths.cities.aktobe },
    { name: 'Батуми', image: imagePaths.cities.batumi },
  ]
  
  const teamMembers = [
    {
      name: 'Мухаммад Магомедов',
      role: 'Основатель',
      description: 'Опытный шеф-повар, более 10 лет в общепите. Основатель ChefUp и кофаундер +Vibe. Сооснователь производства готовой еды в Астане.',
      image: imagePaths.team.muhammad,
    },
    {
      name: 'Савва Беневский',
      role: 'Фаундер, технический директор',
      description: 'Основатель венчурной студии Benevsky (с 2016). Реализовал более 35 технологичных проектов. Председатель экспертного совета CASE — экосистемы инновационного менеджмента Центральной Азии.',
      image: imagePaths.team.savva,
    },
  ]
  
  const hqImage = imagePaths.hq

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
                className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0F172A] mb-4 md:mb-6 leading-[1.2] md:leading-tight tracking-tight"
              >
                Максимальная эффективность работы в HoReCa
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="mb-6"
              >
                <a
                  href="https://benevsky.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#EA580C] transition-colors text-sm md:text-base font-semibold"
                >
                  Powered by CASE
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-xl lg:text-2xl text-[#64748B] mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-normal"
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
            </div>
          </div>
        </section>

        {/* Ключевые цифры - отдельный блок с черным космическим фоном */}
        <FadeUpSection className="py-20 md:py-28 lg:py-32 dark-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A2E]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px] relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                  Ключевые цифры
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 lg:gap-16">
                {[
                  { value: 2000, suffix: '+', label: 'Специалистов' },
                  { value: 100, suffix: '+', label: 'Ресторанов' },
                  { value: 8, suffix: '', label: 'Стран' },
                  { value: 42, suffix: '', label: 'Городов' },
                  { value: 10, suffix: '+', label: 'Лет опыта' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ 
                      delay: idx * 0.15,
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 100
                    }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.2, duration: 0.5 }}
                      className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none"
                      style={{
                        textShadow: '0 0 40px rgba(249, 115, 22, 0.5)',
                      }}
                    >
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </motion.div>
                    <p className="text-sm md:text-base text-white/70 font-normal">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Для кого - белый фон с легким оранжевым свечением */}
        <FadeUpSection className="py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FF7A2E]/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px] relative z-10">
            <div className="text-center mb-16 md:mb-20 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight">
                Для кого
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              {/* Специалистам */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-[#F97316]/50 transition-all bg-white shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/10 rounded-2xl">
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mb-4"
                    >
                      <ChefHat className="w-7 h-7 md:w-8 md:h-8 text-[#F97316]" />
                    </motion.div>
                    <CardTitle className="text-xl md:text-2xl font-semibold text-[#0F172A]">Специалистам</CardTitle>
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
                            className="flex items-start gap-3 text-sm md:text-base text-[#64748B] font-normal"
                          >
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3 h-3 md:w-4 md:h-4 text-[#F97316]" />
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
                <Card className="h-full border-2 border-gray-200 hover:border-[#F97316]/50 transition-all bg-white shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/10 rounded-2xl">
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mb-4"
                    >
                      <Building2 className="w-7 h-7 md:w-8 md:h-8 text-[#F97316]" />
                    </motion.div>
                    <CardTitle className="text-xl md:text-2xl font-semibold text-[#0F172A]">Компаниям</CardTitle>
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
                            className="flex items-start gap-3 text-sm md:text-base text-[#64748B] font-normal"
                          >
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3 h-3 md:w-4 md:h-4 text-[#F97316]" />
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

        {/* Возможности для вас */}
        <FadeUpSection className="py-20 md:py-28 lg:py-32 dark-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          {/* Декоративные элементы */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF7A2E]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px] relative z-10">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#F97316]/20 backdrop-blur-sm border border-[#F97316]/30 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                <span className="text-xs md:text-sm font-semibold text-[#F97316] tracking-wider uppercase">AI POWERED</span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                Возможности для вас
              </h2>
              <p className="text-base md:text-xl text-white/70 max-w-3xl mx-auto font-normal">
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
                    <Card className="h-full border-2 border-white/10 hover:border-[#F97316]/50 transition-all cursor-pointer relative overflow-hidden bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/20 rounded-2xl group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardContent className="p-6 md:p-8 relative z-10">
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
                          className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#F97316]/20 flex items-center justify-center mb-6 group-hover:bg-[#F97316]/30 group-hover:shadow-lg group-hover:shadow-[#F97316]/30 transition-all"
                        >
                          <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#F97316]" />
                        </motion.div>
                        <h3 className="text-base md:text-lg font-semibold text-white mb-3">{feature.title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed font-normal">{feature.description}</p>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight">
                Наша миссия
              </h2>
              <p className="text-base md:text-xl text-[#64748B] max-w-3xl mx-auto mb-4 font-normal">
                ChefUp — это место, где повара находят работу мечты, а рестораны — надёжных людей.
              </p>
              <p className="text-sm md:text-lg text-[#64748B] max-w-2xl mx-auto font-normal">
                Вместе мы делаем HoReCa в нашем регионе лучше.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Больше не искать работу через знакомых и чаты',
                  description: 'Всё честно, быстро и в одном месте.',
                  icon: CheckCircle2,
                  iconColor: 'text-green-600',
                  iconBg: 'bg-green-100',
                },
                {
                  title: 'Повар, бариста или официант мог легко перейти из маленького кафе в топовый ресторан или открыть своё дело',
                  description: 'Чтобы каждый имел шанс расти и строить настоящую карьеру.',
                  icon: TrendingUp,
                  iconColor: 'text-[#F97316]',
                  iconBg: 'bg-orange-100',
                },
                {
                  title: 'Рестораны не мучились месяцами в поисках надежной команды',
                  description: 'Нашли хорошего повара или бариста — и сразу на работу.',
                  icon: Clock,
                  iconColor: 'text-blue-600',
                  iconBg: 'bg-blue-100',
                },
                {
                  title: 'Люди перестали уезжать из профессии и из страны просто потому что «не видят перспективы»',
                  description: 'Чтобы талант оставался и развивался здесь, у нас дома.',
                  icon: Heart,
                  iconColor: 'text-pink-600',
                  iconBg: 'bg-pink-100',
                },
                {
                  title: 'У поваров, барменов и шефов появилось своё живое профессиональное сообщество',
                  description: 'Где делятся опытом, помогают друг другу и вместе растут.',
                  icon: Users,
                  iconColor: 'text-purple-600',
                  iconBg: 'bg-purple-100',
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
                          className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 md:mb-6 shadow-sm`}
                        >
                          <Icon className={`w-7 h-7 md:w-8 md:h-8 ${item.iconColor}`} />
                        </motion.div>
                        <h3 className="text-base md:text-lg font-semibold text-[#0F172A] mb-3">{item.title}</h3>
                        <p className="text-sm text-[#64748B] leading-relaxed font-normal">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* Возможности экосистемы - технологичный стиль */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 dark-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          {/* Декоративные элементы */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF7A2E]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px] relative z-10">
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                Возможности экосистемы
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-normal">
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
                    whileHover={{ rotateY: 5, scale: 1.02 }}
                    className="group"
                    style={{ perspective: '1000px' }}
                  >
                    <Card className="h-full border-2 border-white/10 hover:border-[#F97316]/50 transition-all bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/20 rounded-2xl" style={{ transformStyle: 'preserve-3d' }}>
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
                        <h3 className="text-base md:text-lg font-semibold text-white mb-3">{feature.title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed font-normal">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* География присутствия */}
        <FadeUpSection className="py-20 md:py-28 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-16 md:mb-20 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight">
                География присутствия
              </h2>
              <p className="text-base md:text-xl text-[#64748B] max-w-2xl mx-auto font-normal">
                Мы работаем в крупнейших городах Центральной Евразии
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {cities.map((city, idx) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-[#F97316]/50 cursor-pointer bg-white shadow-md hover:shadow-2xl hover:shadow-[#F97316]/10 transition-all"
                >
                  <div className="relative h-56 overflow-hidden bg-[#0a0a0a]">
                    <ImageWithSkeleton
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="16/9"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-5 h-5 text-[#F97316]" />
                        <h3 className="font-semibold text-lg">{city.name}</h3>
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
                  <h3 className="font-semibold text-lg text-[#0F172A] mb-2">И еще 33 города</h3>
                  <p className="text-sm text-[#64748B] font-normal">Центральной Евразии</p>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeUpSection>

        {/* Представительство в Астане */}
        <FadeUpSection className="py-20 md:py-28 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight">
                  Представительство в Астане
                </h2>
              </motion.div>
              <Card className="border-2 border-gray-200 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto bg-[#0a0a0a]">
                    <ImageWithSkeleton
                      src={hqImage}
                      alt="Штаб-квартира ChefUp - Аэросъемка Астаны"
                      className="w-full h-full"
                      aspectRatio="16/9"
                      objectFit="cover"
                    />
                  </div>
                  <CardContent className="p-8 md:p-10 flex flex-col justify-center bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Building className="w-8 h-8 text-[#F97316]" />
                      <h3 className="text-xl md:text-2xl font-semibold text-[#0F172A]">Штаб-квартира</h3>
                    </div>
                    <p className="text-base md:text-lg text-[#64748B] leading-relaxed font-normal">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight">
                Отзывы
              </h2>
              <p className="text-base md:text-xl text-[#64748B] max-w-2xl mx-auto font-normal">
                Чего добились наши пользователи
              </p>
            </div>
            <TestimonialsSwiper />
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                  Получи оффер уже завтра
                </h2>
                <p className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
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
                    className="bg-white hover:bg-white/90 text-white text-sm md:text-base px-8 md:px-10 py-4 md:py-5 h-auto min-h-[56px] md:min-h-[60px] w-full md:w-auto shadow-lg shadow-black/20 font-semibold"
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

        {/* Наша команда */}
        <FadeUpSection className="py-20 md:py-28 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <div className="text-center mb-16 md:mb-20 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight">
                Наша команда
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-[#F97316]/30 transition-all bg-white shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/10 rounded-2xl overflow-hidden">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100 shadow-xl mb-6 ring-4 ring-gray-100">
                          <ImageWithSkeleton
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full"
                            aspectRatio="1/1"
                            objectFit="cover"
                          />
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-[#0F172A] mb-2">
                          {member.name}
                        </h3>
                        <p className="text-sm md:text-base text-[#F97316] font-semibold mb-4">
                          {member.role}
                        </p>
                        <p className="text-sm md:text-base text-[#64748B] leading-relaxed font-normal max-w-md">
                          {member.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUpSection>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { HoverBorderGradient } from '@/components/magicui/hover-border-gradient'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedNumber } from '@/components/magicui/animated-number'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
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
    <div className="min-h-screen bg-white dark:bg-dark transition-colors">
      <StickyHeader />
      <StickyBottomBar />

      <main>
        {/* Hero Section - Apple 2025 + Arc Browser Style */}
        <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32">
          {/* Ultra-subtle orange glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#F97316]/8 rounded-full blur-[120px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#F97316]/6 rounded-full blur-[100px]"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3,
              }}
            />
          </div>

          <div className="container mx-auto px-5 md:px-6 lg:px-[120px] relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#0F172A] mb-6 md:mb-8 leading-[1.05] tracking-[-0.04em] font-sf-pro"
              >
                Максимальная эффективность работы в HoReCa
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="mb-8"
              >
                <a
                  href="https://benevsky.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#EA580C] transition-colors text-sm md:text-base font-medium font-sf-pro"
                >
                  Powered by CASE
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-lg md:text-2xl lg:text-3xl text-[#64748B] mb-12 md:mb-16 max-w-4xl mx-auto leading-[1.5] font-light font-sf-pro"
              >
                ChefUp — это первая экосистема в Центральной Евразии для поиска работы, нетворкинга и обучения в сфере ресторанного бизнеса
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ShinyButton
                    size="lg"
                    withConfetti
                    className="w-full sm:w-auto font-semibold"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </ShinyButton>
                </motion.div>
                <ShinyButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-semibold"
                  onClick={() => router.push('/auth')}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Заказать консультацию
                </ShinyButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ключевые цифры - Apple 2025 Style */}
        <FadeUpSection className="py-32 md:py-40 lg:py-48 relative overflow-hidden bg-black">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#F97316]/6 rounded-full blur-[150px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-[#F97316]/5 rounded-full blur-[140px]"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.3, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 4,
              }}
            />
          </div>
          <div className="container mx-auto px-5 md:px-6 lg:px-[120px] relative z-10">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center mb-20 md:mb-24"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-[-0.04em] font-sf-pro">
                  Ключевые цифры
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-20 lg:gap-24">
                {[
                  { value: 2000, suffix: '+', label: 'Специалистов' },
                  { value: 100, suffix: '+', label: 'Ресторанов' },
                  { value: 8, suffix: '', label: 'Стран' },
                  { value: 42, suffix: '', label: 'Городов' },
                  { value: 10, suffix: '+', label: 'Лет опыта' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ 
                      delay: idx * 0.1,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-7xl md:text-8xl lg:text-9xl font-semibold text-white mb-6 leading-none glow-orange font-sf-pro"
                      style={{
                        textShadow: '0 0 60px rgba(249, 115, 22, 0.3)',
                      }}
                    >
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </motion.div>
                    <p className="text-base md:text-lg text-white/60 font-light font-sf-pro">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Для кого - Apple 2025 Style */}
        <FadeUpSection className="py-32 md:py-40 lg:py-48 bg-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#F97316]/3 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#F97316]/2 rounded-full blur-[100px]" />
          </div>
          <div className="container mx-auto px-5 md:px-6 lg:px-[120px] relative z-10">
            <div className="text-center mb-20 md:mb-24 max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A] mb-6 tracking-[-0.04em] font-sf-pro">
                Для кого
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
              {/* Специалистам */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group"
              >
                <div className="glass-apple float float-hover h-full rounded-3xl p-8 md:p-10 border-[0.5px] border-white/20 shadow-apple hover:shadow-apple-hover inner-glow">
                  <div className="pb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#F97316]/8 flex items-center justify-center mb-6"
                    >
                      <ChefHat className="w-8 h-8 md:w-10 md:h-10 text-[#F97316]" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#0F172A] mb-3 tracking-[-0.02em] font-sf-pro">Специалистам</h3>
                    <p className="text-base md:text-lg text-[#64748B] font-light font-sf-pro">
                      Для специалистов сферы HoReCa
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-5 md:space-y-6">
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
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex items-start gap-4 text-base md:text-lg text-[#64748B] font-light font-sf-pro"
                          >
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#F97316]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F97316]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <ShinyButton
                      className="w-full mt-8 min-h-[64px] font-semibold"
                      onClick={() => router.push('/auth')}
                    >
                      Зарегистрироваться
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </ShinyButton>
                  </div>
                </div>
              </motion.div>

              {/* Компаниям */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group"
              >
                <div className="glass-apple float float-hover h-full rounded-3xl p-8 md:p-10 border-[0.5px] border-white/20 shadow-apple hover:shadow-apple-hover inner-glow">
                  <div className="pb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#F97316]/8 flex items-center justify-center mb-6"
                    >
                      <Building2 className="w-8 h-8 md:w-10 md:h-10 text-[#F97316]" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#0F172A] mb-3 tracking-[-0.02em] font-sf-pro">Компаниям</h3>
                    <p className="text-base md:text-lg text-[#64748B] font-light font-sf-pro">
                      Для ресторанов, кафе, отелей, производств и других компаний
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-5 md:space-y-6">
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
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex items-start gap-4 text-base md:text-lg text-[#64748B] font-light font-sf-pro"
                          >
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#F97316]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F97316]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <ShinyButton
                      className="w-full mt-8 min-h-[64px] font-semibold"
                      onClick={() => router.push('/auth')}
                    >
                      Подключить компанию
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </ShinyButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeUpSection>

        {/* Возможности для вас - Apple 2025 Style */}
        <FadeUpSection className="py-32 md:py-40 lg:py-48 relative overflow-hidden bg-black">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#F97316]/6 rounded-full blur-[150px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[#F97316]/5 rounded-full blur-[140px]"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.3, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 4,
              }}
            />
          </div>
          
          <div className="container mx-auto px-5 md:px-6 lg:px-[120px] relative z-10">
            <div className="text-center mb-20 md:mb-24 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-flex items-center gap-2 px-5 py-2.5 glass-apple-dark rounded-full mb-8 border-[0.5px] border-[#F97316]/20"
              >
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                <span className="text-xs md:text-sm font-medium text-[#F97316] tracking-wider uppercase font-sf-pro">AI POWERED</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-[-0.04em] font-sf-pro">
                Возможности для вас
              </h2>
              <p className="text-lg md:text-2xl text-white/60 max-w-4xl mx-auto font-light leading-[1.5] font-sf-pro">
                Одна платформа — вся карьера HoReCa в Центральной Евразии под контролем
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
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
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <div className="glass-apple-dark float float-hover h-full rounded-3xl p-8 md:p-10 border-[0.5px] border-white/5 relative overflow-hidden shadow-apple hover:shadow-apple-hover inner-glow-dark">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: 'easeInOut',
                          }}
                          className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mb-6"
                        >
                          <Icon className="w-8 h-8 md:w-9 md:h-9 text-[#F97316]" />
                        </motion.div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-4 tracking-[-0.02em] font-sf-pro">{feature.title}</h3>
                        <p className="text-base text-white/60 leading-relaxed font-light font-sf-pro">{feature.description}</p>
                      </div>
                    </div>
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
                    <AnimatedCard className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all bg-white dark:bg-dark/50 shadow-md hover:shadow-xl rounded-2xl">
                      <div className="p-6 md:p-8">
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
                      </div>
                    </AnimatedCard>
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
          
          <div className="container mx-auto px-5 md:px-6 lg:px-[120px] relative z-10">
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
                    <AnimatedCard className="h-full border-2 border-white/10 hover:border-[#F97316]/50 transition-all bg-white/5 dark:bg-dark/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/20 rounded-2xl" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="p-5 md:p-6">
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
                      </div>
                    </AnimatedCard>
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
                transition={{ delay: 0.9 }}
                className="col-span-full flex justify-center"
              >
                <ShinyButton
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto font-semibold"
                  asChild
                >
                  <a
                    href="https://wa.me/+77070156999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Открыть представительство в своем городе
                  </a>
                </ShinyButton>
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
              <AnimatedCard className="border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all bg-white dark:bg-dark/50">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto bg-[#0a0a0a]">
                    <ImageWithSkeleton
                      src={hqImage}
                      alt="Офис ChefUp - Аэросъемка Астаны"
                      className="w-full h-full"
                      aspectRatio="16/9"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center bg-white dark:bg-dark/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Building className="w-8 h-8 text-[#F97316]" />
                      <h3 className="text-xl md:text-2xl font-semibold text-[#0F172A]">Офис</h3>
                    </div>
                    <p className="text-base md:text-lg text-[#64748B] leading-relaxed font-normal">
                      Астана, Индустриальный парк,<br />
                      улица Кендірлі, 4
                    </p>
                  </div>
                </div>
              </AnimatedCard>
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
            <AnimatedCard className="bg-gradient-to-br from-[#F97316] via-[#F97316]/95 to-[#EA580C] border-0 shadow-2xl max-w-4xl mx-auto overflow-hidden relative rounded-2xl">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="p-8 md:p-12 text-center relative z-10">
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
                  <ShinyButton
                    size="lg"
                    className="bg-white hover:bg-white/90 text-[#F97316] text-sm md:text-base px-8 md:px-10 py-4 md:py-5 h-auto min-h-[56px] md:min-h-[60px] w-full md:w-auto shadow-lg shadow-black/20 font-semibold"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </ShinyButton>
                </motion.div>

                <div className="max-w-md mx-auto pt-8 md:pt-10 border-t border-white/20">
                  <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6">Или оставь номер телефона</p>
                  <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3">
                    <AnimatedInput
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-white/90 border-white/20 h-12 md:h-14 text-base"
                    />
                    <ShinyButton type="submit" variant="outline" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-12 md:h-14 min-h-[52px] md:min-h-[56px]">
                      Отправить
                    </ShinyButton>
                  </form>
                </div>
              </div>
            </AnimatedCard>
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
                  <AnimatedCard className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#F97316]/30 transition-all bg-white dark:bg-dark/50 shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/10 rounded-2xl overflow-hidden">
                    <div className="p-8 md:p-10">
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
                        <p className="text-sm md:text-base text-[#64748B] dark:text-gray-400 leading-relaxed font-normal max-w-md">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
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

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  const [hoveredCard, setHoveredCard] = useState<'specialists' | 'companies' | null>(null)

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
    <div className="min-h-screen bg-white transition-colors light" data-theme="light">
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
                  className="w-full sm:w-auto font-medium whitespace-nowrap"
                  onClick={() => router.push('/auth')}
                >
                  <Phone className="mr-2 w-5 h-5 flex-shrink-0" />
                  <span>Заказать консультацию</span>
                </ShinyButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Экосистема для каждого - Белый фон для обеих карточек */}
        <FadeUpSection className="py-32 md:py-40 lg:py-48 bg-white relative overflow-hidden noise-overlay">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#F97316]/3 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#F97316]/2 rounded-full blur-[100px]" />
          </div>
          <div className="container mx-auto px-5 md:px-6 lg:px-[120px] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
              {/* Специалистам */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group h-full transition-all duration-300"
                onMouseEnter={() => setHoveredCard('specialists')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  opacity: hoveredCard === 'companies' ? 0.5 : 1,
                  filter: hoveredCard === 'companies' ? 'grayscale(20%)' : 'none',
                }}
              >
                <div className="glass-apple float float-hover h-full rounded-3xl p-8 md:p-10 border-[0.5px] border-gray-200/50 shadow-sm transition-all duration-300 hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] hover:border-[#F97316]/30 flex flex-col">
                  <div className="pb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mb-6"
                    >
                      <ChefHat className="w-8 h-8 md:w-10 md:h-10 text-[#F97316]" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#0F172A] mb-3 tracking-[-0.02em] font-sf-pro text-left">Специалистам</h3>
                    <p className="text-base md:text-lg text-[#64748B] font-light font-sf-pro text-left">
                      Для специалистов сферы HoReCa
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <ul className="space-y-5 md:space-y-6 flex-1">
                      {[
                        { icon: Target, text: 'Персональные рекомендации на основе AI' },
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
                            className="flex items-start gap-4 text-base md:text-lg text-[#64748B] font-light font-sf-pro text-left"
                          >
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F97316]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <ShinyButton
                      className="w-full mt-8 min-h-[64px] font-medium"
                      onClick={() => router.push('/auth')}
                    >
                      <span className="text-white">Зарегистрироваться</span>
                      <ArrowRight className="ml-2 w-5 h-5 text-white" />
                    </ShinyButton>
                  </div>
                </div>
              </motion.div>

              {/* Компаниям */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group h-full transition-all duration-300"
                onMouseEnter={() => setHoveredCard('companies')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  opacity: hoveredCard === 'specialists' ? 0.5 : 1,
                  filter: hoveredCard === 'specialists' ? 'grayscale(20%)' : 'none',
                }}
              >
                <div className="glass-apple float float-hover h-full rounded-3xl p-8 md:p-10 border-[0.5px] border-gray-200/50 shadow-sm transition-all duration-300 hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] hover:border-[#F97316]/30 flex flex-col">
                  <div className="pb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mb-6"
                    >
                      <Building2 className="w-8 h-8 md:w-10 md:h-10 text-[#F97316]" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#0F172A] mb-3 tracking-[-0.02em] font-sf-pro text-left">Компаниям</h3>
                    <p className="text-base md:text-lg text-[#64748B] font-light font-sf-pro text-left">
                      Для ресторанов, кафе, отелей, производств и других компаний
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <ul className="space-y-5 md:space-y-6 flex-1">
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
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex items-start gap-4 text-base md:text-lg text-[#64748B] font-light font-sf-pro text-left"
                          >
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F97316]" />
                            </div>
                            <span>{item.text}</span>
                          </motion.li>
                        )
                      })}
                    </ul>
                    <ShinyButton
                      className="w-full mt-8 min-h-[64px] font-medium"
                      onClick={() => router.push('/auth')}
                    >
                      <span className="text-white">Подключить компанию</span>
                      <ArrowRight className="ml-2 w-5 h-5 text-white" />
                    </ShinyButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeUpSection>

        {/* Ключевые цифры - Новая сетка */}
        <FadeUpSection className="py-32 md:py-40 lg:py-48 relative overflow-hidden bg-black noise-overlay">
          {/* Фон как в блоке "Возможности для вас" */}
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
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center mb-20 md:mb-24"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-[-0.03em] font-sf-pro">
                  Ключевые цифры
                </h2>
              </motion.div>

              {/* Контейнер с оранжевым свечением */}
              <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-black/40 backdrop-blur-sm border border-white/5 shadow-[0_0_40px_rgba(249,115,22,0.15)]">
                {/* Легкое оранжевое свечение по краям */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F97316]/5 via-transparent to-[#F97316]/5 opacity-50 pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_60px_rgba(249,115,22,0.1)] pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Первая строка - одна цифра по центру */}
                  <TooltipProvider>
                    <div className="flex justify-center mb-16 md:mb-20">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-center cursor-help"
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="text-7xl md:text-8xl lg:text-9xl font-semibold text-white mb-6 leading-none font-sf-pro"
                            >
                              <AnimatedCounter end={2000} suffix="+" />
                            </motion.div>
                            <p className="text-base md:text-lg text-white/60 font-light font-sf-pro">Специалистов</p>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="top" 
                          className="max-w-xs bg-black/95 border border-white/20 text-white p-4 backdrop-blur-xl"
                        >
                          <p className="text-sm font-light leading-relaxed">Более 2000 зарегистрированных специалистов HoReCa: повара, шеф-повара, кондитеры, бариста, официанты, менеджеры и другие профессионалы индустрии</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>

                  {/* Вторая строка - 4 цифры в ряд с разделителями */}
                  <TooltipProvider>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 lg:gap-20 max-w-5xl mx-auto relative">
                      {[
                        { 
                          value: 100, 
                          suffix: '+', 
                          label: 'Ресторанов',
                          tooltip: 'Более 100 ресторанов-партнеров: от премиум-заведений до сетевых ресторанов, кафе, баров и отелей в Центральной Евразии',
                        },
                        { 
                          value: 8, 
                          suffix: '', 
                          label: 'Стран',
                          tooltip: 'Казахстан, Узбекистан, Кыргызстан, Таджикистан, Армения, Грузия, Азербайджан, Россия',
                        },
                        { 
                          value: 42, 
                          suffix: '', 
                          label: 'Городов',
                          tooltip: 'Активное присутствие в 42 городах Центральной Евразии, включая Астану, Алматы, Ташкент, Бишкек, Баку, Тбилиси и другие крупные центры HoReCa',
                        },
                        { 
                          value: 10, 
                          suffix: '+', 
                          label: 'Лет опыта',
                          tooltip: 'Основатели ChefUp имеют более 10 лет опыта в управлении ресторанами, запуске международных стартапов в сфере HoReCa и развитии технологических решений для индустрии',
                        },
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ 
                            delay: idx * 0.1 + 0.3,
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          className="text-center relative"
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="cursor-help">
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 + 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 leading-none font-sf-pro"
                                >
                                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </motion.div>
                                <p className="text-sm md:text-base text-white/60 font-light font-sf-pro">{stat.label}</p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="top" 
                              className="max-w-xs bg-black/95 border border-white/20 text-white p-4 backdrop-blur-xl"
                            >
                              <p className="text-sm font-light leading-relaxed">{stat.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </motion.div>
                      ))}
                      {/* Разделители по центру между элементами */}
                      <div className="hidden md:block absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-px h-20 bg-white/10" />
                        <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-px h-20 bg-white/10" />
                        <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-px h-20 bg-white/10" />
                      </div>
                    </div>
                  </TooltipProvider>

                  {/* Плашка экспертности */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-16 md:mt-20 text-center"
                  >
                    <div className="inline-block px-6 md:px-8 py-4 md:py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                      <p className="text-sm md:text-base text-white/80 font-light font-sf-pro max-w-3xl mx-auto">
                        Основатели ChefUp — практики с 10-летним опытом управления в сфере HoReCa и запуска IT платформ
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
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

        {/* Представительство в Астане - Редизайн */}
        <FadeUpSection className="py-20 md:py-28 lg:py-32 bg-black relative overflow-hidden noise-overlay">
          <div className="container mx-auto px-5 md:px-6 lg:px-[120px]">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-[-0.03em]">
                  Представительство в Астане
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
                {/* Левая часть - Фото */}
                <div className="relative h-96 md:h-[600px] bg-[#0a0a0a]">
                  <ImageWithSkeleton
                    src={hqImage}
                    alt="Офис ChefUp - Аэросъемка Астаны"
                    className="w-full h-full object-cover"
                    aspectRatio="1/1"
                    objectFit="cover"
                  />
                </div>
                {/* Правая часть - Контент */}
                <div className="p-10 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#F97316]/20 flex items-center justify-center">
                      <Building className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-[-0.02em]">Офис</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-2">
                        Астана, Индустриальный парк
                      </p>
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                        улица Кендірлі, 4
                      </p>
                    </div>
                    <div className="pt-6 border-t border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                        <a href="tel:+77070156999" className="text-base md:text-lg text-white/80 hover:text-[#F97316] transition-colors font-light">
                          +7 (707) 015-69-99
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                        <a href="mailto:info@chefup.kz" className="text-base md:text-lg text-white/80 hover:text-[#F97316] transition-colors font-light">
                          info@chefup.kz
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Отзывы */}
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-white noise-overlay">
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
        <FadeUpSection className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#F97316]/10 via-white to-[#F97316]/5 noise-overlay">
          <div className="container mx-auto px-4 md:px-6 lg:px-[120px]">
            <AnimatedCard className="bg-gradient-to-br from-[#F97316] via-[#F97316]/95 to-[#EA580C] border-0 shadow-2xl max-w-4xl mx-auto overflow-hidden relative rounded-2xl">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="p-8 md:p-12 text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
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
                  <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6 text-center">Или оставь номер телефона</p>
                  <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <AnimatedInput
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-white/90 border-white/20 h-12 md:h-14 text-base max-w-xs"
                    />
                    <ShinyButton type="submit" variant="outline" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-12 md:h-14 min-h-[56px] w-full sm:w-auto">
                      <span className="text-white">Отправить</span>
                    </ShinyButton>
                  </form>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </FadeUpSection>

        {/* Наша команда - Скрыт */}
        <FadeUpSection className="py-20 md:py-28 lg:py-32 bg-white hidden">
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

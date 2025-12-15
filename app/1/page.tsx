'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { StickyHeader } from '@/components/landing/StickyHeader'
import { AnimatedCounter } from '@/components/landing/AnimatedCounter'
import { Footer } from '@/components/Footer'
import { toast } from 'react-hot-toast'
import {
  ChefHat,
  Building2,
  ArrowRight,
  Users,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  FileText,
  Sparkles,
  MapPin,
  BarChart3,
  UserCheck,
  Settings,
  GraduationCap,
  MessageSquare,
  Star,
  Lock,
  Rocket,
  Trophy,
  ShoppingBag,
  Phone,
  Building,
  ExternalLink,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ImageWithSkeleton } from '@/components/ImageWithSkeleton'
import { imagePaths } from '@/lib/images'

function FadeUpSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
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
  
  const hqImage = imagePaths.hq

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      <main>
        {/* Hero Section - Launch UI Style */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-background to-background" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 mb-8"
              >
                <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">AI Powered Platform</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  ChefUp
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 max-w-4xl mx-auto"
              >
                Максимальная эффективность работы в HoReCa
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Первая экосистема в Центральной Евразии для поиска работы, нетворкинга и обучения в сфере ресторанного бизнеса
              </motion.p>

              {/* Powered by CASE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <a
                  href="https://benevsky.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Powered by CASE
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <ShinyButton
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => router.push('/auth')}
                >
                  Создать профиль бесплатно
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ShinyButton>
                <ShinyButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a
                    href="https://wa.me/+77070156999"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Заказать консультацию
                  </a>
                </ShinyButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Экосистема для каждого */}
        <FadeUpSection className="py-24 sm:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Специалистам */}
              <AnimatedCard className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-6">
                    <ChefHat className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Специалистам</h3>
                  <p className="text-muted-foreground mb-6">
                    Для специалистов сферы HoReCa
                  </p>
                  <ul className="space-y-4 flex-1 mb-8">
                    {[
                      { icon: Target, text: 'Персональные рекомендации на основе AI' },
                      { icon: FileText, text: 'Автоматическое формирование резюме в 1 клик' },
                      { icon: Shield, text: 'Доступ к закрытым вакансиям от топ-ресторанов' },
                      { icon: GraduationCap, text: 'Образовательные программы и сертификации' },
                    ].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">{item.text}</span>
                        </li>
                      )
                    })}
                  </ul>
                  <ShinyButton
                    className="w-full"
                    onClick={() => router.push('/auth')}
                  >
                    Зарегистрироваться
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </ShinyButton>
                </div>
              </AnimatedCard>

              {/* Компаниям */}
              <AnimatedCard className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-6">
                    <Building2 className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Компаниям</h3>
                  <p className="text-muted-foreground mb-6">
                    Для ресторанов, кафе, отелей, производств и других компаний
                  </p>
                  <ul className="space-y-4 flex-1 mb-8">
                    {[
                      { icon: UserCheck, text: 'Автоматизированный подбор персонала' },
                      { icon: BarChart3, text: 'Продвинутая аналитика кандидатов' },
                      { icon: Settings, text: 'Собственная IT-система и ERP ChefUp' },
                      { icon: Users, text: 'Консалтинг и экспертиза HoReCa' },
                    ].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">{item.text}</span>
                        </li>
                      )
                    })}
                  </ul>
                  <ShinyButton
                    className="w-full"
                    onClick={() => router.push('/auth')}
                  >
                    Подключить компанию
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </ShinyButton>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </FadeUpSection>

        {/* Возможности для вас */}
        <FadeUpSection className="py-24 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 mb-6">
                <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">AI POWERED</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Возможности для вас
              </h2>
              <p className="text-xl text-muted-foreground">
                Одна платформа — вся карьера HoReCa в Центральной Евразии под контролем
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[
                {
                  icon: Lock,
                  title: 'Закрытые вакансии и офферы',
                  description: 'Доступ только для участников ChefUp — офферы, которых нет на HH, LinkedIn и Telegram-каналах. Приходят пушем и в Telegram-бот',
                },
                {
                  icon: Zap,
                  title: 'Умный поиск работы',
                  description: 'Персональная лента вакансий, которая подстраивается под ваш профиль',
                },
                {
                  icon: FileText,
                  title: 'Автоматическое резюме и Профиль-витрина',
                  description: 'Заполнил анкету один раз — получил красивую публичную страницу (@ваше-имя) и PDF-резюме в 1 клик. Можно отправлять ресторанам напрямую',
                },
                {
                  icon: TrendingUp,
                  title: 'Аналитика карьеры и Рост дохода',
                  description: 'Раздел «Мой рост»: показывает, как менялась ваша зарплата. Участники в среднем повышают доход на 30–40 % в первые 3 месяца. Прозрачная зарплатная вилка',
                },
                {
                  icon: Globe,
                  title: 'Международные стажировки и События',
                  description: 'Календарь мастер-классов, гастролей, ужинов и оплачиваемых стажировок за рубежом (Турция, ОАЭ, Грузия и др.)',
                },
                {
                  icon: Users,
                  title: 'Живое профессиональное сообщество',
                  description: 'Закрытые чаты по городам и специализациям + общий чат «ChefUp Live». Здесь ищут замену на смену, делятся ТТК, находят партнёров',
                },
                {
                  icon: GraduationCap,
                  title: 'Профессиональные курсы и Сертификаты',
                  description: 'Бесплатные и платные мини-курсы: HACCP, сервис, калькуляция, фуд-фотография. После прохождения — сертификат в профиль',
                },
                {
                  icon: UserCheck,
                  title: 'Быстрый подбор команды (Для HoReCa)',
                  description: 'Раздел «Нанимаю»: работодатели размещают вакансию и получают только подходящих и проверенных кандидатов за 3–7 дней',
                },
                {
                  icon: Rocket,
                  title: 'Личный бренд и Медийность',
                  description: 'Лучшие профили продвигаем в Instagram и TikTok ChefUp, приглашаем на коллаборации и ТВ-съёмки',
                },
                {
                  icon: Star,
                  title: 'Рейтинг, отзывы и Прозрачность',
                  description: 'После работы ресторан оставляет вам отзыв и рейтинг (как в Uber). Чем выше рейтинг — тем выше вы в выдаче и больше офферов',
                },
                {
                  icon: ShoppingBag,
                  title: 'Marketplace для HoReCa',
                  description: 'Покупка-продажа оборудования, инвентаря, формы б/у + поиск партнёров и инвесторов для своего кафе/фудтрака',
                },
                {
                  icon: Settings,
                  title: 'IT-система и Консалтинг для бизнеса',
                  description: 'Собственная IT-система и ERP ChefUp, продвинутая аналитика кандидатов, а также консалтинг и экспертиза HoReCa',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <AnimatedCard
                    key={idx}
                    className="p-6 border rounded-lg hover:shadow-lg transition-shadow h-full flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </AnimatedCard>
                )
              })}
            </div>
          </div>
        </FadeUpSection>

        {/* Ключевые цифры */}
        <FadeUpSection className="py-24 sm:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Ключевые цифры
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="p-8 md:p-12 rounded-2xl border bg-muted/30">
                {/* Первая строка - одна цифра по центру */}
                <TooltipProvider>
                  <div className="flex justify-center mb-16">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center cursor-help">
                          <div className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">
                            <AnimatedCounter end={2000} suffix="+" />
                          </div>
                          <p className="text-lg text-muted-foreground">Специалистов</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          Более 2000 зарегистрированных специалистов HoReCa: повара, шеф-повара, кондитеры, бариста, официанты, менеджеры и другие профессионалы индустрии
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>

                {/* Вторая строка - 4 цифры */}
                <TooltipProvider>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
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
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <div className="text-center cursor-help">
                            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">{stat.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>

                {/* Плашка экспертности */}
                <div className="mt-12 text-center">
                  <div className="inline-block px-6 py-4 rounded-xl bg-background border">
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      Основатели ChefUp — практики с 10-летним опытом управления в сфере HoReCa и запуска IT платформ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* География присутствия */}
        <FadeUpSection className="py-24 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                География присутствия
              </h2>
              <p className="text-xl text-muted-foreground">
                Мы работаем в крупнейших городах Центральной Евразии
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cities.map((city, idx) => (
                <AnimatedCard
                  key={city.name}
                  className="overflow-hidden rounded-lg border hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <ImageWithSkeleton
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover"
                      aspectRatio="16/9"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-5 h-5 text-orange-400" />
                        <h3 className="font-semibold text-lg">{city.name}</h3>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
              <div className="col-span-full flex justify-center mt-8">
                <ShinyButton
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a
                    href="https://wa.me/+77070156999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Открыть представительство в своем городе</span>
                  </a>
                </ShinyButton>
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Представительство в Астане */}
        <FadeUpSection className="py-24 sm:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  Представительство в Астане
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden border shadow-lg">
                {/* Левая часть - Фото */}
                <div className="relative h-64 md:h-auto bg-muted">
                  <ImageWithSkeleton
                    src={hqImage}
                    alt="Офис ChefUp - Аэросъемка Астаны"
                    className="w-full h-full object-cover"
                    aspectRatio="1/1"
                    objectFit="cover"
                  />
                </div>
                {/* Правая часть - Контент */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-muted/30">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <Building className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-semibold">Офис</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-lg text-foreground mb-2">
                        Астана, Индустриальный парк
                      </p>
                      <p className="text-lg text-foreground">
                        улица Кендірлі, 4
                      </p>
                    </div>
                    <div className="pt-6 border-t space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                        <a href="tel:+77070156999" className="text-base text-muted-foreground hover:text-orange-600 transition-colors">
                          +7 (707) 015-69-99
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                        <a href="mailto:info@chefup.kz" className="text-base text-muted-foreground hover:text-orange-600 transition-colors">
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

        {/* Final CTA */}
        <FadeUpSection className="py-24 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Получи оффер уже завтра
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Присоединяйся к тысячам специалистов, которые уже нашли работу мечты
              </p>

              <div className="mb-8">
                <ShinyButton
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => router.push('/auth')}
                >
                  Создать профиль бесплатно
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ShinyButton>
              </div>

              <div className="max-w-md mx-auto pt-8 border-t">
                <p className="text-sm text-muted-foreground mb-6">Или оставь номер телефона</p>
                <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                  <AnimatedInput
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 max-w-xs"
                  />
                  <ShinyButton 
                    type="submit" 
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Отправить
                  </ShinyButton>
                </form>
              </div>
            </div>
          </div>
        </FadeUpSection>
      </main>

      <Footer />
    </div>
  )
}

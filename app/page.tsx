'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import { StickyHeader } from '@/components/landing/StickyHeader'
import { AnimatedCounter } from '@/components/landing/AnimatedCounter'
import { FeatureCard } from '@/components/landing/FeatureCard'
import { TestimonialsSwiper } from '@/components/landing/TestimonialsSwiper'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { StickyBottomBar } from '@/components/landing/StickyBottomBar'
import { Footer } from '@/components/Footer'
import {
  ChefHat,
  Building2,
  CheckCircle,
  Lock,
  Briefcase,
  GraduationCap,
  Users,
  FileText,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Globe,
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] mb-6 leading-tight"
              >
                Твой профессиональный апгрейд в сфере HoReCa
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-[#64748B] mb-8"
              >
                1000+ поваров уже получают офферы
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
                    className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-lg px-8 py-6 h-auto min-h-[56px] w-full md:w-auto shadow-lg shadow-[#F97316]/30"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Анимированные счётчики */}
        <FadeUpSection className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F97316] mb-2">
                  <AnimatedCounter end={14200} suffix="+" />
                </div>
                <p className="text-[#64748B]">специалистов</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F97316] mb-2">
                  <AnimatedCounter end={920} suffix="+" />
                </div>
                <p className="text-[#64748B]">ресторанов</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F97316] mb-2">
                  <AnimatedCounter end={8} />
                </div>
                <p className="text-[#64748B]">стран</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F97316] mb-2">
                  <AnimatedCounter end={42} />
                </div>
                <p className="text-[#64748B]">городов</p>
              </div>
            </div>
          </div>
        </FadeUpSection>

        {/* Для кого */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-12">
              Для кого
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Специалистам */}
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border-2 border-transparent hover:border-[#F97316]/30 transition-all bg-white">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-[#F97316]/10 flex items-center justify-center mb-6"
                    >
                      <ChefHat className="w-10 h-10 text-[#F97316]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Специалистам</h3>
                    <ul className="space-y-4">
                      {[
                        'Персональные рекомендации вакансий',
                        'Автоматическое формирование резюме',
                        'Доступ к закрытым вакансиям',
                        'Образовательные программы и сертификации',
                      ].map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 text-[#64748B]"
                        >
                          <CheckCircle className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Ресторанам */}
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border-2 border-transparent hover:border-[#F97316]/30 transition-all bg-white">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ rotateY: 15, rotateX: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-[#F97316]/10 flex items-center justify-center mb-6"
                    >
                      <Building2 className="w-10 h-10 text-[#F97316]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Ресторанам</h3>
                    <ul className="space-y-4">
                      {[
                        'Автоматизированный подбор персонала',
                        'Продвинутая аналитика кандидатов',
                        'Собственная IT-система и ERP',
                        'Консалтинг и экспертиза HoReCa',
                      ].map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 text-[#64748B]"
                        >
                          <CheckCircle className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </FadeUpSection>

        {/* Как это работает */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-12">
              Как это работает
            </h2>
            <HowItWorks />
          </div>
        </FadeUpSection>

        {/* 6 фич */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-12">
              Преимущества платформы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={Lock}
                title="Закрытые вакансии"
                stat="+35% к ЗП"
                description="Доступ к эксклюзивным предложениям"
              />
              <FeatureCard
                icon={Globe}
                title="Стажировки за рубежом"
                stat="8 стран"
                description="Международные возможности"
              />
              <FeatureCard
                icon={FileText}
                title="Авторезюме в 1 клик"
                stat="100%"
                description="Автоматическое формирование"
              />
              <FeatureCard
                icon={Sparkles}
                title="Персональные офферы"
                stat="AI"
                description="Умные рекомендации"
              />
              <FeatureCard
                icon={Users}
                title="Нетворкинг с топ-шефами"
                stat="1000+"
                description="Профессиональное сообщество"
              />
              <FeatureCard
                icon={GraduationCap}
                title="Бесплатные курсы"
                stat="50+"
                description="Образовательные программы"
              />
            </div>
          </div>
        </FadeUpSection>

        {/* Интерактивная карта (упрощённая версия) */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-12">
              География присутствия
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Ташкент'].map((city, idx) => (
                <motion.div
                  key={city}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white rounded-lg border-2 border-transparent hover:border-[#F97316] cursor-pointer text-center"
                >
                  <MapPin className="w-8 h-8 text-[#F97316] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#0F172A]">{city}</h3>
                  <p className="text-sm text-[#64748B] mt-1">
                    <AnimatedCounter end={Math.floor(Math.random() * 500 + 100)} />+ специалистов
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        {/* Отзывы */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-12">
              Отзывы
            </h2>
            <TestimonialsSwiper />
          </div>
        </FadeUpSection>

        {/* Партнёры */}
        <FadeUpSection className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-12">
              Наши партнёры
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-8">
              {Array.from({ length: 20 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
                  className="h-16 bg-gray-200 rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer"
                >
                  <span className="text-xs text-[#64748B]">Логотип {idx + 1}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        {/* Final CTA */}
        <FadeUpSection className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-[120px]">
            <Card className="bg-gradient-to-r from-[#F97316]/10 to-[#F97316]/5 border-2 border-[#F97316]/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
                  Получи оффер уже завтра
                </h2>
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
                    className="bg-[#F97316] hover:bg-[#F97316]/90 text-white text-lg px-8 py-6 h-auto min-h-[56px] mb-8 w-full md:w-auto shadow-lg shadow-[#F97316]/30"
                    onClick={() => router.push('/auth')}
                  >
                    Создать профиль бесплатно
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <form onSubmit={handlePhoneSubmit} className="max-w-md mx-auto flex gap-2">
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
              </CardContent>
            </Card>
          </div>
        </FadeUpSection>
      </main>

      <Footer />
    </div>
  )
}

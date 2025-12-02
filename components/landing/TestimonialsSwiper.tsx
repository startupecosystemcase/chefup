'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { TrendingUp } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  avatar?: string
  quote: string
  achievement: string
  fullText: string
  before: string
  after: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Алексей Петров',
    role: 'Шеф-повар',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    quote: 'Нашёл работу мечты за неделю!',
    achievement: 'Перешёл из кафе в премиум-ресторан',
    before: 'Работал в небольшом кафе, зарплата 150 000 ₸',
    after: 'Шеф-повар в топ-ресторане, зарплата 450 000 ₸',
    fullText: 'Платформа ChefUp помогла мне найти работу в премиум-ресторане. Автоматическое резюме и персональные рекомендации — это просто магия! За неделю получил 3 оффера и выбрал лучший.',
  },
  {
    id: '2',
    name: 'Мария Иванова',
    role: 'Кондитер',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    quote: 'Получила оффер из Дубая!',
    achievement: 'Стажировка в ресторане 5* в ОАЭ',
    before: 'Кондитер в Алматы, мечтала о международном опыте',
    after: 'Стажировка в Burj Al Arab, затем постоянная работа',
    fullText: 'Благодаря ChefUp я получила предложение работать в ресторане в Дубае. Платформа открыла для меня новые горизонты! Теперь у меня есть опыт работы в мишленовском ресторане.',
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    role: 'Су-шеф',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    quote: 'Удвоил зарплату за месяц',
    achievement: 'Рост дохода на 200%',
    before: 'Су-шеф, зарплата 200 000 ₸',
    after: 'Бренд-шеф, зарплата 600 000 ₸',
    fullText: 'Перешёл на новую работу с удвоенной зарплатой. Рекомендации платформы были на 100% точными! Теперь руковожу кухней в сети ресторанов.',
  },
  {
    id: '4',
    name: 'Анна Козлова',
    role: 'Повар',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    quote: 'Лучшая платформа для HoReCa!',
    achievement: 'Нашла ментора и открыла своё дело',
    before: 'Повар, работала на чужой кухне',
    after: 'Владелица собственного кафе',
    fullText: 'Профессиональное сообщество, качественные вакансии и отличная поддержка. Рекомендую всем коллегам! Через платформу нашла ментора, который помог открыть своё кафе.',
  },
  {
    id: '5',
    name: 'Игорь Волков',
    role: 'Бренд-шеф',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    quote: 'Нашёл команду мечты',
    achievement: 'Собрал команду за 5 дней',
    before: 'Искал команду 2 месяца через знакомых',
    after: 'Полная команда из 8 профессионалов',
    fullText: 'Через ChefUp собрал команду профессионалов для нового проекта. Платформа работает как часы! Все кандидаты были проверены и подходили идеально.',
  },
  {
    id: '6',
    name: 'Елена Смирнова',
    role: 'Пекарь',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    quote: 'Бесплатные курсы изменили карьеру',
    achievement: 'Получила 3 сертификата и повышение',
    before: 'Пекарь, зарплата 120 000 ₸',
    after: 'Шеф-кондитер, зарплата 280 000 ₸',
    fullText: 'Образовательные программы на платформе помогли мне освоить новые техники и получить повышение! Прошла курсы по молекулярной кухне и фуд-фотографии.',
  },
]

export function TestimonialsSwiper() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)

  return (
    <>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        className="!pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Card
              className="cursor-pointer h-full hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#F97316]/30"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-[#F97316]/10 text-[#F97316] text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0F172A] text-lg mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-[#64748B] mb-2">{testimonial.role}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-semibold">
                      {testimonial.achievement}
                    </div>
                  </div>
                </div>
                <p className="text-[#64748B] mb-4 italic">"{testimonial.quote}"</p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[#64748B] line-through mb-1">{testimonial.before}</p>
                      <p className="text-[#F97316] font-semibold">{testimonial.after}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={selectedTestimonial?.avatar} />
                <AvatarFallback className="bg-[#F97316]/10 text-[#F97316] text-xl">
                  {selectedTestimonial?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{selectedTestimonial?.name}</DialogTitle>
                <DialogDescription className="text-base">{selectedTestimonial?.role}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-[#F97316]/10 rounded-lg">
              <p className="text-sm font-semibold text-[#F97316] mb-2">Достижение:</p>
              <p className="text-lg font-bold text-[#0F172A]">{selectedTestimonial?.achievement}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-[#64748B] mb-2">Было:</p>
                <p className="text-sm font-medium text-[#64748B] line-through">{selectedTestimonial?.before}</p>
              </div>
              <div className="p-4 bg-[#F97316]/5 rounded-lg border-2 border-[#F97316]/20">
                <p className="text-xs text-[#F97316] mb-2">Стало:</p>
                <p className="text-sm font-bold text-[#F97316]">{selectedTestimonial?.after}</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-[#64748B] leading-relaxed">{selectedTestimonial?.fullText}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


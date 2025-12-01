'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  avatar?: string
  quote: string
  fullText: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Алексей Петров',
    role: 'Шеф-повар',
    quote: 'Нашёл работу мечты за неделю!',
    fullText: 'Платформа ChefUp помогла мне найти работу в премиум-ресторане. Автоматическое резюме и персональные рекомендации — это просто магия!',
  },
  {
    id: '2',
    name: 'Мария Иванова',
    role: 'Кондитер',
    quote: 'Получила оффер из Дубая!',
    fullText: 'Благодаря ChefUp я получила предложение работать в ресторане в Дубае. Платформа открыла для меня новые горизонты!',
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    role: 'Су-шеф',
    quote: 'Удвоил зарплату за месяц',
    fullText: 'Перешёл на новую работу с удвоенной зарплатой. Рекомендации платформы были на 100% точными!',
  },
  {
    id: '4',
    name: 'Анна Козлова',
    role: 'Повар',
    quote: 'Лучшая платформа для HoReCa!',
    fullText: 'Профессиональное сообщество, качественные вакансии и отличная поддержка. Рекомендую всем коллегам!',
  },
  {
    id: '5',
    name: 'Игорь Волков',
    role: 'Бренд-шеф',
    quote: 'Нашёл команду мечты',
    fullText: 'Через ChefUp собрал команду профессионалов для нового проекта. Платформа работает как часы!',
  },
  {
    id: '6',
    name: 'Елена Смирнова',
    role: 'Пекарь',
    quote: 'Бесплатные курсы изменили карьеру',
    fullText: 'Образовательные программы на платформе помогли мне освоить новые техники и получить повышение!',
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
              className="cursor-pointer h-full hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">{testimonial.name}</h4>
                    <p className="text-sm text-[#64748B]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#64748B]">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTestimonial?.name}</DialogTitle>
            <DialogDescription>{selectedTestimonial?.role}</DialogDescription>
          </DialogHeader>
          <p className="text-[#64748B]">{selectedTestimonial?.fullText}</p>
        </DialogContent>
      </Dialog>
    </>
  )
}


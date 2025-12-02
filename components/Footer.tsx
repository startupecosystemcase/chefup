import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Instagram, Send, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-[120px] py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-12">
          {/* Логотип и описание */}
          <div className="md:col-span-2">
            <Logo variant="default" className="mb-6 h-10 md:h-12 lg:h-14" />
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md font-normal">
              Профессиональная экосистема для поиска работы, нетворкинга и обучения в сфере HoReCa
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-base">Навигация</h3>
            <nav className="flex flex-col gap-4">
              <Link
                href="#"
                className="text-white/70 hover:text-[#F97316] transition-colors text-sm md:text-base font-normal"
              >
                О нас
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-[#F97316] transition-colors text-sm md:text-base font-normal"
              >
                Контакты
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-[#F97316] transition-colors text-sm md:text-base font-normal"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-[#F97316] transition-colors text-sm md:text-base font-normal"
              >
                Условия использования
              </Link>
            </nav>
          </div>

          {/* Социальные сети */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-base">Социальные сети</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-white/70 hover:text-[#F97316] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" strokeWidth={1.5} />
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-[#F97316] transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-6 h-6" strokeWidth={1.5} />
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-[#F97316] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-white/50 text-xs md:text-sm text-center font-normal">
            © 2025 ChefUp. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

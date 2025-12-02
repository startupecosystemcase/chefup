import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Instagram, Send, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-black/80 backdrop-blur-xl border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-[120px] py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Логотип и описание */}
          <div className="md:col-span-2">
            <Logo variant="white" className="mb-4" />
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md">
              Профессиональная экосистема для поиска работы, нетворкинга и обучения в сфере HoReCa
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm md:text-base">Навигация</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors text-sm md:text-base"
              >
                О нас
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors text-sm md:text-base"
              >
                Контакты
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors text-sm md:text-base"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors text-sm md:text-base"
              >
                Условия использования
              </Link>
            </nav>
          </div>

          {/* Социальные сети */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm md:text-base">Социальные сети</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-white/50 text-xs md:text-sm text-center">
            © 2025 ChefUp. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

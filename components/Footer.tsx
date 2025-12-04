import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Instagram, Send, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-[120px] py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-12">
          {/* Логотип и описание */}
          <div>
            <div className="mb-6">
              <span className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'Gilroy, sans-serif' }}>
                <span className="text-white">Chef</span>
                <span className="text-[#F97316]">Up</span>
              </span>
            </div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md font-normal">
              Профессиональная экосистема для поиска работы, нетворкинга и обучения в сфере HoReCa
            </p>
          </div>

          {/* Социальные сети */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-base">Социальные сети</h3>
            <div className="flex flex-col gap-4">
              <Link
                href="https://www.instagram.com/chefup_association_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#F97316] transition-colors flex items-center gap-3 text-sm md:text-base font-normal"
              >
                <Instagram className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                <span>Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/benevskycom/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#F97316] transition-colors flex items-center gap-3 text-sm md:text-base font-normal"
              >
                <Linkedin className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://t.me/CEO_ChefUp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#F97316] transition-colors flex items-center gap-3 text-sm md:text-base font-normal"
              >
                <Send className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                <span>Telegram</span>
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

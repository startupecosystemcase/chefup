import Link from 'next/link'
import { Instagram, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-5 lg:px-[120px] py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-5">
            <span className="text-2xl font-bold text-[#0F172A]">ChefUp</span>
            <span className="text-sm text-[#64748B]">© 2025</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-[#64748B] hover:text-[#F97316] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-[#64748B] hover:text-[#F97316] transition-colors"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

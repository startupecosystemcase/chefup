'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  Menu,
  Crown,
  Users,
  BookOpen,
  Calendar,
  Briefcase,
  FileText,
  FilePlus,
  UserCheck,
  History,
  GraduationCap,
  Settings,
  Shield,
  Search,
  CheckCircle,
  Award,
  Handshake
} from 'lucide-react'
import { useAuthStore, type UserRole } from '@/stores/useOnboardingStore'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const applicantMenuItems = [
  { href: '/dashboard', label: 'Личный кабинет', icon: LayoutDashboard },
  { href: '/dashboard/resume', label: 'Моё резюме', icon: FileText },
  { href: '/dashboard/subscription', label: 'Подписка', icon: Crown },
  { href: '/dashboard/team', label: 'Команда', icon: Users },
  { href: '/dashboard/practice', label: 'Практика', icon: BookOpen },
  { href: '/dashboard/certificates', label: 'Сертификаты', icon: Award },
  { href: '/dashboard/community', label: 'Коммьюнити', icon: Calendar },
  { href: '/dashboard/jobs', label: 'Вакансии', icon: Briefcase },
  { href: '/dashboard/responses', label: 'Мои отклики', icon: FileText },
  { href: '/dashboard/resumes', label: 'Сообщество', icon: FileText },
  { href: '/dashboard/partners', label: 'Партнёры', icon: Handshake },
  { href: '/dashboard/settings', label: 'Настройки', icon: Settings },
]

const employerMenuItems = [
  { href: '/dashboard', label: 'Личный кабинет', icon: LayoutDashboard },
  { href: '/dashboard/jobs/create', label: 'Подать вакансию', icon: FilePlus },
  { href: '/dashboard/candidates', label: 'Кандидаты', icon: UserCheck },
  { href: '/dashboard/jobs/history', label: 'История вакансий', icon: History },
  { href: '/dashboard/education', label: 'Образование', icon: GraduationCap },
  { href: '/dashboard/hr-system', label: 'HR-система', icon: Settings },
  { href: '/dashboard/partners', label: 'Партнёры', icon: Handshake },
  { href: '/dashboard/settings', label: 'Настройки', icon: Settings },
]

const moderatorMenuItems = [
  { href: '/dashboard', label: 'Главная', icon: LayoutDashboard },
  { href: '/dashboard/moderate/jobs', label: 'Проверка вакансий', icon: CheckCircle },
  { href: '/dashboard/moderate/candidates', label: 'Автоподбор кандидатов', icon: Search },
  { href: '/dashboard/moderate/profiles', label: 'Модерация профилей', icon: Shield },
  { href: '/dashboard/moderate/education', label: 'Модерация образования', icon: BookOpen },
  { href: '/dashboard/moderate/events', label: 'Модерация событий', icon: Calendar },
  { href: '/dashboard/moderate/users', label: 'Управление пользователями', icon: Users },
]

const bottomNavItems = [
  { href: '/dashboard', icon: LayoutDashboard },
  { href: '/dashboard/chat', icon: MessageSquare },
  { href: '/dashboard/resume', icon: FileText },
]

function MobileMenuContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  const userRole = useAuthStore((state) => state.userRole)

  let menuItems = applicantMenuItems
  if (userRole === 'employer') {
    menuItems = employerMenuItems
  } else if (userRole === 'moderator') {
    menuItems = moderatorMenuItems
  }

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              'relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className={cn(
              'h-4 w-4 transition-all duration-300',
              isActive && 'text-primary'
            )} />
            <span className={cn(
              'transition-all duration-300',
              isActive && 'font-semibold text-primary'
            )}>{item.label}</span>
            {isActive && (
              <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary ml-auto" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!userId) return null

  return (
    <>
      {/* Liquid Glass Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
        {/* Glass effect background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/70 to-white/60 dark:from-gray-900/80 dark:via-gray-900/70 dark:to-gray-900/60 backdrop-blur-2xl border-t border-white/30 dark:border-gray-700/30 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]" />
        
        {/* Content */}
        <div className="relative flex items-center justify-around h-16 px-4">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname === item.href || pathname?.startsWith(item.href + '/')
            
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 min-h-[56px] min-w-[56px]',
                  'hover:scale-110 active:scale-95',
                  isActive
                    ? 'bg-gradient-to-br from-primary/25 via-primary/20 to-primary/15 text-primary shadow-lg shadow-primary/25 backdrop-blur-sm'
                    : 'text-muted-foreground hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-sm'
                )}
              >
                <Icon className={cn(
                  'w-6 h-6 transition-all duration-300',
                  isActive && 'scale-110 drop-shadow-sm'
                )} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
          
          {/* Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  'relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300',
                  'hover:scale-110 active:scale-95',
                  isMenuOpen
                    ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-800/50'
                )}
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 bg-white backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20">
              <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                <MobileMenuContent onItemClick={() => setIsMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  )
}

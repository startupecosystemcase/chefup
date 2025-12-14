'use client'

import { useState, useEffect, useMemo } from 'react'
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
  Handshake,
  ArrowLeft
} from 'lucide-react'
import { useAuthStore, type UserRole } from '@/stores/useOnboardingStore'
import { useTranslation } from '@/hooks/useTranslation'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/magicui/theme-toggle'

const bottomNavItems = [
  { href: '/dashboard', icon: LayoutDashboard },
]

function MobileMenuContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  const userRole = useAuthStore((state) => state.userRole)
  const language = useAuthStore((state) => state.language)
  const setLanguage = useAuthStore((state) => state.setLanguage)
  const t = useTranslation()
  
  useEffect(() => {
    // Убеждаемся, что язык инициализирован
    if (!language) {
      setLanguage('RU')
    }
  }, [language, setLanguage])

  const menuItems = useMemo(() => {
    if (userRole === 'employer') {
      return [
        { href: '/dashboard', label: t.menu.personalCabinet, icon: LayoutDashboard },
        { href: '/dashboard/jobs', label: t.menu.jobs, icon: FilePlus },
        { href: '/dashboard/education', label: t.menu.education, icon: GraduationCap },
        { href: '/dashboard/hr-system', label: t.menu.hrSystem, icon: Settings },
        { href: '/dashboard/partners', label: t.menu.partners, icon: Handshake },
        { href: '/dashboard/settings', label: t.menu.settings, icon: Settings },
      ]
    } else if (userRole === 'moderator') {
      return [
        { href: '/dashboard', label: t.menu.home, icon: LayoutDashboard },
        { href: '/dashboard/moderate/jobs', label: t.admin.moderateJobs, icon: CheckCircle },
        { href: '/dashboard/moderate/candidates', label: t.admin.moderateCandidates, icon: Search },
        { href: '/dashboard/moderate/profiles', label: t.admin.moderateProfiles, icon: Shield },
        { href: '/dashboard/moderate/education', label: t.admin.moderateEducation, icon: BookOpen },
        { href: '/dashboard/moderate/events', label: t.admin.moderateEvents, icon: Calendar },
        { href: '/dashboard/moderate/users', label: t.admin.manageUsers, icon: Users },
      ]
    } else {
      return [
        { href: '/dashboard', label: t.menu.personalCabinet, icon: LayoutDashboard },
        { href: '/dashboard/resume', label: t.menu.myResume, icon: FileText },
        { href: '/dashboard/subscription', label: t.menu.subscription, icon: Crown },
        { href: '/dashboard/team', label: t.menu.team, icon: Users },
        { href: '/dashboard/practice', label: t.menu.practice, icon: BookOpen },
        { href: '/dashboard/certificates', label: t.menu.certificates, icon: Award },
        { href: '/dashboard/community', label: t.menu.community, icon: Calendar },
        { href: '/dashboard/jobs', label: t.menu.jobs, icon: Briefcase },
        { href: '/dashboard/responses', label: t.menu.myResponses, icon: FileText },
        { href: '/dashboard/resumes', label: t.menu.resumes, icon: FileText },
        { href: '/dashboard/partners', label: t.menu.partners, icon: Handshake },
        { href: '/dashboard/settings', label: t.menu.settings, icon: Settings },
      ]
    }
  }, [userRole, t])

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 space-y-1">
        {/* Стрелочка влево для закрытия меню */}
        <SheetClose asChild>
          <button
            className="flex items-center gap-2 mb-4 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.buttons.back}</span>
          </button>
        </SheetClose>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <SheetClose key={item.href} asChild>
              <Link
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
            </SheetClose>
          )
        })}
      </nav>
      
      {/* Theme toggle and Language selector */}
      <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-border/50 space-y-3 px-3">
        <div className="flex items-center" style={{ paddingLeft: '20%' }}>
          <ThemeToggle />
        </div>
        <div className="flex items-center" style={{ paddingLeft: '20%' }}>
          <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-0.5">
            {(['RU', 'KZ', 'EN'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setLanguage(lang)
                }}
                className={cn(
                  'px-2 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap',
                  language === lang
                    ? 'bg-white dark:bg-gray-700 text-[#0F172A] dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white'
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
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
        <div className="relative flex items-center justify-between h-16 px-4">
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

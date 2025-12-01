import {
  ChefHat,
  UtensilsCrossed,
  Coffee,
  User,
  GraduationCap,
  BookOpen,
  Flame,
  Star,
  Award,
  ShieldCheck,
  ScrollText,
  Palette,
  Calculator,
  Users,
  Beef,
  Croissant,
  Soup,
  Drumstick,
  Pizza,
  Search,
  UserPlus,
  Plane,
  Sparkles,
  Building2,
  Store,
  Hotel,
  Package,
  Cake,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Иконки для позиций
export const positionIcons: Record<string, LucideIcon> = {
  chef: ChefHat,
  'sous-chef': UtensilsCrossed,
  cook: UtensilsCrossed,
  'pastry-chef': Cake,
  bartender: Coffee,
  waiter: User,
  manager: Users,
  'not-working': User,
}

// Иконки для кухонь
export const cuisineIcons: Record<string, LucideIcon> = {
  'central-asian': Beef,
  european: Croissant,
  asian: Soup,
  italian: Pizza,
  japanese: Soup,
  french: Croissant,
  russian: Soup,
  caucasian: Drumstick,
  fusion: UtensilsCrossed,
  'fast-food': Package,
}

// Иконки для образования
export const educationIcons: Record<string, LucideIcon> = {
  secondary: BookOpen,
  vocational: GraduationCap,
  higher: GraduationCap,
  courses: BookOpen,
}

// Иконки для разрядов
export const rankIcons: Record<string, LucideIcon> = {
  '1': Flame,
  '2': Flame,
  '3': Star,
  '4': Star,
  '5': Star,
  '6': Star,
  none: User,
}

// Иконки для форматов заведений
export const venueFormatIcons: Record<string, LucideIcon> = {
  restaurant: Building2,
  cafe: Coffee,
  bistro: Store,
  bar: Coffee,
  hotel: Hotel,
  catering: Package,
  'fast-food': Package,
  bakery: Cake,
}

// Иконки для целей
export const goalIcons: Record<string, LucideIcon> = {
  'find-job': Search,
  'find-employees': UserPlus,
  'internship': Plane,
  'personal-brand': Sparkles,
  'learning': GraduationCap,
  network: Users,
  'career-growth': Star,
  'share-experience': Users,
}

// Иконки для навыков
export const skillIcons: Record<string, LucideIcon> = {
  'menu-development': ScrollText,
  'food-design': Palette,
  'calculation': Calculator,
  'team-management': Users,
  ttk: ScrollText,
  'cost-control': Calculator,
  inventory: Package,
  'food-safety': ShieldCheck,
  presentation: Palette,
}

// Иконки для сертификатов
export const certificateIcons: Record<string, LucideIcon> = {
  haccp: ShieldCheck,
  iso: Award,
  'culinary-school': GraduationCap,
  international: Award,
  none: Award,
}


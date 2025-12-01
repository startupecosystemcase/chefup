import {
  ChefHat,
  Award,
  UserCog,
  Briefcase,
  Utensils,
  Salad,
  User,
  Package,
  Users,
  UserCheck,
  UserCircle,
  Coffee,
  GlassWater,
  Wine,
  Cake,
  Cookie,
  Pizza,
  Fish,
  GraduationCap,
  School,
  BookOpen,
  Trophy,
  MapPin,
  Building2,
  Store,
  Hotel,
  ShoppingBag,
  Target,
  DollarSign,
  TrendingUp,
  Network,
  Lightbulb,
  Star,
} from 'lucide-react'

export const positionIcons: Record<string, React.ReactNode> = {
  chef: <ChefHat className="w-6 h-6" />,
  'sous-chef': <UserCog className="w-6 h-6" />,
  cook: <Utensils className="w-6 h-6" />,
  'pastry-chef': <Cake className="w-6 h-6" />,
  bartender: <GlassWater className="w-6 h-6" />,
  waiter: <UserCircle className="w-6 h-6" />,
  manager: <Briefcase className="w-6 h-6" />,
  'not-working': <User className="w-6 h-6" />,
}

export const educationIcons: Record<string, React.ReactNode> = {
  secondary: <School className="w-6 h-6" />,
  vocational: <GraduationCap className="w-6 h-6" />,
  higher: <BookOpen className="w-6 h-6" />,
  courses: <Award className="w-6 h-6" />,
}

export const venueFormatIcons: Record<string, React.ReactNode> = {
  restaurant: <Utensils className="w-6 h-6" />,
  cafe: <Coffee className="w-6 h-6" />,
  bistro: <Store className="w-6 h-6" />,
  bar: <GlassWater className="w-6 h-6" />,
  hotel: <Hotel className="w-6 h-6" />,
  catering: <ShoppingBag className="w-6 h-6" />,
  'fast-food': <Pizza className="w-6 h-6" />,
  bakery: <Cookie className="w-6 h-6" />,
}

export const goalIcons: Record<string, React.ReactNode> = {
  'find-job': <Briefcase className="w-6 h-6" />,
  network: <Network className="w-6 h-6" />,
  learn: <BookOpen className="w-6 h-6" />,
  'career-growth': <TrendingUp className="w-6 h-6" />,
  'share-experience': <Lightbulb className="w-6 h-6" />,
}

export const experienceIcons: Record<string, React.ReactNode> = {
  none: <Star className="w-6 h-6" />,
  '1-3': <Trophy className="w-6 h-6" />,
  '3-5': <Award className="w-6 h-6" />,
  '5-10': <ChefHat className="w-6 h-6" />,
  '10+': <Trophy className="w-6 h-6" />,
}


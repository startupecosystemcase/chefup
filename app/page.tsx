'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { 
  ChefHat, 
  Building, 
  CheckCircle, 
  ArrowRight,
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
  BarChart3,
  FileText,
  Settings,
  Lightbulb,
  BookOpen,
  Star,
  Download,
  Smartphone
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative container px-4 py-16 md:py-20 lg:py-24 min-h-[70vh] flex items-center overflow-hidden">
          {/* Анимированное оранжевое свечение на фоне */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl glow-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="relative z-10 mx-auto max-w-3xl text-center w-full">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Твой профессиональный апгрейд в сфере HoReCa
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Первая экосистема для нетворкинга, поиска работы и обучения поваров, шеф-поваров и специалистов в Центральной Евразии
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/auth">
                  Начать регистрацию
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">
                  Для работодателей
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Для работников сферы HoReCa */}
        <section className="border-t bg-white py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Для работников сферы HoReCa</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Первая профессиональная экосистема, которая объединяет лучшие вакансии, образовательные программы и нетворкинг в одном месте
              </p>
              <div className="max-w-4xl mx-auto text-left space-y-4 text-muted-foreground">
                <p>
                  ChefUp — это не просто платформа для поиска работы. Мы создали полноценную экосистему для развития карьеры в HoReCa:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Персональные рекомендации вакансий на основе вашего профиля и опыта</li>
                  <li>Автоматическое формирование резюме из данных профиля</li>
                  <li>Доступ к закрытым вакансиям от премиум-работодателей</li>
                  <li>Образовательные программы, тренинги и сертификации</li>
                  <li>Нетворкинг с коллегами и участие в профессиональных событиях</li>
                </ul>
              </div>
            </div>

            {/* Инфографика: Как работает подбор */}
            <div className="mb-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Как работает подбор вакансий</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Заполните профиль</h4>
                  <p className="text-sm text-muted-foreground">Укажите опыт, навыки, специализацию и предпочтения</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Алгоритм анализирует</h4>
                  <p className="text-sm text-muted-foreground">Система автоматически подбирает релевантные вакансии</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Получайте предложения</h4>
                  <p className="text-sm text-muted-foreground">Работодатели видят ваше резюме и отправляют приглашения</p>
                </div>
              </div>
            </div>
            
            {/* Категории профессий */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Профессии на платформе</h3>
              
              {/* Кухня */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-primary" />
                  Кухня
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[
                    { name: 'Шеф-повар', icon: ChefHat },
                    { name: 'Бренд-шеф', icon: Award },
                    { name: 'Су-шеф', icon: UserCog },
                    { name: 'Старший повар', icon: ChefHat },
                    { name: 'Повар горячего цеха', icon: Utensils },
                    { name: 'Повар холодного цеха', icon: Salad },
                    { name: 'Помощник повара', icon: User },
                    { name: 'Заготовщик', icon: Package },
                    { name: 'Кондитер', icon: Cake },
                    { name: 'Пекарь', icon: Cookie },
                    { name: 'Пиццамейкер', icon: Pizza },
                    { name: 'Сушист', icon: Fish },
                  ].map((profession, index) => {
                const IconComponent = profession.icon
                return (
                  <Card 
                    key={index}
                    className="group cursor-pointer profession-card border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <p className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {profession.name}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/auth">
                  Зарегистрироваться
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Для компаний */}
        <section className="border-t bg-white py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Для компаний</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Автоматизированный подбор персонала и полный HR-сервис для ресторанного бизнеса
              </p>
            </div>

            {/* Инфографика: Процесс подбора */}
            <div className="mb-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Как работает автоматизированный подбор</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Публикация вакансии</h4>
                  <p className="text-sm text-muted-foreground">Создайте вакансию с требованиями</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Автоподбор кандидатов</h4>
                  <p className="text-sm text-muted-foreground">Система находит подходящих специалистов</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Модерация</h4>
                  <p className="text-sm text-muted-foreground">Эксперты проверяют и отбирают лучших</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Получение списка</h4>
                  <p className="text-sm text-muted-foreground">Вы получаете готовый список кандидатов</p>
                </div>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="h-full border-0 shadow-[0_4px_20px_rgba(0,0,0,0.04)] card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">Удалённый HR-офис</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Мы полностью берём на себя все HR-процессы вашей компании</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Вам больше не нужно содержать собственный HR-отдел — вы делегируете эти задачи нам</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Благодаря доступу к широкой и постоянно обновляемой базе кандидатов, мы закрываем вакансии быстрее и качественнее</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>В среднем до двух раз оперативнее, чем внутренний HR, при гарантии высокого качества подбора</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="h-full border-0 shadow-[0_4px_20px_rgba(0,0,0,0.04)] card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">Расширенная аналитика по кандидатам</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Вы получаете детализированные профили соискателей и расширенную аналитику</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Объективный выбор лучших сотрудников на основе данных</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Если на вашу позицию подходит несколько кандидатов, мы предоставляем прозрачные сравнения и полную подборку альтернатив</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Вы выбираете оптимального специалиста на основе данных, а не догадок</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="h-full border-0 shadow-[0_4px_20px_rgba(0,0,0,0.04)] card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">Собственная IT-система и ERP ChefApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Мы разработали корпоративную ERP-систему в ChefApp</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Помогает выстроить эффективные HR- и операционные процессы внутри заведения</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Платформа повышает продуктивность команды и укрепляет корпоративную культуру</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Внедряет элементы геймификации, стимулируя сотрудников к более высокой вовлечённости и результативности</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="h-full border-0 shadow-[0_4px_20px_rgba(0,0,0,0.04)] card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">Консалтинг и экспертиза HoReCa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Специалисты ChefApp обладают более чем 10-летним опытом работы в сфере HoReCa</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Предоставляем экспертный консалтинг не только по вопросам найма</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Помогаем оптимизировать процессы, управлять персоналом и улучшать организацию работы</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Принимаем решения, которые повышают эффективность и устойчивость бизнеса в ресторанном сегменте</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Преимущества платформы */}
        <section className="border-t bg-gradient-to-b from-white to-muted/20 py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">Преимущества платформы</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Персональные рекомендации</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Умный алгоритм подбирает вакансии специально для вас на основе вашего опыта и навыков
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Автоматическое резюме</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Резюме формируется автоматически из данных профиля — не нужно заполнять вручную
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Профессиональное сообщество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Общайтесь с коллегами, участвуйте в событиях и расширяйте профессиональную сеть
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Образование и развитие</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Доступ к курсам, тренингам, мастер-классам и сертификациям для профессионального роста
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Аналитика и статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Отслеживайте просмотры профиля, релевантность вакансий и получайте рекомендации по улучшению
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Удобный интерфейс</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Современный и интуитивный дизайн, доступный на всех устройствах
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Партнёры */}
        <section className="border-t bg-white py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">Наши партнёры</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Специальные предложения и бонусы от проверенных партнёров для развития вашей карьеры и бизнеса
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Для соискателей</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Производители инвентаря и экипировки</li>
                    <li>• Учреждения обучения</li>
                    <li>• Бренды одежды для кухни</li>
                    <li>• Поставщики ингредиентов</li>
                    <li>• Заведения со стажировками</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Для работодателей</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Поставщики оборудования</li>
                    <li>• Поставщики сырья (HoReCa)</li>
                    <li>• Бухгалтерские сервисы</li>
                    <li>• Сервисы автоматизации</li>
                    <li>• Консалтинговые агентства</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>Стать партнёром</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Предложите свои услуги сообществу ChefUp и получите доступ к целевой аудитории
                  </p>
                  <Button variant="outline" className="w-full">
                    Связаться с нами
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Образовательные программы */}
        <section className="border-t bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">Образовательные программы</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Развивайтесь профессионально с нашими курсами, тренингами и мастер-классами
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Курсы и тренинги</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Комплексные программы обучения от базового до продвинутого уровня
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Управление кухней</li>
                    <li>• Специализированные кухни</li>
                    <li>• Пищевая безопасность</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Сертификации</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Получите международные сертификаты, признанные в индустрии
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• HACCP</li>
                    <li>• Профессиональные стандарты</li>
                    <li>• Специализированные программы</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Мастер-классы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Практические занятия от ведущих шеф-поваров и экспертов индустрии
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Молекулярная гастрономия</li>
                    <li>• Авторские техники</li>
                    <li>• Тренды и инновации</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* События и практика */}
        <section className="border-t bg-white py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">События и практика</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Участвуйте в профессиональных событиях, расширяйте сеть контактов и развивайтесь вместе с коммьюнити
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Бизнес-завтраки</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ежемесячные встречи для обмена опытом и обсуждения трендов
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Открытия ресторанов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Приглашения на презентации новых заведений и дегустации
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Конференции</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Крупные события с участием экспертов и лидеров индустрии
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Нетворкинг</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Неформальные встречи для общения и новых знакомств
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Как это работает */}
        <section className="border-t bg-gradient-to-b from-muted/30 to-white py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">Как это работает?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Регистрация</h3>
                <p className="text-muted-foreground">
                  Создайте профиль и заполните анкету с вашими навыками и опытом
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Нетворкинг</h3>
                <p className="text-muted-foreground">
                  Общайтесь с коллегами, делитесь опытом и находите единомышленников
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Карьера</h3>
                <p className="text-muted-foreground">
                  Найдите работу мечты или пригласите талантливых специалистов в свою команду
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Отзывы и кейсы */}
        <section className="border-t bg-white py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold">Отзывы и кейсы</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">АП</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Алексей Петров</CardTitle>
                      <CardDescription>Шеф-повар, Алматы</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Благодаря ChefUp нашел работу мечты в ресторане премиум-класса. Алгоритм подбора действительно работает — все вакансии были релевантными."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">МИ</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Мария Иванова</CardTitle>
                      <CardDescription>Ресторан "Гастроном"</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "За 2 недели закрыли 3 вакансии через платформу. Качество кандидатов отличное, модерация работает быстро. Рекомендую!"
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">ДК</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Дмитрий Козлов</CardTitle>
                      <CardDescription>Су-шеф, Астана</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Отличная платформа для развития. Прошел несколько курсов, получил сертификаты. Сообщество очень активное и поддерживающее."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Скачать приложение / Подключить компанию */}
        <section className="border-t bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Мобильное приложение</CardTitle>
                  <CardDescription>
                    Скачайте приложение ChefUp и управляйте карьерой на ходу
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      App Store
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Google Play
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Скоро доступно
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Building className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Подключить компанию</CardTitle>
                  <CardDescription>
                    Станьте партнёром ChefUp и получите доступ к лучшим специалистам
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/auth">
                      Подключить компанию
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Первый месяц бесплатно
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Финальный CTA */}
        <section className="border-t bg-dark text-white py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Готовы начать карьеру мечты?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Присоединяйтесь к сообществу профессионалов HoReCa и откройте новые возможности
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/auth">
                    Начать регистрацию
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="#">
                    Для работодателей
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

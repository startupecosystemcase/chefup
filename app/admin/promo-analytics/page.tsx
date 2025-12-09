'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Trophy, TrendingUp, Users, Building2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'

export default function AdminPromoAnalyticsPage() {
  const [dateFilter, setDateFilter] = useState('all')
  const [chefFilter, setChefFilter] = useState('all')
  const [companyFilter, setCompanyFilter] = useState('all')

  // Mock данные
  const topPromos = [
    { code: 'CHEFAPP2026', activations: 45, accounts: ['Компания 1', 'Компания 2', 'Компания 3'] },
    { code: 'SUMMER2025', activations: 32, accounts: ['Компания 4', 'Компания 5'] },
    { code: 'NEWYEAR2026', activations: 28, accounts: ['Компания 6', 'Компания 7', 'Компания 8'] },
    { code: 'WELCOME2025', activations: 15, accounts: ['Компания 9'] },
    { code: 'SPECIAL2026', activations: 12, accounts: ['Компания 10'] },
  ]

  const topChefs = [
    { name: 'Иван Иванов', companiesInvited: 8, totalActivations: 12 },
    { name: 'Петр Петров', companiesInvited: 6, totalActivations: 9 },
    { name: 'Сергей Сергеев', companiesInvited: 5, totalActivations: 7 },
    { name: 'Алексей Алексеев', companiesInvited: 4, totalActivations: 6 },
    { name: 'Дмитрий Дмитриев', companiesInvited: 3, totalActivations: 5 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Аналитика промокодов</h1>
        <p className="text-muted-foreground mt-1">Статистика использования промокодов</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Период</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все время</SelectItem>
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="quarter">Квартал</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Шеф-повар</Label>
              <Select value={chefFilter} onValueChange={setChefFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все шеф-повары" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все шеф-повары</SelectItem>
                  {topChefs.map((chef, idx) => (
                    <SelectItem key={idx} value={chef.name}>
                      {chef.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Компания</Label>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все компании" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все компании</SelectItem>
                  <SelectItem value="company1">Компания 1</SelectItem>
                  <SelectItem value="company2">Компания 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              ТОП-5 самых активных промокодов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPromos.map((promo, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold font-mono">{promo.code}</p>
                      <p className="text-sm text-muted-foreground">
                        {promo.activations} активаций
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{promo.accounts.length} аккаунтов</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              ТОП-5 шеф-поваров по приглашениям
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topChefs.map((chef, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center font-bold text-blue-600">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{chef.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Пригласил {chef.companiesInvited} компаний
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{chef.totalActivations} активаций</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Детальная статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <p className="font-semibold">Всего активаций</p>
              </div>
              <p className="text-3xl font-bold">132</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <p className="font-semibold">Компаний привлечено</p>
              </div>
              <p className="text-3xl font-bold">45</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <p className="font-semibold">Активных промокодов</p>
              </div>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Filter, X } from 'lucide-react'
import { cities, positions, cuisines, salaryRanges } from '@/lib/data'

interface FilterValues {
  name?: string
  phone?: string
  email?: string
  city?: string
  position?: string
  skills?: string
  cuisines?: string
  salaryMin?: string
  salaryMax?: string
  dateFrom?: string
  dateTo?: string
  status?: string
}

interface AdminFiltersPanelProps {
  filters: FilterValues
  onFiltersChange: (filters: FilterValues) => void
  onReset: () => void
  type: 'workers' | 'companies'
}

export function AdminFiltersPanel({ filters, onFiltersChange, onReset, type }: AdminFiltersPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  if (type === 'workers') {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold">Поиск и фильтры</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Свернуть' : 'Развернуть'}
              </Button>
              <Button variant="outline" size="sm" onClick={onReset}>
                <X className="w-4 h-4 mr-1" />
                Сбросить
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Label>Имя</Label>
              <AnimatedInput
                value={filters.name || ''}
                onChange={(e) => updateFilter('name', e.target.value)}
                placeholder="Имя или фамилия"
              />
            </div>
            <div>
              <Label>Телефон</Label>
              <AnimatedInput
                value={filters.phone || ''}
                onChange={(e) => updateFilter('phone', e.target.value)}
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
            <div>
              <Label>Email</Label>
              <AnimatedInput
                type="email"
                value={filters.email || ''}
                onChange={(e) => updateFilter('email', e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label>Город</Label>
              <Select value={filters.city || 'all'} onValueChange={(value) => updateFilter('city', value === 'all' ? '' : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Все города" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <Label>Профессия</Label>
                <Select value={filters.position || 'all'} onValueChange={(value) => updateFilter('position', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все профессии" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все профессии</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Кухни</Label>
                <Select value={filters.cuisines || 'all'} onValueChange={(value) => updateFilter('cuisines', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все кухни" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все кухни</SelectItem>
                    {cuisines.map((cuisine) => (
                      <SelectItem key={cuisine.value} value={cuisine.value}>
                        {cuisine.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Зарплата от (KZT)</Label>
                <AnimatedInput
                  type="number"
                  value={filters.salaryMin || ''}
                  onChange={(e) => updateFilter('salaryMin', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Зарплата до (KZT)</Label>
                <AnimatedInput
                  type="number"
                  value={filters.salaryMax || ''}
                  onChange={(e) => updateFilter('salaryMax', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Дата регистрации от</Label>
                <AnimatedInput
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => updateFilter('dateFrom', e.target.value)}
                />
              </div>
              <div>
                <Label>Дата регистрации до</Label>
                <AnimatedInput
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => updateFilter('dateTo', e.target.value)}
                />
              </div>
              <div>
                <Label>Статус</Label>
                <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все статусы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="active">Активный</SelectItem>
                    <SelectItem value="archived">Архив</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button onClick={() => {}}>Применить фильтры</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Companies filters
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold">Поиск и фильтры</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Свернуть' : 'Развернуть'}
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              <X className="w-4 h-4 mr-1" />
              Сбросить
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label>Название компании</Label>
            <AnimatedInput
              value={filters.name || ''}
              onChange={(e) => updateFilter('name', e.target.value)}
              placeholder="Название"
            />
          </div>
          <div>
            <Label>Контактное лицо</Label>
            <AnimatedInput
              value={filters.name || ''}
              onChange={(e) => updateFilter('name', e.target.value)}
              placeholder="Имя"
            />
          </div>
          <div>
            <Label>Телефон</Label>
            <AnimatedInput
              value={filters.phone || ''}
              onChange={(e) => updateFilter('phone', e.target.value)}
              placeholder="+7 (XXX) XXX-XX-XX"
            />
          </div>
          <div>
            <Label>Email</Label>
            <AnimatedInput
              type="email"
              value={filters.email || ''}
              onChange={(e) => updateFilter('email', e.target.value)}
              placeholder="email@example.com"
            />
          </div>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <Label>Город</Label>
              <Select value={filters.city || 'all'} onValueChange={(value) => updateFilter('city', value === 'all' ? '' : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Все города" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Количество филиалов от</Label>
              <AnimatedInput
                type="number"
                value={filters.salaryMin || ''}
                onChange={(e) => updateFilter('salaryMin', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Количество вакансий от</Label>
              <AnimatedInput
                type="number"
                value={filters.salaryMax || ''}
                onChange={(e) => updateFilter('salaryMax', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Статус подписки</Label>
              <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value === 'all' ? '' : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="BASIC">BASIC</SelectItem>
                  <SelectItem value="PRO">PRO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Дата регистрации от</Label>
              <AnimatedInput
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
              />
            </div>
            <div>
              <Label>Дата регистрации до</Label>
              <AnimatedInput
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button onClick={() => {}}>Применить фильтры</Button>
        </div>
      </CardContent>
    </Card>
  )
}


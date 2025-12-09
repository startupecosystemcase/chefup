'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { cities, companyTypes } from '@/lib/data'

interface Company {
  id: string
  name: string
  legalName?: string
  inn?: string
  city: string
  address?: string
  contactPerson: string
  phone: string
  email: string
  branchesCount: number
  vacanciesCount: number
  subscriptionStatus: 'BASIC' | 'PRO'
  createdAt: string
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCompany, setNewCompany] = useState({
    name: '',
    legalName: '',
    inn: '',
    city: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: '',
    branchesCount: '1',
  })

  useEffect(() => {
    // Mock данные
    const mockCompanies: Company[] = [
      {
        id: '1',
        name: 'Ресторан "Вкусно"',
        city: 'Алматы',
        contactPerson: 'Иван Петров',
        phone: '+7 (777) 123-45-67',
        email: 'info@vkusno.kz',
        branchesCount: 3,
        vacanciesCount: 5,
        subscriptionStatus: 'PRO',
        createdAt: '2025-01-10',
      },
    ]
    setCompanies(mockCompanies)
  }, [])

  const filteredCompanies = companies.filter((company) => {
    const search = searchTerm.toLowerCase()
    return (
      company.name.toLowerCase().includes(search) ||
      company.contactPerson.toLowerCase().includes(search) ||
      company.phone.includes(search) ||
      company.email.toLowerCase().includes(search) ||
      company.city.toLowerCase().includes(search)
    )
  })

  const handleCreateCompany = () => {
    if (!newCompany.name || !newCompany.contactPerson || !newCompany.phone || !newCompany.email || !newCompany.city) {
      toast.error('Заполните все обязательные поля')
      return
    }

    // Проверка уникальности телефона
    if (companies.some((c) => c.phone === newCompany.phone)) {
      toast.error('Этот номер телефона уже зарегистрирован')
      return
    }

    // Проверка уникальности email
    if (companies.some((c) => c.email === newCompany.email)) {
      toast.error('Этот email уже зарегистрирован')
      return
    }

    const password = generatePassword()

    const company: Company = {
      id: `company-${Date.now()}`,
      name: newCompany.name,
      legalName: newCompany.legalName || undefined,
      inn: newCompany.inn || undefined,
      city: newCompany.city,
      address: newCompany.address || undefined,
      contactPerson: newCompany.contactPerson,
      phone: newCompany.phone,
      email: newCompany.email,
      branchesCount: parseInt(newCompany.branchesCount) || 1,
      vacanciesCount: 0,
      subscriptionStatus: 'BASIC',
      createdAt: new Date().toISOString().split('T')[0],
    }

    setCompanies([...companies, company])
    toast.success(`Компания создана. Пароль: ${password}`)
    setIsCreateDialogOpen(false)
    setNewCompany({
      name: '',
      legalName: '',
      inn: '',
      city: '',
      address: '',
      contactPerson: '',
      phone: '',
      email: '',
      branchesCount: '1',
    })
  }

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editCompany, setEditCompany] = useState<Company | null>(null)
  const [editedCompany, setEditedCompany] = useState({
    name: '',
    legalName: '',
    inn: '',
    city: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: '',
    branchesCount: '1',
    subscriptionStatus: 'BASIC' as 'BASIC' | 'PRO',
  })

  const handleEditCompany = (company: Company) => {
    setEditCompany(company)
    setEditedCompany({
      name: company.name,
      legalName: company.legalName || '',
      inn: company.inn || '',
      city: company.city,
      address: company.address || '',
      contactPerson: company.contactPerson,
      phone: company.phone,
      email: company.email,
      branchesCount: company.branchesCount.toString(),
      subscriptionStatus: company.subscriptionStatus,
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveCompany = () => {
    if (!editCompany) return

    if (!editedCompany.name || !editedCompany.contactPerson || !editedCompany.phone || !editedCompany.email || !editedCompany.city) {
      toast.error('Заполните все обязательные поля')
      return
    }

    // Проверка уникальности телефона (если изменился)
    if (editedCompany.phone !== editCompany.phone && companies.some((c) => c.phone === editedCompany.phone && c.id !== editCompany.id)) {
      toast.error('Этот номер телефона уже зарегистрирован')
      return
    }

    // Проверка уникальности email (если изменился)
    if (editedCompany.email !== editCompany.email && companies.some((c) => c.email === editedCompany.email && c.id !== editCompany.id)) {
      toast.error('Этот email уже зарегистрирован')
      return
    }

    setCompanies(companies.map((c) => 
      c.id === editCompany.id 
        ? { 
            ...c, 
            ...editedCompany,
            branchesCount: parseInt(editedCompany.branchesCount) || 1,
          }
        : c
    ))
    toast.success('Изменения сохранены')
    setIsEditDialogOpen(false)
    setEditCompany(null)
  }

  const handleDeleteCompany = (companyId: string) => {
    if (confirm('Вы уверены, что хотите удалить эту компанию?')) {
      setCompanies(companies.filter((c) => c.id !== companyId))
      toast.success('Компания удалена')
    }
  }

  const generatePassword = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let password = ''
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Компании</h1>
          <p className="text-muted-foreground mt-1">Управление компаниями-работодателями</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Создать компанию
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать компанию</DialogTitle>
              <DialogDescription>Заполните данные для новой компании</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Название компании *</Label>
                <AnimatedInput
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  placeholder="Название компании"
                />
              </div>
              <div>
                <Label>Юридическое название</Label>
                <AnimatedInput
                  value={newCompany.legalName}
                  onChange={(e) => setNewCompany({ ...newCompany, legalName: e.target.value })}
                  placeholder="Юридическое название"
                />
              </div>
              <div>
                <Label>ИНН</Label>
                <AnimatedInput
                  value={newCompany.inn}
                  onChange={(e) => setNewCompany({ ...newCompany, inn: e.target.value })}
                  placeholder="ИНН"
                />
              </div>
              <div>
                <Label>Город *</Label>
                <Select value={newCompany.city} onValueChange={(value) => setNewCompany({ ...newCompany, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Адрес</Label>
                <AnimatedInput
                  value={newCompany.address}
                  onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                  placeholder="Адрес"
                />
              </div>
              <div>
                <Label>Контактное лицо *</Label>
                <AnimatedInput
                  value={newCompany.contactPerson}
                  onChange={(e) => setNewCompany({ ...newCompany, contactPerson: e.target.value })}
                  placeholder="Имя и фамилия"
                />
              </div>
              <div>
                <Label>Телефон *</Label>
                <AnimatedInput
                  value={newCompany.phone}
                  onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <AnimatedInput
                  type="email"
                  value={newCompany.email}
                  onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label>Количество филиалов</Label>
                <AnimatedInput
                  type="number"
                  value={newCompany.branchesCount}
                  onChange={(e) => setNewCompany({ ...newCompany, branchesCount: e.target.value })}
                  placeholder="1"
                  min="1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateCompany}>Создать</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, контакту, телефону..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Название</th>
                  <th className="text-left p-2">Город</th>
                  <th className="text-left p-2">Контактное лицо</th>
                  <th className="text-left p-2">Телефон</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Филиалы</th>
                  <th className="text-left p-2">Вакансии</th>
                  <th className="text-left p-2">Подписка</th>
                  <th className="text-left p-2">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-2 text-sm font-mono">{company.id}</td>
                    <td className="p-2">{company.name}</td>
                    <td className="p-2">{company.city}</td>
                    <td className="p-2">{company.contactPerson}</td>
                    <td className="p-2">{company.phone}</td>
                    <td className="p-2">{company.email}</td>
                    <td className="p-2">{company.branchesCount}</td>
                    <td className="p-2">{company.vacanciesCount}</td>
                    <td className="p-2">
                      <Badge variant={company.subscriptionStatus === 'PRO' ? 'default' : 'secondary'}>
                        {company.subscriptionStatus}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCompany(company.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCompanies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Компании не найдены
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Диалог редактирования компании */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать компанию</DialogTitle>
            <DialogDescription>Измените данные компании</DialogDescription>
          </DialogHeader>
          {editCompany && (
            <div className="space-y-4">
              <div>
                <Label>Название компании *</Label>
                <AnimatedInput
                  value={editedCompany.name}
                  onChange={(e) => setEditedCompany({ ...editedCompany, name: e.target.value })}
                  placeholder="Название компании"
                />
              </div>
              <div>
                <Label>Юридическое название</Label>
                <AnimatedInput
                  value={editedCompany.legalName}
                  onChange={(e) => setEditedCompany({ ...editedCompany, legalName: e.target.value })}
                  placeholder="Юридическое название"
                />
              </div>
              <div>
                <Label>ИНН</Label>
                <AnimatedInput
                  value={editedCompany.inn}
                  onChange={(e) => setEditedCompany({ ...editedCompany, inn: e.target.value })}
                  placeholder="ИНН"
                />
              </div>
              <div>
                <Label>Город *</Label>
                <Select value={editedCompany.city} onValueChange={(value) => setEditedCompany({ ...editedCompany, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.label}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Адрес</Label>
                <AnimatedInput
                  value={editedCompany.address}
                  onChange={(e) => setEditedCompany({ ...editedCompany, address: e.target.value })}
                  placeholder="Адрес"
                />
              </div>
              <div>
                <Label>Контактное лицо *</Label>
                <AnimatedInput
                  value={editedCompany.contactPerson}
                  onChange={(e) => setEditedCompany({ ...editedCompany, contactPerson: e.target.value })}
                  placeholder="Имя и фамилия"
                />
              </div>
              <div>
                <Label>Телефон *</Label>
                <AnimatedInput
                  value={editedCompany.phone}
                  onChange={(e) => setEditedCompany({ ...editedCompany, phone: e.target.value })}
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <AnimatedInput
                  type="email"
                  value={editedCompany.email}
                  onChange={(e) => setEditedCompany({ ...editedCompany, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label>Количество филиалов</Label>
                <AnimatedInput
                  type="number"
                  value={editedCompany.branchesCount}
                  onChange={(e) => setEditedCompany({ ...editedCompany, branchesCount: e.target.value })}
                  placeholder="1"
                  min="1"
                />
              </div>
              <div>
                <Label>Статус подписки</Label>
                <Select 
                  value={editedCompany.subscriptionStatus} 
                  onValueChange={(value) => setEditedCompany({ ...editedCompany, subscriptionStatus: value as 'BASIC' | 'PRO' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BASIC">BASIC</SelectItem>
                    <SelectItem value="PRO">PRO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveCompany}>Сохранить изменения</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useOnboardingStore, useAuthStore } from '@/stores/useOnboardingStore'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { cities, positions, cuisines, experienceRanges, salaryRanges } from '@/lib/data'
import { AdminFiltersPanel } from '@/components/AdminFiltersPanel'

interface Worker {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  city: string
  position?: string
  subscriptionStatus: 'BASIC' | 'PRO'
  responsesCount: number
  createdAt: string
}

export default function AdminWorkersPage() {
  const router = useRouter()
  const { formData: allUsersData } = useOnboardingStore()
  const [workers, setWorkers] = useState<Worker[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    position: '',
    skills: '',
    cuisines: '',
    salaryMin: '',
    salaryMax: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editWorker, setEditWorker] = useState<Worker | null>(null)
  const [editedWorker, setEditedWorker] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    position: '',
    subscriptionStatus: 'BASIC' as 'BASIC' | 'PRO',
  })
  const [newWorker, setNewWorker] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    position: '',
    experience: '',
    salary: '',
    cuisines: [] as string[],
    about: '',
  })

  useEffect(() => {
    // Загружаем работников из localStorage (в реальном приложении - API запрос)
    const savedWorkers = typeof window !== 'undefined' ? localStorage.getItem('admin-workers') : null
    if (savedWorkers) {
      try {
        const parsed = JSON.parse(savedWorkers)
        setWorkers(parsed)
      } catch (e) {
        console.error('Ошибка загрузки работников:', e)
        // Если ошибка, используем mock данные
        const mockWorkers: Worker[] = [
          {
            id: '1',
            firstName: 'Иван',
            lastName: 'Иванов',
            phone: '+7 (777) 123-45-67',
            email: 'ivan@example.com',
            city: 'Алматы',
            position: 'Шеф-повар',
            subscriptionStatus: 'PRO',
            responsesCount: 5,
            createdAt: '2025-01-15',
          },
        ]
        setWorkers(mockWorkers)
      }
    } else {
      // Используем mock данные при первом запуске
      const mockWorkers: Worker[] = [
        {
          id: '1',
          firstName: 'Иван',
          lastName: 'Иванов',
          phone: '+7 (777) 123-45-67',
          email: 'ivan@example.com',
          city: 'Алматы',
          position: 'Шеф-повар',
          subscriptionStatus: 'PRO',
          responsesCount: 5,
          createdAt: '2025-01-15',
        },
      ]
      setWorkers(mockWorkers)
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin-workers', JSON.stringify(mockWorkers))
      }
    }
  }, [])

  // Сохраняем работников в localStorage при изменении
  useEffect(() => {
    if (workers.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem('admin-workers', JSON.stringify(workers))
    }
  }, [workers])

  const filteredWorkers = workers.filter((worker) => {
    const fullName = `${worker.firstName} ${worker.lastName}`.toLowerCase()
    const search = searchTerm.toLowerCase()
    
    // Базовый поиск
    const matchesSearch = searchTerm === '' || (
      fullName.includes(search) ||
      worker.phone.includes(search) ||
      worker.email?.toLowerCase().includes(search) ||
      worker.city.toLowerCase().includes(search)
    )

    // Фильтры
    const matchesName = !filters.name || fullName.includes(filters.name.toLowerCase())
    const matchesPhone = !filters.phone || worker.phone.includes(filters.phone)
    const matchesEmail = !filters.email || worker.email?.toLowerCase().includes(filters.email.toLowerCase())
    const matchesCity = !filters.city || worker.city === filters.city
    const matchesPosition = !filters.position || worker.position === filters.position
    const matchesStatus = !filters.status || (filters.status === 'active' ? worker.subscriptionStatus === 'PRO' : true)

    return matchesSearch && matchesName && matchesPhone && matchesEmail && matchesCity && matchesPosition && matchesStatus
  })

  const handleCreateWorker = () => {
    // Валидация
    if (!newWorker.firstName || !newWorker.lastName || !newWorker.phone || !newWorker.city) {
      toast.error('Заполните все обязательные поля')
      return
    }

    // Проверка уникальности телефона
    if (workers.some((w) => w.phone === newWorker.phone)) {
      toast.error('Этот номер телефона уже зарегистрирован')
      return
    }

    // Генерация пароля
    const password = generatePassword()

    // Создание нового работника
    const worker: Worker = {
      id: `worker-${Date.now()}`,
      firstName: newWorker.firstName,
      lastName: newWorker.lastName,
      phone: newWorker.phone,
      email: newWorker.email || undefined,
      city: newWorker.city,
      position: newWorker.position || undefined,
      subscriptionStatus: 'BASIC',
      responsesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setWorkers([...workers, worker])
    toast.success(`Работник создан. Пароль: ${password}`)
    setIsCreateDialogOpen(false)
    setNewWorker({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      city: '',
      position: '',
      experience: '',
      salary: '',
      cuisines: [],
      about: '',
    })
  }

  const handleEditWorker = (worker: Worker) => {
    setEditWorker(worker)
    setEditedWorker({
      firstName: worker.firstName,
      lastName: worker.lastName,
      phone: worker.phone,
      email: worker.email || '',
      city: worker.city,
      position: worker.position || '',
      subscriptionStatus: worker.subscriptionStatus,
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveWorker = () => {
    if (!editWorker) return

    if (!editedWorker.firstName || !editedWorker.lastName || !editedWorker.phone || !editedWorker.city) {
      toast.error('Заполните все обязательные поля')
      return
    }

    // Проверка уникальности телефона (если изменился)
    if (editedWorker.phone !== editWorker.phone && workers.some((w) => w.phone === editedWorker.phone && w.id !== editWorker.id)) {
      toast.error('Этот номер телефона уже зарегистрирован')
      return
    }

    setWorkers(workers.map((w) => 
      w.id === editWorker.id 
        ? { ...w, ...editedWorker }
        : w
    ))
    toast.success('Изменения сохранены')
    setIsEditDialogOpen(false)
    setEditWorker(null)
  }

  const handleDeleteWorker = (workerId: string) => {
    if (confirm('Вы уверены, что хотите удалить этого работника?')) {
      setWorkers(workers.filter((w) => w.id !== workerId))
      toast.success('Работник удален')
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Работники</h1>
          <p className="text-muted-foreground mt-1">Управление профилями работников</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Создать работника
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать работника</DialogTitle>
              <DialogDescription>Заполните данные для нового работника</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Имя *</Label>
                  <AnimatedInput
                    value={newWorker.firstName}
                    onChange={(e) => setNewWorker({ ...newWorker, firstName: e.target.value })}
                    placeholder="Имя"
                  />
                </div>
                <div>
                  <Label>Фамилия *</Label>
                  <AnimatedInput
                    value={newWorker.lastName}
                    onChange={(e) => setNewWorker({ ...newWorker, lastName: e.target.value })}
                    placeholder="Фамилия"
                  />
                </div>
              </div>
              <div>
                <Label>Телефон *</Label>
                <AnimatedInput
                  value={newWorker.phone}
                  onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              <div>
                <Label>Email</Label>
                <AnimatedInput
                  type="email"
                  value={newWorker.email}
                  onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label>Город *</Label>
                <Select value={newWorker.city} onValueChange={(value) => setNewWorker({ ...newWorker, city: value })}>
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
                <Label>Должность</Label>
                <Select value={newWorker.position} onValueChange={(value) => setNewWorker({ ...newWorker, position: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>О себе</Label>
                <AnimatedTextarea
                  value={newWorker.about}
                  onChange={(e) => setNewWorker({ ...newWorker, about: e.target.value })}
                  placeholder="Описание"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateWorker}>Создать</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <AdminFiltersPanel
        filters={filters}
        onFiltersChange={setFilters}
        onReset={() => setFilters({
          name: '',
          phone: '',
          email: '',
          city: '',
          position: '',
          skills: '',
          cuisines: '',
          salaryMin: '',
          salaryMax: '',
          dateFrom: '',
          dateTo: '',
          status: '',
        })}
        type="workers"
      />

      {filteredWorkers.length === 0 && workers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Работники не найдены</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Создать работника
            </Button>
          </CardContent>
        </Card>
      ) : filteredWorkers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Работники не найдены по заданным фильтрам</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, телефону, email..."
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
                  <th className="text-left p-2">Имя</th>
                  <th className="text-left p-2">Телефон</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Город</th>
                  <th className="text-left p-2">Подписка</th>
                  <th className="text-left p-2">Отклики</th>
                  <th className="text-left p-2">Дата регистрации</th>
                  <th className="text-left p-2">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.map((worker) => (
                  <tr key={worker.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-2 text-sm font-mono">{worker.id}</td>
                    <td className="p-2">{worker.firstName} {worker.lastName}</td>
                    <td className="p-2">{worker.phone}</td>
                    <td className="p-2">{worker.email || '-'}</td>
                    <td className="p-2">{worker.city}</td>
                    <td className="p-2">
                      <Badge variant={worker.subscriptionStatus === 'PRO' ? 'default' : 'secondary'}>
                        {worker.subscriptionStatus}
                      </Badge>
                    </td>
                    <td className="p-2">{worker.responsesCount}</td>
                    <td className="p-2">{worker.createdAt}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditWorker(worker)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteWorker(worker.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredWorkers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Работники не найдены
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Диалог редактирования работника */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать работника</DialogTitle>
            <DialogDescription>Измените данные работника</DialogDescription>
          </DialogHeader>
          {editWorker && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Имя *</Label>
                  <AnimatedInput
                    value={editedWorker.firstName}
                    onChange={(e) => setEditedWorker({ ...editedWorker, firstName: e.target.value })}
                    placeholder="Имя"
                  />
                </div>
                <div>
                  <Label>Фамилия *</Label>
                  <AnimatedInput
                    value={editedWorker.lastName}
                    onChange={(e) => setEditedWorker({ ...editedWorker, lastName: e.target.value })}
                    placeholder="Фамилия"
                  />
                </div>
              </div>
              <div>
                <Label>Телефон *</Label>
                <AnimatedInput
                  value={editedWorker.phone}
                  onChange={(e) => setEditedWorker({ ...editedWorker, phone: e.target.value })}
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              <div>
                <Label>Email</Label>
                <AnimatedInput
                  type="email"
                  value={editedWorker.email}
                  onChange={(e) => setEditedWorker({ ...editedWorker, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label>Город *</Label>
                <Select value={editedWorker.city} onValueChange={(value) => setEditedWorker({ ...editedWorker, city: value })}>
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
                <Label>Должность</Label>
                <Select value={editedWorker.position} onValueChange={(value) => setEditedWorker({ ...editedWorker, position: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Статус подписки</Label>
                <Select 
                  value={editedWorker.subscriptionStatus} 
                  onValueChange={(value) => setEditedWorker({ ...editedWorker, subscriptionStatus: value as 'BASIC' | 'PRO' })}
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
                <Button onClick={handleSaveWorker}>Сохранить изменения</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


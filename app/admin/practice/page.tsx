'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useEducationStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { mockEducationItems } from '@/lib/mockEducation'
import { astanaEducationItems } from '@/lib/mockEducationAstana'
import { Plus, Search, Edit, Trash2, Eye, Download } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import type { EducationItem } from '@/types/education.types'

export default function AdminPracticePage() {
  const { items, enrollments } = useEducationStore()
  const { formData: allUsersData } = useOnboardingStore()
  const [allItems, setAllItems] = useState<EducationItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    type: 'course' as EducationItem['type'],
    author: '',
    duration: '',
    price: '0',
    city: '',
  })

  useEffect(() => {
    const allItemsList: EducationItem[] = [
      ...items,
      ...mockEducationItems,
      ...astanaEducationItems,
    ]
    setAllItems(allItemsList)
  }, [items])

  const filteredItems = allItems.filter((item) => {
    const search = searchTerm.toLowerCase()
    return (
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.author.toLowerCase().includes(search)
    )
  })

  const getItemEnrollments = (itemId: string) => {
    return enrollments.filter((e) => e.educationId === itemId)
  }

  const handleViewItem = (item: EducationItem) => {
    setSelectedItem(item)
    setIsViewDialogOpen(true)
  }

  const handleCreateItem = () => {
    if (!newItem.title || !newItem.description || !newItem.author) {
      toast.error('Заполните все обязательные поля')
      return
    }

    const item: EducationItem = {
      id: `education-${Date.now()}`,
      ...newItem,
      price: parseFloat(newItem.price) || 0,
      status: 'approved',
      createdAt: new Date().toISOString(),
    }

    useEducationStore.getState().addItem(item)
    toast.success('Курс/тренинг создан')
    setIsCreateDialogOpen(false)
    setNewItem({
      title: '',
      description: '',
      type: 'course',
      author: '',
      duration: '',
      price: '0',
      city: '',
    })
  }

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот курс/тренинг?')) {
      useEducationStore.getState().deleteItem(itemId)
      setAllItems(allItems.filter((i) => i.id !== itemId))
      toast.success('Курс/тренинг удален')
    }
  }

  const handleExportCSV = (itemId: string) => {
    const enrollments = getItemEnrollments(itemId)
    const csvContent = [
      ['Имя', 'Email', 'Телефон', 'Статус'].join(','),
      ...enrollments.map((e) => {
        return ['Пользователь', 'email@example.com', '+7 (777) XXX-XX-XX', e.status].join(',')
      }),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `education-${itemId}-enrollments.csv`
    link.click()
    toast.success('Список участников экспортирован')
  }

  const itemEnrollments = selectedItem ? getItemEnrollments(selectedItem.id) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Практика и обучение</h1>
          <p className="text-muted-foreground mt-1">Управление курсами, тренингами и сертификациями</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Создать курс/тренинг
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, автору..."
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
                  <th className="text-left p-2">Название</th>
                  <th className="text-left p-2">Тип</th>
                  <th className="text-left p-2">Автор</th>
                  <th className="text-left p-2">Город</th>
                  <th className="text-left p-2">Цена</th>
                  <th className="text-left p-2">Участники</th>
                  <th className="text-left p-2">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const enrollmentsCount = getItemEnrollments(item.id).length
                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">
                        <Badge variant="outline">{item.type}</Badge>
                      </td>
                      <td className="p-2">{item.author}</td>
                      <td className="p-2">{item.city || '-'}</td>
                      <td className="p-2">{item.price === 0 ? 'Бесплатно' : `${item.price} KZT`}</td>
                      <td className="p-2">
                        <Badge>{enrollmentsCount}</Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewItem(item)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Курсы/тренинги не найдены
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Диалог просмотра с участниками */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            <DialogDescription>Детали курса/тренинга и список участников</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Информация</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Описание:</strong> {selectedItem.description}</p>
                  <p><strong>Автор:</strong> {selectedItem.author}</p>
                  <p><strong>Длительность:</strong> {selectedItem.duration || '-'}</p>
                  <p><strong>Цена:</strong> {selectedItem.price === 0 ? 'Бесплатно' : `${selectedItem.price} KZT`}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Участники ({itemEnrollments.length})</h3>
                  <Button onClick={() => handleExportCSV(selectedItem.id)} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт CSV
                  </Button>
                </div>
                {itemEnrollments.length > 0 ? (
                  <div className="space-y-2">
                    {itemEnrollments.map((enrollment) => (
                      <Card key={enrollment.id}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Участник ID: {enrollment.userId}</p>
                              <p className="text-sm text-muted-foreground">
                                Статус: <Badge variant="outline">{enrollment.status}</Badge>
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Контакты
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Участников пока нет</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог создания */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Создать курс/тренинг</DialogTitle>
            <DialogDescription>Заполните данные для нового курса или тренинга</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название *</Label>
              <AnimatedInput
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Название курса/тренинга"
              />
            </div>
            <div>
              <Label>Описание *</Label>
              <AnimatedTextarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Описание"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Тип</Label>
                <Select value={newItem.type} onValueChange={(value) => setNewItem({ ...newItem, type: value as EducationItem['type'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course">Курс</SelectItem>
                    <SelectItem value="webinar">Вебинар</SelectItem>
                    <SelectItem value="training">Тренинг</SelectItem>
                    <SelectItem value="certification">Сертификация</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Автор *</Label>
                <AnimatedInput
                  value={newItem.author}
                  onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                  placeholder="Автор"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Длительность</Label>
                <AnimatedInput
                  value={newItem.duration}
                  onChange={(e) => setNewItem({ ...newItem, duration: e.target.value })}
                  placeholder="2 часа"
                />
              </div>
              <div>
                <Label>Цена (KZT)</Label>
                <AnimatedInput
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
            <div>
              <Label>Город</Label>
              <AnimatedInput
                value={newItem.city}
                onChange={(e) => setNewItem({ ...newItem, city: e.target.value })}
                placeholder="Город"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreateItem}>Создать</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


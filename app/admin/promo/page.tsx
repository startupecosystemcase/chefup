'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { AnimatedTextarea } from '@/components/magicui/animated-textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/magicui/animated-select'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { Switch } from '@/components/ui/switch'

interface PromoCode {
  id: string
  code: string
  type: 'general' | 'company' | 'chef'
  targetUserId?: string
  targetUserName?: string
  activationsCount: number
  maxActivations?: number
  createdAt: string
  isActive: boolean
  comment?: string
  activatedBy: Array<{
    userId: string
    userName: string
    activatedAt: string
  }>
}

export default function AdminPromoPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPromo, setNewPromo] = useState({
    code: '',
    type: 'general' as 'general' | 'company' | 'chef',
    targetUserId: '',
    maxActivations: '',
    isUnlimited: true,
    comment: '',
  })

  useEffect(() => {
    // Mock данные
    const mockPromos: PromoCode[] = [
      {
        id: '1',
        code: 'CHEFAPP2026',
        type: 'general',
        activationsCount: 15,
        maxActivations: 100,
        createdAt: '2025-01-15',
        isActive: true,
        activatedBy: [
          { userId: 'user1', userName: 'Иван Иванов', activatedAt: '2025-01-16' },
          { userId: 'user2', userName: 'Петр Петров', activatedAt: '2025-01-17' },
        ],
      },
    ]
    setPromoCodes(mockPromos)
  }, [])

  const filteredPromos = promoCodes.filter((promo) => {
    const search = searchTerm.toLowerCase()
    return (
      promo.code.toLowerCase().includes(search) ||
      promo.comment?.toLowerCase().includes(search) ||
      promo.targetUserName?.toLowerCase().includes(search)
    )
  })

  const handleCreatePromo = () => {
    if (!newPromo.code.trim()) {
      toast.error('Введите название промокода')
      return
    }

    if (newPromo.type !== 'general' && !newPromo.targetUserId) {
      toast.error('Выберите пользователя для персонального промокода')
      return
    }

    const promo: PromoCode = {
      id: `promo-${Date.now()}`,
      code: newPromo.code.toUpperCase(),
      type: newPromo.type,
      targetUserId: newPromo.type !== 'general' ? newPromo.targetUserId : undefined,
      targetUserName: newPromo.type !== 'general' ? 'Пользователь' : undefined,
      activationsCount: 0,
      maxActivations: newPromo.isUnlimited ? undefined : parseInt(newPromo.maxActivations) || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
      comment: newPromo.comment || undefined,
      activatedBy: [],
    }

    setPromoCodes([...promoCodes, promo])
    toast.success('Промокод создан')
    setIsCreateDialogOpen(false)
    setNewPromo({
      code: '',
      type: 'general',
      targetUserId: '',
      maxActivations: '',
      isUnlimited: true,
      comment: '',
    })
  }

  const handleToggleActive = (promoId: string) => {
    setPromoCodes(promoCodes.map((p) => 
      p.id === promoId ? { ...p, isActive: !p.isActive } : p
    ))
    toast.success('Статус промокода изменен')
  }

  const handleDeletePromo = (promoId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот промокод?')) {
      setPromoCodes(promoCodes.filter((p) => p.id !== promoId))
      toast.success('Промокод удален')
    }
  }

  const getTypeLabel = (type: PromoCode['type']) => {
    switch (type) {
      case 'general':
        return 'Общий'
      case 'company':
        return 'Для компании'
      case 'chef':
        return 'Для шеф-повара'
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Промокоды</h1>
          <p className="text-muted-foreground mt-1">Управление промокодами</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Создать промокод
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать промокод</DialogTitle>
              <DialogDescription>Заполните данные для нового промокода</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Название промокода *</Label>
                <AnimatedInput
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                  placeholder="CHEFAPP2026"
                />
              </div>
              <div>
                <Label>Тип промокода *</Label>
                <Select value={newPromo.type} onValueChange={(value) => setNewPromo({ ...newPromo, type: value as PromoCode['type'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Общий</SelectItem>
                    <SelectItem value="company">Персональный для компании</SelectItem>
                    <SelectItem value="chef">Персональный для шеф-повара</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(newPromo.type === 'company' || newPromo.type === 'chef') && (
                <div>
                  <Label>Выберите пользователя *</Label>
                  <AnimatedInput
                    value={newPromo.targetUserId}
                    onChange={(e) => setNewPromo({ ...newPromo, targetUserId: e.target.value })}
                    placeholder="ID пользователя или имя"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    В реальном приложении здесь будет поиск и выбор пользователя
                  </p>
                </div>
              )}
              <div>
                <Label>Количество активаций</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newPromo.isUnlimited}
                      onCheckedChange={(checked) => setNewPromo({ ...newPromo, isUnlimited: checked })}
                    />
                    <Label>Неограниченно</Label>
                  </div>
                  {!newPromo.isUnlimited && (
                    <AnimatedInput
                      type="number"
                      value={newPromo.maxActivations}
                      onChange={(e) => setNewPromo({ ...newPromo, maxActivations: e.target.value })}
                      placeholder="100"
                      min="1"
                    />
                  )}
                </div>
              </div>
              <div>
                <Label>Комментарий</Label>
                <AnimatedTextarea
                  value={newPromo.comment}
                  onChange={(e) => setNewPromo({ ...newPromo, comment: e.target.value })}
                  placeholder="Комментарий (необязательно)"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreatePromo}>Создать промокод</Button>
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
                placeholder="Поиск по промокоду..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPromos.length === 0 && promoCodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Промокоды не найдены</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Создать промокод
              </Button>
            </div>
          ) : filteredPromos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Промокоды не найдены по заданным фильтрам</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Промокод</th>
                    <th className="text-left p-2">Тип</th>
                    <th className="text-left p-2">Для кого</th>
                    <th className="text-left p-2">Активации</th>
                    <th className="text-left p-2">Дата создания</th>
                    <th className="text-left p-2">Активен</th>
                    <th className="text-left p-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPromos.map((promo) => (
                    <tr key={promo.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-2 font-mono font-semibold">{promo.code}</td>
                      <td className="p-2">
                        <Badge variant="outline">{getTypeLabel(promo.type)}</Badge>
                      </td>
                      <td className="p-2">
                        {promo.targetUserName || '-'}
                      </td>
                      <td className="p-2">
                        {promo.activationsCount}
                        {promo.maxActivations && ` / ${promo.maxActivations}`}
                        {!promo.maxActivations && ' / ∞'}
                      </td>
                      <td className="p-2">{promo.createdAt}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={promo.isActive}
                            onCheckedChange={() => handleToggleActive(promo.id)}
                          />
                          {promo.isActive ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" title="Просмотр активаций">
                            <Search className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeletePromo(promo.id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


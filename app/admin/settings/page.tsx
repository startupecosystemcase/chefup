'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/magicui/animated-dialog'
import { toast } from 'react-hot-toast'
import { useAdminStore } from '@/stores/useAdminStore'
import { AlertTriangle, Trash2 } from 'lucide-react'

export default function AdminSettingsPage() {
  const { adminLogin } = useAdminStore()
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [resetConfirm, setResetConfirm] = useState('')

  const handleResetDatabase = () => {
    if (resetConfirm !== 'RESET') {
      toast.error('Введите RESET для подтверждения')
      return
    }

    // В реальном приложении здесь будет API запрос
    toast.success('База данных обнулена. Тестовые данные удалены.')
    setIsResetDialogOpen(false)
    setResetConfirm('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки системы</h1>
        <p className="text-muted-foreground mt-1">Управление настройками админ-панели</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Настройки системы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Название проекта</Label>
            <AnimatedInput defaultValue="ChefUp" placeholder="Название проекта" />
          </div>
          <div>
            <Label>Email поддержки</Label>
            <AnimatedInput type="email" defaultValue="support@chefup.com" placeholder="support@chefup.com" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Телеграм уведомления</Label>
              <p className="text-sm text-muted-foreground">Включить уведомления в Telegram (пока выключено)</p>
            </div>
            <Switch disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Настройки администратора</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Текущий логин</Label>
            <Input value={adminLogin || ''} disabled />
          </div>
          <div>
            <Label>Изменить логин</Label>
            <div className="space-y-2">
              <AnimatedInput placeholder="Новый логин" />
              <Button variant="outline">Изменить логин</Button>
            </div>
          </div>
          <div>
            <Label>Смена пароля</Label>
            <div className="space-y-2">
              <AnimatedInput type="password" placeholder="Новый пароль" />
              <AnimatedInput type="password" placeholder="Подтвердите пароль" />
              <Button>Изменить пароль</Button>
            </div>
          </div>
          <div>
            <Label>Настройки доступа</Label>
            <p className="text-sm text-muted-foreground">Полный доступ ко всем разделам админ-панели</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Опасная зона
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Обнуление базы данных</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Это действие удалит все тестовые данные: вакансии, мероприятия, практику, сообщества, отклики.
                Останутся только тестовые аккаунты: 1 работник, 1 компания, 1 администратор.
              </p>
              <Button
                variant="destructive"
                onClick={() => setIsResetDialogOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Обнулить базу данных
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Диалог подтверждения обнуления */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Подтверждение обнуления БД</DialogTitle>
            <DialogDescription>
              Это действие нельзя отменить. Все тестовые данные будут удалены.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Введите RESET для подтверждения</Label>
              <AnimatedInput
                value={resetConfirm}
                onChange={(e) => setResetConfirm(e.target.value)}
                placeholder="RESET"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                Отмена
              </Button>
              <Button variant="destructive" onClick={handleResetDatabase}>
                Обнулить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


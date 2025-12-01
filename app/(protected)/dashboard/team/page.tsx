'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Search, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface TeamMember {
  id: string
  name: string
  position: string
  userId?: string
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberPosition, setNewMemberPosition] = useState('')
  const [newMemberUserId, setNewMemberUserId] = useState('')

  const handleAddMember = () => {
    if (newMemberName && newMemberPosition) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: newMemberName,
        position: newMemberPosition,
        userId: newMemberUserId || undefined,
      }
      setTeamMembers([...teamMembers, newMember])
      setNewMemberName('')
      setNewMemberPosition('')
      setNewMemberUserId('')
      setIsDialogOpen(false)
      toast.success('Участник добавлен в команду!')
    }
  }

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id))
    toast.success('Участник удален из команды')
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Команда</h1>
            <p className="text-muted-foreground">
              Добавьте участников ChefUp, с которыми вы работали или хотите работать
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить участника
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить участника в команду</DialogTitle>
                <DialogDescription>
                  Добавьте пользователя ChefUp или создайте запись вручную
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">ID пользователя ChefUp (опционально)</label>
                  <Input
                    value={newMemberUserId}
                    onChange={(e) => setNewMemberUserId(e.target.value)}
                    placeholder="Введите ID пользователя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя *</label>
                  <Input
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Введите имя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Должность *</label>
                  <Input
                    value={newMemberPosition}
                    onChange={(e) => setNewMemberPosition(e.target.value)}
                    placeholder="Введите должность"
                  />
                </div>
                <Button onClick={handleAddMember} className="w-full">
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Поиск */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по команде..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Список команды */}
        {teamMembers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                У вас пока нет участников в команде
              </p>
              <p className="text-sm text-muted-foreground">
                Для руководящих должностей наличие команды является преимуществом
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers
              .filter((member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.position.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar>
                          <AvatarFallback>
                            {member.name.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                          {member.userId && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              ID: {member.userId.slice(0, 8)}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}


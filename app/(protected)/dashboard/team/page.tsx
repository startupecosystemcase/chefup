'use client'

import { useState } from 'react'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
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
    <div className="p-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-8 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Команда</h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Добавьте участников ChefUp, с которыми вы работали или хотите работать
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <ShinyButton>
                <Plus className="w-4 h-4 mr-2" />
                Добавить участника
              </ShinyButton>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-dark/90">
              <DialogHeader>
                <DialogTitle className="dark:text-white">Добавить участника в команду</DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  Добавьте пользователя ChefUp или создайте запись вручную
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block dark:text-gray-300">ID пользователя ChefUp (опционально)</label>
                  <AnimatedInput
                    value={newMemberUserId}
                    onChange={(e) => setNewMemberUserId(e.target.value)}
                    placeholder="Введите ID пользователя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block dark:text-gray-300">Имя *</label>
                  <AnimatedInput
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Введите имя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block dark:text-gray-300">Должность *</label>
                  <AnimatedInput
                    value={newMemberPosition}
                    onChange={(e) => setNewMemberPosition(e.target.value)}
                    placeholder="Введите должность"
                  />
                </div>
                <ShinyButton onClick={handleAddMember} className="w-full">
                  Добавить
                </ShinyButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Поиск */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-gray-400 w-4 h-4" />
            <AnimatedInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по команде..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Список команды */}
        {teamMembers.length === 0 ? (
          <AnimatedCard className="bg-white dark:bg-dark/50">
            <div className="py-12 text-center">
              <p className="text-muted-foreground dark:text-gray-400 mb-4 text-lg">
                У вас пока нет участников в команде 😢
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Для руководящих должностей наличие команды является преимуществом
              </p>
            </div>
          </AnimatedCard>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers
              .filter((member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.position.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((member) => (
                <AnimatedCard key={member.id} className="bg-white dark:bg-dark/50">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar>
                          <AvatarFallback className="dark:bg-dark/70 dark:text-white">
                            {member.name.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold dark:text-white">{member.name}</h3>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">{member.position}</p>
                          {member.userId && (
                            <AnimatedBadge variant="outline" className="mt-2 text-xs">
                              ID: {member.userId.slice(0, 8)}
                            </AnimatedBadge>
                          )}
                        </div>
                      </div>
                      <ShinyButton
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X className="w-4 h-4" />
                      </ShinyButton>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}


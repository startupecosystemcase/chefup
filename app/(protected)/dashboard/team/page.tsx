'use client'

import { useState } from 'react'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AnimatedCard } from '@/components/magicui/animated-card'
import { AnimatedInput } from '@/components/magicui/animated-input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedBadge } from '@/components/magicui/animated-badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/magicui/animated-dialog'
import { Plus, Search, X, Search as SearchIcon, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { usePublicProfilesStore, useOnboardingStore } from '@/stores/useOnboardingStore'
import { Label } from '@/components/ui/label'
import { positions } from '@/lib/data'

interface TeamMember {
  id: string
  name: string
  position: string
  userId?: string
  username?: string
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchUserId, setSearchUserId] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [foundUser, setFoundUser] = useState<{ name: string; position: string; userId: string; username?: string } | null>(null)
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberPosition, setNewMemberPosition] = useState('')
  const [newMemberComment, setNewMemberComment] = useState('')
  
  const { getUserIdByUsername } = usePublicProfilesStore()
  const formData = useOnboardingStore((state) => state.formData)

  const handleSearchUser = async () => {
    if (!searchUserId.trim()) {
      toast.error('Введите ID или логин пользователя')
      return
    }

    setIsSearching(true)
    
    // Имитация поиска пользователя (в реальном приложении будет API запрос)
    setTimeout(() => {
      // Проверяем, существует ли пользователь
      const userId = getUserIdByUsername(searchUserId.toLowerCase().trim())
      
      if (userId || searchUserId.length > 0) {
        // Mock данные найденного пользователя
        const mockUser = {
          userId: userId || searchUserId,
          name: 'Иван Иванов', // В реальном приложении будет из API
          position: 'Шеф-повар', // В реальном приложении будет из API
          username: searchUserId.toLowerCase().trim(),
        }
        setFoundUser(mockUser)
        setNewMemberName(mockUser.name)
        setNewMemberPosition(mockUser.position)
        toast.success('Пользователь найден!')
      } else {
        toast.error('Пользователь не найден')
        setFoundUser(null)
        setNewMemberName('')
        setNewMemberPosition('')
      }
      setIsSearching(false)
    }, 1000)
  }

  const handleAddMember = () => {
    if (!foundUser) {
      toast.error('Сначала найдите пользователя')
      return
    }
    
    if (!newMemberPosition.trim()) {
      toast.error('Заполните должность')
      return
    }

      const newMember: TeamMember = {
        id: Date.now().toString(),
      name: newMemberName.trim(),
      position: newMemberPosition.trim(),
      userId: foundUser.userId,
      username: foundUser.username,
      }
      setTeamMembers([...teamMembers, newMember])
    
    // Сброс формы
    setSearchUserId('')
    setFoundUser(null)
    setNewMemberName('')
    setNewMemberPosition('')
    setNewMemberComment('')
    setIsDialogOpen(false)
    toast.success('Участник добавлен в команду!')
  }

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      // Сброс формы при закрытии
      setSearchUserId('')
      setFoundUser(null)
      setNewMemberName('')
      setNewMemberPosition('')
      setNewMemberComment('')
    }
  }

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id))
    toast.success('Участник удален из команды')
  }

  return (
    <div className="px-3 py-4 md:p-6 lg:p-8 w-full bg-white dark:bg-dark transition-colors">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-8 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Команда</h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Добавьте участников ChefUp, с которыми вы работали или хотите работать
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <ShinyButton>
                <Plus className="w-4 h-4 mr-2" />
                Добавить участника
              </ShinyButton>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-dark max-w-2xl">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl mb-2">Добавить участника в команду</DialogTitle>
                <DialogDescription className="text-base">
                  Найдите пользователя по ID или логину, затем заполните информацию
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Поиск пользователя */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">ID профиля / Логин *</Label>
                  <div className="flex gap-3">
                  <AnimatedInput
                      value={searchUserId}
                      onChange={(e) => setSearchUserId(e.target.value)}
                      placeholder="Введите ID или логин пользователя"
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearchUser()
                        }
                      }}
                    />
                    <ShinyButton 
                      onClick={handleSearchUser}
                      disabled={!searchUserId.trim() || isSearching}
                      className="whitespace-nowrap"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Поиск...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="w-4 h-4 mr-2" />
                          Найти
                        </>
                      )}
                    </ShinyButton>
                  </div>
                </div>

                {/* Найденные данные */}
                {foundUser && (
                  <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Имя</Label>
                  <AnimatedInput
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                        placeholder="Имя пользователя"
                  />
                </div>
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Должность *</Label>
                  <AnimatedInput
                    value={newMemberPosition}
                    onChange={(e) => setNewMemberPosition(e.target.value)}
                    placeholder="Введите должность"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Комментарий</Label>
                      <AnimatedInput
                        value={newMemberComment}
                        onChange={(e) => setNewMemberComment(e.target.value)}
                        placeholder="Дополнительная информация (необязательно)"
                  />
                </div>
                  </div>
                )}

                {/* Кнопка добавления */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <ShinyButton 
                    variant="outline" 
                    onClick={() => handleDialogClose(false)}
                  >
                    Отмена
                  </ShinyButton>
                  <ShinyButton 
                    onClick={handleAddMember}
                    disabled={!foundUser || !newMemberPosition.trim()}
                    className="whitespace-nowrap"
                  >
                  Добавить
                </ShinyButton>
                </div>
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


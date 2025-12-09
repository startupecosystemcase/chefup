'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/magicui/animated-dialog'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { ImageIcon, Smile } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AvatarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentAvatar?: string
  firstName?: string
  lastName?: string
  onSave: (avatar: string) => void
}

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
  '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
  '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
  '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
  '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮',
  '🤧', '🥵', '🥶', '😶‍🌫️', '😵', '😵‍💫', '🤯', '🤠', '🥳', '😎',
  '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳',
  '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖',
  '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬',
]

export function AvatarDialog({ open, onOpenChange, currentAvatar, firstName, lastName, onSave }: AvatarDialogProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>(currentAvatar || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setSelectedImage(imageUrl)
        setSelectedEmoji('')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (selectedEmoji) {
      // Конвертируем emoji в data URL
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#f3f4f6'
        ctx.fillRect(0, 0, 200, 200)
        ctx.font = '120px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(selectedEmoji, 100, 100)
        const emojiImage = canvas.toDataURL('image/png')
        onSave(emojiImage)
      }
    } else if (selectedImage) {
      onSave(selectedImage)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-dark">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl mb-2">Изменить аватарку</DialogTitle>
          <DialogDescription className="text-base">
            Выберите фото или смайлик для аватарки
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Preview */}
          <div className="flex justify-center">
            <Avatar className="h-32 w-32 ring-4 ring-gray-200 dark:ring-gray-700">
              {selectedEmoji ? (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gray-100 dark:bg-gray-800 rounded-full">
                  {selectedEmoji}
                </div>
              ) : selectedImage ? (
                <AvatarImage src={selectedImage} />
              ) : (
                <AvatarFallback className="text-4xl bg-gray-100 dark:bg-gray-800">
                  {firstName?.[0] || 'U'}
                  {lastName?.[0] || ''}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <Tabs defaultValue="photo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger 
                value="photo"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Фото
              </TabsTrigger>
              <TabsTrigger 
                value="emoji"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400"
              >
                <Smile className="w-4 h-4 mr-2" />
                Смайлик
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photo" className="space-y-4 mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <ShinyButton
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Загрузить фото
              </ShinyButton>
            </TabsContent>
            
            <TabsContent value="emoji" className="space-y-4 mt-4">
              <div className="grid grid-cols-10 gap-2 max-h-[300px] overflow-y-auto p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedEmoji(emoji)
                      setSelectedImage('')
                    }}
                    className={`text-2xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                      selectedEmoji === emoji ? 'bg-[#F97316] bg-opacity-20 ring-2 ring-[#F97316]' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <ShinyButton variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </ShinyButton>
            <ShinyButton onClick={handleSave} disabled={!selectedEmoji && !selectedImage}>
              Сохранить
            </ShinyButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { AlertCircle, RefreshCw, Home, HelpCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/useOnboardingStore'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const userId = useAuthStore((state) => state.userId)
  const [retryCount, setRetryCount] = useState(0)
  const [showSupport, setShowSupport] = useState(false)

  useEffect(() => {
    console.error(error)
  }, [error])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    reset()
    
    // Если повторная попытка неудачна, показываем поддержку
    setTimeout(() => {
      if (retryCount >= 1) {
        setShowSupport(true)
      }
    }, 2000)
  }

  const homeUrl = userId ? '/dashboard' : '/'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEFCF9] p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
            Что-то пошло не так
          </h1>
          <p className="text-[#64748B] mb-4">
            Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте еще раз.
          </p>
          {error.digest && (
            <p className="text-xs text-[#64748B] font-mono mb-2">
              ID ошибки: {error.digest}
            </p>
          )}
          {showSupport && (
            <p className="text-sm text-amber-600 mt-2">
              Не удалось загрузить страницу. Обратитесь в поддержку.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <ShinyButton onClick={handleRetry} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Попробовать снова
          </ShinyButton>
          <ShinyButton
            variant="outline"
            onClick={() => router.push(homeUrl)}
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            На главную {userId ? '(интерфейс)' : ''}
          </ShinyButton>
          {showSupport && (
            <ShinyButton 
              variant="outline" 
              onClick={() => {
                // В реальном приложении здесь будет форма поддержки
                window.location.href = 'mailto:support@chefup.com?subject=Ошибка загрузки'
              }}
              className="w-full"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Обратиться в поддержку
            </ShinyButton>
          )}
        </div>
      </div>
    </div>
  )
}


'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/magicui/animated-dialog'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { X, ZoomIn, ZoomOut, RotateCw, Move } from 'lucide-react'

interface ImageCropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageSrc: string | null
  onCrop: (croppedImage: string) => void
  aspectRatio?: number
}

export function ImageCropDialog({ open, onOpenChange, imageSrc, onCrop, aspectRatio }: ImageCropDialogProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (open && imageSrc) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
      setRotation(0)
      setImageLoaded(false)
    }
  }, [open, imageSrc])

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCrop = () => {
    if (!imageRef.current || !containerRef.current) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const imageRect = imageRef.current.getBoundingClientRect()
    
    const cropWidth = containerRect.width
    const cropHeight = containerRect.height
    const imageWidth = imageRef.current.naturalWidth
    const imageHeight = imageRef.current.naturalHeight

    canvas.width = cropWidth
    canvas.height = cropHeight

    ctx.save()
    ctx.translate(cropWidth / 2, cropHeight / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(scale, scale)
    ctx.translate(-imageWidth / 2, -imageHeight / 2)
    ctx.translate(-position.x / scale, -position.y / scale)
    
    ctx.drawImage(imageRef.current, 0, 0)
    ctx.restore()

    const croppedImage = canvas.toDataURL('image/jpeg', 0.9)
    onCrop(croppedImage)
    onOpenChange(false)
  }

  if (!imageSrc) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white dark:bg-dark">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl mb-2">Обрезать изображение</DialogTitle>
          <DialogDescription className="text-base">
            Переместите и масштабируйте изображение для обрезки
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <ShinyButton variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4 mr-2" />
              Уменьшить
            </ShinyButton>
            <ShinyButton variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4 mr-2" />
              Увеличить
            </ShinyButton>
            <ShinyButton variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="w-4 h-4 mr-2" />
              Повернуть
            </ShinyButton>
            <div className="text-sm text-muted-foreground">
              Масштаб: {Math.round(scale * 100)}%
            </div>
          </div>

          {/* Crop Area */}
          <div 
            ref={containerRef}
            className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600"
            style={{ aspectRatio: aspectRatio || 16/9 }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop"
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale}) rotate(${rotation}deg)`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <ShinyButton variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </ShinyButton>
            <ShinyButton onClick={handleCrop}>
              Применить обрезку
            </ShinyButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


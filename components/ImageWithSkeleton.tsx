'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithSkeletonProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: '16/9' | '4/3' | '1/1'
  objectFit?: 'cover' | 'contain'
}

export function ImageWithSkeleton({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = '16/9',
  objectFit = 'cover'
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    // Предзагрузка изображения для предотвращения мерцания
    if (!src || src.includes('YOUR_FILE_ID')) {
      setError(true)
      setLoaded(true)
      return
    }
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setImageSrc(src)
      setTimeout(() => setLoaded(true), 100)
    }
    img.onerror = () => {
      // Попробуем альтернативный формат для Google Drive
      if (src.includes('drive.google.com')) {
        const fileId = src.match(/id=([^&]+)/)?.[1]
        if (fileId) {
          const altSrc = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
          const altImg = new Image()
          altImg.crossOrigin = 'anonymous'
          altImg.onload = () => {
            setImageSrc(altSrc)
            setTimeout(() => setLoaded(true), 100)
          }
          altImg.onerror = () => {
            setError(true)
            setLoaded(true)
          }
          altImg.src = altSrc
        } else {
          setError(true)
          setLoaded(true)
        }
      } else {
        setError(true)
        setLoaded(true)
      }
    }
    img.src = src
  }, [src])

  const aspectRatioClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
  }[aspectRatio]

  return (
    <div className={cn('relative overflow-hidden bg-[#0a0a0a]', aspectRatioClass, className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 animate-pulse" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <span className="text-white/50 text-sm">Ошибка загрузки</span>
        </div>
      ) : (
        imageSrc && (
          <img
            src={imageSrc}
            alt={alt}
            className={cn(
              'w-full h-full transition-opacity duration-500',
              objectFit === 'cover' ? 'object-cover' : 'object-contain',
              loaded ? 'opacity-100' : 'opacity-0'
            )}
            loading="lazy"
            decoding="async"
          />
        )
      )}
    </div>
  )
}


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ChefUp - Профессиональная экосистема для HoReCa',
  description: 'Нетворкинг, поиск работы и обучение для поваров и специалистов HoReCa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className={`min-h-screen bg-white antialiased ${inter.className}`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}


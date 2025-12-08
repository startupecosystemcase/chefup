/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Оптимизация для уменьшения размера серверного бандла
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Исключаем большие клиентские библиотеки из серверного бандла
      config.externals = config.externals || []
      config.externals.push({
        'framer-motion': 'commonjs framer-motion',
        'react-simple-maps': 'commonjs react-simple-maps',
        'swiper': 'commonjs swiper',
        'canvas-confetti': 'commonjs canvas-confetti',
        'react-confetti': 'commonjs react-confetti',
      })
    }
    return config
  },
  // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Компрессия
  compress: true,
  // Экспериментальные оптимизации
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

module.exports = nextConfig


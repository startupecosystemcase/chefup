/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Оптимизация для уменьшения размера серверного бандла
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Исключаем большие клиентские библиотеки из серверного бандла
      // НЕ исключаем framer-motion, так как это вызывает проблемы с prerendering
      config.externals = config.externals || []
      config.externals.push({
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


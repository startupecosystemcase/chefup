export interface PortfolioPost {
  id: string
  title: string
  text: string
  images: string[]
  videos?: string[] // URL видео (YouTube, Vimeo и т.д.)
  links?: Array<{
    url: string
    title: string
    description?: string
  }>
  createdAt: string
  updatedAt?: string
}

export interface SocialLinks {
  instagram?: string
  telegram?: string
  facebook?: string
  linkedin?: string
  website?: string
  youtube?: string
}

export interface MicroblogProfile {
  userId: string
  portfolioPosts: PortfolioPost[]
  socialLinks: SocialLinks
}


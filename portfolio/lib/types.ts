export interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string | null
  short_description: string | null
  tech_stack: string[] | null
  live_url: string | null
  preview_image: string | null
  gallery_images: string[] | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CaseStudy {
  id: string
  project_id: string
  slug: string
  problem: string | null
  solution: string | null
  process: string | null
  results: string | null
  content: Record<string, unknown> | null
  screenshot_images: string[] | null
  is_published: boolean
  created_at: string
  updated_at: string
  projects?: Project
}

export interface Service {
  id: string
  title: string
  description: string | null
  icon: string | null
  features: string[] | null
  sort_order: number
  is_active: boolean
}

export interface Skill {
  id: string
  name: string
  category: string | null
  proficiency: number
  icon: string | null
  sort_order: number
  is_active: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  avatar: string | null
  content: string
  rating: number
  is_active: boolean
  sort_order: number
}

export interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteContent {
  id: string
  key: string
  value: unknown
  description: string | null
  updated_at: string
}

export interface Settings {
  id: string
  key: string
  value: Record<string, string>
  updated_at: string
}

export interface ThemeSettings {
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
}

export interface ContactInfo {
  phone: string
  email: string
  whatsapp: string
  location: string
}

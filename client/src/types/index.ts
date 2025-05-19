export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface Listing {
  id: number
  title: string
  description: string
  price: number
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: string[]
  userId: number
  user?: User
  createdAt: string
}

export interface ListingCreateDto {
  title: string
  description: string
  price: number
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: File[]
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}
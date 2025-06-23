export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface Listing {
  id: number
  title: string
  description: string
	pricePerNight: number
  address: string
  city: string
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

export interface Booking {
  id: number;
  listingId: number;
  userId: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

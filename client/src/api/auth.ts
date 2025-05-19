import api from './index'
import type { AuthResponse, User } from '@/types'

export default {
  async login(credentials: { email: string; password: string }) {
    return await api.post<AuthResponse>('/auth/login', credentials)
  },

  async register(userData: { 
    name: string
    email: string
    password: string 
  }) {
    return await api.post<AuthResponse>('/auth/register', userData)
  },

  async getMe() {
    return await api.get<User>('/auth/me')
  }
}
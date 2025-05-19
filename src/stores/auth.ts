import { defineStore } from "pinia"
import api from "@/api"
import type { User } from "@/types"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
    error: null as string | null,
    isLoading: false  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        this.isLoading = true
        const response = await api.post("/auth/login", credentials)
        console.log("Полный ответ сервера:", response.data)
        if (response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken)
          this.user = response.data.user
          this.isAuthenticated = true
          this.error = null;
          return { token: response.data.accessToken, user: response.data.user }
        }
        return response.data
      } catch (error: any) {
        this.error = error.message || "Неверные учетные данные"
        throw error;
      } finally { this.isLoading = false } },
    async socialLogin(provider: string) { window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}` },
    async register(userData: {
      name: string;
      email: string;
      password: string;
    }) {
      try {
        this.isLoading = true;
        const response = await api.post("/auth/register", userData);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token)
          this.user = response.data.user
          this.isAuthenticated = true
          this.error = null
          return response.data
        }
      } catch (error: any) {
        this.error = error.message || "Ошибка регистрации"
        throw error
      } finally { this.isLoading = false  } },
    logout() {
      localStorage.removeItem("token")
      /* localStorage.removeItem('refresh_token'); */
      this.isAuthenticated = false
      this.user = null  },
      
    async checkAuth() {
      try {
        this.isLoading = true
        const token = localStorage.getItem('token')
        
        if (!token) return false
        const response = await api.get('/user')
        
        // Проверка наличия обязательных полей пользователя
        if (!response.data?.id) {
          throw new Error('Invalid user data')  }

        this.user = response.data
        this.isAuthenticated = true
      return true
    
  } catch (error) { // Логаут только при 401 ошибке (неверный/просроченный токен)
    
    if (error.response?.status === 401) {
      this.logout()  }
    return false
  } finally { this.isLoading = false }},   },})

  

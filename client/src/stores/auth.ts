/* import { defineStore } from "pinia"
import api from "@/api"
import type { User } from "@/types"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
    error: null as string | null,
    isLoading: false
  }),
  actions: {
    async login(credentials: { email: string; password: string; rememberMe?: boolean }) {
      try {
        console.log('Попытка входа для:', credentials.email)
        this.isLoading = true
        const response = await api.post("/auth/login", credentials)
        console.log("Полный ответ сервера:", response.data)
        if (response.data.accessToken) {
          if (credentials.rememberMe) {
            localStorage.setItem("token", response.data.accessToken)
          } else { sessionStorage.setItem("token", response.data.accessToken) }
          this.user = response.data.user
          this.isAuthenticated = true
          this.error = null
          return { token: response.data.accessToken, user: response.data.user }
        }
        return response.data
      } catch (error: any) {
        this.error = error.message || "Неверные учетные данные"
        throw error
      } finally { this.isLoading = false }
    },
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
      } finally { this.isLoading = false }
    },
    logout() {
      console.log('Выполнение выхода...')
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      this.isAuthenticated = false
      this.user = null
      console.log('Выход выполнен')
    },
    async checkAuth() {
      try {
        this.isLoading = true
        console.log('Проверка авторизации...')
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        console.log('Найден токен:', !!token)
        if (!token){
          console.log('Токен не найден - пользователь не авторизован')
          return false }
        const response = await api.get('/user')
        if (!response.data?.id) throw new Error('Invalid user data')
        this.user = response.data
        this.isAuthenticated = true
        return true
      } catch (error) {
        if (error.response?.status === 401) {
          this.logout()
        }
        return false
      } finally { this.isLoading = false }
    },
  },
})
 */

import { defineStore } from "pinia"
import api from "@/api"
import type { User } from "@/types"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
    error: null as string | null,
    isLoading: false
  }),  

  actions: {
     initialize() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        this.isAuthenticated = true;
        // Автоматически проверяем токен при инициализации
        this.checkAuth().catch(() => this.logout());
      }
    },

    async login(credentials: { email: string; password: string; rememberMe?: boolean }) {
      try {
        console.log('[Auth] Login attempt for:', credentials.email)
        this.isLoading = true
        this.error = null
         const response = await api.post("/auth/login", credentials)
        console.log('[Auth] Login response:', response.data)
        if (!response.data?.accessToken) {
          throw new Error('No access token received')
        }
        const storage = credentials.rememberMe ? localStorage : sessionStorage
        storage.setItem("token", response.data.accessToken)
        console.log(`[Auth] Token stored in ${credentials.rememberMe ? 'localStorage' : 'sessionStorage'}`)
        this.user = response.data.user
        this.isAuthenticated = true
        console.log('[Auth] Login successful for:', this.user?.email)
        return response.data
      } catch (error: any) {
        console.error('[Auth] Login error:', error)
        this.error = error.message || "Неверные учетные данные"
        throw error
      } finally {  this.isLoading = false  } },

    async register(userData: { name: string; email: string; password: string }) {
      try {
        console.log('[Auth] Registration attempt for:', userData.email)
        this.isLoading = true
        this.error = null
        const response = await api.post("/auth/register", userData)
        console.log('[Auth] Registration response:', response.data)

        if (!response.data?.token) {
          throw new Error('No token received')
        }
        localStorage.setItem("token", response.data.token)
        this.user = response.data.user
        this.isAuthenticated = true
        console.log('[Auth] Registration successful for:', this.user?.email)
        return response.data
      } catch (error: any) {
        console.error('[Auth] Registration error:', error)
        this.error = error.message || "Ошибка регистрации"
        throw error
      } finally { 
        this.isLoading = false   } },

    async checkAuth() {
      try {
        console.log('[Auth] Checking authentication...')
        this.isLoading = true
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        console.log('[Auth] Token exists:', !!token)
        if (!token) { console.log('[Auth] No token found')
          return false
        }

        const response = await api.get('/booking/api/user')
        console.log('[Auth] User data received:', !!response.data)
                if (!response.data?.id) {
          throw new Error('Invalid user data')
        }
        this.user = response.data
        this.isAuthenticated = true
        console.log('[Auth] User authenticated:', this.user.email)
                return true
      } catch (error: any) {
        console.error('[Auth] Check auth error:', error)
                if (error.response?.status === 401) {
          console.log('[Auth] 401 error - performing logout')
          this.logout()
        }        
        return false
      } finally { 
        this.isLoading = false 
      }},
    logout() {
      console.log('[Auth] Logging out...')
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      this.isAuthenticated = false
      this.user = null
      console.log('[Auth] Logout completed')
    },
    async socialLogin(provider: string) {
      console.log('[Auth] Social login with:', provider)
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`
    }}})
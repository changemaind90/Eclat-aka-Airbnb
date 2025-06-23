import { defineStore } from "pinia";
import api from "@/api";
import type { User, Booking } from "@/types";
import type { Router } from 'vue-router'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
    error: null as string | null,
    isLoading: false,
  }),

  actions: {
    initialize() {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
        // console.log(token)
      if (token) {
        this.isAuthenticated = true;
        // Автоматически проверяем токен при инициализации
        this.checkAuth().catch(() => this.logout());
      }
    },

    async login(credentials: {
      email: string;
      password: string;
      rememberMe?: boolean;
    }) {
      try {
        console.log("[Auth] Login attempt for:", credentials.email);
        this.isLoading = true;
        this.error = null;
        const response = await api.post("/auth/login", credentials);
        console.log("[Авторизация] Ответ:", response.data);
        if (!response.data?.token) {
          throw new Error("Нет токена!");
        }
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", response.data.token);
        console.log(
          `[Аторизация] Токен сохранен в: ${
            credentials.rememberMe ? "localStorage" : "sessionStorage"
          }`
        );
        this.user = response.data.user;
        this.isAuthenticated = true;
        console.log("[Auth] Login successful for:", this.user?.email);
        return response.data;
      } catch (error: any) {
        console.error("[Авторизация] Ошибка авторизации", error);
        this.error = error.message || "Неверные учетные данные";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async register(userData: {
      name: string;
      email: string;
      password: string;
    }) {
      try {
        console.log("[Auth] Registration attempt for:", userData.email);
        this.isLoading = true;
        this.error = null;
        const response = await api.post("/auth/register", userData);
        console.log("[Auth] Registration response:", response.data);

        if (!response.data?.token) {
          throw new Error("No token received");
        }
        localStorage.setItem("token", response.data.token);
        this.user = response.data.user;
        this.isAuthenticated = true;
        console.log("[Auth] Registration successful for:", this.user?.email);
        return response.data;
      } catch (error: any) {
        console.error("[Auth] Registration error:", error);
        this.error = error.message || "Ошибка регистрации";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },async fetchUserBookings(): Promise<Booking[]> {
      try {
        const response = await api.get('/booking');
        return response.data;
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
    },

  // Создать бронь
  async createBooking(listingId: number, dates: { start: string; end: string }): Promise<Booking> {
    try {
      const response = await api.post('/booking', { 
        listingId,
        ...dates
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Отменить бронь
  async cancelBooking(bookingId: number): Promise<void> {
    try {
      await api.post(`/booking/cancel/${bookingId}`);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

      // Подтвердить завершение брони
      async completeBooking(bookingId: number): Promise<void> {
        try {
          await api.post(`/booking/complete/${bookingId}`);
        } catch (error) {
          console.error('Error completing booking:', error);
          throw error;
        }
      },

    async checkAuth() {
      try {
        console.log("[Auth] Проверка авторизации");
        this.isLoading = true;
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        console.log("[Auth] Токен есть!:", !!token);

        if (!token) {
          console.log("[Auth] Токен не найден");
          return false;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Декодированные данные токена:", payload);
        console.log("sub есть:", 'sub' in payload);
        const userId = Number(payload.sub || payload.id || payload.userId);
        console.log("Декодируем юзер ID:", payload.sub, "->", userId);

       if (!userId || isNaN(Number(userId))) {
          console.error("Invalid user ID in token:", userId);
          throw new Error("Invalid user ID");
        }

        this.user = {
          id: Number(userId),
          name: payload.name || "",
          email: payload.email,
          createdAt: new Date().toISOString(),
        };
        console.log("[Auth] User ID установлен:", this.user.id);
        this.isAuthenticated = true;
        console.log("[Auth] User ID установлен:", this.user.id);
        console.log("[Auth] Залогинен по токену");
        return true;
      } catch (error: any) {
        console.error("[Auth] Ошибка проверки логина пользователя:", error);
        this.logout();
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    logout(router?: Router) {
      console.log("[Auth] Logging out...");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      this.isAuthenticated = false;
      this.user = null;
       if (router) {
          router.push('/login');
        }
      console.log("[Auth] Logout completed");
      
    },
    async socialLogin(provider: string) {
      console.log("[Auth] Social login with:", provider);
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
    },
  },
});

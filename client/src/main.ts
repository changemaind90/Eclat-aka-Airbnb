import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import './assets/styles/reset.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

const authStore = useAuthStore()            // Инициализация auth состояния
authStore.checkAuth()                       // Проверяем авторизацию при старте приложения

app.mount('#app')
app.config.errorHandler = (err) => {
  console.error('Глобальная ошибка:', err)
}
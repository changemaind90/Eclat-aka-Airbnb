/* import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import './assets/styles/reset.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
router.isReady().then(() => {
  if (typeof window !== 'undefined') {
    const authStore = useAuthStore()
    authStore.checkAuth().then(() => {
      app.mount('#app')
    })
  } else {
    app.mount('#app')
  }
})              
app.config.errorHandler = (err) => {
  console.error('Глобальная ошибка:', err) } */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import './assets/styles/reset.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Инициализируем хранилище перед монтированием
const authStore = useAuthStore()
authStore.initialize()

app.mount('#app')

app.config.errorHandler = (err) => {
  console.error('Глобальная ошибка:', err)
}
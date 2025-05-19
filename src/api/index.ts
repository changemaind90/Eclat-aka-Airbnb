import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/booking/api',
  timeout: 10000})
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  console.log('Заголовки запроса:', { 
    url: config.url, 
    hasToken: !!token 
  })
  if (token) {config.headers.Authorization = `Bearer ${token}`}
  return config})
  
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response) {
        // Обработка 401 ошибки
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          
          // Проверяем, что роутер инициализирован
          if (router) {
            try {
              await router.push({
                name: 'register',
                query: { 
                  redirect: router.currentRoute.value.fullPath 
                }
              })
            } catch (routerError) {
              console.error('Ошибка перенаправления:', routerError)
            }
          }
        }
        
        return Promise.reject({
          message: error.response.data?.message || 'Ошибка сервера',
          statusCode: error.response.status,
          errors: error.response.data?.errors
        })
      }
      
      return Promise.reject({ message: 'Нет соединения с сервером' })
    }
  )
  api.interceptors.response.use(
    response => {
      console.log('Успешный ответ:', { 
        url: response.config.url, 
        status: response.status 
      });
      return response;
    },
    error => {
      console.error('Ошибка запроса:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message
      });
      return Promise.reject(error);
    }
  );

export default api
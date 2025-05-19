import axios from 'axios'

declare module 'axios' {
  interface AxiosInstance { createListing(data: object): Promise<any>; }}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/booking/api',
  timeout: 10000 })

api.createListing = (data: FormData) => api.post('/listings', data)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {config.headers.Authorization = `Bearer ${token}`  }
  return config })
api.interceptors.response.use(
  response => response,
  error => { if (error.response) {
      const errorData = {
        message: error.response.data?.message || 'Ошибка сервера',
        statusCode: error.response.status,
        errors: error.response.data?.errors }
      return Promise.reject(errorData)    }
    return Promise.reject({ message: 'Нет соединения с сервером' })})

export default api
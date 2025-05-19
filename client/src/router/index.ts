import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AboutView from '../views/AboutView.vue'
import ContactsView from '../views/ContactsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView
  },
  {
    path: '/listing/:id',
    name: 'listing',
    component: () => import('@/views/ListingView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AuthView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/AuthView.vue'),
    meta: { guestOnly: true }
  },
  { path: '/:pathMatch(.*)*',
    redirect: '/'}]
    
const router = createRouter({history: createWebHistory(),routes})
/* router.onError(() => {
  if (error.response?.status === 404) {router.push('/not-found')}}) */
// Навигационный guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
 /*  console.log(`Navigation from ${from.path} to ${to.path}`) */
 console.log('Навигация:', {
  from: from.path,
  to: to.path,
  isAuthenticated: authStore.isAuthenticated,
  hasToken: !!localStorage.getItem('token')});
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Доступ запрещен: требуется авторизация')
    return next('/login')}
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next('/')}
  next()})
router.onError((error) => { console.error('Навигационная ошибка:', error)})
// Лог всех зарегистрированных маршрутов
console.log('Available routes:', routes.map(r => r.path))
// Проверка инициализации
router.isReady().then(() => {
  console.log('Router is ready! Current route:', router.currentRoute.value)})
export default router
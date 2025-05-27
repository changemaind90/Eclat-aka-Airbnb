import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Creators from '../views/Creators.vue'
import MapsView from '../views/MapsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: Creators
  },
  {
    path: '/maps',
    name: 'maps',
    component: MapsView
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
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  },
  // Изменяем обработку неизвестных путей
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/404' // Перенаправляем на страницу 404 вместо главной
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

router.onError((error) => {
  if ((error as any).code === '404' || (error as any).status === 404) {
    router.push('/404')
  } else {
    console.error('Навигационная ошибка:', error)
  }
})

router.beforeEach((to, from, next) => {                       // Навигационный guard
  const authStore = useAuthStore()

  const hasToken = localStorage.getItem('token') || sessionStorage.getItem('token');

  console.log('Навигация:', {
  from: from.path,
  to: to.path,
  isAuthenticated: authStore.isAuthenticated,
  hasToken: !!localStorage.getItem('token')})

  if (!authStore.isAuthenticated && hasToken) {
    authStore.checkAuth()
      .then(() => {
        checkRouteAccess();
      })
      .catch(() => {
        authStore.logout();
        next('/login');
      });
    return;
  }

  checkRouteAccess();

  function checkRouteAccess() {
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login');
    } else if (to.meta.guestOnly && authStore.isAuthenticated) {
      next('/');
    } else {
      next();
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Доступ запрещен: требуется авторизация')
    return next('/login')}

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next('/')}

  next()})

console.log('Доступные маршруты:', routes.map(r => r.path))     // Лог всех зарегистрированных маршрутов

router.isReady().then(() => {                                   // Проверка инициализации
  console.log('Router is ready! Current route:', router.currentRoute.value)})
export default router
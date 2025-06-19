<template>
  <nav>
    <div class="nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">Создатели</RouterLink>
      <RouterLink to="/maps">Карты</RouterLink>
      <RouterLink to="/profile" v-if="authStore.isAuthenticated">Профиль</RouterLink>
      <button v-if="authStore.isAuthenticated" @click="handleLogout"><span class="btn-text">Выйти</span></button>
      <RouterLink v-else to="/login">Войти</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout(router) // Теперь функция используется
}
</script>
<style scoped>
nav {
  width: 100%;  
  background-color: #fff;
  height: 100px;
}
.nav {
  max-width: 800px;
  height: 65px;
  display: flex;
  justify-content: space-between;
  padding-top: 35px;
  margin: 0 auto;
  box-sizing: border-box;
  & a {
    max-width: 160px;
    max-height: 30px;
    color: #000;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-decoration: none;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
  }
}
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
<template>
  <nav>
    <div class="nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">Создатели</RouterLink>
      <RouterLink to="/maps">Карты</RouterLink>
      <RouterLink to="/profile" v-if="authStore.isAuthenticated">Профиль</RouterLink>
      <button v-if="authStore.isAuthenticated" @click="authStore.logout">Выйти</button>
      <RouterLink v-else to="/login">Войти</RouterLink>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
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
</style>
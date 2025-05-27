<template>
  <div class="user-info">
    <div class="user-info">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <button @click="showPassword = !showPassword">
      {{ showPassword ? 'Скрыть пароль' : 'Показать пароль' }}
    </button>
    <p v-if="showPassword">Пароль: ********</p>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  user: {
    name: string
    email: string
  }
}>()
const showPassword = ref(false)
</script>
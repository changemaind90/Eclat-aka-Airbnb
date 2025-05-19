<template>
  <div class="notifications">
    <div v-for="notification in notifications" :key="notification.id">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
const { notifications } = useNotificationStore()
</script>
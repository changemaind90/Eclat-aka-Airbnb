<template>
  <div class="user-info">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  user: {
    name: string;
    email: string;
  }
}>();
</script>
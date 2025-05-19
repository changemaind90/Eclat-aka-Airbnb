<template>
  <div class="user-listings">
    <h3>Ваши бронирования</h3>
    <div v-if="listings.length === 0">Нет бронирований</div>
    <div v-else v-for="listing in listings" :key="listing.id">
      {{ listing.title }} ({{ listing.price }} ₽)
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '@/types';
defineProps<{
  listings: Listing[]
}>();
</script>
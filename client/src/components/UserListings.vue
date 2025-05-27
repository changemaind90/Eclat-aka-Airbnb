<template>
  <<div class="user-listings">
    <h3>Ваши объявления</h3>
    <div v-if="listings.length === 0">Нет объявлений</div>
    <div v-else class="listings-grid">
      <ListingCard 
        v-for="listing in listings" 
        :key="listing.id" 
        :listing="listing"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '@/types';
defineProps<{
  listings: Listing[]
}>();
</script>
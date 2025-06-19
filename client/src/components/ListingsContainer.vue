
<template>
  <div class="listings-container">
    <div v-if="!listings.length" class="empty-message">
      Нет доступных объявлений
    </div>
    <div class="listings-grid">
      <ListingCard
         v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
        :can-book="canBook"
        :can-cancel="canCancel"
        @click="$emit('listing-click', listing.id)"
        @book="$emit('book', $event)"
        @cancel-booking="$emit('cancel-booking', $event)"
      />
    </div>  
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '@/types'
import ListingCard from '@/components/ListingCard.vue'

const props = defineProps<{
  listings: Listing[]
  canBook: boolean
  canCancel: boolean
}>()

const emit = defineEmits(['listing-click', 'book', 'cancel-booking'])
</script>

<style scoped>
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  min-height: 300px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>

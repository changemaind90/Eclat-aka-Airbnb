<template>
  <div class="listings-container">
    <div v-if="!listings.length" class="empty-message">
      Нет доступных объявлений
    </div>
    <div class="listings-grid">
      <ListingCard 
        v-for="listing in paginatedListings"
        :key="listing.id" :listing="listing"
        @click="$emit('listing-click', Number(listing.id))"      />
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Вперед</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Listing } from '@/types'
import ListingCard from '@/components/ListingCard.vue'

const props = defineProps<{
  listings: Listing[]
  itemsPerPage?: number
}>()

const emit = defineEmits<{
  (e: 'listing-click', id: number): void
}>()

const currentPage = ref(1)
const itemsPerPage = computed(() => props.itemsPerPage || 10)

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return props.listings.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => 
  Math.ceil(props.listings.length / itemsPerPage.value)
)

const prevPage = () => currentPage.value--
const nextPage = () => currentPage.value++
</script>

<style scoped>
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>

<template>
  <div class="listing-card" @click="$emit('click')">
    <img 
      :src="listing.images?.length ? listing.images[0] : '/default-image.jpg'"
      @error="handleImageError" 
      alt="Изображение объявления"
      class="listing-image"
    >
    <div class="listing-details">
      <h3>{{ listing.title }}</h3>
      <p class="price">{{ formattedPrice }} ₽ / ночь</p>
      <p class="location">{{ listing.city }}, {{ listing.address }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Listing } from '@/types'

const props = defineProps<{
  listing: Listing
}>()

const formattedPrice = computed(() => 
  new Intl.NumberFormat('ru-RU').format(props.listing.price)
)

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = '/default-image.jpg'
}
</script>

<style scoped>
.listing-card {
  border: 2px solid #000000;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.listing-card:hover {
  transform: translateY(-2px);
}

.listing-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.listing-details {
  padding: 12px;
}

.listing-details h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.price {
  color: #ff5a5f;
  font-weight: bold;
  margin: 4px 0;
}

.location {
  color: #666;
  font-size: 14px;
  margin: 4px 0;
}
</style>
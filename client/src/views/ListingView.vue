<template>
  <div v-if="loading" class="loading">Загрузка...</div>
  <div v-else-if="listing">
    <div class="gallery">
      <img 
        v-for="(image, index) in listing.images" 
        :key="index" 
        :src="image" 
        :alt="`Фото ${index + 1}`"
      >
    </div>
    <div class="details">
      <h1>{{ listing.title }}</h1>
      <p class="price">{{ formattedPrice }} ₽ / ночь</p>
      <p class="location">{{ listing.city }}, {{ listing.address }}</p>
      <p class="description">{{ listing.description }}</p>
    </div>
  </div>
  <div v-else class="error">
    Объявление не найдено
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import type { Listing } from '@/types'

const route = useRoute()
const store = useListingsStore()
const listing = ref<Listing | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const id = route.params.id.toString()
    const result = await store.fetchById(id)
    listing.value = result // Получаем результат из store
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  } finally {
    loading.value = false
  }
})

const formattedPrice = computed(() => 
  listing.value ? new Intl.NumberFormat('ru-RU').format(listing.value.price) : '0'
)
</script>

<style scoped>
.loading, .error {
  text-align: center;
  padding: 40px;
}

.gallery img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
}

.details {
  padding: 20px;
}

.price {
  color: #ff5a5f;
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.location {
  color: #666;
  margin-bottom: 20px;
}

.description {
  line-height: 1.6;
}
</style>


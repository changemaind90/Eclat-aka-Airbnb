
<template>
  <div class="home-view">
    <H1Title />

    <div v-if="loading">Загрузка объявлений...</div>
    <div v-else-if="error">{{ error }}</div>

   <ListingsContainer 
    :listings="listings"
    :can-book="authStore.isAuthenticated"
    :can-cancel="false" 
    @listing-click="goToListing"
  />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'
import type { Listing } from '@/types'
import H1Title from '@/components/H1Title.vue'
import ListingsContainer from '@/components/ListingsContainer.vue'

const authStore = useAuthStore()
const router = useRouter()
const listingsStore = useListingsStore()
const loading = ref(true)
const error = ref<string | null>(null)
const listings = ref<Listing[]>([])

onMounted(async () => {
  try {
    await listingsStore.fetchAllListings()
    listings.value = listingsStore.allListings
  } catch (e) {
    error.value = 'Ошибка загрузки объявлений'
    console.error(e)
  } finally {
    loading.value = false
  }
})

const goToListing = (id: number) => {
  router.push(`/listing/${id}`)
}
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 200px);
}
</style>
<template>
  <div class="home-view">
    <H1Title />
    <div v-if="loading">Загрузка объявлений...</div>
    <div v-else-if="error">{{ error }}</div>
    <ListingsContainer 
      :listings="filteredListings"
      @listing-click="goToListing" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import H1Title from '@/components/H1Title.vue'
import ListingsContainer from '@/components/ListingsContainer.vue'

const router = useRouter()
const store = useListingsStore()
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    await store.fetchAllListings()
  } catch (e) {
    error.value = 'Ошибка загрузки объявлений'
    console.error(e)
  } finally {
    loading.value = false
  }
})

const filteredListings = computed(() => store.allListings)

const goToListing = (id: number) => {
  router.push(`/listing/${id}`) }
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 200px);
}
</style>
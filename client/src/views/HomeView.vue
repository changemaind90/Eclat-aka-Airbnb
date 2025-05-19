<template>
  <div class="home-view">
    <H1Title />
    <ListingsContainer 
      :listings="filteredListings"
      @listing-click="goToListing" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import H1Title from '@/components/H1Title.vue'
import ListingsContainer from '@/components/ListingsContainer.vue'

const router = useRouter()
const store = useListingsStore()

onMounted(() => { store.fetchAllListings().catch(console.error) })

const filteredListings = computed(() => store.allListings)

const goToListing = (id: number) => {
  router.push(`/listing/${id}`) }
</script>

<style scoped>
.home-view {
  background: linear-gradient(135deg, #f5f0e6, #e8d9c5);
  padding: 2rem;
  min-height: calc(100vh - 400px);
}
</style>
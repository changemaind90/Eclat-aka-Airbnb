<template>
  <div class="profile-view">
    <div class="profile-inner">
      <UserInfo v-if="user" :user="user" />
      <UserListings :listings="userListings" />
      <CreateListingForm @submit="handleCreateListing" />
    </div></div>
</template>

<script setup lang="ts">
import { useAuthStore, useListingsStore } from '@/stores'
import { computed, onMounted } from 'vue'
import UserInfo from '@/components/UserInfo.vue'
import UserListings from '@/components/UserListings.vue'
import CreateListingForm from '@/components/CreateListingForm.vue'

const authStore = useAuthStore()
const listingsStore = useListingsStore()

const user = computed(() => authStore.user)

// Явно указываем тип DOM FormData
const handleCreateListing = async (listingData: HTMLFormElement | FormData) => {
  let formData: FormData;
  
  if (listingData instanceof HTMLFormElement) {
    formData = new FormData(listingData);
  } else {
    formData = listingData;
  }
  
  await listingsStore.createNewListing(formData);
  await listingsStore.fetchAllListings();
}

const userListings = computed(() => 
  listingsStore.allListings.filter(
    (listing) => listing.userId === Number(authStore.user?.id)
  )
)

onMounted(async () => {
  await authStore.checkAuth();
  await listingsStore.fetchAllListings();
})
</script>
<style>
.profile-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
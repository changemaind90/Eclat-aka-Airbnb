<template>
  <div class="profile-view">
    <div class="profile-inner">
      <UserInfo v-if="user" :user="user" />
      <div v-if="loading">Загрузка ваших бронирований...</div>
      <div v-else-if="error">{{ error }}</div>
      <div class="listings-container">
        <ListingCard
          v-for="listing in displayedListings"
          :key="listing.id"
          :listing="listing"
          :can-book="authStore.isAuthenticated"
          @book="handleBook"
          :can-cancel="authStore.isAuthenticated"
          :can-edit="
            authStore.user?.id !== undefined &&
            Number(authStore.user.id) === listing.userId
          "
          @edit="handleEdit"
          @click="goToListing(listing.id)"
          @cancel-booking="cancelBooking"
        />
      </div>
    </div>

    <CreateListingForm
      v-if="authStore.isAuthenticated"
      @success="handleUpdateSuccess"
      @cancel="editingListing = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch  } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, useListingsStore } from "@/stores";
import UserInfo from "@/components/UserInfo.vue";
import CreateListingForm from "@/components/CreateListingForm.vue";
import ListingCard from "@/components/ListingCard.vue";
import type { Listing } from "@/types";

const authStore = useAuthStore();
const listingsStore = useListingsStore();
const router = useRouter();

const loading = ref(false);
const error = ref<string | null>(null);
const bookings = ref<Listing[]>([]);
const userListings = ref<Listing[]>([]);
const editingListing = ref<Listing | null>(null);

const user = computed(() => authStore.user);

watch(() => authStore.user?.id, (newId) => {
  if (newId && !isNaN(newId)) {
    listingsStore.fetchUserListings();
  }
}, { immediate: true });

// Объединенные списки для отображения
const displayedListings = computed(() => [
  ...bookings.value,
  ...userListings.value,
]);

const goToListing = (id: number) => {
  router.push(`/listing/${id}`);
};

const handleBook = async (listingId: number) => {
  console.log('Booking initiated for:', listingId)
  try {
    console.log("Попытка забронировать:", listingId);
    await listingsStore.createBooking(listingId, {
      start: new Date().toISOString().split("T")[0],
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });
    console.log("Бронирование успешно");
  } catch (error) {
    console.error("Ошибка бронирования:", error);
  }
};

const handleEdit = (listing: Listing) => {
  editingListing.value = listing;
};

const handleUpdateSuccess = async () => {
  editingListing.value = null;
  await loadData();
};

const cancelBooking = async (bookingId: number) => {
  try {
    await listingsStore.cancelBooking(bookingId.toString());
    // Обновляем список броней
    await loadData();
  } catch (error: any) {
    error.value = "Ошибка отмены бронирования";
  }
};

const loadData = async () => {
  loading.value = true;
  try {
    await authStore.checkAuth();

    // Загружаем бронирования и объявления параллельно
    const bookingsData = await listingsStore.fetchUserBookings();
    const listingsData = await listingsStore.fetchUserListings(
      authStore.user?.id ? Number(authStore.user.id) : undefined
    );

    if (Array.isArray(bookingsData)) {
      bookings.value = bookingsData;
    }

    if (Array.isArray(listingsData)) {
      userListings.value = listingsData;
    }
  } catch (e) {
    error.value = "Ошибка загрузки данных";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadData();
});
</script>

<style>
.profile-inner {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}
</style>

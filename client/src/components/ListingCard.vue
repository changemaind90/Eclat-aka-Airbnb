
<template>
  <div class="listing-card" @click="$emit('click')">
    <img 
      :src="listing.images?.length ? listing.images[0] : '/default-image.jpg'"
      loading="lazy"
    >
    <div class="listing-details">
      <h3>{{ listing.title }}</h3>
      <p>{{ listing.pricePerNight }} ₽</p>
    </div>
     <button 
      v-if="canBook && !isBookedByCurrentUser && authStore.isAuthenticated"
      @click="handleBook"
      :disabled="isBookingInProgress"
      class="book-btn"
    >
      {{ isBookingInProgress ? 'Бронируем...' : 'Забронировать' }}
    </button>

    <button 
       v-if="isBookedByCurrentUser"
      @click="handleCancel"
      :disabled="isBookingInProgress"
    >
      {{ isBookingInProgress ? 'Отменяем...' : 'Отменить бронь' }}
    </button>

    <button v-if="canEdit" @click="$emit('edit', listing)">Редактировать</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useListingsStore } from '@/stores/listings'
import type { Listing } from "@/types";
const authStore = useAuthStore()
const listingsStore = useListingsStore()
const isBookingInProgress = ref(false)

const isBookedByCurrentUser = computed(() => {
  return listingsStore.userBookings.some(
    booking => booking.listingId === props.listing.id
  )
})
const handleBook = async (e: Event) => {
  e.stopPropagation();
  isBookingInProgress.value = true;
  try {
    await listingsStore.createBooking(props.listing.id, {
      start: new Date().toISOString().split('T')[0],
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],    });
    emit('book'); 
  } catch (error) {
    console.error("Booking error:", error);
  } finally {
    isBookingInProgress.value = false;
  }
};

const handleCancel = async (e: Event) => {
  e.stopPropagation()
  isBookingInProgress.value = true
  try {
    await listingsStore.cancelBooking(props.listing.id.toString())
    emit('cancel-booking')
  } catch (error) {
    console.error("Cancel error:", error)
  } finally {
    isBookingInProgress.value = false
  }
};
const props = defineProps({
  listing: {
    type: Object as () => Listing,
    required: true
  },
  canBook: Boolean,
  canCancel: Boolean,
  canEdit: Boolean
})
const emit = defineEmits(['book', 'cancel-booking', 'click', 'edit'])

</script>

<style scoped>
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  min-height: 300px;
  contain: strict;
}

.listing-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.listing-card {
  transition: 
    box-shadow 0.2s ease-out,
    transform 0.2s ease-out; /* Только нужные свойства */
  contain: paint;
}
/* Анимация кнопок */
.book-btn, .cancel-btn {
  transition: 
    opacity 0.3s ease,
    transform 0.2s ease;
}
button:disabled {
  opacity: 0.7;
  transform: scale(0.98);
}

/* Убираем скачки при изменении состояния */
.listing-card.loading {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.95; }
  50% { opacity: 0.8; }
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
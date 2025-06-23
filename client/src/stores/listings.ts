import { defineStore } from "pinia";
import api from "@/api";
import type {Booking, Listing} from "@/types";
import { useAuthStore } from "@/stores/auth";

export const useListingsStore = defineStore("listings", {
  state: () => ({
    allListings: [] as Listing[],
    userListings: [] as Listing[],
    currentListing: null as Listing | null,
    isLoading: false,
    error: null as string | null,
    // add 13 06 25
    listings: [] as Listing[],
    loadingStates: new Map<number, boolean>(),
    // add 190625 
    userBookings: [] as Booking[],
  }),

  actions: {
    async fetchUserListings(_userId?: number) {
      try {
        this.isLoading = true;
        const authStore = useAuthStore();
         if (!authStore.user?.id || isNaN(authStore.user.id)) {
            throw new Error("User ID не доступен или невалиден");
          }
        const response = await api.get(`/listings`);
        this.userListings = response.data;
				return response.data
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        this.error = "Ошибка загрузки объявлений пользователя";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAllListings() {
      try {
        this.isLoading = true;
        const response = await api.get("/listings/all");
        this.allListings = response.data;
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        this.error = "Ошибка загрузки всех объявлений";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserBookings() {
      try {
        const response = await api.get('/booking')
        this.userBookings = response.data
      } catch (error) {
        console.error("Ошибка загрузки бронирований:", error)
      }
    },

    async fetchById(id: string): Promise<Listing> {
      this.isLoading = true;
      try {
        const response = await api.get(`/listings/${id}`);
        this.currentListing = response.data;
        return response.data;
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        this.error = "Объявление не найдено";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteListing(id: string) {
      try {
        await api.delete(`/listings/${id}`);
      } catch (error) {
        console.error("Error deleting listing:", error);
        throw error;
      }
    },

    async updateListing(id: string, data: Partial<Listing>): Promise<Listing> {
      try {
        const authStore = useAuthStore();
        // Проверяем, что пользователь владелец
        const listing = this.userListings.find((l) => l.id === Number(id));
        if (!listing || listing.userId !== Number(authStore.user?.id)) {
          throw new Error(
            "Вы не можете редактировать объявление потому что вы его не подавали!"
          );
        }

        const response = await api.patch(`/listings/${id}`, data);
        return response.data;
      } catch (error) {
        console.error("Error updating listing:", error);
        throw error;
      }
    },

    async createBooking(listingId: number, dates: { start: string; end: string }) {
        try {
       /*  const authStore = useAuthStore()
        if (!authStore.user?.id) throw new Error("Требуется авторизация") */
        
        const response = await api.post('/booking', {
          listingId,
          startDate: dates.start,
          endDate: dates.end
        })

        /* console.log("Данные для брони:", {
          listingId: typeof listingId,
          startDate: dates.start,      
          endDate: dates.end,          
          userId: typeof authStore.user.id  
        }); */

        console.log("Данные для брони:", {
          listingId: typeof listingId,
          startDate: dates.start,      
          endDate: dates.end,
        });
        return response.data
      } catch (error) {
        console.error("Ошибка бронирования:", error)
        throw error
      }
    },

    async cancelBooking(bookingId: number) {
      try {
        const response = await api.post(`/booking/cancel/${bookingId}`);
        console.log("Отмена брони:", response.data);
        await this.fetchUserBookings()
        return response.data;
      } catch (error: any) {
        console.error("Ошибка отмены:", error.response?.data || error.message);
        throw error;
      }
    },

    async createNewListing(listingData: {
      title: string;
      description: string;
      address: string;
      pricePerNight: number;
      numberOfGuests: number;
    }): Promise<Listing> {
      this.isLoading = true;
      try {
        const authStore = useAuthStore();

        if (!authStore.user) {
          throw new Error("Пользователь не авторизован");
        }

        this.isLoading = true
        const response = await api.post("/listings", listingData)
        this.userListings.push(response.data)
        return response.data
      } catch (error) {
        console.error("Ошибка создания:", error);
        this.error = "Ошибка создания объявления";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

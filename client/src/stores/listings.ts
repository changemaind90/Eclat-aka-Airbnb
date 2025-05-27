import { defineStore } from 'pinia'
import api from '@/api'
import type { Listing } from '@/types'

export const useListingsStore = defineStore('listings', {
  state: () => ({
    allListings: [] as Listing[],
    userListings: [] as Listing[],
    currentListing: null as Listing | null,
    isLoading: false,
    error: null as string | null }),
  
  actions: {
    async fetchUserListings(userId: string) {
    this.isLoading = true
    try {
      // Замените на реальный API-запрос
      this.userListings = this.allListings.filter(l => l.userId === userId)
    } catch (error) {
      console.error('Ошибка загрузки:', error)
    } finally {
      this.isLoading = false } },

    /* async fetchAllListings() {
      this.isLoading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
        const data = await response.json()
        
        this.allListings = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.title, // Добавлено
          price: Math.floor(Math.random() * 10000) + 1000,
          address: `ул. Примерная, ${item.id}`,
          city: ['Москва', 'Санкт-Петербург', 'Сочи'][Math.floor(Math.random() * 3)],
          bedrooms: Math.floor(Math.random() * 3) + 1,
          bathrooms: Math.floor(Math.random() * 2) + 1,
          amenities: ['Wi-Fi', 'TV', 'Кондиционер'].slice(0, Math.floor(Math.random() * 3) + 1),
          images: [item.url, item.thumbnailUrl],
          userId: item.albumId,
          createdAt: new Date().toISOString() }))
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally { this.isLoading = false } }, */

      async fetchAllListings() {
        try {
          this.loading = true
          const response = await api.get('/booking/api/listings')
          this.allListings = response.data
        } finally {
          this.loading = false
        }
      },
      async createNewListing(formData: FormData) {
        try {
          this.loading = true
          const response = await api.post('/booking/api/listings', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return response.data
        } finally {
          this.loading = false
        }
      },

    async fetchById(id: number): Promise<Listing> {
      this.isLoading = true
      try {
        const listing = this.allListings.find(item => item.id === id)
        if (!listing) throw new Error('Объявление не найдено')
        
        this.currentListing = listing
        return listing
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Ошибка загрузки'
        throw err
      } finally { this.isLoading = false } } ,

    async createNewListing(listingData: FormData) {
      try {
        this.isLoading = true
        const { data: newListing } = await api.post('/listings', listingData)
        this.allListings.push(newListing)
      } catch (error) { this.error = 'Ошибка создания объявления'
      } finally { this.isLoading = false } } } })
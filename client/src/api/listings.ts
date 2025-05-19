import { defineStore } from 'pinia'

export const useListingsStore = defineStore('listings', {
  state: () => ({
    allListings: [] as any[],
    isLoading: false
  }),
  actions: {
    async fetchAllListings() {
      this.isLoading = true
      try {
        // Используем бесплатный API для тестовых данных
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
        const data = await response.json()
        
        this.allListings = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.url,
          price: Math.floor(Math.random() * 10000) + 1000,
          location: ['Москва', 'Санкт-Петербург', 'Сочи'][Math.floor(Math.random() * 3)]
        }))
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchById(id: number) {
      try {
        // Сначала проверяем в локальном хранилище
        const localListing = this.allListings.find(item => item.id === id)
        if (localListing) return localListing
        
        // Если нет локально, делаем запрос к API
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
        if (!response.ok) throw new Error('Объявление не найдено')
        
        const data = await response.json()
        return {
          id: data.id,
          title: data.title,
          image: data.url,
          price: Math.floor(Math.random() * 10000) + 1000,
          location: ['Москва', 'Санкт-Петербург', 'Сочи'][Math.floor(Math.random() * 3)]
        }
      } catch (error) {
        console.error('Ошибка при загрузке объявления:', error)
        throw error
      }
    }
  }
})
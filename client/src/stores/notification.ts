import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Array<{
      id: number
      message: string
      type: 'success' | 'error' | 'info'
    }>
  }),
  actions: {
    add(message: string, type: 'success' | 'error' | 'info' = 'info') {
      this.notifications.push({
        id: Date.now(),
        message,
        type
      })
      setTimeout(() => {
        this.remove(this.notifications.length - 1)
      }, 3000)
    },
    remove(index: number) {
      this.notifications.splice(index, 1)
    }
  }
})
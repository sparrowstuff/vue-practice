import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthorized = ref(false)

  return { isAuthorized }
})

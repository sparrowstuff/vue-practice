import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthorized = ref(localStorage.getItem('auth_info') === 'true')

  const login = () => {
    isAuthorized.value = true
    localStorage.setItem('auth_info', true)
  }

  const logout = () => {
    isAuthorized.value = false
    localStorage.removeItem('auth_info')
  }

  return { isAuthorized, login, logout }
})

import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from './auth'
import getPosts from '@/api/getPosts'

export const usePostsStore = defineStore('posts', () => {
  const allPosts = ref([])
  const isLoading = ref(false)

  const fetchPosts = async () => {
    isLoading.value = true

    try {
      const data = await getPosts()
      allPosts.value = data || []
    } catch (error) {
      console.error('Failed to add posts to store', error)
      allPosts.value = []
    } finally {
      isLoading.value = false
    }
  }

  return { allPosts, fetchPosts, isLoading }
})

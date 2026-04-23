import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from './auth'
import getPosts from '@/api/getPosts'

export const usePostsStore = defineStore('posts', () => {
  const allPosts = ref([])
  const isLoading = ref(false)
  const newPost = {
    title: String,
    description: String,
    hashtags: Array,
    likes: Number,
    dislikes: Number,
  }

  const fetchPosts = async () => {
    isLoading.value = true

    try {
      const savedPosts = localStorage.getItem('posts-list')

      if (savedPosts) {
        allPosts.value = JSON.parse(savedPosts)
      } else {
        const data = await getPosts()
        allPosts.value = data || []

        localStorage.setItem('posts-list', JSON.stringify(allPosts.value))
      }
    } catch (error) {
      console.error('Failed to add posts to store', error)
      allPosts.value = []
    } finally {
      isLoading.value = false
    }
  }

  const addPost = (post) => {
    allPosts.value.unshift(post)

    localStorage.setItem('posts-list', JSON.stringify(allPosts.value))
  }

  return { allPosts, fetchPosts, isLoading, addPost }
})

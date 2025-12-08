import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useBasketStore = defineStore('basket', () => {
  const booksInBasket = ref([])

  const { isAuthorized } = storeToRefs(useAuthStore())

  const addInBasket = (book) => {
    if (isAuthorized.value) {
      if (booksInBasket.value.some((el) => el.id === book.id)) {
        booksInBasket.value = booksInBasket.value.filter((el) => el.id !== book.id)
      } else booksInBasket.value.push(book)
    }
  }

  // const basketItems = computed(() => booksInBasket.value.length)

  return { addInBasket, booksInBasket }
})

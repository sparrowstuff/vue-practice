import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useBasketStore = defineStore('basket', () => {
  const productsInBasket = ref([])

  const { isAuthorized } = storeToRefs(useAuthStore())

  const addInBasket = (product) => {
    if (isAuthorized.value) {
      if (productsInBasket.value.some((el) => el.id === product.id)) {
        productsInBasket.value = productsInBasket.value.filter((el) => el.id !== product.id)
      } else productsInBasket.value.push(product)
    }
  }

  const isInBasket = (productId) => {
    return productsInBasket.value.some((el) => el.id === productId)
  }

  const removeFromBasket = (productId) => {
    if (isAuthorized.value) {
      productsInBasket.value = productsInBasket.value.filter((el) => el.id !== productId)
    }
  }

  return { addInBasket, productsInBasket, isInBasket, removeFromBasket }
})

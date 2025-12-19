import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
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

  const totalBasketPrice = computed(() => {
    if (productsInBasket.value.length === 0) return 0

    return productsInBasket.value.reduce((total, product) => {
      const price = Number(product.price) || 0
      return total + price
    }, 0)
  })

  return { addInBasket, productsInBasket, isInBasket, removeFromBasket, totalBasketPrice }
})

import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from './auth'

export const useBasketStore = defineStore('basket', () => {
  const savedProducts = localStorage.getItem('basket_products')
  const productsInBasket = ref(savedProducts ? JSON.parse(savedProducts) : [])

  const { isAuthorized } = storeToRefs(useAuthStore())

  watch(
    productsInBasket,
    (newBasket) => {
      localStorage.setItem('basket_products', JSON.stringify(newBasket))
    },
    { deep: true },
  )

  const addInBasket = (product) => {
    if (!isAuthorized) return

    if (isAuthorized.value) {
      if (productsInBasket.value.some((el) => el.id === product.id)) {
        productsInBasket.value = productsInBasket.value.filter((el) => el.id !== product.id)
      } else {
        productsInBasket.value.push(product)

        localStorage.setItem('basket_products', JSON.stringify([productsInBasket.value]))
      }
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

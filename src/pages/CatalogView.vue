<template>
  <HeaderLayout />
  <h2 class="Catalog" style="margin-bottom: 1.12rem">Catalog</h2>
  <div class="catalog-inputs">
    <div class="custom-input">
      <label for="sort" class="custom-input__label">Что вас интересует?</label>
      <input type="text" id="sort" class="custom-input__input" placeholder="" />
    </div>
  </div>
  <div class="catalog">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import HeaderLayout from '@/components/HeaderLayout.vue'
import getProducts from '@/api/products'
import ProductCard from '@/components/ProductCard.vue'
import { ref } from 'vue'

const products = ref([])

const loadData = async () => {
  const data = await getProducts()
  products.value = data
}

loadData()

const props = defineProps({
  products: Array,
})
</script>

<style scoped>
h2 {
  font-size: 2rem;
  line-height: 100%;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
}

.catalog-inputs {
  margin-bottom: 1.12rem;
}
</style>

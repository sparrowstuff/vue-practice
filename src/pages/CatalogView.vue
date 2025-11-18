<template>
  <h2 class="Catalog" style="margin-bottom: 1.12rem">Catalog</h2>
  <div class="catalog-inputs">
    <div class="custom-input">
      <label for="sort" class="custom-input__label">Что вас интересует?</label>
      <input
        type="text"
        id="sort"
        class="custom-input__input"
        placeholder="Поиск"
        v-model="searchText"
      />
    </div>
  </div>
  <div class="catalog">
    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
  </div>
  <div v-if="filteredProducts.length === 0 && products.length > 0">
    Ничего не найдено по запросу {{ searchText }}
  </div>
</template>

<script setup>
import getProducts from '@/api/products'
import ProductCard from '@/components/ProductCard.vue'
import { ref, watch, computed, onMounted } from 'vue'

const products = ref([])
const searchText = ref('')

const loadData = async () => {
  const data = await getProducts()
  products.value = data
}

onMounted(() => {
  loadData()
})

const filteredProducts = computed(() => {
  if (!searchText.value.trim()) {
    return products.value
  }

  // ✅ Исправленная фильтрация
  const searchLower = searchText.value.toLowerCase()
  return products.value.filter((product) => product.title.toLowerCase().includes(searchLower))
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

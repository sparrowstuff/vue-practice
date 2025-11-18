<template>
  <div class="catalog">
    <h2 class="catalog__title" style="margin-bottom: 1.12rem">Catalog</h2>
    <div class="catalog__inputs">
      <div class="custom-input">
        <label for="searchTitle" class="custom-input__label">Название: </label>
        <input
          type="text"
          id="searchTitle"
          class="custom-input__input"
          placeholder="Поиск"
          v-model="searchText"
        />
      </div>
      <div class="custom-input">
        <label for="searchMin" class="custom-input__label">Цена&nbsp;от: </label>
        <input
          type="number"
          min="1"
          max="100"
          id="searchMin"
          class="custom-input__input"
          placeholder="$"
          v-model="searchMin"
        />
      </div>
      <div class="custom-input">
        <label for="searchMax" class="custom-input__label">Цена&nbsp;до: </label>
        <input
          type="number"
          min="1"
          max="100"
          id="searchMax"
          class="custom-input__input"
          placeholder="$"
          v-model="searchMax"
        />
      </div>
    </div>
    <div class="catalog__cards-block">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
    <div v-if="filteredProducts.length === 0 && products.length > 0">
      Ничего не найдено по запросу {{ searchText }}
    </div>
  </div>
</template>

<script setup>
import getProducts from '@/api/products'
import ProductCard from '@/components/ProductCard.vue'
import { ref, watch, computed, onMounted } from 'vue'

const products = ref([])
const searchText = ref('')
const searchMin = ref('')
const searchMax = ref('')

const loadData = async () => {
  const data = await getProducts()
  products.value = data
}

onMounted(() => {
  loadData()
})

const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchText.value) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  }

  if (searchMin.value) {
    filtered = filtered.filter((product) => product.price >= Number(searchMin.value))
  }

  if (searchMax.value) {
    filtered = filtered.filter((product) => product.price <= Number(searchMax.value))
  }

  return filtered
})
</script>

<style scoped>
h2 {
  font-size: 2rem;
  line-height: 100%;
}

.catalog__inputs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.62rem;
  width: 100%;
  margin-bottom: 1.12rem;
}

.catalog__cards-block {
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
}
.custom-input {
  max-width: 200px;
  width: 100%;

  position: relative;
}

.custom-input__label {
  position: absolute;
  top: -34%;
  left: 3%;
  font-size: 1rem;
  padding: 0.2rem 0.4rem 0.2rem 0.2rem;
  border-radius: 5%;
  background-color: white;
  display: block;
  color: aqua;

  transition:
    transform 0.3s ease-in,
    scale 0.3s ease-in,
    color 0.3s ease-in;
}

.custom-input:hover .custom-input__label,
.custom-input:focus-within .custom-input__label,
.custom-input:active .custom-input__label {
  scale: 0.9;
  color: black;
}

.custom-input__input {
  width: 100%;
  height: 2.5rem;
  padding: 0.4rem 0.3rem 0.1rem 0.3rem;
  border: unset;
  border-radius: 0.5rem;
  outline: 2px solid aqua;
}
.custom-input__input::placeholder {
  font-size: 1.1rem;
}
</style>

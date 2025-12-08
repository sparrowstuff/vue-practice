<template>
  <div class="catalog">
    <div class="catalog__title-block">
      <h2 class="catalog__title">Catalog</h2>
      <button
        class="catalog__auth-btn"
        :class="{ 'catalog__auth-btn--active': auth.isAuthorized }"
        @click="authorize"
      >
        {{ auth.isAuthorized ? 'Выйти' : 'Авторизоваться' }}
      </button>
    </div>
    <div class="catalog__inputs" :class="{ 'catalog__inputs--active': auth.isAuthorized }">
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
    <div class="catalog__favorites">
      <span class="catalog__fav-names"></span>
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
import { useAuthStore } from '@/stores/auth'

const products = ref([])
const searchText = ref('')
const searchMin = ref('')
const searchMax = ref('')
const auth = useAuthStore()

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

const authorize = computed(() => {
  auth.isAuthorized = !auth.isAuthorized
})
</script>

<style scoped>
h2 {
  font-size: 2rem;
  line-height: 100%;
  margin: unset;
}

.catalog__title-block {
  display: flex;
  align-items: center;
  gap: 0.62rem;
  margin-bottom: 1.62rem;
}

.catalog__inputs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.62rem;
  width: 100%;
  margin-bottom: 1.12rem;
  filter: blur(5px);
  pointer-events: none;
}

.catalog__inputs--active {
  filter: unset;
  pointer-events: all;
}

.catalog__cards-block {
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
}

.catalog__auth-btn {
  padding: 0.5rem 0.62rem;
  border-radius: 0.8rem;
  background-color: transparent;
  border: 2px solid aqua;

  transition:
    color 0.3s ease-in,
    box-shadow 0.3s ease-in;
}

.catalog__auth-btn:hover,
.catalog__auth-btn:focus-visible {
  color: aqua;
  box-shadow: 2px 2px 2px 0 black;
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

<template>
  <div class="catalog">
    <div class="catalog__title-block">
      <h2 class="catalog__title">Каталог товаров</h2>
      <button
        class="catalog__show-filters-btn btn"
        type="button"
        @click="showFiltersMenu = !showFiltersMenu"
      >
        Фильтры
      </button>
    </div>

    <div
      class="catalog__inputs"
      v-show="!showFiltersMenu"
      :class="{ 'catalog__inputs--active': auth.isAuthorized }"
    >
      <div class="custom-input" :class="{ 'has-value': hasSearchText }">
        <label for="searchTitle" class="custom-input__label">Название: </label>
        <input type="text" id="searchTitle" class="custom-input__input" v-model="searchText" />
      </div>
      <div class="custom-input" :class="{ 'has-value': hasSearchMinPrice }">
        <label for="searchMin" class="custom-input__label">Цена&nbsp;от ($): </label>
        <input
          type="number"
          min="1"
          max="100"
          id="searchMin"
          class="custom-input__input"
          v-model="searchMin"
        />
      </div>
      <div class="custom-input" :class="{ 'has-value': hasSearchMaxPrice }">
        <label for="searchMax" class="custom-input__label">Цена&nbsp;до ($): </label>
        <input
          type="number"
          min="1"
          max="100"
          id="searchMax"
          class="custom-input__input"
          v-model="searchMax"
        />
      </div>
      <div class="custom-select">
        <label for="selectCategory" class="custom-select__label">Выберите&nbsp;категорию: </label>
        <select
          class="custom-select__select"
          name="categories"
          id="selectCategory"
          v-model="selectCategories"
        >
          <option
            v-for="category in categories"
            :key="category.value"
            :value="category.value"
            class="custom-select__option"
          >
            {{ category.label }}
          </option>
        </select>
      </div>
      <button class="custom-select__reset-btn btn" @click="resetSelection">Сбросить фильтры</button>
    </div>

    <Transition name="loading" mode="out-in">
      <div class="catalog__loading" v-if="isLoading" key="loading">
        <img class="catalog__loader" src="/loading.gif" alt="loading" width="200" height="200" />
      </div>
      <TransitionGroup class="catalog__cards-block" v-else key="products" name="list" tag="div">
        <ProductCard
          v-if="filteredProducts.length !== 0"
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          class="product-card"
        />
      </TransitionGroup>
    </Transition>
    <Transition name="fade">
      <div
        v-if="!isLoading && filteredProducts.length === 0 && products.length > 0"
        class="catalog__no-results"
      >
        Ничего не найдено по запросу "{{ searchText || searchMin || searchMax }}"
      </div>
    </Transition>
  </div>
</template>

<script setup>
import getProducts from '@/api/products'
import ProductCard from '@/components/ProductCard.vue'
import { ref, watch, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBasketStore } from '@/stores/basket'

const products = ref([])
const searchText = ref('')
const searchMin = ref('')
const searchMax = ref('')
const auth = useAuthStore()
const basket = useBasketStore()
const isLoading = ref(true) // флаг загрузки
const showFiltersMenu = ref(true)
const selectCategories = ref([])

const categories = [
  { value: 'beauty', label: 'Красота' },
  { value: 'fragrances', label: 'Духи' },
  { value: 'furniture', label: 'Мебель' },
  { value: 'groceries', label: 'Продукты' },
]

const resetSelection = () => {
  selectCategories.value = ''
  searchText.value = ''
  searchMin.value = ''
  searchMax.value = ''
}

const hasSearchText = computed(() => {
  return searchText.value.trim() !== ''
})

const hasSearchMinPrice = computed(() => {
  return searchMin.value !== ''
})

const hasSearchMaxPrice = computed(() => {
  return searchMax.value !== ''
})

const loadData = async () => {
  isLoading.value = false
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

  if (selectCategories.value === 'beauty') {
    filtered = filtered.filter((product) => product.category.includes(selectCategories.value))
  }

  if (selectCategories.value.length > 0) {
    filtered = filtered.filter((product) => selectCategories.value.includes(product.category))
  }

  return filtered
})

watch([searchText, searchMin, searchMax], () => {
  const timer = setTimeout(() => {}, 50)

  return () => {
    clearTimeout(timer)
  }
})
</script>

<style scoped lang="scss">
h2 {
  font-size: 2rem;
  line-height: 100%;
  margin: unset;
}

.catalog {
  &__title-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.62rem;
    margin-bottom: 1.62rem;
  }

  &__basket {
    display: flex;
    flex-wrap: wrap;
    gap: 0.62rem;
  }

  &__chosen-product {
    max-width: 6.25rem;
    padding: 0.62rem;
    border: 1px solid aqua;
    border-radius: 0.8rem;

    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: flex-start;
  }

  &__chosen-title,
  &__chosen-price {
    font-size: 0.8rem;
  }

  &__chosen-options {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 100%;
  }

  &__remove-btn {
    border-radius: 0.5rem;
  }

  &__inputs {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.62rem;
    width: 100%;
    margin-bottom: 1.12rem;
    filter: blur(5px);
    pointer-events: none;

    transition: filter 0.3s ease-in;

    @media (max-width: 37.5rem) {
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  &__no-results {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 0.5rem;
    margin-top: 2rem;
  }

  &__inputs--active {
    filter: unset;
    pointer-events: all;
  }

  &__cards-block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: 64rem) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 48.25rem) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.62rem;
    }

    @media (max-width: 37.5rem) {
      grid-template-columns: 1fr;
      row-gap: 0.62rem;
    }
  }

  &__loader {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }
}

.custom-input {
  max-width: 12.5rem;
  width: 100%;
  position: relative;
  $root: &;

  @media (max-width: 37.5rem) {
    max-width: unset;
  }

  &:hover,
  &:focus-visible,
  &:focus-within,
  &:active {
    #{$root}__label {
      color: black;
      transform: translateY(-80%);
    }
  }

  &.has-value {
    #{$root}__label {
      color: black;
      transform: translateY(-80%);
    }
  }

  &__label {
    position: absolute;
    top: 20%;
    left: 3%;
    font-size: 1rem;
    padding: 0.2rem 0.4rem 0.2rem 0.2rem;
    border-radius: 5%;
    background-color: white;
    display: block;
    color: aqua;

    transition:
      transform 0.3s ease-in,
      color 0.3s ease-in;
  }

  &__input {
    width: 100%;
    height: 2.5rem;
    padding: 0.4rem 0.3rem 0.1rem 0.3rem;
    border: unset;
    border-radius: 0.5rem;
    outline: 2px solid aqua;

    &::placeholder {
      font-size: 1.1rem;
    }
  }
}

.custom-select {
  max-width: 12.5rem;
  width: 100%;
  position: relative;
  $root: &;

  &:hover,
  &:focus-visible {
    #{$root}__label {
      color: black;
    }
  }

  &__label {
    position: absolute;
    top: -29%;
    left: 5%;
    font-size: 1rem;
    color: aqua;
    padding: 0.2rem 0.4rem 0.2rem 0.2rem;
    border-radius: 5%;
    background-color: white;
    pointer-events: none;
    transition: color 0.3s ease-in;
  }

  &__select {
    width: 100%;
    height: 2.5rem;

    border: unset;
    outline: 1px solid aqua;
    border-radius: 0.5rem;
    padding: 0.3rem 0.3rem 0.1rem 0.3rem;
    color: aqua;
  }

  &__option {
    color: aqua;
  }

  &__reset-btn {
    margin-left: auto;
  }
}

// анимационные стили
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.list-leave-active {
  position: absolute;
}

.list-move {
  transition: transform 0.3s ease;
}

// анимация появления/исчезновения
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// анимация загрузки
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

// стили для карточек товара с анимацией
.product-card {
  transition: all 0.3s ease;
}
</style>

<template>
  <div class="catalog">
    <div class="catalog__title-block">
      <h2 class="catalog__title">Каталог товаров</h2>
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
      <ProductCard
        v-if="filteredProducts.length !== 0"
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        class="product-card"
      />
      <img
        class="catalog__loader"
        v-else
        src="../../public/loading.gif"
        alt="loading"
        width="200"
        height="200"
      />
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
import { useBasketStore } from '@/stores/basket'

const products = ref([])
const searchText = ref('')
const searchMin = ref('')
const searchMax = ref('')
const auth = useAuthStore()
const basket = useBasketStore()

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

const removeFromBasket = (productId) => {
  basket.removeFromBasket(productId)
}
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
  &:active {
    #{$root}__label {
      scale: 0.9;
      color: black;
    }
  }

  &__label {
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
</style>

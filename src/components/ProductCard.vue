<template>
  <article class="product-card">
    <div class="product-card__main">
      <div class="product-card__main-info">
        <picture class="product-card__picture">
          <source type="webp" :srcset="product.images[0]" />
          <img
            class="product-card__img"
            :src="product.images[0]"
            :alt="product.title"
            width="200"
            height="200"
          />
        </picture>
        <div class="product-card__text-block">
          <h2 class="product-card__title">{{ product.title }}</h2>
          <p class="product-card__description">{{ product.description }}</p>
        </div>
      </div>
      <div class="product-card__all-info">
        <div class="product-card__inner-info">
          <span class="product-card__price"
            >Цена: <span class="product-card__price-number">{{ product.price }}&nbsp;$</span></span
          >
          <span class="product-card__rating"
            >Рейтинг: <span class="product-card__rating-number">{{ product.rating }}</span></span
          >
        </div>
        <div class="product-card__additional-info">
          <span class="product-card__stock"
            >В наличии:
            <span
              ><b>{{ product.stock }}</b
              >&nbsp;шт.</span
            ></span
          >
          <span class="product-card__warranty"
            ><b>{{ product.warrantyInformation }}</b></span
          >
          <span class="product-card__category"
            >Категория: <b>{{ product.category }}</b></span
          >
          <span class="product-card__discount"
            >Скидка дня: <b>{{ product.discountPercentage }}</b
            >%</span
          >
        </div>
      </div>
      <div class="product-card__btn-block">
        <button class="product-card__info-btn btn" type="button" @click="goToDetailedProduct">
          Подробнее
        </button>
        <button
          class="product-card__basket-btn btn"
          :class="[{ 'btn--notActive': !auth.isAuthorized }, { 'btn--active': productInBasket }]"
          type="button"
          @click="addInBasket"
        >
          <img
            class="product-card__delete-icon"
            :class="{ 'product-card__delete-icon-active': !basketBtnTextAppearance }"
            src="../svg/delete-icon.svg"
            alt="Delete-icon"
            width="20"
            height="20"
          />
          <span
            class="product-card__basket-btn-text"
            :class="{ 'product-card__basket-btn-text-notActive': !basketBtnTextAppearance }"
            >В корзину</span
          >
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import { useBasketStore } from '@/stores/basket'
import { useAuthStore } from '@/stores/auth'
import router from '@/router/router'

const basketStore = useBasketStore()
const auth = useAuthStore()
let basketBtnTextAppearance = ref(true)

const props = defineProps({
  product: Object,
})

const addInBasket = () => {
  basketBtnTextAppearance = !basketBtnTextAppearance
  basketStore.addInBasket(props.product)
}

const productInBasket = computed(() => {
  return basketStore.isInBasket(props.product.id)
})

const goToDetailedProduct = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<style scoped lang="scss">
.product-card {
  min-height: 12.5rem;
  border-radius: 0.5rem;
  outline: 1px solid aqua;
  overflow: hidden;

  &__main {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    align-items: flex-start;
    padding: 0.62rem;
    height: 100%;
  }

  &__main-info {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;

    @media (max-width: 37.5rem) {
      align-items: center;
    }
  }

  &__picture {
    transform: translateX(9%);
    transition: transform 0.3s ease-in;

    @media (max-width: 37.5rem) {
      transform: unset;
    }
  }

  &__info-btn,
  &__basket-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 2.5rem;

    position: relative;
  }

  &__basket-btn-text {
    font-size: 1rem;
    opacity: 1;
    transition: opacity 0.3s ease-in;
  }

  &__delete-icon {
    opacity: 0;
    transition: opacity 0.3s ease-in;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__basket-btn-text-notActive {
    opacity: 0;
  }

  &__delete-icon-active {
    opacity: 1;
  }

  &__text-block {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    height: 100%;
  }

  &__title {
    font-size: 1.4rem;
    line-height: 110%;
  }

  &__description {
    font-size: 1.2rem;
    margin-bottom: 0.62rem;
  }

  &__all-info {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    width: 100%;
    margin-top: auto;
  }

  &__inner-info {
    display: flex;
    gap: 0.62rem;
    justify-content: space-between;
  }

  &__price,
  &__rating {
    font-size: 1.1rem;
  }

  &__price-number,
  &__rating-number {
    font-weight: 600;
  }

  &__additional-info {
    display: flex;
    flex-direction: column;
    gap: 0.32rem;
  }

  &__btn-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
  }
}

b {
  font-size: 1.1rem;
}
</style>

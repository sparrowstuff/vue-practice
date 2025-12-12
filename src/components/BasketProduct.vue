<template>
  <div class="basket-card">
    <picture class="basket-card__picture">
      <source type="webp" :srcset="product.images[0]" />
      <img :src="product.images[0]" srcset="" :alt="product.title" width="200" height="200" />
    </picture>
    <div class="basket-card__info">
      <h3 class="basket-card__title">{{ product.title }}</h3>
      <p class="basket-card__description">{{ product.description }}</p>
      <div class="basket-card__additional-info">
        <span class="basket-card__rating"
          >Рейтинг: <span class="basket-card__rating-number">{{ product.rating }}</span
          >/5</span
        >
        <span class="basket-card__stock"
          >В наличии:
          <span
            ><b>{{ product.stock }}</b
            >&nbsp;шт.</span
          ></span
        >
        <div class="basket-card__return-policy">
          <span class="basket-card__return-term">{{ product.returnPolicy }}</span>
          <a href="#" class="basket-card__policy-link">Политика возврата</a>
          <span class="basket-product__shipping-time">{{ product.shippingInformation }}</span>
        </div>
        <span class="basket-card__discount"
          >Скидка дня: <b>{{ product.discountPercentage }}</b
          >%</span
        >
      </div>
      <div class="basket-card__options">
        <span class="basket-card__price"
          >Цена: <b>{{ product.price }}</b> $</span
        >
        <button
          class="basket-card__remove-btn btn btn--small"
          @click="removeFromBasket(product.id)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBasketStore } from '@/stores/basket'

const basket = useBasketStore()

const removeFromBasket = (productId) => {
  basket.removeFromBasket(productId)
}

const props = defineProps({
  product: { type: Object },
})
</script>

<style scoped lang="scss">
.basket-card {
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid aquamarine;
  display: flex;
  flex-direction: column;

  &__picture {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    height: 100%;
  }

  &__additional-info {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
  }

  &__return-policy {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  &__policy-link {
    color: brown;
    font-weight: 600;
    transition:
      color 0.3s ease-in,
      text-shadow 0.3s ease-in;

    &:hover,
    &:focus-visible {
      color: black;
      text-shadow: rgb(4, 255, 0) 1px 0 10px;
    }
  }

  &__return-term {
    text-decoration: underline;
    font-weight: 500;
  }

  &__stock {
    margin-bottom: 1rem;
  }

  &__options {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
  }

  &__price,
  &__rating {
    font-size: 1.1rem;
  }

  &__price-number,
  &__rating-number {
    font-weight: 600;
  }
}
</style>

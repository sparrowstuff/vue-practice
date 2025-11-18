<template>
  <article class="product-card">
    <div class="product-card__main">
      <picture class="product-card__picture">
        <source type="webp" :srcset="product.images[0]" />
        <img :src="product.images[0]" srcset="" :alt="product.title" width="280" height="300" />
      </picture>
      <div class="product-card__text-block">
        <h2 class="product-card__title">{{ product.title }}</h2>
        <p class="product-card__description">{{ product.description }}</p>
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
        </div>
      </div>
      <button class="product-card__info-btn btn" type="button">Подробнее</button>
    </div>
  </article>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  product: {
    // id: Number,
    // title: String,
    // description: String,
    // images: { webpUrl: String },
    // price: Number,
    // rating: String,
    // stock: Number,
    // warrantyInformation: String,
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.product-card {
  min-height: 12.5rem;
  max-width: 18.75rem;
  border-radius: 0.5rem;
  outline: 1px solid aqua;
  overflow: hidden;
}

.product-card__main {
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  align-items: flex-start;
  padding: 0.62rem;
  height: 100%;
}

.product-card__info-btn {
  margin-top: auto;
  width: 100%;
}

.product-card__text-block {
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  height: 100%;
}
.product-card__title {
  font-size: 1.4rem;
  line-height: 110%;
}

.product-card__description {
  font-size: 1.2rem;
  margin-bottom: 0.62rem;
}

.product-card__all-info {
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  width: 100%;
}

.product-card__inner-info {
  display: flex;
  gap: 0.62rem;
  justify-content: space-between;
}

.product-card__price,
.product-card__rating {
  font-size: 1.1rem;
}

.product-card__price-number,
.product-card__rating-number {
  font-weight: 600;
}

.product-card__additional-info {
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
}

b {
  font-size: 1.1rem;
}
</style>

<template>
  <article class="detailed-product" v-if="product">
    <div class="detailed-product__info-block">
      <div class="detailed-product__heading">
        <h2 class="detailed-product__title">{{ product.title }}</h2>
        <p class="detailed-product__description">{{ product.description }}</p>
      </div>
      <div class="detailed-product__additional-info">
        <span class="detailed-product__price"
          >Цена:
          <span class="detailed-product__price-number"
            ><b>{{ product.price }}</b
            >&nbsp;$</span
          ></span
        >
        <span class="detailed-product__rating"
          >Рейтинг:
          <span class="product-card__rating-number"
            ><b>{{ product.rating }}</b></span
          ></span
        >
      </div>
      <div class="detailed-product__inner-info">
        <span class="detailed-product__stock"
          >В наличии:
          <span
            ><b>{{ product.stock }}</b
            >&nbsp;шт.</span
          ></span
        >
        <span class="detailed-product__warranty"
          ><b>{{ product.warrantyInformation }}</b></span
        >
        <span class="detailed-product__category"
          >Категория: <b>{{ product.category }}</b></span
        >
        <span class="detailed-product__discount"
          >Скидка дня: <b>{{ product.discountPercentage }}</b
          >%</span
        >
        <!-- <span class="detailed-product__without-discount">{{
          product.price + (product.discountPercentage * product.discountPercentage) / 100
        }}</span> -->
      </div>
      <div class="detailed-product__return-block">
        <span class="detailed-product__return-term">{{ product.returnPolicy }}</span>
        <a href="#" class="detailed-product__policy-link">Политика возврата</a>
        <span class="detailed-product__shipping-time">{{ product.shippingInformation }}</span>
      </div>
      <button
        class="detailed-product__basket-btn btn"
        :class="[{ 'btn--notActive': !auth.isAuthorized }, { 'btn--active': productInBasket }]"
        type="button"
        @click="addInBasket"
      >
        <img
          class="detailed-product__delete-icon"
          :class="{ 'detailed-product__delete-icon-active': !basketBtnTextAppearance }"
          src="../svg/delete-icon.svg"
          alt="Delete-icon"
          width="20"
          height="20"
        />
        <span
          class="detailed-product__basket-btn-text"
          :class="{ 'detailed-product__basket-btn-text-notActive': !basketBtnTextAppearance }"
          >В корзину</span
        >
      </button>
    </div>
    <picture class="detailed-product__picture">
      <img
        v-if="product.images[0]"
        :src="product.images[0]"
        :alt="product.title"
        width="300"
        height="200"
        class="detailed-product__img"
      />
    </picture>
  </article>
  <img v-else src="/loading.gif" alt="loading" class="product-loading" width="200" height="200" />

  <article v-if="product?.reviews.length" class="product-reviews">
    <h3 class="product-reviews__title">Отзывы о товаре:</h3>
    <ul class="product-reviews__list">
      <li class="product-reviews__review" v-for="(review, index) in product?.reviews" :key="index">
        <div class="product-reviews__heading">
          <p class="product-reviews__name">{{ review.reviewerName }}:</p>
          <span class="product-review__date">
            <span class="product-review__day">{{ new Date(review.date).getDay() }}.</span>
            <span class="product-review__month">{{ new Date(review.date).getMonth() }}.</span>
            <span class="product-review__year">{{ new Date(review.date).getFullYear() }}</span>
          </span>
        </div>
        <div class="product-reviews__review-info">
          <span class="product-reviews__review-text">{{ review.comment }}</span>
          <div class="product-reviews__inner-rating">
            <span class="product-reviews__rating">rating: </span>
            <span class="product-reviews__score">{{ review.rating }}</span>
          </div>
        </div>
      </li>
    </ul>
  </article>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBasketStore } from '@/stores/basket'

const auth = useAuthStore()
const basketStore = useBasketStore()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const isLoading = ref(true)
const product = ref(null)
let basketBtnTextAppearance = ref(true)

const productReviews = computed(() => product.reviews)
console.log(productReviews.value)

const fetchProduct = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    if (!response.ok) throw new Error('Товар не найден')
    product.value = await response.json()
  } catch (err) {
    throw err
  }
}

const addInBasket = () => {
  basketBtnTextAppearance = !basketBtnTextAppearance
  basketStore.addInBasket(props.product)
}

const productInBasket = computed(() => {
  return basketStore.isInBasket(product.id)
})

onMounted(() => fetchProduct(props.id))
watch(
  () => props.id,
  (newId) => fetchProduct(newId),
)
</script>

<style scoped lang="scss">
.detailed-product {
  $root: &;
  border: 1px solid aqua;
  border-radius: 1rem;
  padding: 0.62rem;
  display: grid;
  grid-template-columns: 1fr 18.75rem;
  margin-bottom: 1.25rem;
  gap: 0.62rem;
  width: 100%;

  @media (max-width: 48rem) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }

  &__info-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  &__title {
    font-size: 2rem;
    line-height: 110%;
    color: black;
  }

  &__description {
    font-size: 1rem;
    line-height: 110%;
    color: black;
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
    gap: 0.62rem;

    @media (max-width: 48rem) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__inner-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.62rem;
    align-self: flex-start;

    @media (max-width: 48rem) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      gap: 0.4rem;
    }
  }

  &__basket-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.62rem;
    max-width: 18.25rem;

    @media (max-width: 48rem) {
      max-width: unset;
    }
  }

  &__return-block {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;

    @media (max-width: 48rem) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.4rem;
    }
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
}

.product-reviews {
  $root: &;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.62rem;
    width: 100%;
  }

  &__review {
    border-radius: 0.5rem;
    border: 1px solid aqua;
    padding: 1rem 0.62rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__name {
    font-size: 1.5rem;
    line-height: 100%;
  }

  &__review-info {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    align-items: flex-start;
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__review-text {
    font-size: 1.1rem;
    line-height: 100%;
  }

  &__inner-rating {
    display: flex;
    gap: 0.62rem;
    align-items: center;
  }

  &__score {
    border-radius: 50%;
    padding: 0.3rem;
    border: 1px solid aqua;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.product-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -50%);
}
</style>

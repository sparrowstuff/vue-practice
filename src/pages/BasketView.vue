<template>
  <div class="basket">
    <h2 class="basket__title">Корзина товаров</h2>
    <div class="basket__no-products-added" v-if="basket.productsInBasket.length === 0">
      <span class="basket__no-products-text">Не выбрано ни одного товара</span>
      <button class="basket__go-to-catalog-btn" type="button" @click="goToCatalog">
        В каталог
      </button>
    </div>
    <span class="basket__total-price" v-else
      >Итого: <b>{{ basket.totalBasketPrice }}</b> $</span
    >
    <div class="basket__catalog">
      <BasketProduct
        v-for="product in basket.productsInBasket"
        :key="product.id"
        :product="product"
        class="basket-product"
      />
    </div>
  </div>

  <div class="get-products-form">
    <form class="get-products-form__form" action="#" method="post" @submit.prevent>
      <div class="get-products-form__info-block">
        <h4 class="get-products-form__title">
          Чтобы приобрести товары необходимо заполнить следующие поля
        </h4>
        <div class="custom-input">
          <label for="clientName" class="custom-input__label">Ваше имя:</label
          ><input
            id="clientName"
            type="text"
            class="custom-input__name-input"
            required
            v-model="nameInput"
          />
        </div>
        <div class="custom-input">
          <label for="clientEmail" class="custom-input__label">Ваш email:</label
          ><input
            id="clientEmail"
            type="email"
            class="custom-input__email-input"
            required
            v-model="emailInput"
          />
        </div>
        <div class="custom-input">
          <label for="clientAddress" class="custom-input__label">Ваш адрес:</label
          ><input
            id="clientAddress"
            type="text"
            class="custom-input__address-input"
            required
            v-model="addressInput"
          />
        </div>
        <button class="get-products-form__submit-btn btn" type="submit">Перейти к оплате</button>
      </div>
      <img
        class="get-products-form__img"
        src="/images/zakaz-img.png"
        alt="form-image"
        width="300"
        height="300"
      />
    </form>
  </div>
</template>

<script setup>
import BasketProduct from '@/components/BasketProduct.vue'
import router from '@/router/router'
import { useBasketStore } from '@/stores/basket'
import { ref, watch } from 'vue'

const basket = useBasketStore()

const nameInput = ref('')
const emailInput = ref('')
const addressInput = ref('')

watch(nameInput, () => {})

const goToCatalog = () => {
  router.push('/catalog')
}
</script>

<style scoped lang="scss">
.basket {
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  margin-bottom: 2rem;

  &__title {
    font-size: 1.6rem;
  }

  &__no-products-added {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    align-items: flex-start;
  }

  &__no-products-text {
    font-weight: 500;
    font-size: 1.1rem;
  }

  &__go-to-catalog-btn {
    padding: 0.5rem 0.62rem;
    border-radius: 0.8rem;
    background-color: transparent;
    border: 2px solid aqua;
    transition:
      color 0.3s ease-in,
      box-shadow 0.3s ease-in;

    &:hover,
    &:focus-visible {
      color: aqua;
      box-shadow: 2px 2px 2px 0 black;
    }
  }

  &__catalog {
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

  &__total-price {
    font-size: 1.4rem;
  }
}

.get-products-form {
  margin-bottom: 1.25rem;

  &__form {
    width: 100%;
    display: flex;
    gap: 0.62rem;
    justify-content: space-between;
    align-items: center;
  }

  &__info-block {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;

    @media (max-width: 48rem) {
      width: 100%;
    }
  }

  &__submit-btn {
    font-size: 1rem;
  }

  &__img {
    @media (max-width: 48rem) {
      display: none;
    }
  }
}

.custom-input {
  max-width: 18.75rem;
  width: 100%;

  position: relative;

  $root: &;

  @media (max-width: 48rem) {
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

  &__email-input,
  &__name-input,
  &__address-input {
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

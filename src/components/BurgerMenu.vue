<template>
  <button
    class="burger-btn"
    :class="{ 'burger-btn--active': burgerMenuIsOpen }"
    @click="openBurger"
  >
    <span class="burger-btn__top-line"></span>
    <span class="burger-btn__middle-line"></span>
    <span class="burger-btn__bottom-line"></span>
  </button>
  <nav
    class="nav-menu nav-menu--mobile"
    :class="{ 'nav-menu--show': burgerMenuIsOpen && mobileMenuIsShown }"
  >
    <router-link @click="roadToCatalog" to="/catalog" class="nav-menu__page-link"
      >Catalog</router-link
    >
    <router-link @click="roadToPosts" to="/posts" class="nav-menu__page-link">Posts</router-link>
    <router-link to="/basket" class="nav-menu__page-link nav-menu__basket-link">
      <span class="nav-menu__basket-counter">{{ basket.productsInBasket.length }}</span>
      <span>Basket</span>
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </router-link>
  </nav>
</template>

<script setup>
import { useBasketStore } from '@/stores/basket'
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const burgerMenuIsOpen = ref(false)
const mobileMenuIsShown = ref(false)

const openBurger = () => {
  burgerMenuIsOpen.value = !burgerMenuIsOpen.value
}

const checkWindowWidth = () => {
  mobileMenuIsShown.value = window.innerWidth < 1024
}

const router = useRouter()

const roadToCatalog = () => {
  router.push({ name: 'catalog' })
}

const roadToPosts = () => {
  router.push({ name: 'posts' })
}

onMounted(() => {
  checkWindowWidth()
  window.addEventListener('resize', checkWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowWidth)
})

// basket

const basket = useBasketStore()
</script>

<style scoped lang="scss">
.burger-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  $root: &;

  &__top-line,
  &__middle-line,
  &__bottom-line {
    width: 2rem;
    height: 2px;
    background-color: black;
    border-radius: 5%;

    transition:
      opacity 0.3s ease-in,
      transform 0.3s ease-in;
  }

  &--active {
    #{$root}__top-line {
      transform: translateY(0.4rem) rotate(45deg);
    }
    #{$root}__middle-line {
      opacity: 0;
    }
    #{$root}__bottom-line {
      transform: translateY(-0.4rem) rotate(-45deg);
    }
  }

  @media (min-width: 1024px) {
    display: none;
  }
}

.nav-menu {
  $root: &;

  &--mobile {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    background-color: white;
    outline: 1px solid black;
    border-radius: 0.5rem;
    padding: 1rem 0.62rem 0.62rem 0.62rem;
    position: absolute;
    top: 101%;
    right: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in;

    @media (min-width: 1024px) {
      display: none;
    }

    #{$root}__page-link {
      display: flex;
      align-items: center;
      gap: 0.62rem;

      font-size: 1.3rem;
      line-height: 120%;
      letter-spacing: 0.02em;

      position: relative;

      &::before {
        content: '';
        width: 100%;
        height: 2px;
        background-color: black;
        border-radius: 10%;
        position: absolute;
        bottom: -5%;
        left: 0;

        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        transition: clip-path 0.3s ease-in;
      }

      &:hover,
      &:focus-visible {
        &::before {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
      }
    }

    #{$root}__basket-link {
      position: relative;
    }

    #{$root}__basket-counter {
      display: flex;
      width: 1.5rem;
      height: 1.5rem;
      overflow: hidden;
      border-radius: 50%;
      background-color: rgb(255, 131, 131);
      align-items: center;
      justify-content: center;

      position: absolute;
      top: -5%;
      right: -1%;
      z-index: 2;

      color: rgb(0, 0, 0);
      font-size: 0.82rem;
    }
  }

  &--show {
    opacity: 1;
    pointer-events: all;
  }
}
</style>

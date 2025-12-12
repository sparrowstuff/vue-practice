<template>
  <header class="header">
    <div class="header__main-wrapper">
      <router-link @click="roadToMainPage" to="/main" class="header__main-link"
        ><svg
          class="header__main-link-logo"
          fill="currentColor"
          width="50"
          height="50"
          viewBox="0 0 512 512"
          version="1.1"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="shopping_cart-basket-heart-love-valentine">
            <path
              d="M423.936,176.316C423.94,176.205,424,176.112,424,176v-32c0-13.234-10.766-24-24-24v-17.801   c0-16.417-16.066-27.962-31.586-22.77l-16,5.332c-0.004,0-0.004,0-0.004,0c-4.364,1.455-8.036,4.116-10.83,7.483   C337.713,89.578,333.042,88,328,88h-16c-5.042,0-9.713,1.578-13.58,4.245c-2.794-3.367-6.466-6.028-10.83-7.483c0,0,0,0-0.004,0   L271.59,79.43C256.041,74.236,240,85.8,240,102.199V120c-2.819,0-5.485,0.578-8,1.474V96c0-13.234-10.766-24-24-24h-16   c-13.234,0-24,10.766-24,24v80h-17.275l-12.858-76.758C135.492,83.453,122.18,72,106.219,72H88c-8.836,0-16,7.164-16,16   s7.164,16,16,16l18.266,0.266l45.953,274.375C153.508,386.352,160.18,392,168,392h51.059c-6.72,5.87-11.059,14.397-11.059,24   c0,17.645,14.355,32,32,32s32-14.355,32-32c0-9.603-4.339-18.13-11.059-24h38.118c-6.72,5.87-11.059,14.397-11.059,24   c0,17.645,14.355,32,32,32s32-14.355,32-32c0-9.603-4.339-18.13-11.059-24H384c8.836,0,16-7.164,16-16s-7.164-16-16-16H181.547   l-5.36-32H400.96c7.84,0,14.56-5.68,15.84-13.36l20.08-120C438.322,185.843,432.333,177.825,423.936,176.316z M240,432   c-8.824,0-16-7.176-16-16s7.176-16,16-16s16,7.176,16,16S248.824,432,240,432z M320,432c-8.824,0-16-7.176-16-16s7.176-16,16-16   s16,7.176,16,16S328.824,432,320,432z M352,107.531c0-3.449,2.199-6.5,5.473-7.59l16-5.332c5.099-1.727,10.527,2.068,10.527,7.59   V120h-32v-8V107.531z M341.742,251.543c3.523,4.426,2.813,11.449-1.621,15.984c-0.008,0.008-0.012,0.012-0.016,0.016L320.191,288   l-19.961-20.441c-4.402-4.555-5.094-11.59-1.57-16.02c4.11-5.172,11.332-5.409,15.758-0.848c1.508,1.555,3.578,2.43,5.742,2.43   c0.008,0,0.012,0,0.02,0c2.172-0.004,4.246-0.891,5.75-2.457C330.233,246.175,337.577,246.385,341.742,251.543z M304,176v-40h32v40   H304z M312,104h16c4.41,0,8,3.59,8,8v8h-32v-8C304,107.59,307.59,104,312,104z M256,102.199c0-5.464,5.323-9.315,10.531-7.59   l15.996,5.332c3.273,1.09,5.473,4.141,5.473,7.59V112v8h-32V102.199z M240,136h8h40v40h-56v-32C232,139.59,235.59,136,240,136z    M184,176V96c0-4.41,3.59-8,8-8h16c4.41,0,8,3.59,8,8v48v32H184z M258.72,290.48l-32.48-32.88c-11.84-12-13.92-31.2-3.6-44.64   c12.4-16.16,35.52-17.2,49.36-3.2c13.84-14,36.96-12.96,49.36,3.2c4.379,5.671,6.392,12.375,6.5,19.127   c-2.981,0.668-5.49,1.678-7.708,2.964c-4.379-2.543-9.406-3.797-14.547-3.559c-7.574,0.375-14.668,4.051-19.469,10.086   c-8.566,10.766-7.449,26.715,2.574,37.086l4.098,4.196l-7.528,7.62C277.92,297.84,266.08,297.84,258.72,290.48z M352,176v-40h40h8   c4.41,0,8,3.59,8,8v32H352z"
            />
          </g>

          <g id="Layer_1" />
        </svg>
        <span class="header__main-link-text">Main page</span>
      </router-link>
      <div class="header__nav-menu">
        <button
          class="header__auth-btn"
          :class="{ 'header__auth-btn--active': auth.isAuthorized }"
          @click="authorize"
        >
          {{ auth.isAuthorized ? 'Выйти' : 'Авторизоваться' }}
        </button>
        <nav class="nav-menu" v-if="showDesktopNav">
          <router-link @click="roadToCatalog" to="/catalog" class="nav-menu__page-link"
            >Catalog</router-link
          >
          <router-link @click="roadToPosts" to="/posts" class="nav-menu__page-link"
            >Posts</router-link
          >
          <router-link to="/basket" class="nav-menu__page-link nav-menu__basket-link">
            <span class="nav-menu__basket-counter">{{ basket.productsInBasket.length }}</span>
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
        <burger-menu />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, onUnmounted, ref } from 'vue'
import BurgerMenu from './BurgerMenu.vue'
import { useBasketStore } from '@/stores/basket'

// router func
const router = useRouter()

const roadToMainPage = () => {
  router.replace({ name: 'main' })
}

const roadToCatalog = () => {
  router.push({ name: 'catalog' })
}

const roadToPosts = () => {
  router.push({ name: 'posts' })
}

// auth func
const auth = useAuthStore()

const authorize = () => {
  auth.isAuthorized = !auth.isAuthorized
}

// nav menu appearance
const showDesktopNav = ref(true)

const checkWindowWidth = () => {
  showDesktopNav.value = window.innerWidth > 1024
}

// mount func
onMounted(() => {
  checkWindowWidth()
  window.addEventListener('resize', checkWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowWidth)
})

// basket func
const basket = useBasketStore()
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  z-index: 9999 !important;
  margin-bottom: 1.12rem;
  position: relative;
  $root: &;

  &__main-wrapper {
    padding: 0.62rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
  }

  &__nav-menu {
    display: flex;
    align-items: center;
    gap: 0.62rem;
  }

  &__main-link {
    display: flex;
    align-items: center;
    gap: 0.62rem;

    &:hover,
    &:focus-visible {
      &__main-link-text {
        color: blue;
        scale: 1.05;
      }

      &__main-link-logo {
        transform: translateX(0.3rem);
      }
    }

    @media (max-width: 27rem) {
      gap: 0.3rem;

      #{$root}__main-link-text {
        font-size: 1.2rem;
      }

      #{$root}__main-link-logo {
        width: 1.95rem;
        height: 1.95rem;
      }
    }
  }

  &__main-link-logo {
    color: black;

    transition: transform 0.3s ease-in;
  }

  &__main-link-text {
    font-size: 1.5rem;
    line-height: 120%;
    letter-spacing: 0.02em;

    transition:
      color 0.3s ease-in,
      scale 0.3s ease-in;
  }

  &__auth-btn {
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
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.62rem;

  $root: &;

  &__page-link {
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

  &__basket-link {
    position: relative;
  }

  &__basket-counter {
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
    right: -13%;
    z-index: 2;

    color: rgb(0, 0, 0);
    font-size: 0.82rem;
  }
}
</style>

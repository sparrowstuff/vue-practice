<script setup>
import HeaderLayout from './components/HeaderLayout.vue'
import './assets/css/fonts.css'
import './style.css'
</script>

<template>
  <div class="container">
    <header-layout />
    <RouterView />
  </div>
</template>

<style>
.container {
  max-width: 90rem;
  padding: 0 1.25rem;
  margin: 0 auto;
}
</style>

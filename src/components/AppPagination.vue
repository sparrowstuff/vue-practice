<template>
  <div class="pagination">
    <button class="pagination__prev-page-btn" type="button" @click="prevPage">Previous</button>
    <button
      class="pagination__current-page-btn"
      type="button"
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
    <button
      class="pagination__next-page-btn"
      type="button"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { IPagination } from './js/paginationPage'

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
})

const emit = defineEmits(['update:current-page'])

const prevPage = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    goToPage(props.currentPage + 1)
  }
}

const goToPage = (page) => {
  emit('update:current-page', page)
}
</script>

<style scoped>
.pagination {
  margin-top: 1.125rem;
  margin-bottom: 1.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.62rem;

  @media (max-width: 31.25rem) {
    gap: 0.36rem;
  }
}

.pagination__prev-page-btn,
.pagination__current-page-btn,
.pagination__next-page-btn {
  border: 1px solid aqua;
  padding: 0.62rem 0.62rem 0.62rem 0.62rem;
  border-radius: 0.5rem;
  font-size: 0.98rem;
  transition:
    background-color 0.3s ease-in,
    scale 0.3s ease-in;
}

.pagination__current-page-btn.active {
  background-color: darkseagreen;
}

.pagination button:hover {
  background-color: aquamarine;
  scale: 1.1;
}
</style>

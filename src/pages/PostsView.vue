<template>
  <section class="posts">
    <div class="posts__heading">
      <h2 class="posts__title">Список постов</h2>
      <button
        class="posts__add-post-btn btn btn--transparent"
        type="button"
        @click="openAddPostForm"
      >
        {{ postFormActive ? 'Отменить добавление' : 'Добавить пост' }}
      </button>
    </div>

    <AppPagination
      :total-pages="totalPages"
      :current-page="currentPage"
      @update:current-page="changePage"
    />

    <AddPostForm v-if="postFormActive" @post-added="handlePostAdded" />

    <Transition name="loading" mode="out-in">
      <div class="posts__loading" v-if="isLoading">
        <img src="/loading.gif" alt="loading" class="posts__loader" width="200" height="200" />
      </div>
    </Transition>

    <TransitionGroup v-if="!isLoading" class="posts__wrapper" name="list" tag="div">
      <PostCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
    </TransitionGroup>
  </section>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { usePostsStore } from '@/stores/postsStore'
import PostCard from '@/components/PostCard.vue'
import AddPostForm from '@/components/AddPostForm.vue'
import AppPagination from '@/components/AppPagination.vue'

const postsStore = usePostsStore()

const isLoading = ref(false)
const postFormActive = ref(false)

const currentPage = ref(1)

const ITEMS_PER_PAGE = 5

const changePage = async (page) => {
  currentPage.value = page
}

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return postsStore.allPosts.slice(start, end)
})

const totalPages = computed(() => Math.ceil(postsStore.allPosts.length / ITEMS_PER_PAGE))

const openAddPostForm = () => {
  postFormActive.value = !postFormActive.value
}

const handlePostAdded = () => {
  currentPage.value = 1
  postFormActive.value = false
}

watch(
  () => postsStore.allPosts.length,
  () => {
    // текущая страница стала больше общего количества страниц
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    }
  },
)

onMounted(() => {
  postsStore.fetchPosts()
})
</script>

<style scoped lang="scss">
.posts {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.62rem;
  }

  &__title {
    font-size: $px-32;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
  }

  &__loader {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }
}

// анимационные стили
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.list-leave-active {
  position: absolute;
}

.list-move {
  transition: transform 0.3s ease;
}

// анимация появления/исчезновения
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// анимация загрузки
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>

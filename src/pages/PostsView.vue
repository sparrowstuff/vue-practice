<template>
  <section class="posts">
    <h2 class="posts__title">Список постов</h2>
    <div class="posts__wrapper">
      <PostCard v-for="post in postsStore.allPosts" :key="post.id" :post="post" />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/postsStore'
import PostCard from '@/components/PostCard.vue'

const postsStore = usePostsStore()

onMounted(() => {
  postsStore.fetchPosts()
})
</script>

<style scoped lang="scss">
.posts {
  display: flex;
  flex-direction: column;
  gap: 1.62rem;

  &__title {
    font-size: $px-32;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
  }
}
</style>

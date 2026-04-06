<template>
  <h2>Список постов</h2>

  <section class="posts">
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

<style scoped lang="scss"></style>

<template>
  <article class="post-card">
    <div class="post-card__main">
      <div class="post-card__heading">
        <div class="post-card__info">
          <span class="post-card__title">{{ post.title }}</span>
          <span class="post-card__post-id">{{ post.id }}</span>
        </div>
        <h2 class="post-card__author-id">ID автора: {{ post.userId }}</h2>
      </div>
      <ul class="post-card__tags-list">
        <li class="post-card__tags-list-item" v-for="(tag, index) in post.tags" :key="index">
          #{{ tag }}
        </li>
      </ul>
      <p class="post-card__text">{{ post.body }}</p>
      <div class="post-card__reactions">
        <div class="post-card__likes">
          <span class="post-card__likes-text">{{ post.reactions.likes }}</span>
        </div>
        <div class="post-card__dislikes">
          <span class="post-card__dislikes-text">{{ post.reactions.dislikes }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router/router'
import { usePostsStore } from '@/stores/postsStore'

const authStore = useAuthStore()
const postsStore = usePostsStore()

const props = defineProps({
  post: Object,
})
</script>

<style scoped></style>

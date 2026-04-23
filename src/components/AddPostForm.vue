<template>
  <form @submit.prevent="addPost" method="POST" class="add-post">
    <h3 class="add-post__title">Добавить пост:</h3>
    <div class="add-post__wrapper">
      <div class="add-post-input" :class="{ 'has-value': hasTitleInside }">
        <label for="postTitle" class="add-post-input__label">Название</label>
        <input
          type="text"
          id="postTitle"
          class="add-post-input__input"
          maxlength="100"
          v-model="postTitle"
          required
        />
      </div>
      <div class="add-post-textarea" :class="{ 'has-value': hasDescriptionInside }">
        <label for="postDescription" class="add-post-textarea__label">Описание</label>
        <textarea
          class="add-post-textarea__textarea"
          name="description"
          id="postDescription"
          cols="30"
          rows="10"
          maxlength="300"
          minlength="5"
          v-model="postDescription"
          required
        ></textarea>
      </div>
      <div class="add-post__hashtags-wrapper">
        <div class="add-post__hashtags-inner">
          <div
            class="add-post-input add-post-input--small"
            :class="{ 'has-value': hasHashtagInside }"
          >
            <label for="postHashtags" class="add-post-input__label">Хештег</label>
            <input
              type="text"
              id="postHashtags"
              class="add-post-input__input"
              maxlength="30"
              v-model="postHashtag"
            />
          </div>
          <button
            class="add-post__submit-hashtag btn btn--transparent"
            type="button"
            aria-label="Добавить хештег"
            @click="addHashtag(postHashtag)"
          >
            Добавить хештег
          </button>
        </div>
        <div class="add-post__hashtags-text-block">
          <span class="add-post__no-hashtags" v-if="postHashtags.length === 0"
            >Не добавлено хештегов</span
          >
          <span
            class="add-post__hashtags"
            v-else
            v-for="(text, index) in postHashtags"
            :key="index"
            :text="text"
            >#{{ text }}</span
          >
        </div>
      </div>
    </div>
    <button class="add-post__submit-btn btn" type="submit" aria-label="Добавить пост">
      Добавить пост
    </button>
    <button
      class="add-post__clear-btn btn"
      type="button"
      aria-label="Очистить форму"
      @click="clearForm"
    >
      Очистить
    </button>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePostsStore } from '@/stores/postsStore'
import { useAuthStore } from '@/stores/auth'

const postTitle = ref('')
const postDescription = ref('')
const postHashtag = ref('')
const postHashtags = ref([])

const postsStore = usePostsStore()
const authStore = useAuthStore()

const emit = defineEmits(['post-added'])

const addHashtag = (hashtag) => {
  if (postHashtag.value.trim() !== '') {
    postHashtags.value.push(hashtag)
    postHashtag.value = ''
  }
}

const addPost = () => {
  if (!postTitle.value.trim()) {
    alert('Введите название поста!')
    return
  }

  if (!postDescription.value.trim()) {
    alert('Введите описание поста!')
    return
  }

  try {
    const newPost = {
      id: Date.now(),
      title: postTitle.value,
      body: postDescription.value,
      userId: authStore.user?.id || 1,
      tags: [...postHashtags.value],
      reactions: { likes: 0, dislikes: 0 },
    }

    postsStore.addPost(newPost)

    postTitle.value = ''
    postDescription.value = ''
    postHashtags.value = []

    emit('post-added')
  } catch (err) {
    console.error('Ошибка добавления поста', err)
  }
}

const hasTitleInside = computed(() => {
  return postTitle.value.trim() !== ''
})
const hasDescriptionInside = computed(() => {
  return postDescription.value.trim() !== ''
})
const hasHashtagInside = computed(() => {
  return postHashtag.value.trim() !== ''
})

const clearForm = () => {
  postTitle.value = ''
  postDescription.value = ''
  postHashtags.value = []
}
</script>

<style lang="scss" scoped>
.add-post {
  padding: 0.5rem 0.5rem;
  border: 1px solid $black;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;

  &__title {
    font-size: $px-24;
    line-height: 100%;
    color: $black;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  &__hashtags-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.62rem;
  }

  &__hashtags-inner {
    display: flex;
    align-items: center;
    gap: 0.62rem;
  }

  &__hashtags-text-block {
    display: flex;
    align-items: center;
    gap: 0.62rem;
  }

  &__submit-hashtag {
    width: 100%;
  }
}

.add-post-input {
  width: 100%;
  position: relative;
  $root: &;

  &:hover,
  &:focus-visible,
  &:focus-within,
  &:active {
    #{$root}__label {
      color: black;
      transform: translateY(-80%);
    }
  }

  &.has-value {
    #{$root}__label {
      color: black;
      transform: translateY(-80%);
    }
  }

  &__label {
    position: absolute;
    top: 20%;
    left: 1%;
    font-size: 1rem;
    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
    border-radius: 0.2rem;
    border-radius: 5%;
    background-color: white;
    display: block;
    color: aqua;

    transition:
      transform 0.3s ease-in,
      color 0.3s ease-in;
  }

  &__input {
    width: 100%;
    height: 2.5rem;
    padding: 0.2rem 0.3rem 0.1rem 0.3rem;
    border: unset;
    border-radius: 0.5rem;
    outline: 2px solid aqua;

    &::placeholder {
      font-size: 1.1rem;
    }
  }

  &--small {
    max-width: 12.5rem;
  }
}

.add-post-textarea {
  width: 100%;
  position: relative;
  $root: &;

  &:hover,
  &:focus-visible,
  &:focus-within,
  &:active {
    #{$root}__label {
      color: black;
      transform: translateY(-80%);
    }
  }

  &.has-value {
    #{$root}__label {
      color: black;
      transform: translateY(-80%);
    }
  }

  &__label {
    position: absolute;
    top: 2%;
    left: 1%;
    font-size: 1rem;
    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
    border-radius: 5%;
    background-color: white;
    display: block;
    color: aqua;

    transition:
      transform 0.3s ease-in,
      color 0.3s ease-in;
  }

  &__textarea {
    width: 100%;
    padding: 0.4rem 0.5rem 0.4rem 0.5rem;
    border: unset;
    border-radius: 0.5rem;
    outline: 2px solid aqua;
    resize: none;

    &::placeholder {
      font-size: 1.1rem;
    }
  }
}
</style>

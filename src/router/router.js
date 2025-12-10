import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', redirect: '/main' },
    {
      name: 'main',
      path: '/main',
      component: () => import('@/pages/MainView.vue'),
    },
    {
      name: 'catalog',
      path: '/catalog',
      component: () => import('@/pages/CatalogView.vue'),
      children: [
        {
          name: '/product/:id',
          path: 'catalog',
          component: () => import('@/pages/CardView.vue'),
        },
      ],
    },
    {
      name: 'posts',
      path: '/posts',
      component: () => import('@/pages/PostsView.vue'),
    },
    {
      name: 'basket',
      path: '/basket',
      component: () => import('@/pages/BasketView.vue'),
    },
  ],
})

export default router

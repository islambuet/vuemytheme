import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/',  component: () => import('@/tasks/Dashboard.vue'), },
    { path: '/login', component: () => import('@/tasks/Login.vue') },
    { path: '/module-tasks', component: () => import('@/tasks/module-tasks/Index.vue') },
    { path: '/user-groups', component: () => import('@/tasks/user-groups/Index.vue') },
    { path: '/system-configurations', component: () => import('@/tasks/system-configurations/Index.vue') },
    { path: '*',  component: () => import('@/components/busy-states/404.vue'), },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import AddComment from "@/views/AddComment";
import CommentList from "@/views/CommentList";
import NotFound from "@/error-pages/NotFound"
import Register from "@/views/Register";
import Login from "@/views/Login";
import Admin from '@/views/Admin.vue'
import datas from '@/assets/datas.js'

const routes = [
  {
    path: '/CommentList',
    name: 'Comment List',
    component: CommentList,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/AddComment',
    name: 'Add Comment',
    component: AddComment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    name: 'Not Found',
    component: NotFound,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    redirect: {
      name: 'Comment List'
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/Admin',
    name: 'admin',
    component: Admin,
    meta:{
      requiresAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (datas.isAuthenticated()) {
      next()
      return
    }
    next('/login')
  }
  if(to.matched.some((record) => record.meta.requiresAdmin)) {
    if (datas.isAdminUser()){
      next()
      return
    }
    next('/')
  }
  next()
})

export default router

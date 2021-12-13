import { createRouter, createWebHistory } from 'vue-router'
import AddComment from "@/components/AddComment";
import CommentList from "@/components/CommentList";
import NotFound from "@/error-pages/NotFound"
import Register from "../views/Register";
import Login from "../views/Login";

const routes = [
  {
    path: '/CommentList',
    name: 'Comment List',
    component: CommentList,
  },
  {
    path: '/AddComment',
    name: 'Add Comment',
    component: AddComment,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
  {
    path: '/',
    redirect: {
      name: 'Comment List'
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

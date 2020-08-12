import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/index'
import Layout from '../views/Layout'
import Article from '../views/Article'
import ArticleAdd from '../views/Article/articleAdd'
import ArticleEdit from '../views/Article/articleEdit'
import Image from '../views/Image'
import Comment from '../views/Comment'
import Fans from '../views/Fans'
import Setting from '../views/Setting'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    // 二级路由
    // 文章管理
    children: [
      { path: 'article', name: 'Article', component: Article },
      { path: 'addArticle', name: 'AddArticle', component: ArticleAdd },
      { path: 'editArticle', name: 'EditArticle', component: ArticleEdit },
      { path: 'image', name: 'Image', component: Image },
      { path: 'comment', name: 'Comment', component: Comment },
      { path: 'fans', name: 'Fans', component: Fans },
      { path: 'setting', name: 'Setting', component: Setting }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

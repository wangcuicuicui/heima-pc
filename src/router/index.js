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
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import { getUserInfo } from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    // 二级路由
    // 文章管理
    children: [
      { path: 'article', name: 'Article', component: Article },
      { path: 'addArticle', name: 'AddArticle', component: ArticleAdd },
      { path: 'editArticle', name: 'EditArticle', component: ArticleEdit },
      { path: 'image', name: 'Image', component: Image },
      { path: 'comment', name: 'Comment', component: Comment },
      { path: 'fans', name: 'Fans', component: Fans },
      { path: 'setting', name: 'Setting', component: Setting },
      { path: 'home', name: 'Home', component: Home }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const user = getUserInfo()
    if (user && user.token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router

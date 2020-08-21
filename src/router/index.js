import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/index'
import Layout from '../views/Layout'
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
      { path: 'article', name: 'Article', component: () => import(/* webackChunckName:"Article" */ '../views/Article') },
      { path: 'addArticle', name: 'AddArticle', component: () => import(/* webackChunckName:"AddArticle" */ '../views/Article/articleAdd') },
      { path: 'editArticle', name: 'EditArticle', component: () => import(/* webackChunckName:"EditArticle" */ '../views/Article/articleEdit') },
      { path: 'image', name: 'Image', component: () => import(/* webackChunckName:"Image" */ '../views/Image') },
      { path: 'comment', name: 'Comment', component: () => import(/* webackChunckName:"Comment" */ '../views/Comment') },
      { path: 'fans', name: 'Fans', component: () => import(/* webackChunckName:"Fans" */ '../views/Fans') },
      { path: 'setting', name: 'Setting', component: () => import(/* webackChunckName:"Setting" */ '../views/Setting') },
      { path: 'home', name: 'Home', component: () => import(/* webackChunckName:"Home" */ '../views/Home') }
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

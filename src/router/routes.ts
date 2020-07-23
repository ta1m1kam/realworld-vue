import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import ArticleEdit from '@/views/ArticleEdit.vue'
import Settings from '@/views/Settings.vue'
import Profile from '@/views/Profile.vue'
import { RouteConfig } from 'vue-router'

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      },
      {
        path: '/@:username',
        name: 'profile',
        component: Profile
      },
      {
        path: '/editor/:slug?',
        name: 'article-edit',
        component: ArticleEdit
      }
]

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import ArticleEdit from '@/views/ArticleEdit.vue'
import Article from '@/views/Article.vue'
import Settings from '@/views/Settings.vue'
import Profile from '@/views/Profile.vue'
import { RouteConfig } from 'vue-router'

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: Home,
        children: [
          {
            path: "",
            name: 'home',
            component: () => import("@/views/HomeGlobal.vue")
          },
          {
            path: "my-feed",
            name: 'home-my-feed',
            component: () => import("@/views/HomeMyFeed.vue")
          },
          {
            path: "tag/:tag",
            name: 'home-tag',
            component: () => import("@/views/HomeTag.vue")
          }
        ]
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
        component: Profile,
        props: true
      },
      {
        path: '/articles/:slug',
        name: 'article',
        component: Article,
        props: true
      },
      {
        path: '/editor/:slug?',
        name: 'article-edit',
        component: ArticleEdit,
        props: true
      }
]

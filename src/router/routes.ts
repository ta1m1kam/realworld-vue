import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
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
]

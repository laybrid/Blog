import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import Home from '../views/Home.vue'
import List from '../components/List.vue'
import About from '../components/About.vue'
import WrapperPost from '@/components/WrapperPost.vue'
import GameVideo from '../components/GameVideo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'list',
        component: List
      },
      {
        path: ':slug',
        name: 'WrapperPost',
        component: WrapperPost
      },
      {
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'game-video',
        name: 'game-video',
        component: GameVideo
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

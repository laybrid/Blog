import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../components/Article.vue'
import About from '../components/About.vue'
import GameVideo from '../components/GameVideo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'article',
        component: Article
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
  history: createWebHashHistory(),
  routes
})

export default router

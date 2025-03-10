import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Blog from '../components/Blog.vue'
import Projects from '../components/Projects.vue'
import test from '@/components/test.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component:HomeView
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog,
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  }
]
// 读取posts文件夹里的文件 集体路由注册
const postsContext = require.context(
  '../blogs',      // 目录路径
  true,            // 包含子目录
  /\.md$/,         // 文件匹配正则
  'lazy'           // 懒加载模式
)

const dynamicRoutes = postsContext.keys().map(path => {
  const slug = path
    .replace(/^\.\//, '')       // 移除开头的 ./
    .replace(/\.md$/, '')       // 移除文件扩展名
  return {
    path: `/blog/${slug}`,
    component: () => postsContext(path)
  }
})

console.log([...routes,...dynamicRoutes])
const router = createRouter({
  history: createWebHashHistory(),
  routes:[...routes,...dynamicRoutes]
})

export default router

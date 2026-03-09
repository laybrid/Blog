<template>
  <div>
    <h1>123123</h1>
    <ul>
      <li>{{ meta?.date }}</li>
      <li>{{ meta?.description }}</li>
      <li>{{ meta?.duration }}</li>
      <li>{{ meta?.lang }}</li>
      <li>{{ meta?.title }}</li>
    </ul>
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MDMETA } from '@/types'

const route = useRoute()
const content = ref('')
const meta = ref<MDMETA>()
let slug = route.params.slug || ''

// 读取posts文件夹里的文件
const postsContext = require.context(
  '../posts', // 目录路径
  true, // 包含子目录
  /\.md$/ // 文件匹配正则
)

watch(
  () => route.params,
  () => {
    slug = route.params.slug
    try {
      // 匹配文件
      const mod = postsContext(`./${slug}.md`)
      // 获取md的内容和formatt信息
      content.value = mod.html
      meta.value = mod.attributes
    } catch (e) {
      content.value = ''
      meta.value = undefined
    }
  },
  {
    immediate: true
  }
)
</script>

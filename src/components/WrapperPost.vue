<template>
  <div class="container">
    <h1 class="text-[30px] font-bold relative text-color-text-r">
      {{ meta?.title }}
    </h1>
    <ul
      class="flex gap-3 text-[#e28247] text-sm mt-2 border-b-[1px] border-dashed"
    >
      <li>{{ meta?.date }}</li>
      <li>{{ meta?.duration }}</li>
      <li>{{ meta?.word }}</li>
    </ul>
    <div v-html="content" class="prose"></div>
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

<style scoped>
@import url('../assets/css/prose.css');

.container {
  background-color: var(--background-color);
  border-radius: 16px;
  padding: 36px;
  overflow: hidden;
}
</style>

<template>
  <div class="container" ref="containerEl">
    <h1 class="text-[30px] font-bold relative text-color-text-r title">
      {{ blogContent?.title }}
    </h1>
    <ul class="flex gap-3 text-color-theme-d text-sm my-2">
      <!-- <li>{{ blogContent?.date }}</li> -->
      <li>{{ blogContent?.duration }}</li>
      <li>|</li>
      <li>{{ blogContent?.word }}字</li>
    </ul>
    <div class="border-b-[1px] border-dashed h-1 text-color-theme my-8"></div>
    <div v-html="blogContent.html" class="prose"></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useMdFiles from '@/assets/utils/useMdFile'
import useMdFileImg from '@/assets/utils/useMdFileImg'

const route = useRoute()
const { getSingleMdFileMeta } = useMdFiles()
const { fixMarkdownImages } = useMdFileImg()

const blogContent = ref()
const containerEl = ref()
let slug = route.params.slug || ''

// copy btn
document.addEventListener('click', async e => {
  const el = e.target as HTMLElement | null
  const btn = el?.closest?.('.code-copy-btn') as HTMLButtonElement | null
  if (!btn) return
  const code = decodeURIComponent(btn.dataset.code || '')
  await navigator.clipboard.writeText(code)
  const old = btn.textContent
  btn.textContent = '√'
  window.setTimeout(() => (btn.textContent = old || '复制'), 1200)
})

watch(
  () => route.params,
  async () => {
    slug = route.params.slug
    blogContent.value = getSingleMdFileMeta(slug)
    await nextTick()
    fixMarkdownImages(containerEl.value)
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
  padding: 36px;
  overflow: hidden;
}
.title::before {
  position: absolute;
  top: 12px;
  left: -16px;
  content: '';
  width: 4px;
  height: 20px;
  background-color: #ffcd32;
}
</style>

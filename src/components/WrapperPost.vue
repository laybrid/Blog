<template>
  <div class="container">
    <h1 class="text-[30px] font-bold relative text-color-text-r">
      {{ blogContent?.title }}
    </h1>
    <ul
      class="flex gap-3 text-[#e28247] text-sm mt-2 border-b-[1px] border-dashed"
    >
      <li>{{ blogContent?.date }}</li>
      <li>{{ blogContent?.duration }}</li>
      <li>{{ blogContent?.word }}</li>
    </ul>
    <div v-html="blogContent.html" class="prose"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useMdFiles from '@/assets/utils/useMdFile'

const route = useRoute()
const { getSingleMdFileMeta } = useMdFiles()

const blogContent = ref()
let slug = route.params.slug || ''

watch(
  () => route.params,
  () => {
    slug = route.params.slug
    blogContent.value = getSingleMdFileMeta(slug)
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

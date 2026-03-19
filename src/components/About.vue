<template>
  <div v-html="aboutContent.html" class="prose p-[36px]"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useMdFiles from '@/assets/utils/useMdFile'

const { getSingleMdFileMeta } = useMdFiles()
const aboutContent = ref(getSingleMdFileMeta('about'))
</script>

<style scoped>
@import url('../assets/css/prose.css');
</style>

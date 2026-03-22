<template>
  <div class="card">
    <div
      class="title relative ml-3 my-3 md:w-[calc(100%-70px)]"
      v-if="$slots.head || title"
    >
      <slot name="head">{{ title }}</slot>
    </div>
    <slot></slot>
    <div
      v-if="isJump"
      class="max-md:hidden absolute top-3 right-3 bottom-3 rounded-xl bg-color-bg w-11 cursor-pointer flex justify-center items-center"
      @click="jump"
    >
      <ChevronRightIcon
        class="size-15 text-color-theme-d hover:text-color-theme"
      ></ChevronRightIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
// ts  序列
import { useRouter } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
const props = defineProps<{
  title?: string
  isJump?: boolean
  path?: string
}>()

const router = useRouter()

const jump = () => {
  router.push(props.path || '')
}
</script>

<style scoped>
.card {
  position: relative;
  border-radius: 16px;
  padding: 10px;
  overflow: hidden;
}

.title::before {
  position: absolute;
  top: 10px;
  left: -8px;
  content: '';
  width: 4px;
  height: 20px;
  background-color: #ffcd32;
}
</style>

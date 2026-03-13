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
      class="max-md:hidden absolute top-3 right-3 bottom-3 rounded-xl bg-pink-100 w-11 cursor-pointer flex justify-center items-center"
      @click="jump"
    >
      <ChevronRightIcon class="size-6 text-color-theme"></ChevronRightIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
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
  top: 5px;
  left: -10px;
  content: '';
  width: 4px;
  height: 16px;
  background-color: #fff;
}
</style>

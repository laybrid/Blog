<template>
  <div class="text-color-text-d">
    <Card
      v-for="(item, index) in blogRoutes"
      :key="index"
      is-jump
      :path="item.path"
      class="mb-5"
      v-show="item.tag != 'none'"
    >
      <template #head>
        <router-link
          class="text-[28px] hover:text-color-text-r cursor-pointer ml-2"
          :to="item.path as string"
        >
          {{ item.title }}
        </router-link>
      </template>
      <template #default>
        <div class="pl-3 md:w-[calc(100%-70px)]">
          <div class="flex items-center gap-1">
            <div class="btn w-8 h-8 mr-1 pointer-events-none">#</div>
            <div class="cursor-pointer hover:text-color-text-r text-color-text">
              {{ item.tag }}
            </div>
          </div>
          <p class="my-3 text-color-text-d">{{ item.description }}</p>
          <p class="text-color-text">
            <span>{{ item.word }}字</span> <span class="mx-2">|</span>
            <span>{{ item.duration }}</span>
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useMdFiles from '@/assets/utils/useMdFile'
import { MDMETA } from '@/types'
import Card from './Card.vue'

const { getMdFilesMeta } = useMdFiles()
const blogRoutes = ref<MDMETA[]>(getMdFilesMeta())
</script>

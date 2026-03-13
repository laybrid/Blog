<template>
  <div class="text-color-text">
    <Card v-for="item in 4" :key="item" is-jump path="/about" class="mb-4">
      <template #head>
        <h1 class="text-lg">
          如何彻底清除 Git Repository 里不想被人看到的内容如何彻底清除 Git
          Repository 里不想被人看到的内容如何彻底清除 Git Repository
          里不想被人看到的内容
        </h1>
      </template>
      <template #default>
        <div class="pl-3 md:w-[calc(100%-70px)]">
          <div class="flex items-center gap-1">
            <div class="btn w-8 h-8 mr-1">#</div>
            <div>git</div>
          </div>
          <p class="my-2">都是年少轻狂犯的错</p>
          <p>1200</p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <div
    class="h-[72px] bg-white mb-3 rounded-xl flex px-4 items-center justify-between text-color-text"
  >
    <router-link
      class="flex items-center px-3 py-2 active:scale-95 btn-plain transition duration-300 ease-in-out"
      to="/"
    >
      <template #default>
        <HomeIcon class="size-8 text-color-theme mr-2"></HomeIcon>
        <span class="text-color-text-r font-bold">Chat</span>
      </template>
    </router-link>
    <div class="flex items-center">
      <router-link
        to="/"
        class="px-5 py-2 active:scale-95 btn-plain font-bold transition duration-300 ease-in-out"
        exact-active-class="text-color-theme"
        >Blog</router-link
      >
      <router-link
        to="/about"
        class="px-5 py-2 active:scale-95 btn-plain font-bold transition duration-300 ease-in-out"
        active-class="text-color-theme"
        >About</router-link
      >
    </div>
    <div class="other opacity-0">
      <SunIcon class="size-8"></SunIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, SunIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div
    class="h-[72px] bg-white mb-3 rounded-xl flex px-4 items-center justify-between text-color-text"
  >
    <router-link
      class="flex items-center px-3 py-2 active:scale-95 btn-plain transition duration-300 ease-in-out"
      to="/"
    >
      <template #default>
        <FontAwesomeIcon :icon="faHouse" class="text-color-theme mr-2 size-7" />
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
      <FontAwesomeIcon :icon="faSun" class="text-color-theme size-7" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { faHouse, faSun } from '@fortawesome/free-regular-svg-icons'
</script>

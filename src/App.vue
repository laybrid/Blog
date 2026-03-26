<template>
  <!--
 <nav class="fixed top-0 right-5">
    <button @click="changeMode" class="hover:text-[#0d9488]">
      <SunIcon class="size-6" v-show="modeState"></SunIcon>
      <MoonIcon class="size-6" v-show="!modeState"></MoonIcon>
    </button>
    <a href="#" class="hover:text-[#0d9488]">GitHub</a>
  </nav> 
  -->
  <router-view />
</template>

<script setup lang="ts">
import { useDarkMode } from './assets/utils/useDarkMode'
import {
  MoonIcon,
  SunIcon,
  ArrowDownCircleIcon
} from '@heroicons/vue/24/outline'
const { modeState, changeMode } = useDarkMode()
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #020618;
}
</style>

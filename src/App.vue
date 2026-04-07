<template>
  <router-view />
</template>

<script setup lang="ts">
import { useDarkMode } from './assets/utils/useDarkMode'
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

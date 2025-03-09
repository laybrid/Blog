<template>
  <Nav></Nav>
  <router-view />
</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue';
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #222;
  color: #fff;
}
</style>

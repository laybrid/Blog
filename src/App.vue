<template>
  <Nav></Nav>
  <div class="py-10 px-7">
    <router-view></router-view>
  </div>

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

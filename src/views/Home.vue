<template>
  <div class="max-w-[1200px] mx-auto">
    <Nav></Nav>
    <div class="flex flex-col lg:gap-4 lg:flex-row">
      <SideBar class="flex-1 lg:max-w-[280px]"></SideBar>
      <router-view class="flex-1"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from '../components/Nav.vue'
import SideBar from '../components/SideBar.vue'
</script>

<style></style>

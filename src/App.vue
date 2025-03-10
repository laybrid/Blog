<template>
  <Nav></Nav>
  <div class="py-10 px-7">
    <router-view></router-view>
  </div>

</template>

<script setup lang="ts">
import Nav from '@/components/Nav.vue';
import { provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router'

// 用来控制blog组件下的bloglist和blog内容的展示
const route = useRoute()
const isShow = ref(true)
watch(() => route.path, () => {
    if (route.path !== '/blog')
        isShow.value = false
    else
        isShow.value = true

})
provide('isShow',isShow)
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

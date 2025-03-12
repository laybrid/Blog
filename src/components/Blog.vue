<template>
    <div class="m-auto max-w-2xl ">
        <div v-show="isShow">
            <h1 class="text-4xl mb-8">Blog</h1>
            <p class=" text-color-text-l italic mb-12">some articals about code</p>
            <div v-for="item in 5" :key="item" class="mb-10">
                <div class="relative h-20">
                    <span class="font-bold text-9xl absolute top-0 -left-12 opacity-5">2025</span>
                </div>
                <div class="text-color-text-ll">
                    <p>git</p>
                    <p>leetcode</p>
                    <p>xss</p>
                    <router-link to="/blog/a">vueuse</router-link>
                </div>
            </div>
        </div>
        <div class="markdown-body">
            <router-view v-show="!isShow"></router-view>
        </div>
    </div>

</template>
<script setup lang="ts">
import { inject } from 'vue';
const isShow = inject('isShow', true)


interface articalsType {
    title: string,
    yaer: string,
    day: string,
    link: string
}
// const articals:articalsType[] = [
//     {},
//     {},
//     {},
// ]
</script>
<style>
.markdown-body {
    background-color: #222 !important;
}
/* 缺少代码高亮的权宜之计 */
.markdown-body pre {
    background-color: #282c34 !important;
    color: white !important;
}
</style>

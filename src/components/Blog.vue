<template>
    <div class="m-auto max-w-2xl ">
        <div v-show="isShow">
          <h1 class="text-4xl mb-8">Blog</h1>
            <p class=" text-color-text-l italic mb-12">some articals about code</p>
            <div v-for="item in 1" :key="item" class="mb-10">
                <div class="relative h-20">
                    <span class="font-bold text-9xl absolute top-0 -left-12 opacity-5 pointer-events-none">2025</span>
                </div>
                <div class="text-color-text-ll flex flex-col">
                    <router-link
                    class="m-2 z-10 text-lg hover:text-color-theme "
                    :to="'/blog/' + item" 
                    v-for="item,index in Blogs" :key="index">{{ item }}</router-link>
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
import { useRouter } from 'vue-router';
const isShow = inject('isShow', true)

const router = useRouter()
const Blogs = router.getRoutes().filter(i => i.path.startsWith('/blog/')).map(i => i.path.split('/')[2])
console.log(Blogs)
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

</style>

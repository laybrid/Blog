<template>
    <nav class="p-8 flex justify-between items-center">
        <div>
            <router-link to="/">
                <BoltIcon class="size-8 text-color-theme"></BoltIcon>
            </router-link>
        </div>
        <div class="flex gap-5 items-center">
            <div class="text-color-text-ll hover:text-color-theme cursor-pointer" v-for="item in seeting" :key="item"
                @click="onClick(item)">{{ item }}</div>
            <button @click="changeLanguage" class="text-color-text-ll hover:text-color-theme">{{ language }}</button>
            <a href="https://github.com/laybrid" target="_blank">
                <BoltIcon class="size-7 text-color-theme"></BoltIcon>
            </a>
        </div>

    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { BoltIcon } from '@heroicons/vue/24/outline'
const router = useRouter()
const seeting = ref<string[]>(['Blog', 'Projects'])
const language = ref<'EN' | 'ZH'>('EN')
function onClick(item: string) {
    router.push(`/${item.toLowerCase()}`)
}
function changeLanguage() {
    if (language.value === 'EN')
        language.value = 'ZH'
    else
        language.value = 'EN'
}
</script>
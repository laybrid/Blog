<template>
  <div class="h-full text-color-text">
    <Card>
      <template #default>
        <div class="w-full flex justify-center">
          <img
            src="../assets/blog-img/avatars.jpg"
            alt=""
            class="max-w-[280px]"
          />
        </div>
        <div class="text-center mt-3">
          <p class="text-color-text-r">Laybrid</p>
          <p class="my-2 text-color-text-d">探索虚拟世界</p>
          <div class="flex justify-center items-center gap-4">
            <a
              v-for="item in quickRoute"
              :key="item.url"
              :href="item.url"
              class="btn p-2 transition duration-300 ease-in-out active:scale-95"
            >
              <FontAwesomeIcon :icon="item.icon" class="font" />
            </a>
          </div>
        </div>
      </template>
    </Card>
    <Card class="my-4">
      <template #default>
        <div
          class="relative ml-3 my-3 md:w-[calc(100%-70px)] title text-color-text-d"
        >
          标签
        </div>
        <div class="flex gap-4 flex-wrap">
          <div
            class="btn px-3 py-1 transition duration-300 ease-in-out active:scale-95"
            v-for="item in tagArray"
            :key="item"
            v-show="item != 'none'"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { faGithub, faSteam } from '@fortawesome/free-brands-svg-icons'
import { ref } from 'vue'
import useMdFiles from '@/assets/utils/useMdFile'
import Card from './Card.vue'

const { getMdFilesTag } = useMdFiles()
const tagArray = ref(getMdFilesTag())

const quickRoute = [
  {
    icon: faGithub,
    url: 'https://github.com/laybrid'
  },
  {
    icon: faSteam,
    url: 'https://steamcommunity.com/profiles/76561199758756730/'
  }
]
</script>

<style scoped>
.title::before {
  position: absolute;
  top: 5px;
  left: -10px;
  content: '';
  width: 4px;
  height: 13px;
  background-color: #ffcd32;
}
</style>

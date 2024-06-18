<template>
  <Forward class="big-icon" :style="{ fill: color }"></Forward>
  <component
    v-for="(icon, index) of Icons"
    :is="icon"
    :key="index"
    class="icon"
  ></component>
  <button @click="handlClick">点击</button>
</template>

<script setup lang="ts">
import { Icons } from '@capybara-plus/icons-vue'
import { Forward } from '@capybara-plus/icons-vue'
import { ref } from 'vue'

const color = ref('red')
const handlClick = () => {
  color.value = 'blue'
}
</script>

<style scoped>
.big-icon {
  height: 96px;
}
.icon {
  height: 48px;
}
</style>

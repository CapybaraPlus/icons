<template>
  <Forward class="big-icon" :style="{ fill: color }"></Forward>
  <button @click="handlClick">测试</button>
  <div class="container">
    <div class="icon__wrapper" v-for="(icon, index) of Icons" :key="index">
      <component :is="icon" class="icon"></component>
      <span>{{ icon.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@capybara-plus/icons-vue'
import { Forward } from '@capybara-plus/icons-vue'
import { ref } from 'vue'

console.log(Icons)
const color = ref('red')
const handlClick = () => {
  color.value = 'blue'
}
</script>

<style scoped>
.big-icon {
  height: 96px;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.icon__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}
.icon__wrapper:hover {
  background-color: #ccc;
}
.icon {
  height: 48px;
}

#uuid-f24f98af-7c48-4db0-8414-85f3e6cfbb51 {
  animation: rotate 0.5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <Forward class="big-icon"></Forward>
  <component
    v-for="(icon, index) of Icons"
    :is="icon"
    :key="index"
    class="icon"
  ></component>
</template>

<script setup lang="ts">
import { Icons } from '@capybara-plus/icons-vue'
import { Forward } from '@capybara-plus/icons-vue'

console.log(Icons)
</script>

<style scoped>
.big-icon {
  height: 96px;
}
.icon {
  height: 48px;
}
</style>

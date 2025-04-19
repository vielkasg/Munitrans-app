<template>
  <div class="app-card flex-column fade-in">
    <h3 class="app-card-title">{{ title }}</h3>
    <div class="flex-grow">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<style scoped>
.app-card {
  min-height: 220px;
  position: relative;
}
</style>

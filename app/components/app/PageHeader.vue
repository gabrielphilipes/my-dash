<template>
  <header class="flex justify-between items-center py-4 mb-10">
    <h1 class="text-2xl font-bold">
      {{ title }}
    </h1>

    <div>
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<script setup lang="ts">
  import { Toaster } from 'vue-sonner'
</script>

<template>
  <NuxtLoadingIndicator />

  <Toaster position="top-center" rich-colors :duration="5000" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

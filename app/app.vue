<script setup lang="ts">
  import { Toaster } from 'vue-sonner'
</script>

<template>
  <NuxtLoadingIndicator />

  <Toaster position="top-center" :duration="5000" rich-colors close-button />

  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

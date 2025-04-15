<script setup lang="ts">
  const appConfig = useAppConfig()
</script>

<template>
  <NuxtLoadingIndicator />

  <UApp :toaster="appConfig.toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

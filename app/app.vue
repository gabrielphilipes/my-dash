<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />

  <UApp :toaster="{ position: 'top-center' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

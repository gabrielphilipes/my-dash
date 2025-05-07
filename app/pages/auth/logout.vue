<script setup lang="ts">
  const route = useRoute()
  const information = route.query?.information

  await $fetch('/api/auth/logout', { method: 'POST' })

  const { clear: clearUserSession } = useUserSession()
  await clearUserSession()

  let queryParams = 'logout=true'
  if (information) {
    queryParams = `information=${information}`
  }

  navigateTo(`/login?${queryParams}`)
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <h1>Saindo...</h1>
  </div>
</template>

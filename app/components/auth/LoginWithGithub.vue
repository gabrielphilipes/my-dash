<template>
  <UButton
    color="neutral"
    variant="outline"
    size="xs"
    class="flex items-center gap-2 cursor-pointer"
    @click="handleGithubLogin"
  >
    <Icon name="mdi:github" class="text-xl text-[#24292e]" />
    GitHub
  </UButton>
</template>

<script setup lang="ts">
  const handleGithubLogin = () => {
    window.location.href = '/auth/github'
  }
</script>

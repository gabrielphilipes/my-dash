<template>
  <UButton color="gray" variant="soft" class="w-full" @click="handleGithubLogin">
    <UIcon name="i-simple-icons-github" class="h-5 w-5" />
  </UButton>
</template>

<script setup lang="ts">
  const handleGithubLogin = () => {
    // Implementar redirecionamento para autenticação do GitHub
    window.location.href = '/api/auth/github'
  }
</script>

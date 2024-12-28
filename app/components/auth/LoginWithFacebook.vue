<template>
  <UButton
    color="neutral"
    variant="outline"
    class="flex items-center gap-2 cursor-not-allowed !opacity-60"
    size="xs"
    disabled
    @click="handleFacebookLogin"
  >
    <Icon name="mdi:facebook" class="text-xl text-[#1877f2]" />
    Facebook
  </UButton>
</template>

<script setup lang="ts">
  const handleFacebookLogin = () => {
    window.location.href = '/auth/facebook'
  }
</script>

<template>
  <div class="flex min-h-screen items-center justify-center flex-col gap-4">
    <template v-if="user">
      <UCard>
        <div class="flex flex-col items-center gap-4">
          <UAvatar v-if="user.avatar" :src="user.avatar" :alt="user.name || ''" size="lg" />

          <div class="text-center">
            <h2 class="text-lg font-semibold">{{ user.name }}</h2>
            <p class="text-gray-500">{{ user.email }}</p>
            <p v-if="user.login" class="text-sm text-gray-400">@{{ user.login }}</p>
          </div>

          <UButton color="red" variant="soft" @click="logout"> Sair </UButton>
        </div>
      </UCard>

      <pre class="text-xs p-3 bg-yellow-100 border border-yellow-300 border-dashed rounded-md">{{
        user
      }}</pre>
    </template>

    <template v-else>
      <LoginWithGithub />
    </template>
  </div>
</template>

<script setup lang="ts">
  const { user, clear } = useUserSession()

  const logout = async () => {
    await clear()
    navigateTo('/')
  }
</script>

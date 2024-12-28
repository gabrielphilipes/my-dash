<template>
  <div class="flex min-h-screen items-center justify-center">
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
    </template>

    <template v-else>
      <UCard>
        <h1 class="text-xl font-bold text-center">Bem-vindo!</h1>
        <p class="text-gray-500 mt-2 text-center">Faça login para continuar</p>
        <div class="mt-4">
          <UButton to="/entrar" block> Entrar </UButton>
        </div>
      </UCard>
    </template>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  })

  const { user, clear } = useUserSession()

  const logout = async () => {
    await clear()
    navigateTo('/entrar')
  }
</script>

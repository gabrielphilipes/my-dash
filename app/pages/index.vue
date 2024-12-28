<template>
  <div class="flex min-h-screen items-center justify-center">
    <template v-if="user">
      <UCard>
        <div class="flex flex-col items-center gap-4">
          <UAvatar :src="user.avatarUrl || ''" :alt="user.name || ''" size="lg" />

          <div class="text-center">
            <h2 class="text-lg font-semibold">{{ user.name }}</h2>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>

          <UButton color="error" variant="soft" @click="logout"> Sair </UButton>
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
  import type { SelectUser } from '~~/server/database/schema'

  const { user: userSession, clear } = useUserSession()

  const user = userSession.value as SelectUser | null

  const logout = async () => {
    await clear()
    navigateTo('/entrar')
  }
</script>

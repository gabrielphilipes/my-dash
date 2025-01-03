<template>
  <AppPageHeader title="Seja bem-vindo(a) de volta 👋🏻" />

  <pre>{{ modalRegisterTeam }}</pre>

  <AppDashboardRegisterTeam />
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'app'
  })

  const modalRegisterTeam = useState('modalRegisterTeam')

  import type { SelectUser } from '~~/server/database/schema'

  const { user: userSession, clear } = useUserSession()

  const user = userSession.value as SelectUser | null

  const logout = async () => {
    await clear()
    navigateTo('/entrar')
  }
</script>

<script setup lang="ts">
  import type { DropdownMenuItem } from '@nuxt/ui'
  import { navLinksFooter } from '~/utils/links.ts'

  const dropdownUserOpen = ref<boolean>(false)

  const dropdownItems = ref<DropdownMenuItem[]>([
    {
      label: 'Perfil',
      icon: 'i-lucide-user'
    },
    {
      label: 'Configurações',
      icon: 'i-lucide-cog'
    },
    {
      type: 'separator'
    },
    {
      label: 'Sair da conta',
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect: () => handleLogout()
    }
  ])

  const handleLogout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })

    const { clear } = useUserSession()
    await clear()

    navigateTo('/login?logout=true')
  }
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="navLinksFooter"
    :ui="{
      link: 'no-underline text-xs rounded-[calc(var(--ui-radius)*1.5)]'
    }"
  />

  <UDropdownMenu
    v-model:open="dropdownUserOpen"
    :items="dropdownItems"
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8
    }"
    :ui="{ content: 'w-48' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      type="button"
      class="flex items-center justify-between gap-2 w-full"
    >
      <div class="flex flex-1 items-center gap-2">
        <UAvatar
          alt="John Doe"
          title="John Doe"
          aria-label="John Doe"
          src="https://picsum.photos/200"
          class="rounded-lg"
        />
        <span class="text-sm font-medium truncate max-w-[130px]"> John Doe </span>
      </div>

      <UIcon
        name="ic:sharp-keyboard-arrow-down"
        size="16"
        class="my_transition"
        :class="dropdownUserOpen ? 'rotate-180' : ''"
      />
    </UButton>
  </UDropdownMenu>
</template>

<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'bg-gray-800 ring-gray-700',
      item: 'text-white hover:bg-gray-700 hover:text-white rounded-md group',
      itemLabel: 'text-white',
      itemLeadingIcon: 'group-data-[highlighted]:text-white',
      separator: 'bg-gray-700'
    }"
  >
    <UButton variant="ghost" class="w-full justify-start text-white cursor-pointer">
      <UAvatar
        :src="user?.avatarUrl || ''"
        :alt="user?.name"
        :size="size"
        :class="{ 'mr-2': showInfo }"
      />

      <div v-if="showInfo && user" class="flex flex-col items-start">
        <h2 class="text-sm font-bold">{{ user.name }}</h2>
        <span class="text-xs text-gray-400">{{ user.email }}</span>
      </div>
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
  import type { DropdownMenuItem } from '#ui/types'
  import type { SelectUser } from '~~/server/database/schema'

  interface Props {
    size?: 'sm' | 'md'
    showInfo?: boolean
  }

  withDefaults(defineProps<Props>(), {
    size: 'sm',
    showInfo: true
  })

  const { t } = useI18n()
  const { user: userSession } = useUserSession()
  const user = userSession.value as SelectUser | null

  const items: DropdownMenuItem[] = [
    {
      label: t('userMenu.myAccount'),
      icon: 'i-heroicons-user-circle',
      to: '/settings/profile'
    },
    { type: 'separator' },
    {
      label: t('userMenu.termsOfUse'),
      icon: 'i-heroicons-document-text',
      to: '/compliance/termos-de-uso'
    },
    {
      label: t('userMenu.sendFeedback'),
      icon: 'i-heroicons-chat-bubble-left-right',
      to: '/feedback'
    },
    { type: 'separator' },
    {
      label: t('userMenu.logout'),
      icon: 'i-heroicons-arrow-right-on-rectangle',
      onSelect: (event) => {
        event.preventDefault()
        window.location.href = '/sair'
      }
    }
  ]
</script>

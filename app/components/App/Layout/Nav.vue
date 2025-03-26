<script setup lang="ts">
  import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'

  const items = ref<NavigationMenuItem[][]>([
    [
      {
        label: 'Home',
        type: 'label'
      },
      {
        label: 'Guide',
        icon: 'i-lucide-book-open',
        to: '/getting-started'
      },
      {
        label: 'Composables',
        icon: 'i-lucide-database',
        to: '/composables'
      },
      {
        label: 'Components',
        icon: 'i-lucide-box',
        to: '/components',
        active: true
      }
    ]
  ])

  const navFooter = ref<NavigationMenuItem[][]>([
    [
      {
        label: 'Composables',
        icon: 'i-lucide-database',
        to: '/composables'
      },
      {
        label: 'Components',
        icon: 'i-lucide-box',
        to: '/components'
      }
    ]
  ])

  const dropdownItems = ref<DropdownMenuItem[]>([
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog'
    }
  ])

  const dropdownUserOpen = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-col px-3 py-2 h-full">
    <div class="flex flex-col flex-1">
      <header>
        <AppLayoutLogo />
      </header>

      <UNavigationMenu
        orientation="vertical"
        :items="items"
        :ui="{
          label: '-mb-1.5 mt-3',
          link: 'no-underline text-sm data-[active]:text-neutral-900 dark:data-[active]:text-neutral-50 dark:data-[active]:bg-neutral-900 rounded-[calc(var(--ui-radius)*1.5)]',
          linkLeadingIcon:
            'group-data-[active]:text-neutral-900 dark:group-data-[active]:text-neutral-50'
        }"
      />
    </div>

    <div class="flex flex-col gap-4">
      <UNavigationMenu
        orientation="vertical"
        :items="navFooter"
        :ui="{
          link: 'no-underline text-xs rounded-[calc(var(--ui-radius)*1.5)]'
        }"
      />

      <UDropdownMenu
        :items="dropdownItems"
        :content="{
          align: 'start',
          side: 'bottom',
          sideOffset: 8
        }"
        :ui="{ content: 'w-48' }"
        v-model:open="dropdownUserOpen"
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
              src="https://github.com/shadcn.png"
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
    </div>
  </div>
</template>

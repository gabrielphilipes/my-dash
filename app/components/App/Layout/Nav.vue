<script setup lang="ts">
  import type { NavigationMenuItem, SelectItem } from '@nuxt/ui'
  import { navLinksHeader, navLinksFooter, dropdownItems } from '~/utils/links'

  const dropdownUserOpen = ref<boolean>(false)

  const teams = ref<SelectItem[]>([
    {
      label: 'SpaceX',
      value: 'spacex',
      avatar: { src: 'https://picsum.photos/200/300', alt: 'SpaceX' }
    },
    {
      label: 'Tiggers',
      value: 'tiggers',
      avatar: { src: 'https://picsum.photos/200/300', alt: 'Tiggers' }
    },
    {
      label: 'Blue',
      value: 'blue',
      avatar: { src: 'https://picsum.photos/200/300', alt: 'Blue' }
    }
  ])
  const teamSelected = ref<string>(teams.value[0].value) // TODO: Or get from local storage
  const teamSelectedAvatar = computed(
    () => teams.value.find((t) => t.value === teamSelected.value)?.avatar
  )
  const onChangeTeam = (value: string) => {
    // TODO: Save on local storage
    teamSelected.value = value
    console.log(`Team selected: ${value}`)
  }
</script>

<template>
  <div class="flex flex-col px-3 py-2 h-full">
    <div class="flex flex-col flex-1">
      <header>
        <AppLayoutLogo />
      </header>

      <USelect
        :items="teams"
        v-model="teamSelected"
        :avatar="teamSelectedAvatar"
        @update:model-value="onChangeTeam"
        label="Equipe"
        placeholder="Selecione sua equipe"
        class="mt-1"
      />

      <UNavigationMenu
        orientation="vertical"
        :items="navLinksHeader"
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
        :items="navLinksFooter"
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
    </div>
  </div>
</template>

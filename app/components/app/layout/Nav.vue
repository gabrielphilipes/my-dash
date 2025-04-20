<script setup lang="ts">
  import type { SelectItem } from '@nuxt/ui'
  import { navLinksHeader } from '~/utils/links.ts'

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
        v-model="teamSelected"
        :items="teams"
        :avatar="teamSelectedAvatar"
        label="Equipe"
        placeholder="Selecione sua equipe"
        class="mt-1"
        @update:model-value="onChangeTeam"
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
      <AppLayoutNavBottom />
    </div>
  </div>
</template>

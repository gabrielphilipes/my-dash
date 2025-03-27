<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  defineProps<{
    navItems: NavigationMenuItem[]
    title: string
    description: string
    date: string
  }>()
</script>

<template>
  <div class="flex flex-col">
    <UNavigationMenu
      :items="navItems"
      class="justify-center border-b border-neutral-200 dark:border-neutral-700"
      :ui="{
        link: 'no-underline data-[active]:text-neutral-900 dark:data-[active]:text-neutral-50 dark:data-[active]:bg-neutral-900',
        linkLeadingIcon:
          'group-data-[active]:text-neutral-900 dark:group-data-[active]:text-neutral-50'
      }"
    />

    <section class="flex flex-col">
      <header
        class="flex flex-col justify-center items-center text-center gap-2 py-15 bg-primary-500 text-sm text-white"
      >
        <h1 class="w-11/12 lg:w-4xl xl:w-5xl mx-auto text-3xl font-bold">{{ title }}</h1>
        <p class="w-11/12 lg:w-4xl xl:w-5xl mx-auto text-sm">{{ description }}</p>
        <span class="inline-block px-3 py-0.5 rounded-md border border-white text-xs">
          {{ date }}
        </span>
      </header>
    </section>

    <div class="w-11/12 md:max-w-3xl mx-auto my-10">
      <slot />
    </div>
  </div>
</template>

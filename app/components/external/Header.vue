<template>
  <header class="mb-24">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <UIcon name="i-heroicons-bolt" class="h-8 w-8 text-primary-500" />
        <h1 class="text-xl font-bold text-black">Catalyst</h1>
      </div>

      <div class="hidden md:block">
        <UNavigationMenu color="neutral" variant="link" :items="menuItems" />
      </div>

      <div>
        <UButton>Entrar</UButton>
      </div>
    </div>

    <div class="mt-4 text-center border-t border-gray-200 py-4 md:hidden">
      <UNavigationMenu orientation="vertical" color="neutral" variant="link" :items="menuItems" />
    </div>
  </header>
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from '#ui/types'

  defineProps<{ menuItems: NavigationMenuItem[] }>()
</script>

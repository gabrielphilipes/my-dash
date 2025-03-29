<template>
  <UButton
    to="/"
    variant="ghost"
    color="neutral"
    class="flex items-center gap-2 no-underline p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-50 group"
  >
    <div class="flex items-center justify-center size-8 rounded-md bg-neutral-600 text-white">
      <UIcon name="i-lucide-menu" size="20" />
    </div>

    <h1 class="font-bold">{{ useAppConfig().site_name }}</h1>
  </UButton>
</template>

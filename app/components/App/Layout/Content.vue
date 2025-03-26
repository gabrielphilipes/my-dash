<script setup lang="ts">
  const props = defineProps<{
    title?: string
    description?: string
    back?: string
  }>()
</script>

<template>
  <section
    class="bg-white dark:bg-neutral-900 shadow-xs dark:border-neutral-800 md:rounded-lg text-sm"
  >
    <header class="flex flex-col px-3 py-2 border-b border-neutral-100 dark:border-neutral-800">
      <div class="flex items-center gap-2">
        <UButton
          v-if="props.back"
          variant="ghost"
          color="neutral"
          size="sm"
          leading-icon="i-lucide-arrow-left"
          :to="props.back"
          class="hover:text-(--ui-text)"
        />

        <h1 class="font-bold">{{ props.title }}</h1>
      </div>

      <p class="text-xs text-neutral-400">{{ props.description }}</p>
    </header>

    <div class="px-3 py-2">
      <slot />
    </div>
  </section>
</template>

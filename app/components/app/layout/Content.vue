<script setup lang="ts">
  const props = defineProps<{
    title?: string
    description?: string
  }>()
</script>

<template>
  <section
    class="bg-white dark:bg-neutral-900 shadow-xs dark:border-neutral-800 md:rounded-lg text-sm"
  >
    <header
      class="flex flex-wrap justify-between items-center px-3 py-2 border-b border-neutral-100 dark:border-neutral-800"
    >
      <div>
        <h1 class="font-bold" v-if="props.title">{{ props.title }}</h1>
        <p class="text-xs text-neutral-400" v-if="props.description">{{ props.description }}</p>
      </div>

      <div>
        <slot name="actions" />
      </div>
    </header>

    <div class="px-3 py-2">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title?: string
    description?: string
  }>()
</script>

<template>
  <main class="h-screen flex flex-col md:items-center md:justify-center">
    <section
      class="flex-1 flex flex-col items-center justify-center w-10/12 mt-40 mx-auto md:max-w-xl md:m-0"
    >
      <header class="text-center block mb-10">
        <AuthLogo />

        <h1 class="text-4xl font-bold">{{ props.title }}</h1>

        <p class="text-sm text-neutral-500">
          {{ props.description }}
        </p>
      </header>

      <div class="flex flex-col gap-5 w-full">
        <slot />

        <div v-if="$slots?.bottomHTML" class="flex justify-center text-xs font-medium mt-4">
          <div class="flex items-center gap-1 text-neutral-400">
            <slot name="bottomHTML" />
          </div>
        </div>
      </div>
    </section>

    <AuthFooter />
  </main>
</template>

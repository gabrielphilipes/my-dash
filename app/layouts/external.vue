<script setup lang="ts">
  const userIsLogged = ref<boolean>(true) // TODO: implement userIsLogged
</script>

<template>
  <main class="flex flex-col h-screen">
    <header
      class="w-full py-3 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700"
    >
      <div class="flex items-center justify-between w-11/12 lg:w-4xl xl:w-5xl mx-auto">
        <AppLayoutLogo />

        <div>
          <UButton v-if="!userIsLogged" label="Acessar conta" icon="i-lucide-user" />
          <UButton v-else label="Dashboard" icon="i-lucide-home" />
        </div>
      </div>
    </header>

    <slot />

    <AuthFooter />
  </main>
</template>

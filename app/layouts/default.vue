<script setup lang="ts">
  const openMenuMobile = ref<boolean>(false)
</script>

<template>
  <main
    class="flex flex-col md:flex-row items-start md:justify-start md:gap-10 flex-wrap min-h-screen bg-neutral-50 dark:bg-neutral-800"
  >
    <aside class="md:min-h-screen">
      <div
        class="fixed flex md:!hidden items-center justify-between gap-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-4 w-full"
      >
        <AppLayoutLogo />

        <div>
          <UButton variant="ghost" color="neutral" @click="openMenuMobile = !openMenuMobile">
            <UIcon name="i-lucide-menu" size="20" />
          </UButton>
        </div>

        <USlideover v-model:open="openMenuMobile" class="md:!hidden max-w-2/3" side="left">
          <template #content>
            <AppLayoutNav />
          </template>
        </USlideover>
      </div>

      <div class="!hidden md:!block w-[240px] h-screen">
        <AppLayoutNav />
      </div>
    </aside>

    <div class="flex flex-col gap-10 mt-24 md:mt-2 w-full mx-auto mb-10 md:flex-1 md:pr-5">
      <section
        class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 md:rounded-lg text-sm"
      >
        <slot />
      </section>

      <footer
        class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 w-full mb-10 opacity-50 hover:opacity-100 my_transition"
      >
        <div class="text-center md:text-left">
          <p class="block mb-2 ml-2 text-neutral-400 text-xs">
            {{ useAppConfig().site_name }} {{ new Date().getFullYear() }}
            &copy; Todos os direitos reservados
          </p>

          <ul class="flex items-center justify-center gap-2">
            <li>
              <UButton
                label="Termos de uso"
                variant="link"
                to="/terms"
                external
                size="xs"
                icon="i-lucide-external-link"
                class="text-neutral-400 no-underline"
              />
            </li>

            <li>
              <UButton
                label="Política de privacidade"
                variant="link"
                to="/privacy"
                external
                size="xs"
                icon="i-lucide-external-link"
                class="text-neutral-400 no-underline"
              />
            </li>
          </ul>
        </div>

        <SwitchDarkMode />
      </footer>
    </div>
  </main>
</template>

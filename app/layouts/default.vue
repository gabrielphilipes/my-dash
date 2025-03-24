<template>
  <main
    class="flex flex-col md:flex-row md:items-start md:justify-start md:gap-10 flex-wrap min-h-screen bg-zinc-100 dark:bg-zinc-800"
  >
    <aside>
      <div
        class="fixed flex md:!hidden items-center justify-between gap-4 bg-white p-4 w-full shadow-md"
      >
        <div>
          <img src="https://placehold.co/100x100" alt="Logo" class="w-10 h-10 rounded-full" />
        </div>

        <div>
          <UButton icon="i-lucide-menu" variant="ghost" class="rounded-full" />
        </div>
      </div>

      <div class="!hidden md:!block w-[240px] mt-2">
        <p>Menu</p>
      </div>
    </aside>

    <div
      class="flex flex-col gap-10 mt-24 md:mt-2 w-11/12 mx-auto mb-10 md:flex-1 md:pr-10 md:max-w-5xl xl:max-w-7xl"
    >
      <section
        class="bg-white dark:bg-zinc-900 shadow-xs border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm"
      >
        <slot />
      </section>

      <footer
        class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 w-full mb-10 opacity-50 hover:opacity-100 my_transition"
      >
        <div class="text-center md:text-left">
          <p class="block mb-2 ml-2 text-zinc-400 text-xs">
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
                class="text-zinc-400 no-underline"
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
                class="text-zinc-400 no-underline"
              />
            </li>
          </ul>
        </div>

        <SwitchDarkMode />
      </footer>
    </div>
  </main>
</template>

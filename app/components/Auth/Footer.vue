<template>
  <footer class="flex items-center justify-center w-full py-5 bg-neutral-100 dark:bg-neutral-800">
    <div
      class="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between w-10/12 md:w-11/12 md:mx-auto lg:w-4xl xl:w-5xl"
    >
      <p class="text-neutral-400 text-xs text-center">
        &copy; {{ new Date().getFullYear() }} {{ useAppConfig().site_name }}. Todos os direitos
        reservados.
      </p>

      <SwitchDarkMode />
    </div>
  </footer>
</template>

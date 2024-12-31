<template>
  <main class="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <div class="flex flex-col items-center justify-center flex-1 w-full">
      <header class="mb-5 pt-14">
        <h1 class="text-gray-700 font-bold text-2xl">My Dash</h1>
      </header>

      <div class="p-4 w-full max-w-md">
        <slot />
      </div>
    </div>

    <footer
      class="w-full flex flex-col text-center justify-center mb-5 mt-32 text-xs text-gray-400"
    >
      <ul class="flex gap-4 justify-center mb-4">
        <li>
          <a href="/compliance/termos-de-uso">{{ $t('auth.footer.termsOfUse') }}</a>
        </li>

        <li>
          <a href="/compliance/politica-de-privacidade">{{ $t('auth.footer.privacyPolicy') }}</a>
        </li>
      </ul>

      <span class="block">© 2024 My Dash</span>
    </footer>
  </main>
</template>

<template>
  <UContainer class="min-h-screen max-w-[1728px]">
    <aside class="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-gray-900 md:block">
      <div class="flex h-full flex-col justify-between">
        <div class="space-y-4 p-4">
          <div class="flex items-center space-x-2 border-b pb-4">
            <UIcon name="fluent:task-list-ltr-24-filled" class="h-8 w-8 text-primary-500" />
            <h1 class="text-xl font-bold text-white">{{ siteData.name }}</h1>
          </div>

          <AppLayoutNav />
        </div>

        <!-- Rodapé da Sidebar -->
        <div class="border-t border-gray-800 p-4">
          <AppLayoutUserDropdown />
        </div>
      </div>
    </aside>

    <!-- Header Mobile -->
    <div class="fixed left-0 right-0 top-0 z-30 border-b border-gray-800 bg-gray-900 md:hidden">
      <div class="flex h-16 items-center justify-between px-4">
        <div>
          <USlideover
            side="left"
            :ui="{
              body: 'bg-gray-900',
              header: 'bg-gray-900',
              footer: 'bg-gray-900',
              content: 'divide-gray-800'
            }"
            v-model:open="isSidebarOpen"
          >
            <UButton icon="i-heroicons-bars-3" variant="ghost" @click="isSidebarOpen = true" />

            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-bolt" class="h-8 w-8 text-primary-500" />
                  <h1 class="text-xl font-bold text-white">Catalyst</h1>
                </div>

                <UButton icon="i-heroicons-x-mark" variant="ghost" @click="isSidebarOpen = false" />
              </div>
            </template>

            <template #body class="bg-gray-900">
              <AppLayoutNav />
            </template>

            <template #footer>
              <AppLayoutUserDropdown />
            </template>
          </USlideover>
        </div>

        <UIcon name="i-heroicons-bolt" class="h-8 w-8 text-primary-500" />

        <AppLayoutUserDropdown :show-info="false" class="!w-auto" />
      </div>
    </div>

    <main class="mt-16 md:ml-64 md:mt-0">
      <slot />
    </main>

    <footer
      class="mt-36 mb-10 md:ml-64 border-t border-gray-200 pt-10 opacity-50 hover:opacity-100 transition-opacity duration-300"
    >
      <div class="flex items-center justify-between">
        <UNavigationMenu color="neutral" variant="link" :items="menuItems" />

        <UButton
          variant="ghost"
          color="neutral"
          icon="i-heroicons-arrow-up-on-square"
          class="text-sm cursor-pointer"
          @click="scrollToTop"
        >
          {{ $t('layoutDashboard.backToTop') }}
        </UButton>
      </div>

      <span class="block text-center text-sm text-gray-500 mt-24"
        >© {{ siteData.year }} - {{ siteData.name }}</span
      >
    </footer>
  </UContainer>

  <AppModalRegisterTeam />
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from '#ui/types'

  const isSidebarOpen = ref(false)

  const { t } = useI18n()

  const menuItems: NavigationMenuItem[] = [
    {
      label: t('compliance.menu.termsOfUse'),
      target: '_blank',
      to: '/compliance/termos-de-uso'
    },
    {
      label: t('compliance.menu.privacyPolicy'),
      target: '_blank',
      to: '/compliance/politica-de-privacidade'
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

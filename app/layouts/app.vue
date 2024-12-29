<template>
  <UContainer class="min-h-screen">
    <aside class="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-gray-900 md:block">
      <div class="flex h-full flex-col justify-between">
        <div class="space-y-4 p-4">
          <div class="flex items-center space-x-2 border-b pb-4">
            <UIcon name="i-heroicons-bolt" class="h-8 w-8 text-primary-500" />
            <h1 class="text-xl font-bold text-white">Catalyst</h1>
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

    <main class="lg:ml-64">
      <div class="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <slot />
      </div>
    </main>
  </UContainer>
</template>

<script setup lang="ts">
  const isSidebarOpen = ref(false)
</script>

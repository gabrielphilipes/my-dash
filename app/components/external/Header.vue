<template>
  <header class="mb-24">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <UIcon name="fluent:task-list-ltr-24-filled" class="h-8 w-8 text-primary-500" />
        <h1 class="text-xl font-bold text-black">{{ siteData.name }}</h1>
      </div>

      <div class="hidden md:block">
        <UNavigationMenu color="neutral" variant="link" :items="menuItems" />
      </div>

      <div>
        <UButton v-if="!loggedIn" to="/entrar">{{ t('auth.login.form.submit') }}</UButton>

        <template v-else>
          <div class="flex items-center space-x-2">
            <UButton to="/" icon="material-symbols:arrow-outward" variant="soft">Dashboard</UButton>
            <UButton
              @click="logout"
              icon="material-symbols:logout"
              variant="link"
              :title="t('userMenu.logout')"
              color="neutral"
              class="hover:text-red-500"
            />
          </div>
        </template>
      </div>
    </div>

    <div class="mt-4 text-center border-t border-gray-200 py-4 md:hidden">
      <UNavigationMenu orientation="vertical" color="neutral" variant="link" :items="menuItems" />
    </div>
  </header>
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from '#ui/types'

  defineProps<{ menuItems: NavigationMenuItem[] }>()

  const { loggedIn } = useUserSession()
  const { t } = useI18n()

  const logout = () => {
    window.location.href = '/sair'
  }
</script>

<template>
  <ExternalHeader :menu-items="menuItems" />

  <ExternalComplianceSelectLocale />

  <main class="md:max-w-screen-md mx-auto">
    <header class="block mb-10">
      <h1 class="text-5xl font-bold mb-2">{{ t('compliance.privacyPolicy.title') }}</h1>
      <span class="text-sm text-gray-500">
        {{ t('compliance.privacyPolicy.lastUpdated') }}: {{ privacyPolicy.lastUpdated }}
      </span>
    </header>

    <ContentRenderer :value="privacyPolicy" class="space-y-4" />
  </main>
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from '#ui/types'

  const { locale, t } = useI18n()

  definePageMeta({ layout: 'external' })

  const menuItems: NavigationMenuItem[] = [
    {
      label: t('compliance.menu.termsOfUse'),
      to: '/compliance/termos-de-uso'
    },
    {
      label: t('compliance.menu.privacyPolicy'),
      to: '/compliance/politica-de-privacidade'
    }
  ]

  const privacyPolicy = await queryContent(
    `/privacy-policy-${locale.value.toLowerCase()}`
  ).findOne()
</script>

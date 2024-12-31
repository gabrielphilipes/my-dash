<template>
  <div class="flex justify-center space-x-2 items-center mx-auto mb-10">
    <div v-for="locale in locales" :key="locale">
      <UButton
        :variant="locale.code === activeLocale ? 'soft' : 'ghost'"
        :disabled="locale.code === activeLocale"
        size="sm"
        :label="`${locale.flag} ${locale.name}`"
        @click="onClick(locale.code)"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { locales, locale: activeLocale, setLocale } = useI18n()

  const onClick = (locale: string) => {
    setLocale(locale as any)
    window.location.reload()
  }
</script>

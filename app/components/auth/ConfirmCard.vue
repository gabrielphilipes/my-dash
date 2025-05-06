<script setup lang="ts">
  const props = defineProps<{
    title?: string
    description?: string
    icon?: string
  }>()

  const title = props.title ?? 'Confirme seu e-mail!'
  const description =
    props.description ??
    'Para confirmar sua conta e acessar o sistema, acesse seu e-mail e clique no link de confirmação.'

  const icon = props.icon ?? 'material-symbols:mark-email-read'
</script>

<template>
  <UCard variant="soft">
    <div class="flex flex-col items-center gap-4 p-4">
      <UIcon :name="icon" class="text-4xl text-primary" />
      <h1 class="text-lg font-medium text-center">{{ title }}</h1>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        <span v-html="description" />
      </p>
    </div>
  </UCard>
</template>

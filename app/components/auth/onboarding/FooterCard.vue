<script setup lang="ts">
  const props = defineProps<{
    stepper?: {
      hasPrev?: boolean
      hasNext?: boolean
      currentStep?: number
    }
    loading?: boolean
    isValid?: boolean
  }>()

  const currentStep = computed(() => props.stepper?.currentStep ?? 1)

  const emit = defineEmits<{
    (e: 'prev' | 'next' | 'submit'): void
  }>()
</script>

<template>
  <div
    class="flex"
    :class="{
      '!justify-between': currentStep !== 1,
      '!justify-end': currentStep === 1
    }"
  >
    <UButton
      v-if="currentStep > 1 && currentStep < 3"
      variant="link"
      color="neutral"
      label="Voltar"
      icon="material-symbols:arrow-back-rounded"
      size="xs"
      :disabled="props.loading"
      @click="emit('prev')"
    />

    <UButton
      v-if="currentStep !== 3"
      label="Próxima etapa"
      :disabled="props.loading || !props.isValid"
      :loading="props.loading"
      @click="emit('next')"
    />
    <UButton
      v-if="currentStep === 3"
      label="Acessar o sistema"
      class="w-full justify-center no-underline hover:text-white dark:hover:text-black"
      to="/"
    />
  </div>
</template>

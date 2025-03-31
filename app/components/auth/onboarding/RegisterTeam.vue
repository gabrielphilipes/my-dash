<script setup lang="ts">
  import { TeamSchema, type TeamSchemaType } from '~~/server/validations/team'

  const props = defineProps<{
    stepper?: {
      hasPrev?: boolean
      hasNext?: boolean
      currentStep?: number
    }
  }>()

  const emit = defineEmits<{
    (e: 'prev' | 'next' | 'submit'): void
  }>()

  const state = reactive<TeamSchemaType>({ name: '' })
  const isValid = computed<boolean>(() => TeamSchema.safeParse(state).success)
  const loading = ref<boolean>(false)

  const handleNext = async () => {
    if (!isValid.value) return

    loading.value = true

    try {
      // Simulando uma requisição API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      emit('next')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <UCard>
    <UForm :schema="TeamSchema" :state="state" class="flex flex-col gap-4">
      <UFormField name="name" label="Nome da equipe" required>
        <UInput
          v-model="state.name"
          type="text"
          autofocus
          placeholder="Ex.: 'Equipe de Marketing', 'Desenvolvimento Frontend', 'Suporte'"
          class="block"
          :disabled="loading"
        />
      </UFormField>
    </UForm>

    <template #footer>
      <AuthOnboardingFooterCard
        :stepper="props.stepper"
        :loading="loading"
        :is-valid="isValid"
        :current-step="props.stepper?.currentStep"
        @prev="emit('prev')"
        @next="handleNext"
      />
    </template>
  </UCard>
</template>

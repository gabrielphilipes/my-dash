<script setup lang="ts">
  import { InviteMembersSchema } from '~~/server/validations/users'

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

  const loading = ref<boolean>(false)
  const state = reactive<{ members: string }>({ members: '' })
  const isValid = computed<boolean>(() => InviteMembersSchema.safeParse(state).success)

  const handleNext = async () => {
    if (state.members.length === 0) {
      emit('next')
      return
    }

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
    <UForm :schema="InviteMembersSchema" :state="state" class="flex flex-col gap-4">
      <UFormField
        name="members"
        label="Convidar membros"
        optional
        description="Digite os emails abaixo, para convidar membros para a sua equipe."
      >
        <UInput
          v-model="state.members"
          :placeholder="`Divida os emails por vírgula ex.: 'gabriel@${useAppConfig().site_name.toLowerCase()}.com, marina@${useAppConfig().site_name.toLowerCase()}.com'`"
          autofocus
          class="block"
          :disabled="loading"
        />
      </UFormField>
    </UForm>

    <template #footer>
      <AuthOnboardingFooterCard
        :stepper="props.stepper"
        :current-step="props.stepper?.currentStep"
        :loading="loading"
        :is-valid="isValid"
        @prev="emit('prev')"
        @next="handleNext"
      />
    </template>
  </UCard>
</template>

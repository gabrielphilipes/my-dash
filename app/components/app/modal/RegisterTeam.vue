<template>
  <UModal
    v-model:open="modalRegisterTeam"
    title="Cadastrar time"
    description="Ao cadastrar você poderá acrescentar membros e gerenciar suas atividades."
  >
    <template #body>
      <UForm
        :schema="RegisterTeamSchema"
        :state="state"
        @submit="handleRegisterTeam"
        class="flex flex-col gap-4"
        ref="form"
      >
        <div>
          <UFormField name="name" label="Nome do time" required>
            <UInput v-model="state.name" placeholder="Ex: landing page" class="w-full" />
          </UFormField>
        </div>

        <UFormField name="description" label="Descrição do time">
          <UTextarea v-model="state.description" placeholder="Descrição do time" class="w-full" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex justify-end w-full gap-2">
        <UButton
          color="primary"
          type="submit"
          @click="form?.submit"
          :disabled="!isValid"
          :loading="isLoading"
        >
          Cadastrar
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui'
  import { RegisterTeamSchema } from '~~/server/validations/teams'
  import type { RegisterTeamSchema as RegisterTeamSchemaType } from '~~/server/validations/teams'

  const modalRegisterTeam = useState('modalRegisterTeam', () => true)

  const state = reactive({ name: '', description: '' })
  const form = useTemplateRef('form')

  const isValid = computed(() => RegisterTeamSchema.safeParse(state).success)
  const isLoading = ref(false)

  const handleRegisterTeam = async (event: FormSubmitEvent<RegisterTeamSchemaType>) => {
    const input = event.data
    isLoading.value = true
    console.log(input)
    isLoading.value = false
  }
</script>

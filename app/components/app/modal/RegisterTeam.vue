<template>
  <UModal
    v-model:open="modalRegisterTeam"
    title="Cadastrar time"
    description="Ao cadastrar você poderá acrescentar membros e gerenciar suas atividades."
  >
    <template #body>
      <UForm
        :schema="RegisterTeamSchema(t)"
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
  import { toast } from 'vue-sonner'
  import { RegisterTeamSchema } from '~~/server/validations/teams'
  import type { RegisterTeamSchema as RegisterTeamSchemaType } from '~~/server/validations/teams'
  import type { SelectTeam } from '~~/server/database/schema'
  const { t } = useI18n()

  const modalRegisterTeam = useState('modalRegisterTeam', () => false)

  const state = reactive({ name: '', description: '' })
  const form = useTemplateRef('form')

  const teamsStore = useTeamsStore()

  const isValid = computed(() => RegisterTeamSchema(t).safeParse(state).success)
  const isLoading = ref(false)

  const handleRegisterTeam = async (event: FormSubmitEvent<RegisterTeamSchemaType>) => {
    const input = event.data

    try {
      const response: { team: SelectTeam } = await $fetch('/api/teams', {
        method: 'POST',
        body: input
      })

      teamsStore.teams.push(response.team)

      toast.success('Time cadastrado com sucesso')

      modalRegisterTeam.value = false
      setTimeout(() => (isLoading.value = false), 2000)
    } catch (error) {
      console.log(error)
      isLoading.value = false
    }
  }
</script>

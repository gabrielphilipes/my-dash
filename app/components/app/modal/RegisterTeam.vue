<template>
  <UModal
    v-model:open="modalRegisterTeam"
    :title="$t('dashboard.team.modal.title')"
    :description="$t('dashboard.team.modal.description')"
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
          <UFormField name="name" :label="$t('dashboard.team.modal.form.name.label')" required>
            <UInput
              v-model="state.name"
              :placeholder="$t('dashboard.team.modal.form.name.placeholder')"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField name="description" :label="$t('dashboard.team.modal.form.description.label')">
          <UTextarea
            v-model="state.description"
            :placeholder="$t('dashboard.team.modal.form.description.placeholder')"
            class="w-full"
          />
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
          {{ $t('dashboard.team.modal.submit') }}
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

      toast.success(t('dashboard.team.modal.success'))

      modalRegisterTeam.value = false
      setTimeout(() => (isLoading.value = false), 2000)
    } catch (error) {
      console.log(error)
      isLoading.value = false
    }
  }
</script>

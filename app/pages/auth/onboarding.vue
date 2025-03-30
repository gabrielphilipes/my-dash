<script setup lang="ts">
  import type { StepperItem } from '@nuxt/ui'
  import RegisterTeam from '~/components/auth/onboarding/RegisterTeam.vue'
  import InviteMembers from '~/components/auth/onboarding/InviteMembers.vue'
  import FinishWelcome from '~/components/auth/onboarding/FinishWelcome.vue'

  const route = useRoute()
  const step: number = Number(route.query?.step ?? 0)
  const loading = ref<boolean>(false)
  const stepper = useTemplateRef('stepper')

  const steps = ref<StepperItem[]>([
    {
      title: 'Cadastrar equipe',
      icon: 'fluent:people-team-20-filled',
      slot: 'RegisterTeam'
    },
    {
      title: 'Membros',
      icon: 'material-symbols:person-add-rounded',
      slot: 'InviteMembers'
    },
    {
      title: 'Finalizar',
      icon: 'material-symbols:bookmark-check-rounded',
      slot: 'FinishWelcome'
    }
  ])

  const componentMaps = {
    RegisterTeam: RegisterTeam,
    InviteMembers: InviteMembers,
    FinishWelcome: FinishWelcome
  }

  const handleSubmit = () => {
    console.log('submit')
    loading.value = true

    setTimeout(() => {
      loading.value = false
    }, 2000)
  }

  useHead({
    title: 'Vamos começar 🚀',
    meta: [
      // TODO: Add the meta tags
    ]
  })

  definePageMeta({ layout: false })
</script>

<template>
  <AuthContent title="Vamos começar 🚀">
    <UStepper ref="stepper" :items="steps" class="w-full" :default-value="step">
      <template #content="{ item }">
        <UCard class="mt-10">
          <Component :is="componentMaps[item.slot]" />

          <template #footer>
            <div
              class="flex"
              :class="{
                '!justify-between': stepper?.hasPrev,
                '!justify-end': !stepper?.hasPrev
              }"
            >
              <UButton
                v-if="stepper?.hasPrev"
                variant="link"
                color="neutral"
                label="Voltar"
                icon="material-symbols:arrow-back-rounded"
                size="xs"
                @click="stepper?.prev()"
              />

              <UButton v-if="stepper?.hasNext" label="Próxima etapa" @click="stepper?.next()" />
              <UButton
                v-if="!stepper?.hasNext"
                :loading="loading"
                :disabled="loading"
                label="Finalizar!"
                @click="handleSubmit"
              />
            </div>
          </template>
        </UCard>
      </template>
    </UStepper>

    <div class="mt-4 flex justify-center opacity-40">
      <UButton
        type="button"
        variant="link"
        color="neutral"
        label="Pular configurações iniciais"
        size="xs"
        to="/"
        class="no-underline"
      />
    </div>
  </AuthContent>
</template>

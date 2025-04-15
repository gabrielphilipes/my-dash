<script setup lang="ts">
  import type { StepperItem } from '@nuxt/ui'
  import RegisterTeam from '~/components/auth/onboarding/RegisterTeam.vue'
  import InviteMembers from '~/components/auth/onboarding/InviteMembers.vue'
  import FinishWelcome from '~/components/auth/onboarding/FinishWelcome.vue'
  import Security from '~/components/auth/onboarding/Security.vue'

  const route = useRoute()
  const step = ref<number>(Number(route.query?.step ?? 1) - 1)
  if (step.value < 0) step.value = 0

  const loading = ref<boolean>(false)
  const stepper = useTemplateRef<{
    hasPrev: boolean
    hasNext: boolean
    prev(): void
    next(): void
  }>('stepper')

  type OnboardingSlot = 'RegisterTeam' | 'InviteMembers' | 'FinishWelcome' | 'Security'
  const steps = ref<(StepperItem & { slot: OnboardingSlot })[]>([
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
      title: 'Segurança',
      icon: 'material-symbols:security-rounded',
      slot: 'Security'
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
    Security: Security,
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

  definePageMeta({ layout: false, middleware: 'app' })
</script>

<template>
  <AuthContent title="Vamos começar 🚀">
    <UStepper ref="stepper" :items="steps" class="w-full" :default-value="step">
      <template #content="{ item }">
        <div class="mt-10">
          <Component
            :is="componentMaps[item.slot]"
            :stepper="
              stepper
                ? {
                    hasPrev: stepper.hasPrev,
                    hasNext: stepper.hasNext,
                    currentStep: steps.findIndex((step) => step.slot === item.slot) + 1
                  }
                : undefined
            "
            @prev="stepper?.prev()"
            @next="stepper?.next()"
            @submit="handleSubmit"
          />
        </div>
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

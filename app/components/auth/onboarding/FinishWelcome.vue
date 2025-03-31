<script setup lang="ts">
  const props = defineProps<{
    stepper: {
      hasPrev: boolean
      hasNext: boolean
      currentStep?: number
    }
  }>()

  const emit = defineEmits<{
    (e: 'prev' | 'next' | 'submit'): void
  }>()
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-2">
      <p>
        Tudo certo! Agora você pode começar a usar o
        <span class="font-bold">{{ useAppConfig().site_name }}!</span> Clique no botão abaixo e
        acesso o dashboard, para iniciar o seu projeto 😁🥳
      </p>

      <p>
        Você pode continuar ajustando suas preferências na página de
        <NuxtLink to="/settings">configurações</NuxtLink>. Ou, ainda, para conhecer mais sobre a
        plataforma, você pode acessar o
        <NuxtLink to="https://github.com/gabrielphilipes/my-dash" target="_blank">GitHub</NuxtLink>.
      </p>

      <p>Seja bem vindo (a) !!!</p>
    </div>

    <template #footer>
      <AuthOnboardingFooterCard
        :stepper="props.stepper"
        :current-step="props.stepper?.currentStep"
        @prev="emit('prev')"
        @next="emit('next')"
        @submit="emit('submit')"
      />
    </template>
  </UCard>
</template>

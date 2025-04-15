<script setup lang="ts">
  import {
    RecoveryPasswordSchema,
    type RecoveryPasswordSchemaType
  } from '~~/server/validations/auth'

  const rememberEmail = useCookie<string | undefined>('my-email')
  const state = ref<RecoveryPasswordSchemaType>({
    email: rememberEmail.value ?? ''
  })

  const isValid = computed<boolean>(() => RecoveryPasswordSchema.safeParse(state.value).success)
  const loading = ref<boolean>(false)

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    // TODO: Implementar a lógica de recuperação de senha
  }

  useHead({
    title: 'Recupere sua senha',
    meta: [
      // TODO: Add the meta tags
    ]
  })

  definePageMeta({ layout: false, middleware: 'auth' })
</script>

<template>
  <AuthContent
    title="Recupere sua senha 🔑"
    description="Insira seu e-mail abaixo, para recuperar sua senha"
  >
    <UForm
      :schema="RecoveryPasswordSchema"
      :state="state"
      class="flex flex-col gap-4"
      @submit="handleSubmit"
    >
      <UFormField name="email" label="E-mail" required>
        <UInput
          v-model="state.email"
          type="email"
          :placeholder="`gabriel@${useAppConfig().site_name.toLowerCase()}.com`"
          class="block"
        />
      </UFormField>

      <UButton
        type="submit"
        label="Enviar instruções"
        :disabled="!isValid"
        :loading="loading"
        class="justify-center font-bold"
      />
    </UForm>

    <template #bottomHTML>
      <p>Lembrou sua senha?</p>
      <NuxtLink to="/login">Volte para o login!</NuxtLink>
    </template>
  </AuthContent>
</template>

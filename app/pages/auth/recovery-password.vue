<script setup lang="ts">
  import {
    RecoveryPasswordSchema,
    type RecoveryPasswordSchemaType
  } from '~~/server/validations/auth'

  const rememberEmail = useCookie<string | undefined>('my-email')
  const state = ref<RecoveryPasswordSchemaType>({
    email: rememberEmail.value ?? ''
  })
  const router = useRouter()
  const isValid = computed<boolean>(() => RecoveryPasswordSchema.safeParse(state.value).success)
  const isSuccess = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    loading.value = true

    await $fetch('/api/auth/recovery-password', { method: 'POST', body: state.value })
      .then(() => {
        isSuccess.value = true

        setTimeout(() => {
          router.push('/login')
        }, 10000) // 10 seconds
      })
      .catch((error) => {
        toast.add({
          title: 'Erro ao recuperar senha',
          description: 'Verifique se o e-mail está correto e tente novamente',
          color: 'error',
          icon: 'i-lucide-x-circle'
        })

        console.error(error)
      })
      .finally(() => {
        loading.value = false
      })
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
    <AuthConfirmCard
      v-if="isSuccess"
      title="Você está a um passo de recuperar seu acesso!"
      :description="`Enviamos um e-mail para <b>${state.email}</b> com instruções para recuperar sua senha. Basta clicar no link e inserir sua nova senha.`"
      icon="material-symbols:mark-email-read"
    />

    <UForm
      v-if="!isSuccess"
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

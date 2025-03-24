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
</script>

<template>
  <main class="h-screen flex flex-col md:items-center md:justify-center">
    <section
      class="flex-1 flex flex-col items-center justify-center w-10/12 mt-40 mx-auto md:max-w-xl md:m-0"
    >
      <header class="text-center block mb-10">
        <h1 class="text-4xl font-bold">Recuperar senha 🔑</h1>
        <p class="text-sm text-zinc-500">
          Digite seu e-mail para receber as instruções de recuperação de senha
        </p>
      </header>

      <div class="flex flex-col gap-5 w-full">
        <UForm
          :schema="RecoveryPasswordSchema"
          :state="state"
          @submit="handleSubmit"
          class="flex flex-col gap-4"
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

        <div class="flex justify-center text-xs font-medium mt-4">
          <div class="flex items-center gap-1 text-zinc-400">
            <p>Lembrou sua senha?</p>
            <NuxtLink to="/login">Faça login!</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <AuthFooter />
  </main>
</template>

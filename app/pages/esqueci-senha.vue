<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">Recuperar senha</h2>
      <p class="text-sm text-gray-400 mt-2">
        Digite seu e-mail para receber as instruções de recuperação de senha:
      </p>
    </header>

    <UForm
      :schema="ForgotPasswordSchema"
      :state="state"
      class="flex flex-col gap-4"
      @submit="onSubmit"
    >
      <UFormField name="email">
        <UInput
          v-model="state.email"
          type="email"
          placeholder="Seu e-mail cadastrado"
          class="w-full"
        />
      </UFormField>

      <UButton type="submit" class="justify-center" :disabled="!isValid" :loading="isLoading">
        Enviar instruções
      </UButton>

      <p class="text-center text-xs text-gray-400">
        Lembrou sua senha? <NuxtLink to="/entrar">Faça login</NuxtLink>
      </p>
    </UForm>
  </section>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import { toast } from 'vue-sonner'
  import { ForgotPasswordSchema } from '~~/server/validations/auth'
  import type { ForgotPasswordSchema as ForgotPasswordSchemaType } from '~~/server/validations/auth'

  definePageMeta({
    middleware: ['guest'],
    layout: 'auth'
  })

  const isValid = computed(() => ForgotPasswordSchema.safeParse(state.value).success)
  const state = ref<ForgotPasswordSchemaType>({ email: '' })
  const isLoading = ref<boolean>(false)

  const onSubmit = async (event: FormSubmitEvent<ForgotPasswordSchemaType>) => {
    isLoading.value = true

    try {
      await $fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: event.data
      })

      toast.success('Instruções enviadas para seu e-mail!')
      navigateTo(`/redefinir-senha?email=${state.value.email}`)
    } catch (error: any) {
      toast.error(error.data.message)
    } finally {
      isLoading.value = false
    }
  }
</script>

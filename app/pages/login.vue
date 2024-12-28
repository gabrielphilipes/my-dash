<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">Bem-vindo de volta!</h2>
    </header>

    <div
      class="flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 pt-4 mb-6"
    >
      <AuthLoginWithGithub />
      <AuthLoginWithGoogle />
      <AuthLoginWithFacebook />

      <p class="block text-center text-xs text-gray-400">ou digite seus dados abaixo</p>
    </div>

    <UForm :schema="LoginSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
      <UFormField name="email">
        <UInput v-model="state.email" type="email" placeholder="Seu e-mail" class="w-full" />
      </UFormField>

      <UFormField name="password">
        <UInput v-model="state.password" type="password" placeholder="Sua senha" class="w-full" />
      </UFormField>

      <div class="flex justify-end">
        <NuxtLink to="/esqueci-senha" class="text-xs text-gray-400 hover:text-gray-600">
          Esqueceu sua senha?
        </NuxtLink>
      </div>

      <UButton type="submit" class="justify-center" :disabled="!isValid" :loading="isLoading">
        Entrar
      </UButton>

      <p class="text-center text-xs text-gray-400">
        Não tem uma conta? <NuxtLink to="/cadastrar">Cadastre-se</NuxtLink>
      </p>
    </UForm>
  </section>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import { toast } from 'vue-sonner'
  import { LoginSchema } from '~~/server/validations/auth'
  import type { LoginSchema as LoginSchemaType } from '~~/server/validations/auth'

  definePageMeta({
    middleware: ['guest'],
    layout: 'auth'
  })

  const isValid = computed(() => LoginSchema.safeParse(state.value).success)

  const state = ref({
    email: '',
    password: ''
  })

  const isLoading = ref(false)

  const onSubmit = async (event: FormSubmitEvent<LoginSchemaType>) => {
    isLoading.value = true

    const { fetch: refreshUserSession } = useUserSession()

    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: event.data
      })

      await refreshUserSession()

      toast.success('Login realizado com sucesso!')
      navigateTo('/')
    } catch (error: any) {
      isLoading.value = false
      toast.error(error.data.message)
    }
  }
</script>

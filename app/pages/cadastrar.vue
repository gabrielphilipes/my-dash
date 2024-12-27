<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">Criar minha conta!</h2>
    </header>

    <div
      class="flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 pt-4 mb-6"
    >
      <UButton color="gray" class="flex items-center gap-2" size="xs">
        <Icon name="mdi:github" class="text-xl text-[#24292e]" />
        GitHub
      </UButton>

      <UButton color="gray" class="flex items-center gap-2" size="xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
        Google
      </UButton>

      <UButton color="gray" class="flex items-center gap-2" size="xs">
        <Icon name="mdi:facebook" class="text-xl text-[#1877f2]" />
        Facebook
      </UButton>

      <p class="block text-center text-xs text-gray-400">ou digite seus dados abaixo</p>
    </div>

    <UForm :schema="RegisterSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
      <UFormGroup name="name">
        <UInput v-model="state.name" placeholder="Digite seu nome" />
      </UFormGroup>

      <UFormGroup name="email">
        <UInput v-model="state.email" type="email" placeholder="Seu melhor e-mail" />
      </UFormGroup>

      <UFormGroup name="password">
        <UInput v-model="state.password" type="password" placeholder="Uma senha forte" />
      </UFormGroup>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <AuthCheckStrongPassword :password="state.password" v-if="state.password" />
      </Transition>

      <p class="text-xs text-gray-400">
        Ao criar uma conta, você concorda com os <a href="/">termos de uso</a> e a
        <a href="/">política de privacidade</a>
      </p>

      <UButton type="submit" class="justify-center" :disabled="!isValid" :loading="isLoading">
        Cadastrar
      </UButton>

      <p class="text-center text-xs text-gray-400">
        Já tem uma conta? <NuxtLink to="/login">Faça login</NuxtLink>
      </p>
    </UForm>
  </section>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import { toast } from 'vue-sonner'
  import { RegisterSchema } from '~~/server/validations/auth'
  import type { RegisterSchema as RegisterSchemaType } from '~~/server/validations/auth'

  definePageMeta({
    layout: 'auth'
  })

  const isValid = computed(() => RegisterSchema.safeParse(state.value).success)

  const state = ref({
    name: '',
    email: '',
    password: ''
  })

  const isLoading = ref(false)

  const onSubmit = async (event: FormSubmitEvent<RegisterSchemaType>) => {
    isLoading.value = true

    await $fetch('/api/auth/register', {
      method: 'POST',
      body: event.data
    })
      .then(() => {
        toast.success('Usuário criado com sucesso!')
        navigateTo('/login')
      })
      .catch((error) => {
        isLoading.value = false
        toast.error(error.data.message)
      })
  }
</script>

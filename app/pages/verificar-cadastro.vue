<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">Verificar cadastro!</h2>
    </header>

    <UForm :schema="RegisterSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
      <UFormField name="name">
        <UInput v-model="state.name" placeholder="Digite seu nome" />
      </UFormField>

      <UFormField name="email">
        <UInput v-model="state.email" type="email" placeholder="Seu melhor e-mail" />
      </UFormField>

      <UFormField name="password">
        <UInput v-model="state.password" type="password" placeholder="Uma senha forte" />
      </UFormField>

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

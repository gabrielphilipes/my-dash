<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">Criar minha conta!</h2>
    </header>

    <div class="flex items-center justify-center gap-4 border-b border-gray-200 pb-4 mb-6">
      <div>GitHub</div>

      <div>Google</div>

      <div>Apple</div>
    </div>

    <p class="text-center text-xs text-gray-400 mb-6">ou digite seus dados abaixo</p>

    <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
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
    </UForm>
  </section>
</template>

<script setup lang="ts">
  import { z } from 'zod'

  definePageMeta({
    layout: 'auth'
  })

  const schema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')
  })

  const isValid = computed(() => schema.safeParse(state.value).success)

  const state = ref({
    name: '',
    email: '',
    password: ''
  })

  const isLoading = ref(false)

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data)

    isLoading.value = true

    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
</script>

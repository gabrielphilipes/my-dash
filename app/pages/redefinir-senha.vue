<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">Redefinir senha</h2>
      <p class="text-sm text-gray-400 mt-2">
        Digite o código de verificação enviado para o e-mail
        <span class="font-bold">{{ route.query.email }}</span>
      </p>
    </header>

    <UForm
      :schema="ResetPasswordSchema"
      :state="state"
      class="flex flex-col gap-4"
      @submit="onSubmit"
    >
      <UFormField name="pin" class="flex justify-center">
        <UPinInput name="pin" size="xl" length="6" v-model="state.pin" :disabled="isLoading" />
      </UFormField>

      <UFormField name="password">
        <UInput v-model="state.password" type="password" placeholder="Nova senha" class="w-full" />
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

      <UButton type="submit" class="justify-center" :disabled="!isValid" :loading="isLoading">
        Redefinir senha
      </UButton>
    </UForm>
  </section>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import { toast } from 'vue-sonner'
  import { ResetPasswordSchema } from '~~/server/validations/auth'
  import type { ResetPasswordSchema as ResetPasswordSchemaType } from '~~/server/validations/auth'

  definePageMeta({
    middleware: ['guest'],
    layout: 'auth'
  })

  const route = useRoute()

  onBeforeMount(() => {
    if (!route.query?.email) {
      navigateTo('/entrar')
    }
  })

  const isValid = computed(() => ResetPasswordSchema.safeParse(state.value).success)
  const state = ref<ResetPasswordSchemaType>({
    pin: [],
    password: ''
  })
  const isLoading = ref(false)

  const onSubmit = async (event: FormSubmitEvent<ResetPasswordSchemaType>) => {
    isLoading.value = true

    try {
      const { pin, password } = event.data
      await $fetch('/api/auth/reset-password', {
        method: 'POST',
        body: {
          pin: pin.join(''),
          password,
          email: route.query.email
        }
      })

      toast.success('Senha alterada com sucesso!')
      navigateTo('/entrar')
    } catch (error: any) {
      toast.error(error.data.message)
      isLoading.value = false
    }
  }
</script>

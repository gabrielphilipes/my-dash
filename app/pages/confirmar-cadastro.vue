<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">Verificar cadastro!</h2>
      <p class="text-sm text-gray-400 mt-2">
        Para finalizar o cadastro, é necessário inserir o código de verificação enviado para o
        e-mail <span class="font-bold">{{ route.query.email }}</span>
      </p>
    </header>

    <div class="flex flex-wrap justify-center w-full max-w-xs mx-auto">
      <UForm :state="state" @submit="onSubmit" :schema="ConfirmRegisterSchema">
        <UFormField name="pin">
          <UPinInput name="pin" size="xl" length="6" v-model="state.pin" :disabled="isLoading" />
        </UFormField>

        <UButton block class="mt-4 cursor-pointer" type="submit" :disabled="!isValid" loading-auto>
          Confirmar cadastro!
        </UButton>
      </UForm>
    </div>
  </section>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '#ui/types'
  import { toast } from 'vue-sonner'
  import { ConfirmRegisterSchema } from '~~/server/validations/auth'
  import type { ConfirmRegisterSchema as ConfirmRegisterSchemaType } from '~~/server/validations/auth'

  definePageMeta({ layout: 'auth' })

  const route = useRoute()

  onBeforeMount(() => {
    if (!route.query?.email) {
      navigateTo('/login')
    }
  })

  const isLoading = ref(false)
  const isValid = computed(() => ConfirmRegisterSchema.safeParse(state.value).success)
  const state = ref<ConfirmRegisterSchemaType>({ pin: [] })

  const onSubmit = async (event: FormSubmitEvent<ConfirmRegisterSchemaType>) => {
    isLoading.value = true

    const { pin } = event.data
    const pinString = pin.join('')

    await $fetch('/api/auth/confirm-register', {
      method: 'POST',
      body: {
        pin: pinString,
        email: route.query.email
      }
    })
      .then(() => {
        toast.success('Cadastro confirmado com sucesso!')
        navigateTo('/login')
      })
      .catch((error) => {
        toast.error(error.data.message)

        setTimeout(() => {
          isLoading.value = false
        }, 1000)
      })
  }
</script>

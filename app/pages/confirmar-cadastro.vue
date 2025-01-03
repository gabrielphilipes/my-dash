<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">{{ t('auth.confirmRegister.title') }}</h2>
      <p class="text-sm text-gray-400 mt-2">
        {{ t('auth.confirmRegister.description') }}
        <span class="font-bold">{{ route.query.email }}</span>
      </p>
    </header>

    <div class="flex flex-wrap justify-center w-full max-w-xs mx-auto">
      <UForm :state="state" @submit="onSubmit" :schema="ConfirmRegisterSchema(t)">
        <UFormField name="pin">
          <UPinInput name="pin" size="xl" length="6" v-model="state.pin" :disabled="isLoading" />
        </UFormField>

        <UButton block class="mt-4 cursor-pointer" type="submit" :disabled="!isValid" loading-auto>
          {{ t('auth.confirmRegister.submit') }}
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

  definePageMeta({ layout: 'auth', middleware: ['guest'] })

  const route = useRoute()

  onBeforeMount(() => {
    if (!route.query?.email) {
      navigateTo('/entrar')
    }
  })

  const isLoading = ref(false)
  const isValid = computed(() => ConfirmRegisterSchema(t).safeParse(state.value).success)
  const state = ref<ConfirmRegisterSchemaType>({ pin: [] })

  const { t } = useI18n()

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
        toast.success(t('auth.confirmRegister.messages.success'))
        navigateTo('/entrar')
      })
      .catch((error) => {
        toast.error(error.data.message)

        setTimeout(() => {
          isLoading.value = false
        }, 1000)
      })
  }
</script>

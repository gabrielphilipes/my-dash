<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">{{ t('auth.register.title') }}</h2>
    </header>

    <div
      class="flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 pt-4 mb-6"
    >
      <AuthLoginWithGithub />
      <AuthLoginWithGoogle />
      <AuthLoginWithFacebook />

      <p class="block text-center text-xs text-gray-400">{{ t('auth.register.socialDivider') }}</p>
    </div>

    <UForm
      :schema="RegisterSchema(t)"
      :state="state"
      class="flex flex-col gap-4"
      @submit="onSubmit"
    >
      <UFormField name="name">
        <UInput v-model="state.name" :placeholder="t('auth.register.form.name')" class="w-full" />
      </UFormField>

      <UFormField name="email">
        <UInput
          v-model="state.email"
          type="email"
          :placeholder="t('auth.register.form.email')"
          class="w-full"
        />
      </UFormField>

      <UFormField name="password">
        <UInput
          v-model="state.password"
          type="password"
          :placeholder="t('auth.register.form.password')"
          class="w-full"
        />
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
        {{ t('auth.register.terms.text') }}
        <a href="/">{{ t('auth.register.terms.termsLink') }}</a>
        {{ t('auth.register.terms.and') }}
        <a href="/">{{ t('auth.register.terms.privacyLink') }}</a>
      </p>

      <UButton type="submit" class="justify-center" :disabled="!isValid" :loading="isLoading">
        {{ t('auth.register.form.submit') }}
      </UButton>

      <p class="text-center text-xs text-gray-400">
        {{ t('auth.register.hasAccount') }}
        <NuxtLink to="/entrar">{{ t('auth.register.login') }}</NuxtLink>
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
    middleware: ['guest'],
    layout: 'auth'
  })

  const { t } = useI18n()

  const isValid = computed(() => RegisterSchema(t).safeParse(state.value).success)

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
        toast.success(t('auth.register.messages.success'))
        navigateTo(`/confirmar-cadastro?email=${state.value.email}`)
      })
      .catch((error) => {
        isLoading.value = false
        toast.error(error.data.message)
      })
  }
</script>

<template>
  <section>
    <header class="mb-5 text-center">
      <h2 class="text-2xl font-thin text-gray-700">{{ t('auth.login.welcome') }}</h2>
    </header>

    <div
      class="flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 pt-4 mb-6"
    >
      <AuthLoginWithGithub />
      <AuthLoginWithGoogle />
      <AuthLoginWithFacebook />

      <p class="block text-center text-xs text-gray-400">{{ t('auth.login.socialDivider') }}</p>
    </div>

    <UForm :schema="LoginSchema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
      <UFormField name="email">
        <UInput
          v-model="state.email"
          type="email"
          :placeholder="t('auth.login.form.email')"
          class="w-full"
        />
      </UFormField>

      <UFormField name="password">
        <UInput
          v-model="state.password"
          type="password"
          :placeholder="t('auth.login.form.password')"
          class="w-full"
        />
      </UFormField>

      <div class="flex justify-end">
        <NuxtLink to="/esqueci-senha" class="text-xs text-gray-400 hover:text-gray-600">
          {{ t('auth.login.form.forgotPassword') }}
        </NuxtLink>
      </div>

      <UButton type="submit" class="justify-center" :disabled="!isValid" :loading="isLoading">
        {{ t('auth.login.form.submit') }}
      </UButton>

      <p class="text-center text-xs text-gray-400">
        {{ t('auth.login.noAccount') }}
        <NuxtLink to="/cadastrar">{{ t('auth.login.signUp') }}</NuxtLink>
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

  const { t } = useI18n()

  const isValid = computed(() => LoginSchema.safeParse(state.value).success)

  const state = ref({
    email: '',
    password: ''
  })

  const isLoading = ref(false)

  const route = useRoute()

  onMounted(() => {
    const error = route.query?.error
    const action = route.query?.action

    if (error === 'unauthorized') {
      toast.error(t('auth.login.messages.unauthorized'))
    }

    if (action === 'logout') {
      toast.success(t('auth.login.messages.logoutSuccess'))
    }
  })

  const onSubmit = async (event: FormSubmitEvent<LoginSchemaType>) => {
    isLoading.value = true

    const { fetch: refreshUserSession } = useUserSession()

    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: event.data
      })

      await refreshUserSession()

      toast.success(t('auth.login.messages.loginSuccess'))
      navigateTo('/')
    } catch (error: any) {
      isLoading.value = false
      toast.error(error.data.message)
    }
  }
</script>

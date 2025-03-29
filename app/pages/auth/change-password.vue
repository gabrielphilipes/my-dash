<script setup lang="ts">
  import { ChangePasswordSchema, type ChangePasswordSchemaType } from '~~/server/validations/auth'

  const route = useRoute()
  const token = route.query.token as string

  if (!token) {
    navigateTo('/recovery-password')
  }

  const state = ref<ChangePasswordSchemaType>({
    token,
    password: '',
    confirmPassword: ''
  })

  const isValid = computed<boolean>(() => ChangePasswordSchema.safeParse(state.value).success)
  const showPasswordFirst = ref<boolean>(false)
  const showPasswordSecond = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    // TODO: Implementar a lógica de troca de senha
  }

  useHead({
    title: 'Altere sua senha',
    meta: [
      // TODO: Add the meta tags
    ]
  })

  definePageMeta({ layout: false })
</script>

<template>
  <AuthContent
    title="Recupere sua senha 🔑"
    description="Insira seu e-mail abaixo, para recuperar sua senha"
  >
    <UForm
      :schema="ChangePasswordSchema"
      :state="state"
      @submit="handleSubmit"
      class="flex flex-col gap-4"
    >
      <div class="grid md:grid-cols-2 gap-4">
        <UFormField name="password" label="Nova senha" class="relative">
          <UInput
            v-model="state.password"
            :type="showPasswordFirst ? 'text' : 'password'"
            placeholder="********"
            class="block"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPasswordFirst ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPasswordFirst ? 'Hide password' : 'Show password'"
                :aria-pressed="showPasswordFirst"
                aria-controls="password"
                @click="showPasswordFirst = !showPasswordFirst"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField name="confirmPassword" label="Confirmar nova senha">
          <UInput
            v-model="state.confirmPassword"
            :type="showPasswordSecond ? 'text' : 'password'"
            placeholder="********"
            class="block"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPasswordSecond ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPasswordSecond ? 'Hide password' : 'Show password'"
                :aria-pressed="showPasswordSecond"
                aria-controls="password"
                @click="showPasswordSecond = !showPasswordSecond"
              />
            </template>
          </UInput>
        </UFormField>
      </div>

      <UButton
        type="submit"
        label="Trocar senha"
        :disabled="!isValid"
        :loading="loading"
        class="justify-center font-bold"
      />
    </UForm>

    <template #bottomHTML>
      <p>Lembrou sua senha?</p>
      <NuxtLink to="/login">Faça login!</NuxtLink>
    </template>
  </AuthContent>
</template>

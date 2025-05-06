<script setup lang="ts">
  import { ChangePasswordSchema, type ChangePasswordSchemaType } from '~~/server/validations/auth'

  const route = useRoute()
  const router = useRouter()
  const toast = useToast()
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
  const isSuccess = ref<boolean>(false)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    loading.value = true

    try {
      await $fetch('/api/auth/change-password', {
        method: 'POST',
        body: state.value
      })

      isSuccess.value = true

      setTimeout(() => {
        router.push('/login')
      }, 10000) // 10 seconds
    } catch (error: { data?: { message: string } }) {
      toast.add({
        title: 'Erro ao alterar senha',
        description: error.data?.message || 'Ocorreu um erro ao tentar alterar sua senha',
        color: 'error',
        icon: 'i-lucide-x-circle'
      })

      console.error(error)
    } finally {
      loading.value = false
    }
  }

  useHead({
    title: 'Altere sua senha',
    meta: [
      {
        name: 'description',
        content: 'Altere sua senha de forma segura e rápida'
      }
    ]
  })

  definePageMeta({ layout: false, middleware: 'auth' })
</script>

<template>
  <AuthContent title="Recupere sua senha 🔑" description="Insira sua nova senha abaixo">
    <AuthConfirmCard
      v-if="isSuccess"
      title="Senha alterada com sucesso!"
      description="Você será redirecionado para a página de login em instantes."
      icon="i-lucide-check-circle"
    />

    <UForm
      v-if="!isSuccess"
      :schema="ChangePasswordSchema"
      :state="state"
      class="flex flex-col gap-4"
      @submit="handleSubmit"
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

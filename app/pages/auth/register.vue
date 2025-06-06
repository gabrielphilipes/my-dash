<script setup lang="ts">
  import { RegisterSchema, type RegisterSchemaType } from '~~/server/validations/auth'

  const state = ref<RegisterSchemaType>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    terms: false
  })

  const route = useRoute()
  const router = useRouter()
  const isValid = computed<boolean>(() => RegisterSchema.safeParse(state.value).success)
  const showPasswordFirst = ref<boolean>(false)
  const showPasswordSecond = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const isSuccess = ref<boolean>(false)

  const toast = useToast()

  const query = route.query
  onMounted(() => {
    if (query.registerWithEmail && query.email) {
      toast.add({
        title: 'Você já está registrado com esse e-mail',
        description: `Já existe uma conta com o e-mail: ${query.email}. Por favor, faça login ou recupere sua senha. Após, você poderá vincular sua conta!`,
        color: 'warning',
        icon: 'i-lucide-alert-triangle',
        duration: 20000
      })
    }

    // Clear query params
    router.replace('/register')
  })

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    await $fetch('/api/auth/register', {
      method: 'POST',
      body: state.value,
      credentials: 'include'
    })
      .then(async () => {
        isSuccess.value = true

        toast.add({
          title: 'Cadastro realizado com sucesso',
          color: 'success',
          duration: 10000,
          icon: 'i-lucide-check-circle'
        })

        await nextTick()
        await useUserSession().fetch()

        setTimeout(() => {
          router.push('/onboarding')
        }, 10000) // 10 seconds
      })
      .catch((error) => {
        toast.add({
          title: 'Erro ao cadastrar',
          description: error.data.message,
          color: 'error',
          icon: 'i-lucide-x-circle'
        })

        console.error(error)
      })
  }

  useHead({
    title: 'Cadastre-se e tenha acesso a todos os recursos',
    meta: [
      // TODO: Add the meta tags
    ]
  })

  definePageMeta({ layout: false, middleware: 'auth' })
</script>

<template>
  <AuthContent
    title="Cadastre-se 👤"
    description="Selecione uma rede social ou insira seus dados para criar uma conta"
  >
    <AuthConfirmCard v-if="isSuccess" />

    <div v-if="!isSuccess" class="flex items-center justify-center gap-2">
      <UButton
        type="button"
        variant="link"
        leading-icon="devicon:google"
        label="Google"
        class="!text-neutral-600 hover:text-neutral-600 hover:bg-neutral-100"
        :disabled="true"
      />

      <UButton
        type="button"
        variant="link"
        leading-icon="i-mdi-facebook"
        label="Facebook"
        class="!text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10"
        :disabled="true"
      />

      <a href="/oauth/github">
        <UButton
          type="button"
          variant="link"
          leading-icon="i-mdi-github"
          label="GitHub"
          class="!text-black hover:text-black hover:bg-black/5"
        />
      </a>
    </div>

    <USeparator v-if="!isSuccess" label="ou" :ui="{ label: 'text-neutral-500' }" />

    <UForm
      v-if="!isSuccess"
      :schema="RegisterSchema"
      :state="state"
      class="flex flex-col gap-4"
      @submit="handleSubmit"
    >
      <UFormField name="name" label="Nome completo" required>
        <UInput
          v-model="state.name"
          type="text"
          placeholder="Gabriel Philipe"
          class="block"
          autofocus
        />
      </UFormField>

      <UFormField name="email" label="E-mail" required>
        <UInput
          v-model="state.email"
          type="email"
          :placeholder="`gabriel@${useAppConfig().site_name.toLowerCase()}.com`"
          class="block"
        />
      </UFormField>

      <div class="grid md:grid-cols-2 gap-4">
        <UFormField name="password" label="Senha" class="relative" required>
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

        <UFormField name="passwordConfirmation" label="Confirmar senha" required>
          <UInput
            v-model="state.passwordConfirmation"
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

      <div class="flex items-center justify-start gap-2">
        <UCheckbox v-model="state.terms" size="sm" :ui="{ label: 'cursor-pointer' }" />
        <p class="text-xs font-medium cursor-pointer" @click="state.terms = !state.terms">
          Ao se cadastrar, você concorda com os
          <NuxtLink to="/compliance/terms" target="_blank">termos de uso</NuxtLink> e a
          <NuxtLink to="/compliance/privacy" target="_blank">política de privacidade</NuxtLink>
          <span class="text-red-500 inline-block ml-1">*</span>
        </p>
      </div>

      <UButton
        type="submit"
        label="Criar conta"
        :disabled="!isValid"
        :loading="loading"
        class="justify-center font-bold"
      />
    </UForm>

    <template v-if="!isSuccess" #bottomHTML>
      <p>Já tem uma conta?</p>
      <NuxtLink to="/login">Faça login!</NuxtLink>
    </template>
  </AuthContent>
</template>

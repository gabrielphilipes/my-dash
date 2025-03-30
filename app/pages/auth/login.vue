<script setup lang="ts">
  import { AuthFooter } from '#components'
  import { LoginSchema, type LoginSchemaType } from '~~/server/validations/auth'

  const rememberEmail = useCookie<string | undefined>('my-email')
  const state = ref<LoginSchemaType>({
    email: rememberEmail.value ?? '',
    password: '',
    remember: !!rememberEmail.value
  })

  const isValid = computed<boolean>(() => LoginSchema.safeParse(state.value).success)
  const showPassword = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    // Remove the cookie if the user doesn't want to remember the email
    if (!state.value.remember) {
      useCookie('my-email').value = ''
    }

    // TODO: Implement the login logic
  }

  useHead({
    title: 'Acesse sua conta',
    meta: [
      // TODO: Add the meta tags
    ]
  })

  definePageMeta({ layout: false })
</script>

<template>
  <main
    class="h-screen flex flex-wrap md:flex-nowrap md:items-center md:w-11/12 md:mx-auto md:gap-10 lg:w-4xl xl:w-5xl"
  >
    <section class="w-10/12 mt-40 mx-auto md:w-7/12 lg:w-5/12 md:m-0">
      <header class="text-center block mb-10">
        <AuthLogo />
        <h1 class="text-4xl font-bold">Seja bem vindo 👋🏻</h1>
        <p class="text-sm text-neutral-500">Faça login para continuar</p>
      </header>

      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-center gap-2">
          <UButton
            type="button"
            variant="link"
            leading-icon="devicon:google"
            label="Google"
            class="!text-neutral-600 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            :disabled="true"
          />

          <UButton
            type="button"
            variant="link"
            leading-icon="i-mdi-facebook"
            label="Facebook"
            class="!text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/20"
            :disabled="true"
          />

          <UButton
            type="button"
            variant="link"
            leading-icon="i-mdi-apple"
            label="Apple"
            class="!text-black hover:text-black hover:bg-black/5"
            :disabled="true"
          />
        </div>

        <USeparator label="ou" :ui="{ label: 'text-neutral-500' }" />

        <UForm
          :schema="LoginSchema"
          :state="state"
          class="flex flex-col gap-4"
          @submit="handleSubmit"
        >
          <UFormField name="email" label="E-mail">
            <UInput
              v-model="state.email"
              type="email"
              :placeholder="`gabriel@${useAppConfig().site_name.toLowerCase()}.com`"
              class="block"
            />
          </UFormField>

          <UFormField name="password" label="Senha">
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="********"
              class="block"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  :aria-pressed="showPassword"
                  aria-controls="password"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <div class="flex items-center justify-between">
            <UCheckbox
              v-model="state.remember"
              label="Lembrar-me"
              size="sm"
              :ui="{ label: 'cursor-pointer' }"
            />
            <NuxtLink
              to="/recovery-password"
              class="text-xs font-medium text-neutral-400 no-underline"
            >
              Esqueceu sua senha?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            label="Entrar"
            :disabled="!isValid"
            :loading="loading"
            class="justify-center font-bold"
          />
        </UForm>

        <div class="flex justify-center text-xs font-medium mt-4">
          <div class="flex items-center gap-1 opacity-70 text-neutral-400">
            <p>Não tem uma conta?</p>
            <NuxtLink to="/register">Crie sua conta!</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <aside
      class="hidden md:block w-5/12 lg:w-7/12 h-9/12 rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
    >
      <div class="w-full h-full flex items-center justify-center">
        <img src="/images/login.svg" alt="Login background" class="w-full h-full object-cover" >
      </div>
    </aside>
  </main>

  <AuthFooter />
</template>

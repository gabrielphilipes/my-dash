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
</script>

<template>
  <main
    class="h-screen flex flex-wrap md:flex-nowrap md:items-center md:w-11/12 md:mx-auto md:gap-10 lg:w-4xl xl:w-5xl"
  >
    <section class="w-10/12 mt-40 mx-auto md:w-7/12 lg:w-5/12 md:m-0">
      <header class="text-center block mb-10">
        <h1 class="text-4xl font-bold">Seja bem vindo 👋🏻</h1>
        <p class="text-sm text-zinc-500">Faça login para continuar</p>
      </header>

      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-center gap-2">
          <UButton
            type="button"
            variant="link"
            leading-icon="devicon:google"
            label="Google"
            class="!text-zinc-600 hover:text-zinc-600 hover:bg-zinc-100"
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

          <UButton
            type="button"
            variant="link"
            leading-icon="i-mdi-apple"
            label="Apple"
            class="!text-black hover:text-black hover:bg-black/5"
            :disabled="true"
          />
        </div>

        <div class="flex items-center gap-2 text-xs font-medium">
          <span class="w-full h-[1px] bg-zinc-200 dark:bg-zinc-700" />
          <p>ou</p>
          <span class="w-full h-[1px] bg-zinc-200 dark:bg-zinc-700" />
        </div>

        <UForm
          :schema="LoginSchema"
          :state="state"
          @submit="handleSubmit"
          class="flex flex-col gap-4"
        >
          <UFormField name="email" label="E-mail">
            <UInput
              v-model="state.email"
              type="email"
              :placeholder="`gabriel@${useAppConfig().site_name}.com`"
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
              class="text-xs font-medium text-zinc-400 no-underline"
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
          <div class="flex items-center gap-1 opacity-70 text-zinc-400">
            <p>Não tem uma conta?</p>
            <NuxtLink to="/register">Crie sua conta!</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <aside
      class="hidden md:block w-5/12 lg:w-7/12 h-9/12 rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800"
    >
      <div class="w-full h-full flex items-center justify-center">
        <img src="/images/login.svg" alt="Login background" class="w-full h-full object-cover" />
      </div>
    </aside>
  </main>

  <AuthFooter />
</template>

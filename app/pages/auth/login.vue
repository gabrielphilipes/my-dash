<script setup lang="ts">
  import { LoginSchema, type LoginSchemaType } from '~~/server/validations/auth'
  import type { H3Error } from 'h3'

  const toast = useToast()
  const router = useRouter()
  const route = useRoute()
  const query = route.query
  const unauthenticated = query?.unauthenticated
  const logout = query?.logout
  const redirect = query?.redirect
  const information = query?.information

  const rememberEmail = useCookie<string | undefined>('my-email')
  const state = ref<LoginSchemaType>({
    email: rememberEmail.value ?? '',
    password: '',
    remember: !!rememberEmail.value
  })

  const isValid = computed<boolean>(() => LoginSchema.safeParse(state.value).success)
  const showPassword = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    // Set loading state
    loading.value = true

    try {
      // Save email in cookie if remember is checked
      if (state.value.remember) {
        useCookie('my-email').value = state.value.email
      } else {
        useCookie('my-email').value = ''
      }

      // Call login API
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: state.value,
        credentials: 'include'
      })

      // Update user session
      await nextTick()
      await useUserSession().fetch()

      // Show success toast
      toast.add({
        title: 'Login realizado com sucesso',
        color: 'success',
        icon: 'i-lucide-check-circle'
      })

      // Redirect user
      setTimeout(() => {
        if (redirect) {
          router.push(redirect as string)
        } else {
          router.push('/')
        }
      }, 2000)
    } catch (error) {
      const errorData = error as { data: H3Error }

      // Show error toast
      toast.add({
        title: 'Erro ao fazer login',
        description: errorData.data?.message || 'Ocorreu um erro ao tentar fazer login',
        color: 'error',
        icon: 'i-lucide-x-circle'
      })

      console.error(error)

      loading.value = false
    }
  }

  // Only run on the client
  onMounted(() => {
    // Query params
    if (unauthenticated) {
      toast.add({
        title: 'Você precisa estar logado para acessar esta página',
        description: 'Por favor, faça login para continuar',
        icon: 'i-heroicons-exclamation-circle',
        color: 'error'
      })
    }

    if (information) {
      toast.add({
        title: information as string,
        icon: 'i-heroicons-exclamation-circle',
        color: 'info'
      })
    }

    if (logout) {
      toast.add({
        title: 'Você foi deslogado com sucesso',
        icon: 'i-heroicons-check-circle',
        color: 'success'
      })
    }

    // Remove all query params
    router.replace('/login')
  })

  useHead({
    title: 'Acesse sua conta',
    meta: [
      // TODO: Add the meta tags
    ]
  })

  definePageMeta({ layout: false, middleware: 'auth' })
</script>

<template>
  <div>
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
            <AuthSocialAuth />
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
          <img src="/images/login.svg" alt="Login background" class="w-full h-full object-cover" />
        </div>
      </aside>
    </main>

    <AuthFooter />
  </div>
</template>

<script setup lang="ts">
  import { RegisterSchema, type RegisterSchemaType } from '~~/server/validations/auth'

  const state = ref<RegisterSchemaType>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  })

  const isValid = computed<boolean>(() => RegisterSchema.safeParse(state.value).success)
  const showPasswordFirst = ref<boolean>(false)
  const showPasswordSecond = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    if (!isValid.value) return

    // TODO: Implement the login logic
  }

  useHead({
    title: 'Cadastre-se e tenha acesso a todos os recursos',
    meta: [
      // TODO: Add the meta tags
    ]
  })

  definePageMeta({ layout: false })
</script>

<template>
  <main class="h-screen flex flex-col md:items-center md:justify-center">
    <section
      class="flex-1 flex flex-col items-center justify-center w-10/12 mt-40 mx-auto md:max-w-xl md:m-0"
    >
      <header class="text-center block mb-10">
        <h1 class="text-4xl font-bold">Cadastre-se ✍🏻</h1>
        <p class="text-sm text-neutral-500">Escolha sua rede social ou insira seus dados abaixo</p>
      </header>

      <div class="flex flex-col gap-5 w-full">
        <div class="flex items-center justify-center gap-2">
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
          <span class="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700" />
          <p>ou</p>
          <span class="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700" />
        </div>

        <UForm
          :schema="RegisterSchema"
          :state="state"
          @submit="handleSubmit"
          class="flex flex-col gap-4"
        >
          <UFormField name="name" label="Nome completo" required>
            <UInput v-model="state.name" type="text" placeholder="Gabriel Philipe" class="block" />
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

            <UFormField name="confirmPassword" label="Confirmar senha" required>
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

          <div class="flex items-center justify-start gap-2">
            <UCheckbox v-model="state.terms" size="sm" :ui="{ label: 'cursor-pointer' }" />
            <p class="text-xs font-medium cursor-pointer" @click="state.terms = !state.terms">
              Ao se cadastrar, você concorda com os
              <NuxtLink to="/terms">termos de uso</NuxtLink> e a
              <NuxtLink to="/privacy">política de privacidade</NuxtLink>
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

        <div class="flex justify-center text-xs font-medium mt-4">
          <div class="flex items-center gap-1 text-neutral-400">
            <p>Já tem uma conta?</p>
            <NuxtLink to="/login">Faça login!</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <AuthFooter />
  </main>
</template>

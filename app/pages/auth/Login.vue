<script setup lang="ts">
  const state = ref({
    email: '',
    password: '',
    remember: false
  })
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
          <span class="w-full h-[1px] bg-zinc-200" />
          <p>ou</p>
          <span class="w-full h-[1px] bg-zinc-200" />
        </div>

        <UForm :state="state" class="flex flex-col gap-4">
          <UFormField label="Email" class="block">
            <UInput v-model="state.email" label="Email" class="block" />
          </UFormField>

          <UFormField label="Senha" class="block">
            <UInput v-model="state.password" label="Password" class="block" />
          </UFormField>

          <div class="flex items-center justify-between">
            <UCheckbox
              v-model="state.remember"
              label="Lembrar-me"
              size="sm"
              :ui="{ label: 'cursor-pointer' }"
            />
            <NuxtLink to="/recovery-password" class="text-xs font-medium text-zinc-400">
              Esqueceu sua senha?
            </NuxtLink>
          </div>

          <UButton label="Entrar" class="justify-center font-bold" />
        </UForm>

        <div class="flex justify-center text-xs font-medium mt-4">
          <div class="flex items-center gap-1 opacity-70 hover:opacity-100 my_transition">
            <p>Não tem uma conta?</p>
            <NuxtLink to="/register">Crie sua conta!</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <aside class="hidden md:block w-5/12 lg:w-7/12 h-9/12 rounded-3xl overflow-hidden bg-zinc-100">
      <div class="w-full h-full flex items-center justify-center">
        <img src="/images/login.svg" alt="Login background" class="w-full h-full object-cover" />
      </div>
    </aside>
  </main>
</template>

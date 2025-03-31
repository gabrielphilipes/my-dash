<script setup lang="ts">
  import { RequestQRCodeSchema, type RequestQRCodeSchemaType } from '~~/server/validations/users'

  const props = defineProps<{
    stepper?: {
      hasPrev?: boolean
      hasNext?: boolean
      currentStep?: number
    }
  }>()

  const emit = defineEmits<{
    (e: 'prev' | 'next' | 'submit'): void
  }>()

  const QRCode = ref<string>('')
  const QRCodeRequested = ref<boolean>(false)
  const loadingQRCode = ref<boolean>(false)

  const loading = ref<boolean>(false)
  const state = reactive<RequestQRCodeSchemaType>({ code: [] })
  const isValid = computed<boolean>(() => {
    if (!QRCodeRequested.value) return true

    return RequestQRCodeSchema.safeParse(state).success
  })

  const requestQRCode = async () => {
    loadingQRCode.value = true

    try {
      // Simulando uma requisição API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      QRCodeRequested.value = true
      QRCode.value =
        'https://qrcg-free-editor.qr-code-generator.com/latest/assets/images/websiteQRCode_noFrame.png'
    } finally {
      loadingQRCode.value = false
    }
  }

  const handleNext = async () => {
    if (!isValid.value) return

    loading.value = true

    try {
      // Simulando uma requisição API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      emit('next')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <UCard>
    <div v-if="!QRCodeRequested" class="flex flex-col gap-2">
      <p>
        Para aumentar a segurança da sua conta, recomendamos, <strong>fortemente</strong>, que você
        configure a autenticação de dois fatores (2FA).
      </p>

      <p>
        Para isso, você deve baixar um aplicativo de autenticação, como o
        <strong>Google Authenticator</strong> ou o <strong>Authy</strong>, e escanear o QR Code
        abaixo com o aplicativo ou inserir o código abaixo manualmente no aplicativo.
      </p>

      <UButton
        label="Ativar autenticação de dois fatores"
        icon="material-symbols:person-shield"
        size="sm"
        :loading="loadingQRCode"
        :disabled="loadingQRCode"
        class="justify-center"
        @click="requestQRCode"
      />
    </div>

    <UForm
      v-else
      :schema="RequestQRCodeSchema"
      :state="state"
      class="flex flex-col md:flex-row items-center gap-10"
    >
      <div class="w-8/12 md:w-5/12">
        <img :src="QRCode" alt="QR Code 2FA" class="w-full" />
      </div>

      <div class="w-full md:w-7/12">
        <UFormField
          name="code"
          label="Escaneie o QR Code"
          required
          description="Através do app de autenticação, escaneie o QR Code acima ou insira o código abaixo manualmente."
        >
          <div class="flex justify-center w-full mt-5">
            <UPinInput v-model="state.code" :length="6" :disabled="loading" />
          </div>
        </UFormField>
      </div>
    </UForm>

    <template #footer>
      <AuthOnboardingFooterCard
        :stepper="props.stepper"
        :current-step="props.stepper?.currentStep"
        :loading="loading"
        :is-valid="isValid"
        @prev="emit('prev')"
        @next="handleNext"
      />
    </template>
  </UCard>
</template>

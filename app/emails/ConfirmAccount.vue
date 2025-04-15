<script setup lang="ts">
  import EmailBaseLayout from '~/components/email/EmailBaseLayout.vue'
  import Title from '~/components/email/Title.vue'
  import Text from '~/components/email/Text.vue'
  import Button from '~/components/email/Button.vue'

  defineProps<{
    name: string
    verificationUrl: string
  }>()
</script>

<template>
  <EmailBaseLayout title="Confirme sua conta">
    <Title text="Bem-vindo(a)!" />
    <Text
      :text="`Olá ${name}, obrigado por se cadastrar em nossa plataforma. Para confirmar sua conta, clique no botão abaixo:`"
    />
    <Button text="Confirmar minha conta" :href="verificationUrl" />
    <Text text="Se você não se cadastrou em nossa plataforma, por favor ignore este email." />
    <Text text="Atenciosamente,<br />Equipe MyDash" />
  </EmailBaseLayout>
</template>

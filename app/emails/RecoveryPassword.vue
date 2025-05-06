<script setup lang="ts">
  import EmailBaseLayout from '~/components/email/EmailBaseLayout.vue'
  import Title from '~/components/email/Title.vue'
  import Text from '~/components/email/Text.vue'
  import Button from '~/components/email/Button.vue'

  defineProps<{
    name: string
    recoveryUrl: string
  }>()
</script>

<template>
  <EmailBaseLayout title="Recuperação de senha">
    <Title text="Recupere sua senha" />
    <Text
      :text="`Olá ${name}, recebemos uma solicitação para redefinir sua senha. Para criar uma nova senha, clique no botão abaixo:`"
    />
    <Button text="Redefinir minha senha" :href="recoveryUrl" />
    <Text text="Se você não solicitou a recuperação de senha, por favor ignore este email." />
    <Text text="Atenciosamente,<br />Equipe MyDash" />
  </EmailBaseLayout>
</template>

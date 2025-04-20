<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  const query = route.query
  onMounted(() => {
    if (query.loggedIn) {
      toast.add({
        title: 'Seja bem-vindo!',
        description: 'Você já está logado, basta aproveitar o sistema',
        color: 'success',
        icon: 'i-lucide-check-circle'
      })

      router.replace('/')
    }
  })

  definePageMeta({
    middleware: 'app'
  })
</script>

<template>
  <AppLayoutContent title="Home" description="Bem-vindo ao MyDash" back="/">
    <h1>Home</h1>
  </AppLayoutContent>
</template>

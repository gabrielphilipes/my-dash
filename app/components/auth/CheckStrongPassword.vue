<script setup lang="ts">
  const props = defineProps<{
    password: string
  }>()

  const isMin8Characters = computed(() => props.password.length >= 8)
  const hasUpperCase = computed(() => /[A-Z]/.test(props.password))
  const hasNumber = computed(() => /[0-9]/.test(props.password))
  const hasSpecialCharacter = computed(() => /[!@#$%^&*]/.test(props.password))
</script>

<template>
  <ul class="bg-white rounded-md p-2 text-xs text-gray-500">
    <li>
      <UIcon
        name="material-symbols:check-circle-rounded"
        :class="[isMin8Characters ? 'text-green-500' : 'text-red-400']"
      />
      <span>Mínimo de 8 caracteres</span>
    </li>

    <li>
      <UIcon
        name="material-symbols:check-circle-rounded"
        :class="[hasUpperCase ? 'text-green-500' : 'text-red-400']"
      />
      <span>Pelo menos uma letra maiúscula</span>
    </li>

    <li>
      <UIcon
        name="material-symbols:check-circle-rounded"
        :class="[hasNumber ? 'text-green-500' : 'text-red-400']"
      />
      <span>Pelo menos um número</span>
    </li>

    <li>
      <UIcon
        name="material-symbols:check-circle-rounded"
        :class="[hasSpecialCharacter ? 'text-green-500' : 'text-red-400']"
      />
      <span>Pelo menos um caractere especial</span>
    </li>
  </ul>
</template>

<style scoped>
  li {
    @apply flex items-center gap-1;
  }
</style>

<script setup lang="ts">
  // Dark mode
  const colorMode = useColorMode()
  const isDark = ref<boolean>(colorMode.preference === 'dark')
  watch(colorMode, () => {
    isDark.value = colorMode.preference === 'dark'
  })
</script>

<template>
  <USwitch
    v-model:model-value="isDark"
    unchecked-icon="i-lucide-moon"
    checked-icon="i-lucide-sun"
    :default-value="isDark"
    :label="isDark ? 'Modo escuro' : 'Modo claro'"
    size="sm"
    :ui="{
      label: 'text-xs text-neutral-400 cursor-pointer'
    }"
    @update:model-value="colorMode.preference = isDark ? 'dark' : 'light'"
  />
</template>

<template>
  <p class="text-gray-500 mb-10">
    {{ $t('dashboard.team.registerMessage') }}
  </p>

  <ULink
    class="w-full max-w-7xl mx-auto h-96 flex items-center justify-center gap-4 p-4 rounded-lg border-gray-200 border-dashed border-2 bg-gray-50 hover:bg-gray-100 cursor-pointer"
    @click="openModalRegisterTeam"
  >
    <div class="flex items-center gap-2">
      <UIcon name="ic:baseline-person-add-alt-1" class="size-10 text-primary-500" />
      <span class="text-lg font-semibold">{{ $t('dashboard.team.registerButton') }}</span>
    </div>
  </ULink>
</template>

<script setup lang="ts">
  const modalRegisterTeam = useState('modalRegisterTeam')

  const openModalRegisterTeam = () => {
    modalRegisterTeam.value = true
  }
</script>

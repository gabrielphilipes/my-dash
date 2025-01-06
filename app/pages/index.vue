<template>
  <AppPageHeader :title="$t('dashboard.welcomeBack')" />

  <AppDashboardRegisterTeam />
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'app'
  })
</script>

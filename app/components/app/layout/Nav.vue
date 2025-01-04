<template>
  <div class="flex items-center justify-between my-6">
    <AppLayoutTeamSelector />
  </div>

  <nav class="space-y-1">
    <UButton
      v-for="item in items"
      :key="item.label"
      :to="item.to"
      :icon="item.icon"
      variant="ghost"
      class="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
      :class="{ 'bg-gray-800 text-white': $route.path === item.to }"
    >
      {{ item.label }}
    </UButton>
  </nav>

  <section class="mt-6">
    <span class="text-xs font-medium uppercase text-gray-400 mb-3 block">
      {{ $t('nav.tasks.title') }}
    </span>

    <div class="grid grid-cols-2 gap-2">
      <UButton
        v-for="(stat, index) in stats"
        :key="index"
        variant="ghost"
        class="flex h-auto cursor-pointer flex-col items-start bg-gray-800/50 p-3 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        <div class="flex w-full items-center justify-between relative">
          <UIcon :name="stat.icon" class="h-5 w-5" :class="stat.color" />
          <span class="text-xs font-bold" :class="stat.color">{{ stat.count }}</span>
          <div
            v-if="stat.animate && Number(stat.count) > 0"
            class="absolute top-1.5 right-0 size-2 rounded-full bg-red-500/80 animate-ping"
          />
        </div>

        <span class="mt-1 text-xs">{{ stat.label }}</span>
      </UButton>
    </div>

    <span class="text-xs font-medium uppercase text-gray-400 mb-3 block mt-6">
      {{ $t('nav.tags.title') }}
    </span>

    <div class="relative group">
      <div class="flex flex-wrap gap-2 max-h-[120px] overflow-hidden group-hover:max-h-full">
        <UButton
          v-for="tag in tags"
          :key="tag"
          variant="ghost"
          class="text-xs cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white px-2 py-1 h-auto"
        >
          #{{ tag }}
        </UButton>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import type { ButtonProps } from '#ui/types'

  const { t } = useI18n()

  const items: ButtonProps[] = [
    { label: t('nav.menu.home'), icon: 'i-heroicons-home', to: '/' },
    { label: t('nav.menu.projects'), icon: 'i-heroicons-shopping-cart', to: '/projects' },
    { label: t('nav.menu.settings'), icon: 'i-heroicons-cog-6-tooth', to: '/settings' }
  ]

  const stats = [
    {
      label: t('nav.tasks.all'),
      icon: 'i-heroicons-inbox',
      count: '28',
      color: 'text-blue-500',
      animate: false
    },
    {
      label: t('nav.tasks.scheduled'),
      icon: 'i-heroicons-calendar',
      count: '12',
      color: 'text-violet-500',
      animate: false
    },
    {
      label: t('nav.tasks.today'),
      icon: 'i-heroicons-sun',
      count: '5',
      color: 'text-yellow-500',
      animate: false
    },
    {
      label: t('nav.tasks.urgent'),
      icon: 'i-heroicons-exclamation-triangle',
      count: '3',
      color: 'text-red-500',
      animate: true
    }
  ]

  const tags = [
    'trabalho',
    'pessoal',
    'urgente',
    'projeto',
    'reunião',
    'casa',
    'saúde',
    'finanças',
    'estudos',
    'família',
    'lazer',
    'compras',
    'viagem',
    'leitura',
    'exercício',
    'música',
    'arte',
    'tecnologia',
    'alimentação',
    'planejamento'
  ]
</script>

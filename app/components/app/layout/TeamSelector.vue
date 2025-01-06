<template>
  <USelect
    v-model="value"
    :icon="icon"
    :items="items"
    variant="ghost"
    color="neutral"
    class="w-full cursor-pointer"
    :ui="{
      base: 'text-white font-semibold hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white',
      content: 'bg-gray-800 text-white ring-gray-700',
      item: 'data-highlighted:before:bg-gray-700 cursor-pointer',
      itemLabel: 'text-white hover:text-white',
      itemTrailingIcon: 'text-white',
      itemLeadingIcon: 'group-data-[highlighted]:text-white',
      separator: 'bg-gray-700'
    }"
  />
</template>

<script setup lang="ts">
  import type { SelectItem } from '#ui/types'
  import type { SelectTeam } from '~~/server/database/schema'

  const { t } = useI18n()

  // Fetch teams from the API, during SSR
  const { data } = await useFetch('/api/teams')
  const teams = ref(data.value?.teams as SelectTeam[])

  const teamStore = useTeamsStore()
  onMounted(() => {
    teamStore.teams = teams.value
  })

  const items = computed(() => {
    if (!teams.value || teams.value.length === 0) {
      return [
        {
          label: t('teamSelector.noTeams'),
          value: 'no_teams',
          icon: 'i-lucide-circle-help'
        }
      ]
    }

    let items: SelectItem[] = teams.value.map((team: SelectTeam) => ({
      label: team.name,
      value: team.id,
      icon: 'i-lucide-circle-help'
    }))

    items.push({ type: 'separator' })
    items.push({
      label: t('teamSelector.registerNewTeam'),
      value: 'register_new_team',
      icon: 'i-lucide-plus-circle'
    })

    return items
  })

  const defaultTeamId = useCookie('dash-team_id')

  const value = ref<string | undefined>(defaultTeamId.value ?? teams.value[0]?.id)
  const icon = computed(() => items.value.find((item) => item.value === value.value)?.icon)

  watch(value, (newVal, oldVal) => {
    if (newVal === 'register_new_team') {
      const modalRegisterTeam = useState('modalRegisterTeam')
      modalRegisterTeam.value = true

      value.value = oldVal
      return
    }

    defaultTeamId.value = newVal
  })
</script>

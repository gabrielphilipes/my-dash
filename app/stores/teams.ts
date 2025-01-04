import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SelectTeam } from '~~/server/database/schema'

export const useTeamsStore = defineStore('teams', () => {
  // state
  const teams = ref<SelectTeam[]>([])

  // getters

  // actions

  return {
    // state
    teams

    // getters

    // actions
  }
})

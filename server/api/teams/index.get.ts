import { teamModel } from '~~/server/database/models/TeamModel'

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event)

  const teams = await teamModel.findAll(event.context.user.id)

  return {
    teams
  }
})

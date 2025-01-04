import { teamModel } from '~~/server/database/models/TeamModel'
import { RegisterTeamSchema } from '~~/server/validations/teams'

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event)
  const body = await readValidatedBody(event, (body) => RegisterTeamSchema(t).parse(body))

  // TODO: Verificar se o usuário PODE criar um time

  const team = await teamModel.create({
    name: body.name,
    description: body.description
  })

  if (!team) {
    throw createError({ statusCode: 400, statusMessage: 'Erro ao criar o time' })
  }

  const member = await teamModel.addMember(team.id, event.context.user.id)

  if (!member) {
    throw createError({ statusCode: 400, statusMessage: 'Erro ao adicionar o membro ao time' })
  }

  return {
    team
  }
})

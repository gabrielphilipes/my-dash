import { z } from 'zod'

export const RegisterTeamSchema = z.object({
  name: z.string().min(3, { message: 'Nome do time deve ter pelo menos 3 caracteres' }),
  description: z.string()
})

export type RegisterTeamSchema = z.infer<typeof RegisterTeamSchema>

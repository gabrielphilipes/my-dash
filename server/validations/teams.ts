import { z } from 'zod'

export const RegisterTeamSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().min(3, 'O nome do time deve ter pelo menos 3 caracteres'),
    description: z.string()
  })
}

export type RegisterTeamSchema = z.infer<ReturnType<typeof RegisterTeamSchema>>

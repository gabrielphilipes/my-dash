import { z } from 'zod'

export const TeamSchema = z.object({
  name: z.string().min(3, 'O nome da equipe deve ter no mínimo 3 caracteres')
})

export type TeamSchemaType = z.infer<typeof TeamSchema>

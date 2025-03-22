import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Email inválido').min(1).max(255),
  password: z
    .string()
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .max(255, 'A senha deve conter pelo menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
    ),
  remember: z.boolean().optional()
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

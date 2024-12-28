import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')
})

export type RegisterSchema = z.infer<typeof RegisterSchema>

export const ConfirmRegisterSchema = z.object({
  pin: z.array(z.string()).length(6, 'Código de verificação inválido'),
  email: z.string().email('Email inválido').optional()
})

export type ConfirmRegisterSchema = z.infer<typeof ConfirmRegisterSchema>

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')
})

export type LoginSchema = z.infer<typeof LoginSchema>

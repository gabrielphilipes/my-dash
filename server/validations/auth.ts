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

export const ForgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido')
})

export const ResetPasswordSchema = z.object({
  pin: z.array(z.string()).length(6, 'Código PIN inválido'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial')
})

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>

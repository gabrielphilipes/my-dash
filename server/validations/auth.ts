import { z } from 'zod'

export const RegisterSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().min(3, t('validations.name')),
    email: z.string().email(t('validations.email')),
    password: z.string().min(8, t('validations.password'))
  })
}

export type RegisterSchema = z.infer<ReturnType<typeof RegisterSchema>>

export const ConfirmRegisterSchema = (t: (key: string) => string) => {
  return z.object({
    pin: z.array(z.string()).length(6, t('validations.pin')),
    email: z.string().email(t('validations.email')).optional()
  })
}

export type ConfirmRegisterSchema = z.infer<ReturnType<typeof ConfirmRegisterSchema>>

export const LoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().email(t('validations.email')),
    password: z.string().min(8, t('validations.password'))
  })
}

export type LoginSchema = z.infer<ReturnType<typeof LoginSchema>>

export const ForgotPasswordSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().email(t('validations.email'))
  })
}

export const ResetPasswordSchema = (t: (key: string) => string) => {
  return z.object({
    pin: z.array(z.string()).length(6, t('validations.pin')),
    email: z.string().email(t('validations.email')),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial')
  })
}

export type ForgotPasswordSchema = z.infer<ReturnType<typeof ForgotPasswordSchema>>
export type ResetPasswordSchema = z.infer<ReturnType<typeof ResetPasswordSchema>>

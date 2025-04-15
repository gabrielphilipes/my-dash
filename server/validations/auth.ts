import { z } from 'zod'

// Login
export const LoginSchema = z.object({
  email: z.string().email('Email inválido').min(1).max(255),
  password: z
    .string()
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
    ),
  remember: z.boolean().optional()
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

// Register
export const RegisterSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').min(1).max(255),
    password: z
      .string()
      .min(8, 'A senha deve conter pelo menos 8 caracteres')
      .max(255)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
      ),
    passwordConfirmation: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos'
    })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não conferem'
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

// Recovery Password
export const RecoveryPasswordSchema = z.object({
  email: z.string().email('Email inválido').min(1).max(255)
})

export type RecoveryPasswordSchemaType = z.infer<typeof RecoveryPasswordSchema>

// Change Password
export const ChangePasswordSchema = z
  .object({
    token: z.string().min(1, 'Token inválido'),
    password: z
      .string()
      .min(8, 'A senha deve conter pelo menos 8 caracteres')
      .max(255)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
      ),
    confirmPassword: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem'
  })

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>

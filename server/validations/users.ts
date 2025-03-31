import { z } from 'zod'

export const InviteMembersSchema = z.object({
  members: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return []
      return val
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean)
    })
    .refine(
      (emails) => {
        if (emails.length === 0) return true

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emails.every((email) => emailRegex.test(email))
      },
      {
        message: 'Todos os emails devem ser válidos'
      }
    )
})

export type InviteMembersSchemaType = z.infer<typeof InviteMembersSchema>

// 2FA
export const RequestQRCodeSchema = z.object({
  code: z.array(z.string()).length(6, 'O código deve conter 6 dígitos')
})

export type RequestQRCodeSchemaType = z.infer<typeof RequestQRCodeSchema>

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

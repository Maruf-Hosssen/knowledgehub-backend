import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' })
      .optional(),
    role: z.enum(['user', 'admin']).default('user').optional(),
  }),
})

export const UserValidation = {
  userValidationSchema,
}

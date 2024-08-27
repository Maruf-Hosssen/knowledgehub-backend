import { z } from 'zod'

const CourseTagSchemaValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false),
})

const CourseDetailsSchemaValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
})

const CreateCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(CourseTagSchemaValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number().optional(),
    details: CourseDetailsSchemaValidation,
  }),
})

const UpdateCourseDetailsSchemaValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
})

const UpdateCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(CourseTagSchemaValidation).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    durationInWeeks: z.number().optional(),
    details: UpdateCourseDetailsSchemaValidation.optional(),
  }),
})

export const validationSchema = {
  CreateCourseSchemaValidation,
  UpdateCourseSchemaValidation,
}

import { Types } from 'mongoose'

export type CourseCategory = {
  name: string
  createdBy: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

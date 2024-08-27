import { Schema, model } from 'mongoose'
import { CourseCategory } from './category.interface'

const categorySchema = new Schema<CourseCategory>(
  {
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
)

export const Category = model<CourseCategory>('Categories', categorySchema)

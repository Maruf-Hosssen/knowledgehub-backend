import { Schema, model } from 'mongoose'
import { TCourse } from './course.interface'

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
      required: true,
    },
    price: { type: Number, required: true },
    tags: [
      {
        name: { type: String, required: true },
        isDeleted: { type: Boolean, required: true, default: false },
      },
    ],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
      level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
      },
      description: { type: String, required: true },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
)

//pre hook middleware
courseSchema.pre('save', function (next) {
  const startDate = new Date(this.startDate)
  const endDate = new Date(this.endDate)
  const durationHoursInWeek: number = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
  )

  this.durationInWeeks = durationHoursInWeek

  next()
})

export const Course = model<TCourse>('Courses', courseSchema)

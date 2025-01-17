import mongoose, { Types } from 'mongoose'

export type TReview = {
  courseId: mongoose.Types.ObjectId
  rating: number
  review: string
  createdBy: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

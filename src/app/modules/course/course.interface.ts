import { Schema } from 'mongoose'

export type Tag = {
  name: string
  isDeleted: boolean
}
export type CourseDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
}

export type TCourse = {
  payload: import('mongoose').Types.ObjectId
  title: string
  instructor: string
  categoryId: Schema.Types.ObjectId
  price: number
  tags: Tag[]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks: number
  details: CourseDetails
  createdBy: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

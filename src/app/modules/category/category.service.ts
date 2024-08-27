import { findUserByToken } from '../course/course.utils'
import { CourseCategory } from './category.interface'
import { Category } from './category.model'

const createCategory = async (payload: CourseCategory, token: string) => {
  const createdByUser = await findUserByToken(token)

  if (!createdByUser) {
    // Handle the case where the user is not found or the token is invalid
    throw new Error('Invalid token or user not found')
  }

  // Set the createdBy field in the payload
  payload.createdBy = (createdByUser._id as any).toString()
  const result = await (
    await Category.create(payload)
  ).populate('createdBy', '_id')
  return result
}
const getAllCategory = async () => {
  const result = await Category.find().populate(
    'createdBy',
    '_id username email role',
  )
  return result
}

export const categoryServices = {
  createCategory,
  getAllCategory,
}

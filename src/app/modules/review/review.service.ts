/* eslint-disable @typescript-eslint/no-explicit-any */
import { findUserByToken } from '../course/course.utils'
import { TReview } from './review.interface'
import { Review } from './review.model'

const createReview = async (payload: TReview, token: string) => {
  const createdByUser = await findUserByToken(token)

  if (!createdByUser) {
    // Handle the case where the user is not found or the token is invalid
    throw new Error('Invalid token or user not found')
  }

  // Set the createdBy field in the payload
  payload.createdBy = (createdByUser._id as any).toString()
  const result = (await Review.create(payload)).populate(
    'createdBy',
    '_id username email role',
  )
  return result
}
export const reviewServices = {
  createReview,
}

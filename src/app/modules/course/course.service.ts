import { TCourse } from './course.interface'
import { Course } from './course.model'
import { Review } from '../review/review.model'
import { findUserByToken } from './course.utils'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

//create a course
const createCourse = async (payload: TCourse, token: string) => {
  const createdByUser = await findUserByToken(token)

  if (!createdByUser) {
    // Handle the case where the user is not found or the token is invalid
    throw new Error('Invalid token or user not found')
  }

  // Set the createdBy field in the payload
  payload.createdBy = (createdByUser._id as any).toString()

  const result = await (
    await Course.create(payload)
  ).populate('createdBy', '_id')
  return result
}

//get all course
const getAllcourse = async (
  page: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
  minPrice: string | undefined,
  maxPrice: string | undefined,
  tags: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
  language: string | undefined,
  provider: string | undefined,
  durationInWeeks: string | undefined,
  level: string | undefined,
) => {
  const paginationAndFilteringObj: any = {}

  if (minPrice || maxPrice) {
    paginationAndFilteringObj.price = {}
    if (minPrice) paginationAndFilteringObj.price.$gte = parseFloat(minPrice)
    if (maxPrice) paginationAndFilteringObj.price.$lte = parseFloat(maxPrice)
  }

  if (tags) {
    paginationAndFilteringObj['tags.name'] = tags
  }

  if (startDate || endDate) {
    paginationAndFilteringObj.startDate = {}
    if (startDate)
      paginationAndFilteringObj.startDate.$gte = new Date(startDate)
    if (endDate) paginationAndFilteringObj.startDate.$lte = new Date(endDate)
  }

  if (language) {
    paginationAndFilteringObj.language = language
  }

  if (provider) {
    paginationAndFilteringObj.provider = provider
  }

  if (durationInWeeks) {
    paginationAndFilteringObj.durationInWeeks = parseInt(durationInWeeks)
  }

  if (level) {
    paginationAndFilteringObj['details.level'] = level
  }

  const sortOrderValue = sortOrder === 'asc' ? 1 : -1
  const result = await Course.find(paginationAndFilteringObj)
    .sort({ [sortBy]: sortOrderValue })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('createdBy', '_id username email role')
  return result
}

//get a single course with reviews
const getsingleCourseWithReviews = async (id: string) => {
  const course = await Course.findById(id)
    .lean()
    .populate('createdBy', '_id username email role')
  const reviews = await Review.find({ courseId: id }, { _id: 0, _v: 0 })
    .lean()
    .populate('createdBy', '_id username email role')

  return { course, reviews }
}

//update a course
const updateCourse = async (
  courseId: string,
  payload: Partial<TCourse>,
  token: string,
) => {
  const createdByUser = await findUserByToken(token)

  if (!createdByUser) {
    // Handle the case where the user is not found or the token is invalid
    throw new Error('Invalid token or user not found')
  }

  // Set the createdBy field in the payload
  payload.createdBy = (createdByUser._id as any).toString()
  const { ...courseData } = payload
  const updateBasicCoureData = await Course.findByIdAndUpdate(
    courseId,
    courseData,
    {
      new: true,
      runValidators: true,
    },
  ).populate('createdBy', '_id username email role')

  return updateBasicCoureData
}
//get the best course
const getTheBestCourse = async () => {
  const theBestCourse = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        reviewsCount: { $size: '$reviews' },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
    {
      $project: { reviews: 0 },
    },
  ])
  const course = theBestCourse[0]
  const averageRating = Number(course?.averageRating)
  const reviewCount = course.reviewCount
  return { course, averageRating, reviewCount }
}
export const courseServices = {
  createCourse,
  getAllcourse,
  getsingleCourseWithReviews,
  updateCourse,
  getTheBestCourse,
}

import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { User } from '../user/user.model'
import { courseServices } from './course.service'

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourse(
    req.body,
    req.headers.authorization as string,
  )

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: {
      _id: result._id,
      title: result.title,
      instructor: result.instructor,
      categoryId: result.categoryId,
      price: result.price,
      tags: result.tags,
      startDate: result.startDate,
      endDate: result.endDate,
      language: result.language,
      provider: result.provider,
      durationInWeeks: result.durationInWeeks,
      details: {
        level: result.details.level,
        description: result.details.description,
      },
      createdBy: result?.createdBy,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,

      __v: result.__v,
    },
  })
})
const getAllcourse = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'startDate',
    sortOrder = 'asc' || 'desc',
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = req.query

  const result = await courseServices.getAllcourse(
    page as number,
    limit as number,
    sortBy as string,
    sortOrder as string,
    minPrice as string | undefined,
    maxPrice as string | undefined,
    tags as string | undefined,
    startDate as string | undefined,
    endDate as string | undefined,
    language as string | undefined,
    provider as string | undefined,
    durationInWeeks as string | undefined,
    level as string | undefined,
  )
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      total: result.length,
    },
    data: {
      courses: result,
    },
  })
})
//get single course with Reviews
const getsingleCourseWithReviews = catchAsync(async (req, res) => {
  const result = await courseServices.getsingleCourseWithReviews(
    req.params.courseId,
  )
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course with reviews retrieved successfully',
    data: result,
  })
})

//update course data
const updateCourse = catchAsync(async (req, res) => {
  const result = await courseServices.updateCourse(
    req.params.courseId,
    req.body,
    req.headers.authorization as string,
  )
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  })
})

//get the best coure
const getTheBestCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getTheBestCourse()
  const result2 = result.course?.createdBy
  const details = await User.findById(result2)
  const reviewCount = result.course?.reviewsCount
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: {
      course: {
        _id: result.course?._id,
        title: result.course?.title,
        instructor: result.course?.instructor,
        categoryId: result.course?.categoryId,
        price: result.course?.price,
        tags: result.course?.tags,
        startDate: result.course?.startDate,
        endDate: result.course?.endDate,
        language: result.course?.language,
        provider: result.course?.provider,
        durationInWeeks: result.course?.durationInWeeks,
        details: {
          level: result.course?.details.level,
          description: result.course?.details.description,
        },
        createdBy: {
          _id: details?._id,
          username: details?.username,
          email: details?.email,
          role: details?.role,
        },
        createdAt: result?.course?.createdAt,
        updatedAt: result?.course?.updatedAt,
        reviewCount: result?.reviewCount,
        __v: result.course?.__v,
      },
      averageRating: result?.averageRating,
      reviewCount: reviewCount,
    },
  })
})
export const courseController = {
  createCourse,
  getAllcourse,
  getsingleCourseWithReviews,
  updateCourse,
  getTheBestCourse,
}

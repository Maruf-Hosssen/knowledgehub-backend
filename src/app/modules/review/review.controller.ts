import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { reviewServices } from './review.service'

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReview(
    req.body,
    req.headers.authorization as string,
  )
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: {
      _id: result._id,
      courseId: result?.courseId,
      rating: result?.rating,
      review: result?.review,
      createdBy: result?.createdBy,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,
    },
  })
})
export const reviewController = {
  createReview,
}

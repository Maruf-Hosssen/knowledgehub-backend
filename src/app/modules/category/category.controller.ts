import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { categoryServices } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategory(
    req.body,
    req.headers.authorization as string,
  )
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: {
      _id: result?._id,
      name: result?.name,
      createdBy: result?.createdBy?._id,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,
    },
  })
})
const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategory()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: {
      categories: result,
    },
  })
})

export const categoryController = {
  createCategory,
  getAllCategory,
}

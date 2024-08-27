import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userServices } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const data = req.body
  const result = await userServices.createUser(data)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: {
      _id: result?._id,
      username: result?.username,
      email: result?.email,
      role: result?.role,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,
    },
  })
})
export const userControllers = {
  createUser,
}

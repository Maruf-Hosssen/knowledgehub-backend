import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body)

  const { accessToken, userwithdetails } = result
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: {
      user: {
        _id: userwithdetails?._id,
        username: userwithdetails?.username,
        email: userwithdetails?.email,
        role: userwithdetails?.role,
      },
      token: accessToken,
    },
  })
})
const changePassword = catchAsync(async (req, res) => {
  try {
    const { ...passwordData } = req.body
    const result = await authServices.changePassword(req.user, passwordData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: {
        _id: result?._id,
        username: result?.username,
        email: result?.email,
        role: result?.role,
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
      },
    })
  } catch (err) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message:
        'Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).',
      data: null,
    })
  }
})
export const authContoller = {
  loginUser,
  changePassword,
}

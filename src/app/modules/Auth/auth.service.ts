import httpStatus from 'http-status'
import { AppError } from '../../errors/appError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import config from '../../config'
import { createToken } from './auth.utils'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//login user
const loginUser = async (payload: TLoginUser) => {
  const userwithdetails = await User.findOne({ username: payload?.username })

  const user = await User.isUserExistsByName(payload.username)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  //check if the password is matching
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched')

  //check the access and refresh tokens
  const jwtPayload = {
    username: user?.username,
    password: user?.password,
    role: user?.role,
  }
  //create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  return {
    accessToken,
    userwithdetails,
  }
}

//change password
const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByName(userData?.username)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  //check if the password is match or not
  if (
    !(await User.isPasswordMatched(payload?.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match')
  }
  if (payload.newPassword === payload.currentPassword) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'New password should be different from current password',
    )
  }
  const hashNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )
  const result = await User.findOneAndUpdate(
    { username: userData.username },
    { $set: { password: hashNewPassword } },
    { new: true },
  )
  return result
}

export const authServices = {
  loginUser,
  changePassword,
}

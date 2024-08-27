import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type IUser = {
  username: string
  email: string
  password: string
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByName(username: string): Promise<IUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
export type TUserRole = keyof typeof USER_ROLE

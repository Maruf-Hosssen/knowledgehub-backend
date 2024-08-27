import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser, UserModel>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  /* eslint-disable @typescript-eslint/no-this-alias */
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

//statics
userSchema.statics.isUserExistsByName = async function (username: string) {
  return await User.findOne({ username }).select('+password')
}
//password matching
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<IUser, UserModel>('User', userSchema)

import jwt from 'jsonwebtoken'
import config from '../../config'
import { User } from '../user/user.model'

export const findUserByToken = async (token: string) => {
  try {
    // Decode the token to get the user ID or other relevant information
    const decodedToken: any = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) // Replace 'your-secret-key' with your actual secret key

    // Extract the user ID from the decoded token
    const username = decodedToken?.username

    // Find the user by ID
    const user = await User.findOne({ username })

    return user
  } catch (error) {
    console.error('Error decoding token:', error)
    return null // Return null or handle the error as needed
  }
}

export type CourseFilterType = {
  page: number
  limit: number
  sortBy: string
  sortOrder: string
  minPrice: string | undefined
  maxPrice: string | undefined
  tags: string | undefined
  startDate: string | undefined
  endDate: string | undefined
  language: string | undefined
  provider: string | undefined
  durationInWeeks: string | undefined
  level: string | undefined
}

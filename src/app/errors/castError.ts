import mongoose from 'mongoose'

export type TerrorSources = {
  path: string | number
  message: string
}[]

export type TGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessage: string
  errorDetails: TerrorSources
}
const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorDetails: TerrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ]
  const er = errorDetails.map((el) => el.message)
  const statusCode = 400

  return {
    statusCode,
    message: 'Cast error',
    errorMessage: er[0],
    errorDetails,
  }
}
export default handleCastError

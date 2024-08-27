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

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorDetails: TerrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )
  const er = errorDetails.map((el) => el.message)
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: er[0],
    errorDetails,
  }
}

export default handleValidationError

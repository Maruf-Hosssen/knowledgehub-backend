import { ZodError, ZodIssue } from 'zod'
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
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorDetails: TerrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  const er = errorDetails.map((el) => el.message)

  const statusCode = 400
  return {
    statusCode,
    message: 'zod validation error',
    errorMessage: er[0],
    errorDetails,
  }
}
export default handleZodError

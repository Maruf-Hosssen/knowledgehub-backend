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

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/)

  const extractedMessage = match && match[1]

  const errorDetails: TerrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already existsss`,
    },
  ]
  const er = errorDetails.map((el) => el.message)

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: er[0],
    errorDetails: errorDetails,
  }
}

export default handleDuplicateError

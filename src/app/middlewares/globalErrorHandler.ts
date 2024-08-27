import { Request, Response } from 'express'
import { ZodError } from 'zod'

import config from '../config'

import { AppError } from '../errors/appError'
import handleCastError, { TerrorSources } from '../errors/castError'
import handleZodError from '../errors/zodError'
import handleValidationError from '../errors/validationError'
import handleDuplicateError from '../errors/duplicateError'

const globalErrorHandler = (err: any, req: Request, res: Response) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong!'
  let errorMessage = err.message || 'Something went wrong'

  let errorDetails: TerrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
    errorDetails = simplifiedError?.errorDetails
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
    errorDetails = simplifiedError?.errorDetails
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
    errorDetails = simplifiedError?.errorDetails
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
    errorDetails = simplifiedError?.errorDetails
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: errorMessage,
    errorDetails: errorDetails,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler

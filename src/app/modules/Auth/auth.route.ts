import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { authContoller } from './auth.controller'
import auth from '../../middlewares/auth'

const router = express.Router()
router.post(
  '/auth/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authContoller.loginUser,
)
router.post(
  '/auth/change-password',
  auth('admin', 'user'),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  authContoller.changePassword,
)

export const AuthRoutes = router

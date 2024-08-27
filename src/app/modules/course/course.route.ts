import express from 'express'
import { courseController } from './course.controller'
import { validationSchema } from './course.validation'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/courses',
  auth('admin'),
  validateRequest(validationSchema.CreateCourseSchemaValidation),
  courseController.createCourse,
)
router.get('/courses', courseController.getAllcourse)
router.get(
  '/courses/:courseId/reviews',
  courseController.getsingleCourseWithReviews,
)
router.put(
  '/courses/:courseId',
  auth('admin'),
  validateRequest(validationSchema.UpdateCourseSchemaValidation),
  courseController.updateCourse,
)
router.get('/course/best', courseController.getTheBestCourse)
export const courseRoutes = router

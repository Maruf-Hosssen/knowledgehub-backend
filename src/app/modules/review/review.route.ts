import express from 'express'
import { reviewController } from './review.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/reviews', auth('user'), reviewController.createReview)
export const ReviewRoutes = router

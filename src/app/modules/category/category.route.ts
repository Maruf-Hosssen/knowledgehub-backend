import express from 'express'
import { categoryController } from './category.controller'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post('/categories', auth('admin'), categoryController.createCategory)
router.get('/categories', categoryController.getAllCategory)
export const categoryRoutes = router

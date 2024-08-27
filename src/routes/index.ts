import { Router } from 'express'
import { categoryRoutes } from '../app/modules/category/category.route'
import { courseRoutes } from '../app/modules/course/course.route'
import { ReviewRoutes } from '../app/modules/review/review.route'
import { userRoute } from '../app/modules/user/user.route'
import { AuthRoutes } from '../app/modules/Auth/auth.route'

const router = Router()
const moduleRoutes = [
  {
    path: '/',
    route: categoryRoutes,
  },
  {
    path: '/',
    route: courseRoutes,
  },
  {
    path: '/',
    route: ReviewRoutes,
  },
  {
    path: '/',
    route: userRoute,
  },
  {
    path: '/',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router

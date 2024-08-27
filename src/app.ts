import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './routes'
import { notfound } from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello maruf!')
})
//error handler
app.use(globalErrorHandler)
app.use(notfound)
export default app

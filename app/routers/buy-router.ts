/** router */
import { Router } from 'express'

/** buy router */
const buyRouter = Router()

/** controller */
import { buy } from '../controllers/buy-controller'

/** buy */
buyRouter.post('/buy', buy)

export default buyRouter
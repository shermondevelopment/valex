/** router */
import { Router } from 'express'

/** buy router */
const buyRouter = Router()

/** middleware  */
import validate from '../middleware/validateSchema'

/** validade */
import buyValidation from '../validation/buy-validation'


/** controller */
import { buy } from '../controllers/buy-controller'

/** buy */
buyRouter.post('/buy', validate(buyValidation),  buy)

export default buyRouter
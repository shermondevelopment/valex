/** router */
import { Router } from 'express'

/** middlewares */
import authCompanies  from '../middleware/business-auth'
import validate from '../middleware/validateSchema'

/** controllers */
import { recharge } from '../controllers/recharge-controller'

/** validation */
import rechargeSchema from '../validation/recharge-validation'

const rechargeRouter = Router()

/** rechargers */

rechargeRouter.post('/recharge/:id', authCompanies, validate(rechargeSchema), recharge)


export default rechargeRouter
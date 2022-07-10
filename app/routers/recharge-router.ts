/** router */
import { Router } from 'express'

/** middlewares */
import authCompanies  from '../middleware/business-auth'

/** controllers */
import { recharge } from '../controllers/recharge-controller'

const rechargeRouter = Router()

/** rechargers */

rechargeRouter.post('/recharge/:id', authCompanies, recharge)


export default rechargeRouter
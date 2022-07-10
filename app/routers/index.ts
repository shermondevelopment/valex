/** router */
import { Router } from 'express'

/** recharges router */
import rechargeRouter from './recharge-router';

/** card router */
import cardRouter from './card-router';


const router = Router()


router.use(rechargeRouter)
router.use(cardRouter)


export default router
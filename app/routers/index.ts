/** router */
import { Router } from 'express'

/** recharges router */
import rechargeRouter from './recharge-router';

/** card router */
import cardRouter from './card-router';

/** buy router */
import buyRouter from './buy-router';


const router = Router()


router.use(rechargeRouter)
router.use(cardRouter)
router.use(buyRouter)


export default router
import { Request, Response } from 'express'

/** recharge service */
import { rechargeService } from '../services/recharge-service'


export const recharge = async (req: Request, res: Response) => {

  const { id } = req.params
 
  const { amount } = req.body

  await rechargeService(Number(id), Number(amount))

  await res.sendStatus(204)
}
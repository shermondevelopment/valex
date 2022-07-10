import { Request, Response } from 'express'

/** service */
import { buyService } from '../services/buy-service'


export const buy = async (req: Request, res: Response) => {
  const { cardId, password, businessId, amount } = req.body;

  await buyService(cardId, password, businessId, amount);

  res.sendStatus(201);
}
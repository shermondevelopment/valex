import { Request, Response } from 'express'

/** services */
import { addNewCard, enableCard, getTransactions, blockCardService, unBlockCardService } from '../services/card-service'

export const newCard = async (req: Request, res: Response) => {

  const { id } = req.params
  const { type } = req.body

  await addNewCard(Number(id), type)

  res.sendStatus(204)

}

export const  activeCard = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { securityCode, password } = req.body;

  await enableCard(Number(id), securityCode, password);

  res.sendStatus(204);
}

export const getTransactionsOfCard = async (req:Request, res:Response) => {
  const { id } = req.params;

  const transaction = await getTransactions(Number(id));

  res.status(200).json(transaction)
}

export const blockCard = async (req: Request, res: Response) => {
  const { id  } = req.params
  const { password } = req.body

  await blockCardService(Number(id), password)

  res.sendStatus(204)
}

export const unBlockCard = async (req: Request, res: Response) => {
  const { id  } = req.params
  const { password } = req.body

  await unBlockCardService(Number(id), password)

  res.sendStatus(204)
}
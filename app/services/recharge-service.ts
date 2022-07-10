/** cardId */
import { findById } from '../repositories/cardRepository'

/** recharges repository */
import { insert } from '../repositories/rechargeRepository';

/** utils */
import { validExpireDateCard } from '../utils/validEXpireDateCard'

export const rechargeService = async (cardId: number, amount: number) => {

  if (amount <= 0) {
    throw {
      status: 422,
      message: 'please enter a value greater than zero'
    }
  }

  const card = await findById(cardId)

  if (!card) {
    throw {
      status: 404,
      message: 'card not found'
    }
  }

  if (card.password) {
    throw {
      status: 403,
      message: 'card not active'
    }
  }

  const cardExpired = validExpireDateCard(card.expirationDate);
  if(cardExpired) {
    throw {
      status: 422,
      message: 'card expired'
    }
  }

  await insert({cardId, amount})

}
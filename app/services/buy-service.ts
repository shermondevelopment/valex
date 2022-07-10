/** card reposittory */
import { findById } from '../repositories/cardRepository'

/** findBusiness */
import { findById as findBusinessById } from "../repositories/businessRepository";

/** */
import { findByCardId } from "../repositories/rechargeRepository";

/** payment */
import { findByCardId as findByPayment, insert } from '../repositories/paymentRepository';

/** bcrypt */
import bcrypt from 'bcrypt'


/** utils */
import { validExpireDateCard } from '../utils/validEXpireDateCard'

export const buyService = async (cardId:number, password:string, businessId:number, amount:number) => {

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

  if (!card.password) {
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

  if (!(await bcrypt.compare(password, card.password))) {
    throw {
      status: 401,
      message: 'invalid password'
    }
  }

  const business = await findBusinessById(businessId);

  console.log(business, businessId)
  
  if (!business) {
    throw {
      status: 404,
      message: 'business not exists'
    }
  }

    if( card.type !== business.type ) {
      throw {
        status: 404,
        message: 'type not permited'
      }
    }

    let amountCha:number = 0;
    const charge = await findByCardId(cardId)

    if(charge.length > 0){
        charge.forEach((charge) => amountCha += charge.amount);
    }

    let amountPayment:number = 0;
    const payment = await findByPayment(cardId);
    if(payment.length > 0){
        payment.forEach((payment) => amountPayment += payment.amount);
    }

    const total = amountCha - amountPayment

    if (total < amount) {
      throw {
        status: 403,
        message: 'you have no limit'
      }
    }

    await insert({cardId, businessId, amount});

}
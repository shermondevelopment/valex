/** dayjs */
import dayjs from 'dayjs';

/** crypt */
import Cryptr from 'cryptr'

/** utils */
import { validExpireDateCard } from '../utils/validEXpireDateCard'

/** encrypt */
import bcrypt from 'bcrypt'

/** fake */
import { faker } from '@faker-js/faker';

/** employer repository  */
import { findById } from '../repositories/employeeRepository'

/** card employyed */
import { findByTypeAndEmployeeId, TransactionTypes, insert, findById as findByCardId, update } from '../repositories/cardRepository';

/** payments cards */
import { findByCardId as findPaymentByCard } from '../repositories/paymentRepository';


export const addNewCard = async (employeeId: number, type: TransactionTypes) => {

  const employee = await findById(employeeId)

  // verify if employee exists
  if (!employee) {
    throw {
      status: 404,
      message: 'unregistered employee'
    }
  }

  const existTypeToEmployee = await findByTypeAndEmployeeId(type, employeeId); 

  if (existTypeToEmployee) {
    throw {
      status: 409,
      message: 'employee already has this benefit'
    }
  }

  const CardInfo = {
    employeeId,
    number: faker.finance.creditCardNumber(),
    cardholderName: generateNameCard(employee.fullName),
    securityCode: encrypt( faker.finance.creditCardCVV()),
    expirationDate: dayjs().add(5, 'year').locale('pt-br').format(`MM/YY`),
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type
  }

  insert(CardInfo)

  

}

export const enableCard = async (cardId: number, securityCode: string, password: string)  => {
  const card = await findByCardId(cardId)

  if (!card) {
    throw {
      status: 404,
      message: 'card does not exist'
    }
  }


  if(card.password) {
    throw {
      status: 409,
      message: 'card with password cannot be activated'
    }
  }

  if(password.length !== 4 && Number(password)) {
    throw {
      status: 422,
      message: 'password must contain 4 numeric characters'
    }
  }

  const decryptSecuritCode = decrypt(card.securityCode)
  console.log(decryptSecuritCode)

  if (decryptSecuritCode !== securityCode) {
    throw {
      status: 403,
      message: 'security code does not match'
    }
  }

  const expireCard = validExpireDateCard(card.expirationDate);

  if (expireCard) {
    throw {
      status: 400,
      message: 'card expired'
    }
  }

  const encryptPassword = encryptPass(password)

  await update(cardId, {password: encryptPassword});

}

export const getTransactions = async (cardId: number) => {
  const card = await findByCardId(cardId);

  if (!card) {
    throw {
      status: 404,
      message: 'card not found'
    }
  }

  let amountCharge:number = 0;
  const charges = await findPaymentByCard(cardId)
  if(charges.length > 0){
      charges.forEach((charge) => amountCharge += charge.amount);
  }

  let amountPayments:number = 0;
  const payments = await findPaymentByCard(cardId);
  if(payments.length > 0){
      payments.forEach((payment) => amountPayments += payment.amount);
  }

  const chargeTotal = amountCharge - amountPayments;

  return {
      balance: chargeTotal,
      transactions: payments,
      recharges: charges
  }
}

export const blockCardService = async (id: number, password: string) => {
  const card = await findByCardId(id);

  if (!card) {
    throw {
      status: 404,
      message: 'card not found'
    }
  }

  const cardExpired = validExpireDateCard(card.expirationDate);
  if(cardExpired) {
    throw {
      status: 422,
      message: 'card expired'
    }
  }

  if (card.isBlocked) {
    throw {
      status: 422,
      message: 'card is already blocked'
    }
  }

  if (!(await bcrypt.compare(password, card.password))) {
    throw {
      status: 401,
      message: 'invalid password'
    }
  }

  await update(id, {isBlocked:true});
}

export const unBlockCardService = async (id: number, password: string) => {
  const card = await findByCardId(id);

  if (!card) {
    throw {
      status: 404,
      message: 'card not found'
    }
  }

  const cardExpired = validExpireDateCard(card.expirationDate);
  if(cardExpired) {
    throw {
      status: 422,
      message: 'card expired'
    }
  }

  if (!card.isBlocked) {
    throw {
      status: 422,
      message: 'card is already unlocked'
    }
  }

  if (!(await bcrypt.compare(password, card.password))) {
    throw {
      status: 401,
      message: 'invalid password'
    }
  }

  await update(id, {isBlocked:false});
}

const generateNameCard = (fullName: string): string  => {
  const splitFullName = fullName.split(' ')
  const name: Array<string> = []
  splitFullName.forEach((item) => {
    if (item.length > 3) {
      name.push(item.toLocaleUpperCase())
    }
  })
  name.forEach( (item, indice) => {
    if (item !== name.at(0) && item !== name.at(-1)) {
      name[indice] = name[indice].substring(0, 1)
    }
  } )
  return name.join(' ')
}

const encrypt = (stringToEncrypt: string) => {
  const encryptString = new Cryptr(process.env.ENCRYPT)
  return encryptString.encrypt(stringToEncrypt);
}

const decrypt = (stringToEncrypt: string) => {
  const descyptString = new Cryptr(process.env.ENCRYPT)
  return descyptString.decrypt(stringToEncrypt);
}

export const  encryptPass = (password:string) => {
  const SALT = 10;
  const encryptedPassword = bcrypt.hashSync(password, SALT);
  return encryptedPassword;
}
import * as Joi from 'joi'

const buyValidation = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().required()
})

export default buyValidation
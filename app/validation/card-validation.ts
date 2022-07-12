import * as Joi from 'joi'

export const newCardSchema = Joi.object({
  type: Joi.string().valid(
      'education',
      'groceries',
      'restaurant',
      'transport',
      'health'
  ).required()
});


export const enableCardSchema = Joi.object({
  securityCode: Joi.string().required(),
  password: Joi.string().required()
});

export const passwordSchema = Joi.object({
  password: Joi.string().required()
});


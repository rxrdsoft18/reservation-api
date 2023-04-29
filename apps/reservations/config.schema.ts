import * as Joi from 'joi';

export const configSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
  AUTH_HOST: Joi.string().required(),
  AUTH_PORT: Joi.number().required(),
  PAYMENTS_HOST: Joi.string().required(),
  PAYMENTS_PORT: Joi.number().required(),
});

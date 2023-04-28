import * as Joi from 'joi';

export const configSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.number().required(),
  MONGODB_URI: Joi.string().required(),
  PORT: Joi.number().required(),
});

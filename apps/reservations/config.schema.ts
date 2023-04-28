import * as Joi from 'joi';

export const configSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
  PORT: Joi.number().required(),
});

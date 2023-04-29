import * as Joi from 'joi';

export const configSchema = Joi.object({
  TCP_PORT: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  NOTIFICATIONS_HOST: Joi.string().required(),
  NOTIFICATIONS_PORT: Joi.string().required(),
});

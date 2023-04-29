import * as Joi from 'joi';

export const configSchema = Joi.object({
  TCP_PORT: Joi.number().required(),
  GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
  GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string().required(),
  SMTP_USER: Joi.string().required(),
});

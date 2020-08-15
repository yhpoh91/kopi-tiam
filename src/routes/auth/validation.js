import Joi from 'joi';

export default {
  login: {
    query: {},
    params: {},
    body: {
      username: Joi.string().min(1).required(),
      password: Joi.string().min(1).required(),
    },
  },

  register: {
    query: {},
    params: {},
    body: {
      username: Joi.string().min(1).required(),
      password: Joi.string().min(6).required(),
      passwordConfirm: Joi.any().valid(Joi.ref('password')).required().options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
      givenName: Joi.string().min(1).required(),
      familyName: Joi.string().min(1).required(),
    },
  },

  create: {
    query: {},
    params: {},
    body: {
      username: Joi.string().min(1).required(),
      password: Joi.string().min(6).required(),
      passwordConfirm: Joi.any().valid(Joi.ref('password')).required().options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
      profileId: Joi.string().min(1).required(),
    },
  },
};

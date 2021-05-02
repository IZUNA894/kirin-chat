const schema = joi =>
  joi.object().keys({
    first_name: joi
      .string()
      .required()
      .min(2),
    last_name: joi
      .string()
      .required()
      .min(2),

    phone: joi.string().required(),
    country_code: joi.string().required(),

    email: joi
      .string()
      .email()
      .lowercase()
      .required(),
    email_verified: joi
      .boolean()
      .forbidden()
      .default(false),

    password: joi.string().required(),
    confirm_password: joi
      .string()
      .required()
      .valid(joi.ref("password"))
      .strip(),
    username: joi
      .string()
      .lowercase()
      .required(),
    friends: joi
      .array()
      .forbidden()
      .default([]),
    date_added: joi
      .date()

      .forbidden()
      .default(() => new Date()),
    date_updated: joi
      .date()

      .forbidden()
      .default(() => new Date())
  });

module.exports = schema;

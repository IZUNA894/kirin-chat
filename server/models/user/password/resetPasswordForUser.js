const schema = joi =>
  joi.object().keys({
    user_id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    password: joi
      .string()
      .min(3)
      .required(),
    new_password: joi
      .string()
      .min(3)
      .required(),
    confirm_new_password: joi
      .string()
      .min(3)
      .required()
  });

module.exports = schema;

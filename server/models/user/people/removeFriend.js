const schema = joi =>
  joi.object().keys({
    user_id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    friend_id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  });

module.exports = schema;

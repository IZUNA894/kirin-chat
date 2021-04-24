const schema = (joi) =>
  joi.object().keys({
    email: joi.string().email(),
    user_id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    old_password: joi.string().min(3).required(),
    new_password: joi.string().min(3).required(),
    confirm_new_password: joi.string().min(3).required(),
  });

module.exports = schema;

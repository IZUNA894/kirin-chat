const schema = joi =>
  joi.object().keys({
    user_id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),

    first_name: joi.string().min(2),
    last_name: joi.string().min(2),
    username: joi.string(),
    city: joi.string(),
    country: joi.string(),
    phone: joi.string(),
    country_code: joi.string(),

    date_updated: joi
      .date()
      .forbidden()
      .default(() => new Date())
  });

module.exports = schema;

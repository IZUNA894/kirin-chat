const schema = (joi) =>
  joi.object().keys({
    user_id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),

    organization_id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),

    password: joi.string().required(),

    date_updated: joi
      .date()
      .timestamp("unix")
      .forbidden()
      .default(() => Math.floor(Date.now() / 1000)),
  });

module.exports = schema;

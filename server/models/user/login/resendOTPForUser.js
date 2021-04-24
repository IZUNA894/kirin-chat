const schema = joi =>
  joi.object().keys({
    phone: joi.string().required(),
    country_code: joi.string().required()
  });

module.exports = schema;

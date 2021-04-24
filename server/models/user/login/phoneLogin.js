const schema = joi =>
  joi.object().keys({
    phone_number: joi.string().required(),
    country_code: joi.string().required()
  });

module.exports = schema;

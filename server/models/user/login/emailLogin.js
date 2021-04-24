const schema = joi =>
  joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

module.exports = schema;

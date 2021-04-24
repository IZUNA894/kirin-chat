const schema = joi =>
  joi.object().keys({
    email: joi.email().required(),
    password: joi.email().required()
  });

module.exports = schema;

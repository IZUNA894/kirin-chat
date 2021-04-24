const schema = joi =>
  joi.object().keys({
    from: joi.string().required(),
    to: joi.string().required()
  });

module.exports = schema;

const schema = joi =>
  joi.object().keys({
    hash: joi.string().required()
  });

module.exports = schema;

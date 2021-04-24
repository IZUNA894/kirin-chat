const schema = (joi) =>
  joi.object().keys({
    email: joi.string().email().required(),
  });

module.exports = schema;

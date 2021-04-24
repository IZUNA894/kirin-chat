const schema = (joi) =>
  joi.object().keys({
    hash: joi.string().alphanum().min(10).required(),
  });

module.exports = schema;

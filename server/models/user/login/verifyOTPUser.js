const schema = (joi) =>
  joi.object().keys({
    otp: joi.string().min(6).max(6).required(),
    phone: joi.string().required(),
  });

module.exports = schema;

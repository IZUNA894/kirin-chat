const schema = (yup) => {
  return yup.object().shape({
    first_name: yup.string().label("first name"),
    last_name: yup.string().label("last name"),

    country_code: yup
      .string()
      .nullable()
      .oneOf(["91", null], "only indian is supported")

      .label("country code"),
    phone: yup
      .string("phone is required")
      .nullable()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "phone number is not valid"
      )

      .label("phone"),
  });
};

export default schema;

const schema = (yup) => {
  return yup.object().shape({
    email: yup
      .string()
      .email("email is invalid")
      .required("email is required")
      .label("email"),
    password: yup
      .string()
      .min(8, "password should be greater than 8 char")
      .required("password is required")
      .label("pasword"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "passwords must match")
      .required("confirm password is required")
      .label("confirm password"),

    name: yup
      .string()
      .required("name is required")
      .label("distributor name"),
    country_code: yup
      .string()
      .oneOf(["91"], "only indian is supported")
      .required("countruy code is required")
      .label("country code"),
    phone: yup
      .string("phone is required")
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "phone number is not valid"
      )
      .required("phone is required")
      .label("phone"),
  });
};

export default schema;

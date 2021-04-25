const schema = (yup) => {
  return yup.object().shape({
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

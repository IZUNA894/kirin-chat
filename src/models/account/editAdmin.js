const schema = (yup) => {
  return yup.object().shape({
    admin_id: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required("admin_id is required"),

    name: yup
      .string()
      .required("distributor name is required")
      .label("distributor name"),
    description: yup
      .string()
      .max(150, "description should be smaller than 150 letters"),

    website: yup.string(),
    country_code: yup
      .string()
      .oneOf(["91"], "only indian is supported")
      .required("countruy code is required")
      .label("country code"),

    phone: yup
      .string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "phone number is not valid"
      )
      .required("phone is required")
      .label("phone"),
    bank_name: yup
      .string()

      // .required("bank name is required")
      .label("bank name"),
    ifsc: yup
      .string()
      .length(11, "ifsc should be of  11 char")
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "IFSC is not corect")
      // .required("ifsc is required")
      .label("ifsc"),

    account: yup
      .string()
      // .required("account number is required")
      .matches(/^\d{9,18}$/, "Account number is not corect")
      .min(9, "account should be greater than 9 letters")
      .max(18, "account number should be less than 18 letters")
      .label("account"),
  });
};

export default schema;

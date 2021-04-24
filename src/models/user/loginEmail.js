const schema = (yup) => {
  return yup.object().shape({
    email: yup
      .string()
      .lowercase()
      .email("email is invalid")
      .required("email is required")
      .label("email"),
    password: yup
      .string()
      .min(8, "password should be greater than 8 char")
      .required("password is required")
      .label("pasword"),
  });
};

export default schema;

const schema = (yup) => {
  return yup.object().shape({
    user_id: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required("user_id is required"),
    password: yup
      .string()
      .min(8, "password should be greater than 8 char")
      .required("password is required")
      .label("pasword"),
    new_password: yup
      .string()
      .min(8, "password should be greater than 8 char")
      .required("password is required")
      .label("new_pasword"),

    confirm_new_password: yup
      .string()
      .oneOf([yup.ref("new_password")], "passwords must match")
      .required("confirm password is required")
      .label("confirm_new_password"),
  });
};

export default schema;

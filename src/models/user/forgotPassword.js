const schema = (yup) => {
  return yup.object().shape({
    email: yup
      .string()
      .email("email is invalid")
      .required("email is required")
      .label("email"),
  });
};

export default schema;

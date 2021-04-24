const schema = (yup) => {
  return yup.object().shape({
    product_id: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/)
      .required("product_id is required"),

    product_name: yup
      .string()
      .required("Product Name is required")
      .label("productName"),

    variant: yup.string().label("variant"),
    description: yup
      .string()

      .label("description"),

    price: yup
      .number()
      .min(1, "price should be greater than 0")
      .required("price is required")
      .label("price"),
  });
};

export default schema;

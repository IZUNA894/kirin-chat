const schema = (yup) => {
  return yup.object().shape({
    product_name: yup
      .string()
      .required("Product Name is required")
      .label("productName"),

    variant: yup.string().label("variant"),
    description: yup
      .string()

      .required("description is required")
      .label("description"),

    price: yup
      .number()
      .min(1, "price should be greater than 0")
      .required("price is required")
      .label("price"),
  });
};

export default schema;

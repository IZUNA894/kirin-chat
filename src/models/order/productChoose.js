const schema = (yup) => {
  return yup.object().shape({
    product_id: yup
      .string()
      .trim()
      .matches(/^[0-9a-fA-F]{24}$/, "distributor_id is not correct")
      .required("distributor_id is required"),
    product_choosen_quantity: yup
      .number("Quantity must be number")
      .integer("Quantity must be integer")
      .min(1, "Quantity of product choosed must be greater than 0")
      .max(50000, "Quantity is too large")
      .required("quantity is required")
      .label("quantity"),
    price: yup
      .number("price must be number")
      .integer("price must be integer")
      .min(1, "price of product choosed must be greater than 0")
      .max(50000, "price is too large")
      .required("price is required")
      .label("price"),
    product_name: yup
      .string("product name must be string")
      .required("product name is required")
      .label("product name"),
  });
};

export default schema;

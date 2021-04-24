const schema = (yup) => {
  return yup.object().shape({
    order_id: yup
      .string()
      .trim()
      .matches(/^[0-9a-fA-F]{24}$/, "distributor_id is not correct")
      .required("order_id is required"),
    distributor_id: yup
      .string()
      .trim()
      .matches(/^[0-9a-fA-F]{24}$/, "distributor_id is not correct")
      .required("distributor_id is required"),
    distributor_name: yup
      .string()
      .required("distributorName is required")
      .label("distributorName"),
    invoice_id: yup
      .string()
      .required("Invoice  ID is required")
      .label("Invoice  ID"),
    status: yup
      .string()
      .oneOf([
        "PLACED",
        "PROCESSING",
        "SHIPPING",
        "TRANSACTION PENDING",
        "COMPLETED",
      ])
      .required("status is required")
      .label("status"),
    note: yup
      .string()
      .nullable()
      .label("note"),
    products: yup
      .array()
      .of(
        yup.object().shape({
          product_id: yup
            .string()
            .trim()
            .matches(/^[0-9a-fA-F]{24}$/, "product_id is not coorect")
            .required("product_id is required"),
          quantity: yup.number().required(),
          price: yup.number(),
          variant: yup.string(),
          product_name: yup.string(),
        })
      )
      .min(1, "you must choose min. 1 product"),
  });
};

export default schema;

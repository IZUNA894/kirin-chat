const schema = (yup) => {
  return yup.object().shape({
    distributor_id: yup
      .string()
      .trim()
      .matches(/^[0-9a-fA-F]{24}$/, "distributor_id is not correct")
      .required("distributor_id is required"),
    distributor_name: yup
      .string()
      .required("distributorName is required")
      .label("distributorName"),
    // order_name: yup
    //   .string()
    //   .required("orderName is required")
    //   .label("orderName"),
    // status: yup
    //   .string()
    //   .oneOf(
    //     ["pending", "completed"],
    //     "status can either be pendig or completed"
    //   )
    //   .required("status is required")
    //   .label("status"),

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
          product_name: yup.string(),
          price: yup.number(),
          variant: yup.string(),
        })
      )
      .min(1, "you must choose min. 1 product"),
    note: yup
      .string()
      .nullable()
      .label("note"),
  });
};

export default schema;

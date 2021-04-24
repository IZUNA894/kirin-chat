import DataService from "./dataService";

class ProductapiService {
  getAllProducts = (data) => {
    return DataService.getRequest("/api/v1/products/all", data).then((res) => {
      console.log(res);
      if (res.status !== true) throw res;
      return res.data;
    });
  };

  getFilteredProducts = (data) => {
    return DataService.getRequest("/api/v1/products/filter", data).then(
      (res) => {
        console.log(res);
        if (res.status !== true) throw res;
        return res.data;
      }
    );
  };

  getProductById = ({ product_id }) => {
    return DataService.getRequest("/api/v1/products", { product_id }).then(
      (res) => {
        console.log(res);
        if (res.status !== true) throw res;
        return res.data;
      }
    );
  };

  updateProduct = (data) => {
    return DataService.putFormDataRequest("/api/v1/products/", data).then(
      (res) => {
        console.log(res);
        if (res.status !== true) throw res;

        return res.data;
      }
    );
  };

  // updateProductPhoto = (data) => {
  //   return DataService.putFormDataRequest("/api/v1/products/", data).then(
  //     (res) => {
  //       console.log(res);
  //       if (res.status !== true) throw res;

  //       return res.data;
  //     }
  //   );
  // };

  createProduct = (data) => {
    return DataService.postFormDataRequest("/api/v1/products/", data).then(
      (res) => {
        console.log(res);
        if (res.status !== true) throw res;
        return res.data;
      }
    );
  };

  deleteProduct = ({ product_id }) => {
    return DataService.deleteRequest("/api/v1/products/", { product_id }).then(
      (res) => {
        console.log(res);
        if (res.status !== true) throw res;

        return res.data;
      }
    );
  };
}

export default new ProductapiService();

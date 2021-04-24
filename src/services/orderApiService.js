import DataService from "./dataService";

class OrderapiService {
  getAllOrders = ({ distributor_id }) => {
    return DataService.getRequest("/api/v1/orders/all", {
      distributor_id,
    }).then((res) => {
      console.log(res);
      if (res.status !== true) throw res;
      return res.data;
    });
  };

  // getAllOrdersAdmin = (data) => {
  //   return DataService.getRequest("/api/v1/orders/all/", data).then((res) => {
  //     console.log(res);
  //     if (res.status !== true) throw res;
  //     return res.data;
  //   });
  // };

  getOrderDetails = ({ order_id }) => {
    return DataService.getRequest("/api/v1/orders", { order_id }).then(
      (res) => {
        console.log(res);
        if (res.status !== true) throw res;
        return res.data;
      }
    );
  };

  createOrder = (data) => {
    return DataService.postRequest("/api/v1/orders/", data).then((response) => {
      console.log(response);
      if (response.status !== true) throw response;
      return response.data;
    });
  };

  updateOrder = (data) => {
    return DataService.putRequest("/api/v1/orders/", data).then((res) => {
      console.log(res);
      if (res.status !== true) throw res;
      return res.data;
    });
  };

  deleteOrder = ({ order_id }) => {
    return DataService.deleteRequest("/api/v1/orders/", { order_id }).then(
      (res) => {
        console.log(res);
        if (res.status !== true) throw res;
        return res.data;
      }
    );
  };
}

export default new OrderapiService();

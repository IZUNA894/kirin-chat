///Base Class for HTTP Abstraction
class dataService {
  ///Base URL for HTTP requests
  // private baseURL = "http://localhost:4000/";
  //private baseURL = window.location.origin;

  constructor() {}

  ///Abstraction for HTTP GET Request
  getRequest(requestURL, parameters) {
    ///Construct Request URL
    const apiURL = requestURL;

    // ///Check For params
    // if (parameters) {
    //   const requestParams = { params: parameters };
    //   return this.httpClient.get(apiURL, requestParams).toPromise();
    // }

    return fetch(
      apiURL + "?" + new URLSearchParams(parameters)
    ).then((response) => response.json());
  }

  ///Abstraction for HTTP POST Request
  postRequest(requestURL, body) {
    ///Construct Request URL
    const apiURL = requestURL;

    return fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //for file req
  ///Abstraction for HTTP POST Request
  postFormDataRequest(requestURL, data) {
    const apiURL = requestURL;

    return fetch(apiURL, {
      method: "POST",

      body: data,
    }).then((response) => response.json());
  }

  ///Abstraction for HTTP PUT Request
  putRequest(requestURL, body, parameters) {
    ///Construct Request URL
    const apiURL = requestURL;

    ///Check For params
    // if (parameters) {
    //   const requestParams = { params: parameters };
    //   return this.httpClient.put(apiURL, body, requestParams).toPromise();
    // }

    return fetch(apiURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  putFormDataRequest(requestURL, body) {
    ///Construct Request URL
    const apiURL = requestURL;

    return fetch(apiURL, {
      method: "PUT",

      body: body,
    }).then((response) => response.json());
  }

  ///Abstraction for HTTP DELETE Request
  deleteRequest(requestURL, body, parameters) {
    ///Construct Request URL
    const apiURL = requestURL;

    ///Check For params
    // if (parameters) {
    // }

    return fetch(apiURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

export default new dataService();

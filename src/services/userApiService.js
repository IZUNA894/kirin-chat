import DataService from "./dataService";

class UserApiService {
  signup = (data) => {
    return DataService.postRequest("/api/v1/users/signup", data).then(
      (response) => {
        console.log(response);
        if (response.status !== true) {
          throw response;
        }

        return response.data;
      }
    );
  };
  loginByEmail = (data) => {
    return DataService.postRequest("/api/v1/users/login/email", data).then(
      (response) => {
        console.log(response);

        if (response.status !== true) throw response;
        return response.data;
      }
    );
  };

  updateUser = (data) => {
    return DataService.putRequest("/api/v1/users/", data).then((response) => {
      console.log(response);
      if (response.status !== true) throw response;
      return response.data;
    });
  };

  changePassword = (data) => {
    return DataService.postRequest("/api/v1/users/password/change", data).then(
      (response) => {
        console.log(response);
        if (response.status !== true) throw response;
      }
    );
  };

  getUserById = ({ user_id }) => {
    return DataService.getRequest("/api/v1/users", {
      user_id,
    }).then((response) => {
      console.log(response);
      if (response.status !== true) throw response;
      return response.data;
    });
  };

  loginByPhone = (data) => {
    return DataService.postRequest("/api/v1/users/login/phone", data).then(
      (response) => {
        // console.log(response);

        if (response.status !== true) throw response;
        return response.data;
      }
    );
  };

  verifyOTP = (data) => {
    return DataService.postRequest("/api/v1/users/verify/phone", data).then(
      (response) => {
        // console.log(response);

        if (response.status !== true) throw response;
        return response.data;
      }
    );
  };

  resendOTP = (data) => {
    return DataService.postRequest("/api/v1/users/resend", data).then(
      (response) => {
        // console.log(response);

        if (response.status !== true) throw response;
        return response.data;
      }
    );
  };
  forgotPassword = (data) => {
    return DataService.postRequest("/api/v1/users/password/forgot", data).then(
      (response) => {
        console.log(response);
        if (response.status !== true) throw response;
      }
    );
  };

  getAllPeople = ({ user_id }) => {
    return DataService.getRequest("/api/v1/users/people/all", {
      user_id,
    }).then((response) => {
      console.log(response);
      if (response.status !== true) throw response;
      return response.data;
    });
  };

  addFriend = ({ friend_id, user_id }) => {
    return DataService.postRequest("/api/v1/users/people/friends", {
      user_id,
      friend_id,
    }).then((response) => {
      console.log(response);
      if (response.status !== true) throw response;
      return response.data;
    });
  };

  removeFriend = ({ friend_id, user_id }) => {
    return DataService.deleteRequest("/api/v1/users/people/friends", {
      user_id,
      friend_id,
    }).then((response) => {
      console.log(response);
      if (response.status !== true) throw response;
      return response.data;
    });
  };

  getAllFriends = ({ user_id }) => {
    return DataService.getRequest("/api/v1/users/people/friends/all", {
      user_id,
    }).then((response) => {
      console.log(response);
      if (response.status !== true) throw response;
      return response.data;
    });
  };
}

export default new UserApiService();

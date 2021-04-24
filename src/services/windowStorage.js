// class SessionStorageValues {
//   constructor() {
//     var distributor = JSON.parse(window.localStorage.getItem("distributor"));
//     if (distributor) {
//       window.sessionStorage.setItem("distributor", JSON.stringify(distributor));
//     }
//   }
//   setdistributor(distributor, local) {
//     window.sessionStorage.setItem("distributor", JSON.stringify(distributor));
//     if (local) {
//       window.localStorage.setItem("distributor", JSON.stringify(distributor));
//     }
//   }

//   setPhone(phone) {
//     window.sessionStorage.setItem("phone", JSON.stringify(phone));
//   }
//   getdistributor() {
//     return JSON.parse(window.sessionStorage.getItem("distributor"));
//   }

//   getPhone() {
//     return JSON.parse(window.sessionStorage.getItem("phone"));
//   }

//   // isLoggedIn() {
//   //     return JSON.parse(localStorage.getItem('distributor')) !== null;
//   // }

//   // getOrganizationID() {
//   //     return JSON.parse(localStorage.getItem('distributor')).organization_id
// }

//   // getAddedBY() {
//   //     return JSON.parse(localStorage.getItem('distributor'))._id
//   // }

//   // getOrganizationName() {
//   //     return JSON.parse(localStorage.getItem('distributor')).name
//   // }

//   // getFirstName() {
//   //     return JSON.parse(localStorage.getItem('distributor')).first_name
//   // }

//   // getLastName() {
//   //     return JSON.parse(localStorage.getItem('distributor')).last_name
//   // }

//   // isEmailVerified() {
//   //     return JSON.parse(localStorage.getItem('distributor')).email_verified
//   // }

//   // getEmail() {
//   //     return JSON.parse(localStorage.getItem('distributor')).email
//   // }

//   // isSubscribed() {
//   //     return JSON.parse(localStorage.getItem('distributor')).is_subscription_active
//   // }
//   logOut() {
//     window.localStorage.clear();
//     window.sessionStorage.clear();
//   }
// }

// export default new SessionStorageValues();

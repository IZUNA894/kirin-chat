import * as yup from "yup";

//Add the schemas here for the compilation
import addUser from "./user/addUser";
import loginEmailUser from "./user/loginEmail";
import forgotPassword from "./user/forgotPassword";

//account schema
// import editUser from "./account/editUser";
// import changePassword from "./account/changePassword";
// import changePasswordAdmin from "./account/changePasswordAdmin";
// import editAdmin from "./account/editAdmin";

//admin
import loginEmailAdmin from "./admin/loginEmail";

const schemas = {
  addUser: () => addUser(yup),
  loginEmailUser: () => loginEmailUser(yup),
  forgotPassword: () => forgotPassword(yup),

  // editUser: () => editUser(yup),
  // changePassword: () => changePassword(yup),
  // changePasswordAdmin: () => changePasswordAdmin(yup),
  // editAdmin: () => editAdmin(yup),

  //admin
  loginEmailAdmin: () => loginEmailAdmin(yup),
};

const schemaValidator = (type) => {
  if (!type) {
    throw new Error("schema type to validate not provided");
  }
  const Schema = schemas[type]();

  return Schema;
};

export default schemaValidator;

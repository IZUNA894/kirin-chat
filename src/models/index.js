import * as yup from "yup";

//Add the schemas here for the compilation
import addUser from "./user/addUser";
import loginEmailUser from "./user/loginEmail";
import forgotPassword from "./user/forgotPassword";
import loginPhone from "./user/loginPhone";
import verifyOTP from "./user/verifyOTP";
import editUser from "./user/editUser";
import changePassword from "./user/changePassword";

const schemas = {
  addUser: () => addUser(yup),
  loginEmailUser: () => loginEmailUser(yup),
  forgotPassword: () => forgotPassword(yup),
  loginPhone: () => loginPhone(yup),
  verifyOTP: () => verifyOTP(yup),
  editUser: () => editUser(yup),
  changePassword: () => changePassword(yup),
};

const schemaValidator = (type) => {
  if (!type) {
    throw new Error("schema type to validate not provided");
  }
  const Schema = schemas[type]();

  return Schema;
};

export default schemaValidator;

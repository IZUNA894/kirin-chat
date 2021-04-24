import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./toast.module.css";
const ShowToast = (msg, type) => {
  toast.info(msg, {
    className: Styles["Toastify__toast--info"],
    bodyClassName: Styles["Toastify__toast--info"],

    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default ShowToast;

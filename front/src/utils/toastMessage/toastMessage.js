import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

import { notificationTypeItems } from "../enum";

export const toastSuccessMessage = (message) => {
  toast.success(message);
};

export const toastErrorMessage = (message) => {
  toast.error(message);
};

export const notificationMessage = (message, type) => {
  switch (type) {
    case notificationTypeItems[0]:
      toast.success(message);
      break;
    case notificationTypeItems[1]:
      toast.error(message);
      break;
    case notificationTypeItems[2]:
      toast.info(message);
      break;
    case notificationTypeItems[3]:
      toast.warning(message);
      break;

    default:
      break;
  }
};

export const toastOfflineMessage = () => {
  Swal.fire({
    html: "اتصال شما به اینترنت قطع شده است",
    icon: "warning",
    showConfirmButton: false,
  });
};

export const deliverySuccessMessage = (html, redirectUrl, timer) => {
  Swal.fire({
    icon: "success",
    html,
    confirmButtonText: "باشه",
    showConfirmButton: isEmpty(timer),
    timer,
    didClose: () => {
      if (redirectUrl) window.location.href = redirectUrl;
    },
  });
};

export const modalErrorMessage = (message, redirectUrl, timer) => {
  Swal.fire({
    icon: "error",
    title: "خطا",
    html: message,
    showConfirmButton: isEmpty(timer),
    timer,
    confirmButtonText: "باشه",
    didClose: () => {
      if (redirectUrl) window.location.href = redirectUrl;
    },
  });
};

export const areYouSureMessage = (
  func,
  html = "آیا مطمئنید؟",
  confirmButtonText = "بله، مطمئنم"
) => {
  Swal.fire({
    html,
    icon: "warning",
    confirmButtonText,
    showCancelButton: true,
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
  }).then((result) => {
    if (result.value) func();
  });
};

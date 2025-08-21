import axios from "axios";

import {
  deliverySuccessMessage,
  toastErrorMessage,
  toastOfflineMessage,
} from "../../utils/toastMessage/toastMessage";
import { getCookies } from "../../utils";

// Check internet connection
window.addEventListener("offline", () => toastOfflineMessage());
window.addEventListener("online", () =>
  deliverySuccessMessage("شما به اینترنت متصل شدید", null, "3000")
);

if (navigator.onLine === false) toastOfflineMessage();

// End

// Axios Setting
axios.defaults.headers.common["Accept"] = "application/json";
// End

// Post Headers
axios.defaults.headers.common["Content-Type"] = "application/json";
// End

axios.interceptors.request.use(
  (config) => {
    const accessToken = getCookies("accessToken");
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    toastErrorMessage(
      "مشکلی رخ داده است، لطفا اتصال اینترنت خود را بررسی نمایید"
    );
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

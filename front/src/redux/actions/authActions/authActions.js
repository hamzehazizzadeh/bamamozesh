import { clearUserAction } from "../userActions/userActions";
import { decodeJWT, removeCookies, setCookies } from "../../../utils";
import { clearMetaAction } from "../metaActions/metaActions";
import { userRoleItems } from "../../../utils/enum";
import {
  clearPermissionsAction,
  setPermissionsAction,
} from "../permissionsActions/permissionsActions";
import { clearSocketActions } from "../socketActions/socketActions";

export const setAuthAction = (accessToken) => {
  return async (dispatch) => {
    setCookies("accessToken", accessToken);

    const decodedToken = decodeJWT(accessToken);
    const role = decodedToken?.role;

    await dispatch({
      type: "SET_AUTH",
      payload: {
        accessToken,
        role,
        isAdmin: role === userRoleItems[0],
        isStaff: role === userRoleItems[1],
        isCustomer: role === userRoleItems[2],
      },
    });
    await dispatch(setPermissionsAction(accessToken));
  };
};

export const clearAuthAction = () => {
  return async (dispatch) => {
    removeCookies("accessToken");

    localStorage.clear();

    await dispatch(clearSocketActions());
    await dispatch(clearUserAction());
    await dispatch(clearPermissionsAction());
    await dispatch(clearMetaAction());
    await dispatch({ type: "CLEAR_AUTH", payload: {} });

    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 500);
  };
};
